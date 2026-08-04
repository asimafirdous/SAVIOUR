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

  if (
    content.includes("interview") ||
    content.includes("schedule your interview") ||
    content.includes("technical round") ||
    content.includes("hr round")
  ) {
    return "Interview";
  }

  if (
    content.includes("online assessment") ||
    content.includes("assessment link") ||
    content.includes("coding challenge") ||
    content.includes("hackerrank") ||
    content.includes("codility") ||
    content.includes("test link")
  ) {
    return "OA Pending";
  }

  if (
    content.includes("offer") ||
    content.includes("congratulations") ||
    content.includes("selected") ||
    content.includes("welcome aboard")
  ) {
    return "Offer";
  }

  if (
    content.includes("rejected") ||
    content.includes("not moving forward") ||
    content.includes("not selected") ||
    content.includes("unfortunately")
  ) {
    return "Rejected";
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
    "application received",
    "thanks for applying",
    "complete your application",
    "online assessment",
    "assessment link",
    "coding challenge",
    "hackerrank",
    "codility",
    "interview",
    "schedule",
    "shortlisted",
    "selected",
    "offer",
    "rejected",
    "not selected",
    "recruiter",
    "hiring team",
  ];

  return careerSignals.some((s) => text.includes(s));
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

    // Update last sync time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastSyncAt: new Date() },
    });

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

    const list = await gmail.users.messages.list({
      userId: "me",
      q: `
        newer_than:30d
        category:primary
        -category:promotions
        -category:social
        -category:updates
        -from:(jobs-noreply@linkedin.com)
        -from:(notifications@linkedin.com)
        -from:(discover@)
        -from:(newsletter@)
      `.replace(/\\s+/g, " ").trim(),
      maxResults: 50,
    });

    const messages = list.data.messages || [];

    let syncedEmails = 0;
    let createdOpportunities = 0;

    for (const message of messages) {
      if (!message.id) continue;

      const full = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      const headers = full.data.payload?.headers || [];

      const subject = getHeader(headers, "Subject");
      const from = getHeader(headers, "From");
      const body = decodeBody(full.data.payload);

      // Skip non-important emails completely
      if (!isImportantCareerEmail(subject, body, from)) {
        continue;
      }

      const aiEmail = summarizeEmail(subject, body);

      // Save email
      const email = await prisma.email.upsert({
        where: { gmailId: message.id },
        update: {
          content: body,
          summary: aiEmail.summary,
          actionRequired: aiEmail.actionRequired,
          priority: aiEmail.priority,
        },
        create: {
          userId: user.id,
          gmailId: message.id,
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

      // AI extraction
      const ai = await extractOpportunityDetails({
        subject,
        content: body,
        sender: from,
      });

      const company = ai.company || extractCompany(from);
      const role = ai.role || subject;

      const detectedStatus = inferStatus(`${subject} ${body}`);

      const status =
        ai.status && ai.status !== "Unknown"
          ? ai.status
          : detectedStatus;

      const existingOpportunity =
        await prisma.opportunity.findFirst({
          where: {
            userId: user.id,
            company,
            title: role,
          },
        });

      const finalStatus = existingOpportunity
        ? getBetterStatus(existingOpportunity.status, status)
        : status;

      const parsedDate = chrono.parseDate(body);
      const validDeadline =

        parsedDate &&

          parsedDate.getFullYear() >= 2025 &&

          parsedDate.getFullYear() <= 2035

          ? parsedDate :

          null;

      const deadline = ai.deadline
        ? new Date(ai.deadline)
        : validDeadline;

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

      // Auto reminders (deduplicated)
      if (deadline) {
        const reminderKey = `${company}-${role}-${deadline.toISOString().split("T")[0]}`;

        const existingReminder =
          await prisma.reminder.findFirst({
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
              dueDate: deadline,
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

    return NextResponse.json({
      success: true,
      message: `Synced ${syncedEmails} important emails and created ${createdOpportunities} opportunities`,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Gmail sync failed",
      },
      {
        status: 500,
      }
    );
  }
}