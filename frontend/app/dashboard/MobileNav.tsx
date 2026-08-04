"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Calendar,
} from "lucide-react";

const items = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { href: "/dashboard/inbox", icon: Inbox, label: "Inbox" },
  { href: "/dashboard/opportunities", icon: Briefcase, label: "Jobs" },
  { href: "/dashboard/deadlines", icon: Calendar, label: "Due" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur">
      <div className="grid grid-cols-4 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 text-xs ${
                active ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}