import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardClient from "./DashboardClient";

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

  return <DashboardClient session={session} />;
}