import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import { analyzeEmail, extractDate } from "@/lib/ai";

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
    content.includes("rejected") ||
    content.includes("not selected") ||
    content.includes("not moving forward")
  ) {
    return "Rejected";
  }

  if (
    content.includes("offer letter") ||
    content.includes("welcome aboard") ||
    content.includes("selected")
  ) {
    return "Offer";
  }

  if (
    content.includes("interview") ||
    content.includes("schedule your interview")
  ) {
    return "Interview";
  }

  if (
    content.includes("assessment") ||
    content.includes("coding challenge") ||
    content.includes("hackerrank")
  ) {
    return "OA Pending";
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


function getBetterStatus(
  current: string,
  next: string
) {
  return STATUS_ORDER[next as keyof typeof STATUS_ORDER] >
    STATUS_ORDER[current as keyof typeof STATUS_ORDER]
    ? next
    : current;
}

function isFutureDate(date: Date | null) {
  if (!date) return false;

  const now = new Date();

  const sixtyDays = new Date();
  sixtyDays.setDate(now.getDate() + 60);

  return date > now && date <= sixtyDays;
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
      ? `after:${Math.floor(user.lastSyncAt.getTime() / 1000)}`
      : `newer_than:30d`;

    const list = await gmail.users.messages.list({
      userId: "me",
      q: query.replace(/\\s+/g, " ").trim(),
      maxResults: 50,
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
        format: "full",
      });

      const headers = full.data.payload?.headers || [];

      const subject = getHeader(headers, "Subject");
      const from = getHeader(headers, "From");
      const body = decodeBody(full.data.payload);

      // AI analysis
      const ai = await analyzeEmail(
        subject,
        from,
        body
      );

      if (
        !ai.isCareerRelated &&
        ai.category !== "meeting"
      ) {
        continue;
      }

      const detectedDate =
        extractDate(ai.deadlineText)
        ??
        extractDate(ai.meetingText)
        ??
        extractDate(body);

      const email = await prisma.email.upsert({
        where: {
          gmailId: message.id,
        },

        update: {
          content: body,
          summary: ai.summary,
          actionRequired: ai.actionRequired,
          priority: ai.importance,
          gmailUrl:
            `https://mail.google.com/mail/u/0/#all/${message.id}`,
        },

        create: {
          userId: user.id,
          gmailId: message.id,

          gmailUrl:
            `https://mail.google.com/mail/u/0/#all/${message.id}`,

          sender: from,
          subject,

          content: body,

          processed: true,

          summary: ai.summary,

          actionRequired:
            ai.actionRequired,

          priority:
            ai.importance,
        },
      });

      syncedEmails++;

      const company =
        ai.company ||
        extractCompany(from);

      const status =
        ai.status && ai.status !== "Unknown"
          ? ai.status
          : inferStatus(`${subject} ${body}`);

      const role =
        ai.role ||
        ai.title ||
        subject;


      const deadline =
        detectedDate;

      const validDeadline =
        deadline && deadline > new Date()
          ? deadline
          : null;

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
            deadline:
              validDeadline ??
              existingOpportunity.deadline,
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
            deadline: validDeadline,
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
      if (isFutureDate(validDeadline)) {
        const safeDeadline = validDeadline as Date;

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
                ai.importance === "high"
                  ? "High"
                  : ai.importance === "medium"
                    ? "Medium"
                    : "Low",
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