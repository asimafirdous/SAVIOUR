import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { ShieldCheck, RefreshCw, PauseCircle, Trash2 } from "lucide-react";
import ResetSyncButton from "./ResetSyncButton";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <ShieldCheck className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-gray-500">
            Manage your SAVIOUR account, privacy, and syncing
          </p>
        </div>
      </div>

      {/* Account */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Connected Gmail</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            Verified
          </span>
        </div>
      </section>

      {/* Sync controls */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Sync Gmail</p>
            <p className="text-sm text-gray-500">
              Fetch new career emails and update your pipeline
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            <RefreshCw size={16} />
            Sync
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Pause tracking</p>
            <p className="text-sm text-gray-500">
              Stop processing new emails temporarily
            </p>
          </div>

          <button className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-gray-50">
            <PauseCircle size={16} />
            Pause
          </button>
        </div>
      </section>

      {/* Danger zone */}
      <section className="rounded-3xl bg-white border border-red-100 p-5 shadow-sm space-y-4">
        <div>
          <h2 className="font-semibold text-red-700">Danger zone</h2>
          <p className="text-sm text-gray-500 mt-1">
            These actions affect your synced SAVIOUR data
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Reset synced data</p>
            <p className="text-sm text-gray-500">
              Remove opportunities, reminders, and inbox summaries
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reset synced data</p>
              <p className="text-sm text-gray-500">
                Remove opportunities, reminders, and inbox summaries
              </p>
            </div>
            <ResetSyncButton />
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-emerald-600" size={20} />
          <h2 className="font-semibold">Privacy &amp; Security</h2>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-emerald-700">
            <span>✔</span>
            <span>Company, role, deadline, and status are stored</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-700">
            <span>✔</span>
            <span>AI summaries and reminders are stored</span>
          </div>

          <div className="flex items-center gap-2 text-red-700">
            <span>✖</span>
            <span>Attachments are not stored</span>
          </div>

          <div className="flex items-center gap-2 text-red-700">
            <span>✖</span>
            <span>Passwords are never stored</span>
          </div>

          <div className="flex items-center gap-2 text-red-700">
            <span>✖</span>
            <span>Full email history is not kept permanently</span>
          </div>
        </div>
      </section>
    </div>
  );
}