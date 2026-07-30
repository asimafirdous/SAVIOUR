import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return Response.json(
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
      return Response.json(
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

    if (!account?.access_token) {
      return Response.json(
        { error: "Google account not connected" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: account.access_token,
      refresh_token: account.refresh_token,
    });

    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    return Response.json({
      success: true,
      count: response.data.messages?.length || 0,
      messages: response.data.messages || [],
    });
  } catch (error) {
    console.error("GMAIL SYNC ERROR:", error);

    return Response.json(
      {
        error: "Failed to sync Gmail",
      },
      {
        status: 500,
      }
    );
  }
}