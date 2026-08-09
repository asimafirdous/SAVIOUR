"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Timeline from "@/components/dashboard/Timeline";
import EmailDrawer from "@/components/dashboard/EmailDrawer";

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
  timelineItems = [],
  lastSyncAt,
}: any) {
  const [syncing, setSyncing] = useState(false);
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [message, setMessage] = useState("");
  const [syncMessage, setSyncMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const syncGmail = async () => {
    try {
      setSyncing(true);
      setSyncMessage("Hold tight!! Syncing important career emails…");

      const res = await fetch("/api/sync/gmail", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sync failed");
      }

      setSyncMessage(data.message || "Sync completed successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setSyncMessage(err.message || "Sync failed");
    } finally {
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

  const saveLineItems = opportunities.filter((item: any) => {
    const text = `${item.title} ${item.company}`.toLowerCase();

    return (
      !text.includes("zoom") &&
      !text.includes("google meet") &&
      !text.includes("gmeet") &&
      !text.includes("meeting")
    );
  });

  const openEmail = (email: any) => {
    setSelectedEmail(email);
    setDrawerOpen(true);
  };

  const opportunityHub = [
    {
      title: "Software Engineering Intern",
      company: "LinkedIn",
      type: "Internship",
      source: "LinkedIn",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Research Sciences INTERN",
      company: "Microsoft",
      type: "Internship",
      source: "Company",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
    {
      title: "IBM Z Datathon 2026",
      company: "IBM",
      type: "Hackathon",
      source: "Hackathon",
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Women in Tech Scholarship",
      company: "Google",
      type: "Scholarship",
      source: "Scholarship",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  ];

  const meetings = [
    {
      title: "Microsoft Interview",
      platform: "Google Meet",
      time: "Tomorrow • 10:00 AM",
      link: "https://meet.google.com",
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Infosys OA Discussion",
      platform: "Zoom",
      time: "In 2 days • 7:00 PM",
      link: "https://zoom.us",
      color: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
      title: "IBM Datathon Briefing",
      platform: "Google Meet",
      time: "In 3 days • 6:30 PM",
      link: "https://meet.google.com",
      color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
  ];

  return (
    <div className="px-4 py-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        {syncMessage && (
          <div className="rounded-2xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700">
            {syncMessage}
          </div>
        )}
      </div>

      <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600 p-5 sm:p-8 text-white shadow-xl">
        <Sparkles
          size={64}
          className="absolute right-4 top-4 opacity-20 sm:right-6 sm:top-6"
        />

        <p className="text-sm text-emerald-100 sm:text-base">SAVIOUR AI</p>

        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Never miss your next opportunity again.
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base sm:leading-7">
          SAVIOUR converts your Gmail into an intelligent career assistant
          that tracks internships, interviews and deadlines automatically.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Timeline */}
      <div className="mt-8">
        <Timeline items={timelineItems} />
      </div>

      <section className="rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Upcoming Agenda</h3>
            <p className="text-sm text-slate-500 mt-1">
              Deadlines, interviews, and assessments in chronological order
            </p>
          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            {timelineItems.length} {timelineItems.length === 1 ? "item" : "items"}
          </div>
        </div>

        <div className="space-y-4">
          {timelineItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
              No upcoming events
            </div>
          ) : (
            timelineItems.map((item: any) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl border p-4 hover:shadow-md transition"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p className="text-sm text-slate-600 mt-1 truncate">
                      {item.subtitle}
                    </p>
                  )}

                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {item.source || "Career"}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-emerald-700">
                    {item.date}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Opportunities Hub</h3>
            <p className="text-sm text-slate-500 mt-1">
              Discover internships, hackathons, scholarships, and career opportunities
            </p>
          </div>

          <Link
            href="/dashboard/opportunities"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
            All
          </button>
          <button className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Internships
          </button>
          <button className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Hackathons
          </button>
          <button className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200">
            Scholarships
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {opportunityHub.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border p-4 sm:p-5 hover:shadow-md transition bg-white"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate">
                    {item.title}
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {item.company}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${item.color}`}
                >
                  {item.type}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">{item.source}</span>

                <button className="text-sm font-medium text-emerald-700 hover:underline">
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meetings & Interviews */}
      <section className="rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Calendar size={20} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Meetings & Interviews
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Join Zoom and Google Meet sessions directly from SAVIOUR
              </p>
            </div>
          </div>

          <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            {meetings.length} upcoming
          </div>
        </div>

        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div
              key={meeting.title}
              className="flex flex-col gap-4 rounded-2xl border p-5 md:flex-row md:items-center md:justify-between hover:shadow-md transition"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-slate-900 truncate">
                    {meeting.title}
                  </p>

                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-medium ${meeting.color}`}
                  >
                    {meeting.platform}
                  </span>
                </div>

                <p className="text-sm text-slate-600 mt-2">
                  {meeting.time}
                </p>
              </div>

              <a
                href={meeting.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                Join
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
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
              <button
                key={item.id}
                onClick={() => openEmail(item)}
                className="w-full text-left rounded-2xl border p-4 sm:p-5 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {item.gmailUrl ? (
                          <a
                            href={item.gmailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 font-semibold truncate text-gray-900 hover:text-emerald-700 hover:underline transition-colors"
                          >
                            <span className="truncate">{item.subject}</span>
                            <ExternalLink size={14} className="shrink-0 opacity-60" />
                          </a>
                        ) : (
                          <p className="font-semibold truncate">{item.subject}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {item.sender}
                    </p>
                  </div>

                  <span
                    className={`self-start sm:self-auto px-3 py-1 text-xs font-medium rounded-xl ${item.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : item.priority === "Low"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {item.priority || "Medium"}
                  </span>
                </div>

                {
                  item.actionRequired && (
                    <div className="mt-3 rounded-xl bg-emerald-50 p-3">
                      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                        AI Action
                      </p>

                      <p className="text-sm text-emerald-900 mt-1">
                        {item.actionRequired}
                      </p>
                    </div>
                  )
                }
              </button>
            ))
          )}
        </div>
      </section >

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-3xl bg-white border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-emerald-600" size={24} />
              <div>
                <h3 className="text-xl font-bold">SaveLine</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Track only your application stages
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/opportunities"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {saveLineItems.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No applications in SaveLine yet.
              </p>
            ) : (
              saveLineItems.map((item: any) => (
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
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : item.status === "OA Cleared"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                    >
                      <option>Applied</option>
                      <option>OA Pending</option>
                      <option>OA Cleared</option>
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
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
      <EmailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        email={selectedEmail}
      />
    </div >
  );
}