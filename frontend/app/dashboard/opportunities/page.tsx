import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const statusOrder = [
  "Applied",
  "Interview",
  "OA Pending",
  "Offer",
  "Rejected",
] as const;

const columnColors: Record<(typeof statusOrder)[number], string> = {
  Applied: "bg-gray-100 text-gray-700",
  "OA Pending": "bg-yellow-100 text-yellow-700",
  Interview: "bg-blue-100 text-blue-700",
  Offer: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
};

function formatDate(date: Date | null) {
  if (!date) return "No deadline";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function OpportunitiesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
          <p className="text-sm text-slate-500 mt-1">
            Opportunity Hub
          </p>
        </div>

        <div className="rounded-2xl bg-white border px-4 py-3 text-sm text-slate-600">
          {opportunities.length} opportunities
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className="rounded-3xl border bg-white p-10 text-center text-slate-500 shadow-sm">
          No opportunities yet. Sync Gmail from the dashboard.
        </div>
      ) : (
        (() => {
          const sections = statusOrder
            .map((status) => ({
              status,
              items: opportunities.filter(
                (o: (typeof opportunities)[number]) => o.status === status
              ),
            }))
            .filter((section) => section.items.length > 0)
            .sort((a, b) => b.items.length - a.items.length);

          return (
            <div className="space-y-6">
              {sections.map(({ status, items }) => (
                <section
                  key={status}
                  className="rounded-3xl border bg-white p-4 shadow-sm sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${columnColors[status]}`}
                      >
                        {status}
                      </span>

                      <span className="text-sm text-slate-500">
                        {items.length} {items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item: (typeof opportunities)[number]) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border p-4 transition hover:shadow-md"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold leading-snug text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {item.company}
                          </p>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-slate-500">Deadline</span>
                            <span className="text-right font-medium text-slate-800">
                              {formatDate(item.deadline)}
                            </span>
                          </div>

                          {item.sourceEmail && (
                            <div className="border-t pt-2">
                              <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-400">
                                Source
                              </p>
                              <p className="break-all text-xs text-slate-600">
                                {item.sourceEmail}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          );
        })()
      )}
    </div>
  );
}