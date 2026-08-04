"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  LayoutDashboard,
  Inbox,
  Mail,
  Calendar,
  Bell,
  Settings,
} from "lucide-react";

export default function Sidebar({ session }: any) {
  const pathname = usePathname();

  const menu = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/inbox", label: "Smart Inbox", icon: Inbox },
    { href: "/dashboard/opportunities", label: "Opportunities", icon: Mail },
    { href: "/dashboard/deadlines", label: "Deadlines", icon: Calendar },
    { href: "/dashboard/reminders", label: "Reminders", icon: Bell },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-72 flex-col border-r bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white shadow-lg">
          🛡️
        </div>

        <div>
          <h1 className="font-bold tracking-widest">SAVIOUR</h1>
          <p className="text-xs text-gray-500">Career Intelligence</p>
        </div>
      </div>

      <nav className="px-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-5 border-t">
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={45}
              height={45}
              alt="profile"
              className="rounded-full"
            />
          )}

          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold">
              {session?.user?.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-3 w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
        >
          Disconnect Google
        </button>
      </div>
    </aside>
  );
}