import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getGmailClient } from "@/lib/gmail";

export async function POST() {
  const session = await getServerSession(authOptions);

  // session may not have a typed `accessToken` property depending on NextAuth setup.
  // Try common locations and fall back safely.
  const accessToken = (session as any)?.accessToken ?? (session as any)?.user?.accessToken;

  if (!accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gmail = getGmailClient(accessToken);

  const res = await gmail.users.messages.list({
    userId: "me",
    maxResults: 20,
    q: "(internship OR interview OR hackathon OR scholarship OR assessment)",
  });

  return Response.json({
    count: res.data.messages?.length || 0,
    messages: res.data.messages || [],
  });
}