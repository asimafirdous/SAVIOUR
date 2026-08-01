import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardClient from "./DashboardClient";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F6FAF8]">
        <p className="text-red-600 font-semibold">
          Please login again.
        </p>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  const opportunities = user
    ? await prisma.opportunity.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  return (
    <DashboardClient
      session={session}
      opportunities={opportunities}
    />
  );
}