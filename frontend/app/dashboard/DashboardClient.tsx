"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Mail,
  Calendar,
  Bell,
  Settings,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function DashboardClient({ session, opportunities = [] }: any) {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  const syncGmail = async () => {
    try {
      setSyncing(true);
      setMessage("");

      const res = await fetch("/api/sync/gmail", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setMessage("Gmail synced successfully 🚀");
      console.log(data);
    } catch (error: any) {
      setMessage(error.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const seedOpportunity = async () => {
    try {
      await fetch("/api/opportunities/seed", {
        method: "POST",
      });

      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const menu = [
    { label: "Overview", icon: LayoutDashboard, active: true },
    { label: "Opportunities", icon: Mail },
    { label: "Deadlines", icon: Calendar },
    { label: "Reminders", icon: Bell },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F6FAF8] flex">
      <aside className="hidden md:flex w-72 flex-col border-r border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl text-white shadow-lg">
            🛡️
          </div>
          <div>
            <h1 className="font-bold tracking-widest text-gray-900">SAVIOUR</h1>
            <p className="text-xs text-gray-500">Career Intelligence</p>
          </div>
        </div>

        <nav className="px-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-5 border-t">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            {session.user.image && (
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
                {session.user.name}
              </p>
              <p className="truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h2 className="text-2xl font-bold">
                Hey {session.user.name?.split(" ")[0]} 👋
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={seedOpportunity}
                className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Add Sample
              </button>

              <button
                onClick={syncGmail}
                disabled={syncing}
                className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 disabled:opacity-60"
              >
                {syncing ? "Syncing..." : "Sync Gmail"}
              </button>
            </div>
          </div>

          {message && (
            <p className="px-6 pb-3 text-sm font-medium text-emerald-700">
              {message}
            </p>
          )}
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-10 text-white shadow-xl">
            <Sparkles className="absolute right-10 top-10 opacity-30" size={100} />
            <p className="text-emerald-100 text-sm">SAVIOUR AI ENGINE</p>
            <h1 className="mt-3 text-4xl font-bold max-w-3xl">
              Never miss your next opportunity again.
            </h1>
            <p className="mt-5 max-w-2xl text-emerald-50 text-lg">
              SAVIOUR converts your Gmail into an intelligent career assistant that
              tracks internships, interviews and deadlines automatically.
            </p>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              [String(opportunities.length), "Opportunities"],
              ["3", "Upcoming Deadlines"],
              ["1", "Interviews"],
            ].map((item) => (
              <div
                key={item[1]}
                className="rounded-3xl bg-white border p-6 shadow-sm hover:shadow-xl transition"
              >
                <p className="text-4xl font-bold">{item[0]}</p>
                <p className="mt-2 text-gray-500">{item[1]}</p>
              </div>
            ))}
          </section>

          <section className="mt-10">
            <div className="flex justify-between mb-5">
              <h2 className="text-2xl font-bold">Recent Opportunities</h2>
              <button className="text-emerald-700 text-sm font-semibold">
                View all
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {opportunities.length === 0 ? (
                <div className="col-span-full rounded-3xl border bg-white p-10 text-center text-gray-500">
                  No opportunities yet. Click "Add Sample" to create one.
                </div>
              ) : (
                opportunities.map((item: any) => (
                  <div
                    key={item.id}
                    className="rounded-3xl bg-white border p-6 shadow-sm hover:-translate-y-1 hover:shadow-xl transition"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{item.company}</p>
                        <h3 className="mt-2 font-bold">{item.title}</h3>
                      </div>
                      <ArrowUpRight />
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">
                        {item.status}
                      </span>

                      <span className="text-sm text-gray-500">
                        {item.deadline
                          ? new Intl.DateTimeFormat("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(item.deadline))
                          : "No deadline"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="mt-10 rounded-3xl bg-white border p-8 flex gap-5 items-center">
            <ShieldCheck className="text-emerald-600" size={50} />
            <div>
              <h2 className="font-bold text-xl">Your privacy comes first</h2>
              <p className="text-gray-600 mt-2">
                SAVIOUR uses secure Google OAuth and only requires read-only Gmail
                access.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}