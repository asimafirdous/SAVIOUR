import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const emails = await prisma.email.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: user.id,
      completed: false,
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 4,
  });

  const stats = {
    opportunities: await prisma.opportunity.count({
      where: { userId: user.id },
    }),
    interviews: await prisma.opportunity.count({
      where: {
        userId: user.id,
        status: "Interview",
      },
    }),
    deadlines: await prisma.opportunity.count({
      where: {
        userId: user.id,
        deadline: { not: null },
      },
    }),
  };

  return (
    <DashboardClient
      session={session}
      opportunities={opportunities}
      emails={emails}
      reminders={reminders}
      stats={stats}
      lastSyncAt={user.lastSyncAt?.toISOString() ?? null}
    />
  );
}