"use client";

import { X, ExternalLink, Bell, Sparkles, Calendar } from "lucide-react";
import { useState } from "react";

export default function EmailDrawer({
  open,
  onClose,
  email,
}: any) {
  const [creating, setCreating] = useState(false);

  const createReminder = async () => {
    try {
      setCreating(true);

      const res = await fetch("/api/reminders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: email.actionRequired || email.subject,
          dueDate: null,
          priority: email.priority || "Medium",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create reminder");
      }

      onClose();

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (!open || !email) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out animate-in slide-in-from-right">
        <div className="sticky top-0 border-b bg-white/90 backdrop-blur px-5 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-gray-500 truncate">{email.sender}</p>
              <h2 className="mt-1 text-lg font-bold text-slate-900 leading-tight">
                {email.subject}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* AI Summary */}
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-emerald-600" size={18} />
              <p className="font-semibold text-emerald-900">AI Summary</p>
            </div>

            <p className="mt-3 text-sm leading-6 text-emerald-900/90">
              {email.summary ||
                "This email contains career-related information and may require your attention."}
            </p>
          </div>

          {/* Action Required */}
          {email.actionRequired && (
            <div className="rounded-3xl border border-amber-100 bg-amber-50/70 p-4">
              <p className="font-semibold text-amber-900">Action Required</p>
              <p className="mt-2 text-sm leading-6 text-amber-900/90">
                {email.actionRequired}
              </p>
            </div>
          )}

          {/* Deadline */}
          {email.deadlineText && (
            <div className="rounded-3xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                <p className="font-semibold text-blue-900">Detected Deadline</p>
              </div>

              <p className="mt-2 text-sm text-blue-900/90">
                {email.deadlineText}
              </p>
            </div>
          )}

          {/* Email preview */}
          <div className="rounded-3xl border p-4">
            <p className="font-semibold text-slate-900">Email Preview</p>

            <p className="mt-3 text-sm leading-7 text-slate-600 whitespace-pre-wrap">
              {email.body?.slice(0, 1200) || "No preview available."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {email.gmailUrl && (
              <a
                href={email.gmailUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition"
              >
                <ExternalLink size={16} />
                Open in Gmail
              </a>
            )}

            <button
              onClick={createReminder}
              disabled={creating}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-gray-50 transition disabled:opacity-60"
            >
              <Bell size={16} />
              {creating ? "Creating..." : "Create Reminder"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}