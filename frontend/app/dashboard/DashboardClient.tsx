"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Inbox,
  Briefcase,
  Calendar,
  Bell,
  RefreshCw,
} from "lucide-react";

export default function DashboardClient({
  session,
  opportunities = [],
  emails = [],
  reminders = [],
  stats,
  lastSyncAt,
}: any) {
  const [syncing, setSyncing] = useState(false);

  const syncGmail = async () => {
    try {
      setSyncing(true);

      await fetch("/api/sync/gmail", {
        method: "POST",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  // Auto sync once when dashboard opens
  useEffect(() => {
    if (!lastSyncAt) {
      syncGmail();
    }
  }, []);

  return (
    <div className="px-4 py-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Welcome back</p>

          <h1 className="text-2xl font-bold">
            Hey {session.user.name?.split(" ")[0]} 👋
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            {lastSyncAt
              ? `Last synced ${new Date(lastSyncAt)
                .toISOString()
                .slice(11, 16)}`
              : "Syncing Gmail for the first time..."}
          </p>
        </div>

        <button
          onClick={syncGmail}
          disabled={syncing}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition"
        >
          <RefreshCw
            size={16}
            className={syncing ? "animate-spin" : ""}
          />
          {syncing ? "Syncing..." : "Sync Gmail"}
        </button>
      </div>

      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-8 text-white shadow-xl">
        <Sparkles
          size={72}
          className="absolute right-6 top-6 opacity-20"
        />

        <p className="text-emerald-100">SAVIOUR AI ENGINE</p>

        <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
          Never miss your next opportunity again.
        </h2>

        <p className="mt-4 max-w-2xl text-emerald-50">
          SAVIOUR converts your Gmail into an intelligent career assistant
          that tracks internships, interviews and deadlines automatically.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-3xl font-bold">{stats.opportunities}</p>
          <p className="text-gray-500 mt-2">Opportunities</p>
        </div>

        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-3xl font-bold">{stats.deadlines}</p>
          <p className="text-gray-500 mt-2">Deadlines</p>
        </div>

        <div className="rounded-3xl bg-white border p-6 shadow-sm">
          <p className="text-3xl font-bold">{stats.interviews}</p>
          <p className="text-gray-500 mt-2">Interviews</p>
        </div>
      </section>

      <section className="rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Inbox className="text-emerald-600" size={24} />
            <h3 className="text-xl font-bold">Smart Inbox</h3>
          </div>

          <Link
            href="/dashboard/inbox"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {emails.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No important emails yet.
            </p>
          ) : (
            emails.map((item: any) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">
                      {item.subject}
                    </p>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {item.sender}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-xl ${item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Low"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.priority || "Medium"}
                  </span>
                </div>

                {item.actionRequired && (
                  <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                      AI Action
                    </p>

                    <p className="text-sm text-emerald-900 mt-1">
                      {item.actionRequired}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-3xl bg-white border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-emerald-600" size={24} />
              <h3 className="text-xl font-bold">Pipeline</h3>
            </div>

            <Link
              href="/dashboard/opportunities"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {opportunities.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No opportunities yet.
              </p>
            ) : (
              opportunities.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-2xl border p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.company}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 whitespace-nowrap">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl bg-white border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="text-emerald-600" size={24} />
              <h3 className="text-xl font-bold">Reminders</h3>
            </div>

            <Link
              href="/dashboard/reminders"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {reminders.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No reminders.
              </p>
            ) : (
              reminders.map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-2xl border p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">
                        {item.title}
                      </p>

                      {item.dueDate && (
                        <p className="text-sm text-gray-500 mt-1">
                          Due {new Date(item.dueDate).toISOString().slice(0, 10)}
                        </p>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-xl ${item.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}