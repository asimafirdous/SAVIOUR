import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock } from "lucide-react";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function DeadlinesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  const opportunities = await prisma.opportunity.findMany({
    where: {
      userId: user.id,
      deadline: { not: null },
    },
    orderBy: { deadline: "asc" },
  });

  const now = new Date();

  const upcoming = opportunities.filter(
    (o) => o.deadline && o.deadline >= now
  );

  const past = opportunities.filter(
    (o) => o.deadline && o.deadline < now
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold">Deadlines</h1>
          <p className="text-sm text-gray-500">
            Track upcoming applications, OAs, and interviews
          </p>
        </div>
      </div>

      {/* Upcoming */}
      <section className="rounded-3xl bg-white border p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-emerald-600" size={20} />
          <h2 className="font-semibold text-lg">Upcoming</h2>
        </div>

        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming deadlines.</p>
        ) : (
          <div className="space-y-3">
            {upcoming.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.company}
                  </p>
                </div>

                <div className="text-right whitespace-nowrap">
                  <p className="text-sm font-medium text-emerald-700">
                    {item.deadline && formatDate(item.deadline)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="rounded-3xl bg-white border p-5 shadow-sm">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            Past deadlines
          </h2>

          <div className="space-y-3">
            {past.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border p-4 flex items-center justify-between gap-4 opacity-75"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.company}
                  </p>
                </div>

                <div className="text-right whitespace-nowrap">
                  <p className="text-sm text-gray-600">
                    {item.deadline && formatDate(item.deadline)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}