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
  opportunities: initialOpportunities = [],
  emails = [],
  reminders = [],
  stats,
  lastSyncAt,
}: any) {
  const [syncing, setSyncing] = useState(false);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [message, setMessage] = useState("");

  const syncGmail = async () => {
    try {
      setSyncing(true);
      setMessage("Hold tight!! Syncing important career emails…");

      const res = await fetch("/api/sync/gmail", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Sync failed");
      }
      setMessage(data.message || "Sync complete");
      window.location.reload();

      // Poll every 3 seconds for updates
      const start = Date.now();
      const poll = async () => {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          // Refresh dashboard data
          window.location.reload();
        } else if (Date.now() - start < 30000) {
          setTimeout(poll, 3000);
        }
      };
      setTimeout(poll, 3000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to start sync");
      setSyncing(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/opportunities/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      setOpportunities((prev: any[]) =>
        prev.map((item) =>
          item.id === id ? { ...item, status } : item
        )
      );

      setMessage("Status updated successfully");

      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to update status");
    }
  };

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
              ? `Last synced ${new Date(lastSyncAt).toLocaleTimeString("en-IN", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata',
              })}`
              : "Click Sync Gmail to import your recent career emails"}
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
          {syncing ? "Syncing in background…" : "Sync Gmail"}
        </button>

        {message && (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700">
            {message}
          </div>
        )}
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
            href="/dashboard/opportunities"
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
            {initialOpportunities.length === 0 ? (
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

                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className={`rounded-full px-3 py-1 text-xs font-medium border outline-none ${item.status === "Offer"
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                        : item.status === "Rejected"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : item.status === "Interview"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : item.status === "OA Pending"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                    >
                      <option>Applied</option>
                      <option>OA Pending</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
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
                      className={`px-3 py-1 text-xs font-medium rounded-full ${item.priority === "High"
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