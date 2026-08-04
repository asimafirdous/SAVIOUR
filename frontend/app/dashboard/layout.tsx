import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-[#F6FAF8]">
      <Sidebar session={session} />

      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      <MobileNav />
    </div>
  );
}