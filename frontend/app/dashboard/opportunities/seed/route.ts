import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const opportunity = await prisma.opportunity.create({
    data: {
      userId: user.id,
      title: "Software Engineering Intern",
      company: "Google",
      status: "OA Pending",
      deadline: new Date("2026-08-05"),
    },
  });

  return Response.json(opportunity);
}