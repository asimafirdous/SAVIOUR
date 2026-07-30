import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getGmailClient } from "@/lib/gmail";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const gmail = getGmailClient(session.accessToken);

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