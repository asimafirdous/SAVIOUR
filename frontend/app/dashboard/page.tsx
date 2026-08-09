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

  const timelineItems = opportunities
    .filter((o) => {
      if (!o.deadline) return false;

      const text = `${o.title} ${o.company}`.toLowerCase();

      return (
        !text.includes("invitation") &&
        !text.includes("sync call") &&
        !text.includes("zoom") &&
        !text.includes("google meet") &&
        !text.includes("gmeet") &&
        !text.includes("meeting")
      );
    })
    .slice(0, 5)
    .map((o) => ({
      id: o.id,
      title: o.title,
      subtitle: o.company,
      type:
        o.status === "Interview"
          ? ("interview" as const)
          : ("internship" as const),

      source: "career",
      url: null,

      date: (() => {
        const d = new Date(o.deadline!);
        const now = new Date();

        const diff = Math.ceil(
          (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diff <= 0) return "Today";
        if (diff === 1) return "Tomorrow";
        if (diff <= 7) return `In ${diff} days`;

        return d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });
      })(),
    }));

  return (
    <DashboardClient
      session={session}
      opportunities={opportunities}
      emails={emails}
      reminders={reminders}
      stats={stats}
      timelineItems={timelineItems}
      lastSyncAt={user.lastSyncAt?.toISOString() ?? null}
    />
  );
}