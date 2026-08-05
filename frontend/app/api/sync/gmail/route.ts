import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import { extractOpportunityDetails } from "@/lib/ai";
import { summarizeEmail } from "@/lib/email-summary";
import * as chrono from "chrono-node";

function extractCompany(from: string) {
  const match = from.match(/<(.*)>/);
  const email = match ? match[1] : from;

  const domain = email.split("@")[1] || "";

  return (
    domain
      .split(".")[0]
      ?.replace(/[-_]/g, " ")
      .replace(/\\b\\w/g, (char) => char.toUpperCase()) || "Unknown"
  );
}

function getHeader(
  headers: { name?: string | null; value?: string | null }[],
  key: string
) {
  return (
    headers.find(
      (header) =>
        header.name?.toLowerCase() === key.toLowerCase()
    )?.value || ""
  );
}

function decodeBody(payload: any): string {
  let body = "";

  if (payload?.body?.data) {
    body = Buffer.from(payload.body.data, "base64").toString("utf-8");
  }

  if (payload?.parts) {
    for (const part of payload.parts) {
      body += decodeBody(part);
    }
  }

  return body;
}

function inferStatus(text: string): string {
  const content = text.toLowerCase();
  // Rejection first (highest priority)
  if (content.includes("not moving forward") ||
    content.includes("not selected") ||
    content.includes("application rejected") ||
    content.includes("rejected") ||
    content.includes("didn't meet our criteria") ||
    content.includes("did not meet our criteria") ||
    content.includes("we found that you didn't meet") ||
    content.includes("we found that you did not meet")
  ) {
    return "Rejected";
  }

  // Offer
  if (content.includes("offer letter") ||
    content.includes("congratulations") ||
    content.includes("welcome aboard") ||
    content.includes("selected for the role")
  ) {
    return "Offer";
  }

  // Interview
  if (content.includes("interview scheduled") ||
    content.includes("schedule your interview") ||
    content.includes("technical interview") ||
    content.includes("hr interview") ||
    content.includes("interview round") ||
    content.includes("ai interview")
  ) {
    return "Interview";
  }

  // OA
  if (content.includes("online assessment") ||
    content.includes("assessment link") ||
    content.includes("coding challenge") ||
    content.includes("hackerrank") ||
    content.includes("codility") ||
    content.includes("test link")) {
    return "OA Pending";
  }

  // Application received
  if (content.includes("application received") ||
    content.includes("thanks for applying") ||
    content.includes("your application has been submitted") ||
    content.includes("application submitted")
  ) {
    return "Applied";
  }
  return "Applied";
}

const STATUS_ORDER = {
  Applied: 1,
  "OA Pending": 2,
  Interview: 3,
  Rejected: 4,
  Offer: 5,
};

function getBetterStatus(current: string, next: string) {
  return STATUS_ORDER[next as keyof typeof STATUS_ORDER] >
    STATUS_ORDER[current as keyof typeof STATUS_ORDER]
    ? next
    : current;
}

function isImportantCareerEmail(
  subject: string,
  body: string,
  from: string
) {
  const text = `${subject} ${body} ${from}`.toLowerCase();

  // Block promotions / spam / alerts
  const blocked = [
    // Promotions / newsletters
    "newsletter",
    "digest",
    "unsubscribe",
    "sale",
    "discount",
    "offer ends",
    "coupon",
    "cashback",

    // Job recommendations
    "naukri",
    "recommended jobs",
    "top openings",
    "urgent requirement",
    "hiring for intern",
    "job opportunities for intern",

    // Webinars / workshops
    "workshop",
    "webinar",
    "learning session",
    "build your first",
    "how to get an sde",

    // Security / account
    "new sign-in",
    "account",
    "password",
    "security alert",

    // Billing
    "upgrade your account",
    "invoice",
    "payment",
    "aws",

    // Calendar invites
    "updated invitation",
    "sync call",
    "weekly from",
  ];

  if (blocked.some((b) => text.includes(b))) {
    return false;
  }

  // Must contain a real career signal
  const careerSignals = [
    // application lifecycle
    "application received",
    "thanks for applying",
    "your application",
    "application submitted",
    "complete your application",

    // assessments
    "online assessment",
    "assessment link",
    "coding challenge",
    "hackerrank test",
    "codility test",
    "test link",

    // interviews
    "interview scheduled",
    "schedule your interview",
    "technical interview",
    "hr interview",
    "interview round",

    // results
    "you are shortlisted",
    "shortlisted for",
    "selected for",
    "offer letter",
    "congratulations",
    "not selected",
    "not moving forward",
    "application rejected",
  ];

  const hardBlock = [
    "learn today",
    "build tomorrow",
    "still thinking about",
    "recommended for you",
    "job alert",
    "expiring on",
    "webinar",
    "workshop",
    "masterclass",
    "newsletter",
    "weekly digest",
  ];

  if (hardBlock.some((x) => text.includes(x))) {
    return false;
  }

  return careerSignals.some((s) => text.includes(s));
}

