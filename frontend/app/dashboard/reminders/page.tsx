import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Bell, Clock } from "lucide-react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function RemindersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  const reminders = await prisma.reminder.findMany({
    where: {
      userId: user.id,
      completed: false,
    },
    orderBy: {
      dueDate: "asc",
    },
  });

  const now = new Date();

  const today = reminders.filter((r: (typeof reminders)[number]) => {
    if (!r.dueDate) return false;
    return r.dueDate.toDateString() === now.toDateString();
  });

  const upcoming = reminders.filter((r: (typeof reminders)[number]) => {
    if (!r.dueDate) return false;
    return r.dueDate > now && r.dueDate.toDateString() !== now.toDateString();
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold">Smart Reminders</h1>
          <p className="text-sm text-gray-500">
            Stay ahead of interviews, OAs, and deadlines
          </p>
        </div>
      </div>

      {/* Today */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-orange-500" size={20} />
          <h2 className="font-semibold text-lg">Today</h2>
        </div>

        {today.length === 0 ? (
          <p className="text-sm text-gray-500">No reminders for today.</p>
        ) : (
          <div className="space-y-3">
            {today.map((item: (typeof reminders)[number]) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  {item.dueDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Due {formatDate(item.dueDate)}
                    </p>
                  )}
                </div>

                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${item.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Upcoming</h2>

        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming reminders.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((item: (typeof reminders)[number]) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  {item.dueDate && (
                    <p className="text-sm text-gray-500 mt-1">
                      Due {formatDate(item.dueDate)}
                    </p>
                  )}
                </div>

                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${item.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : item.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}