function isFutureDate(date: Date | null) {
  if (!date) return false;

  const now = new Date();
  const sixtyDays = new Date();
  sixtyDays.setDate(now.getDate() + 60);

  return date > now && date <= sixtyDays;
}

function isExpired(date: Date | null) {
  return date ? date < new Date() : false;
}

function isMeetingInvite(subject: string, body: string, from: string) {
  const text = `${subject} ${body} ${from}`.toLowerCase();
  const meetingSignals = [
    "zoom",
    "google meet",
    "meet.google.com",
    "microsoft teams",
    "teams.microsoft.com",
    "calendar invitation",
    "invited you to a meeting",
    "join meeting",
    "meeting link",
    "scheduled meeting",
    "interview call",
    "zoom meeting",
    "zoom invitation",
    "join zoom meeting",
    "no-reply@zoom.us",
    "calendar-noreply@google.com"
  ];

  return meetingSignals.some((s) => text.includes(s));
}

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: "google",
      },
    });

    if (!account?.refresh_token) {
      return NextResponse.json(
        {
          error: "Google not connected. Please sign in again.",
        },
        { status: 400 }
      );
    }

    const oauth2 = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!
    );

    oauth2.setCredentials({
      refresh_token: account.refresh_token,
    });

    const tokenResponse = await oauth2.getAccessToken();

    if (!tokenResponse.token) {
      return NextResponse.json(
        {
          error: "Unable to refresh Gmail access token",
        },
        { status: 400 }
      );
    }

    await prisma.account.update({
      where: { id: account.id },
      data: { access_token: tokenResponse.token },
    });

    oauth2.setCredentials({
      access_token: tokenResponse.token,
      refresh_token: account.refresh_token,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2,
    });

    const query = user.lastSyncAt
      ? `
    after:${Math.floor(user.lastSyncAt.getTime() / 1000)}
    -category:promotions
    -category:social
    `
      : `
    newer_than:30d
    -category:promotions
    -category:social 
    `;

    const list = await gmail.users.messages.list({
      userId: "me",
      q: query.replace(/\\s+/g, " ").trim(),
      maxResults: 10,
    });

    const messages = list.data.messages || [];

    let syncedEmails = 0;
    let createdOpportunities = 0;

    for (const message of messages) {
      if (!message.id) continue;

      // Fetch full Gmail message
      const full = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      });

      const headers = full.data.payload?.headers || [];

      const subject = getHeader(headers, "Subject");
      const from = getHeader(headers, "From");
      const body = decodeBody(full.data.payload);

      // Handle meeting invites separately
      if (isMeetingInvite(subject, body, from)) {
        const meetingDate = chrono.parseDate(body);
        if (meetingDate && meetingDate > new Date()) {
          const key = `meeting-${subject}-${meetingDate.toISOString()}`;
          const existing = await prisma.reminder.findFirst({
            where: {
              userId: user.id, description: key,
            },
          });
          if (!existing) {
            await prisma.reminder.create({
              data: {
                userId: user.id,
                title: `Meeting: ${subject}`,
                description: key,
                dueDate: meetingDate,
                priority: "High",
              },
            });
          }
        } continue;
      }

      // Skip non-important emails
      if (!isImportantCareerEmail(subject, body, from)) {
        continue;
      }

      // AI summary for inbox
      const aiEmail = summarizeEmail(subject, body);

      // Save or update email
      const email = await prisma.email.upsert({
        where: { gmailId: message.id },
        update: {
          content: body,
          summary: aiEmail.summary,
          actionRequired: aiEmail.actionRequired,
          priority: aiEmail.priority,
          gmailUrl: `https://mail.google.com/mail/u/0/#all/${message.id}`,
        },
        create: {
          userId: user.id,
          gmailId: message.id,
          gmailUrl: `https://mail.google.com/mail/u/0/#all/${message.id}`,
          sender: from,
          subject,
          content: body,
          processed: false,
          summary: aiEmail.summary,
          actionRequired: aiEmail.actionRequired,
          priority: aiEmail.priority,
        },
      });

      syncedEmails++;

      // Extract opportunity details
      const ai = await extractOpportunityDetails({
        subject,
        content: body,
        sender: from,
      });

      const company = ai.company || extractCompany(from);
      const role = ai.role || subject;

      // Detect application status
      const detectedStatus = inferStatus(`${subject} ${body}`);

      const status =
        ai.status && ai.status !== "Unknown"
          ? ai.status
          : detectedStatus;

      // Parse deadline
      const parsedDate = chrono.parseDate(body);

      const validDeadline =
        parsedDate &&
          parsedDate.getFullYear() >= 2025 &&
          parsedDate.getFullYear() <= 2035
          ? parsedDate
          : null;

      const deadline = ai.deadline
        ? new Date(ai.deadline)
        : validDeadline;

      // Ignore old deadlines
      if (isExpired(deadline)) {
        continue;
      }

      // Find existing opportunity
      const existingOpportunity = await prisma.opportunity.findFirst({
        where: {
          userId: user.id,
          company,
          title: role,
        },
      });

      // Keep the most advanced status
      const finalStatus = existingOpportunity
        ? getBetterStatus(existingOpportunity.status, status)
        : status;

      // Create or update opportunity
      if (existingOpportunity) {
        await prisma.opportunity.update({
          where: { id: existingOpportunity.id },
          data: {
            emailId: email.id,
            sourceEmail: from,
            status: finalStatus,
            deadline: deadline ?? existingOpportunity.deadline,
          },
        });
      } else {
        await prisma.opportunity.create({
          data: {
            userId: user.id,
            emailId: email.id,
            company,
            title: role,
            sourceEmail: from,
            status: finalStatus,
            deadline,
          },
        });

        createdOpportunities++;
      }

      if (finalStatus === "Rejected") {
        await prisma.reminder.deleteMany({
          where: {
            userId: user.id,
            title: `${company} - ${role}`,
          },
        });
      }

      // Create reminder only for future deadlines
      if (isFutureDate(deadline)) {
        const safeDeadline = deadline as Date;

        const reminderKey = `${company}-${role}-${safeDeadline.toISOString().split("T")[0]}`;

        const existingReminder = await prisma.reminder.findFirst({
          where: {
            userId: user.id,
            description: reminderKey,
          },
        });

        if (!existingReminder) {
          await prisma.reminder.create({
            data: {
              userId: user.id,
              title: `${company} - ${role}`,
              description: reminderKey,
              dueDate: safeDeadline,
              priority:
                finalStatus === "Interview" ||
                  finalStatus === "OA Pending"
                  ? "High"
                  : "Medium",
            },
          });
        }
      }
    }

    // Mark sync successful only after all emails are processed
    await prisma.user.update({
      where: { id: user.id },
      data: { lastSyncAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedEmails} important emails and created ${createdOpportunities} opportunities`,
    });
  } catch (error) {
    console.error("Error syncing Gmail:", error);
    return NextResponse.json(
      { error: "Failed to sync Gmail" },
      { status: 500 }
    );
  }
}