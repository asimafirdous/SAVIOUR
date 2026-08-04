import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const columns = [
  "Applied",
  "OA Pending",
  "Interview",
  "Offer",
  "Rejected",
];

const columnColors: Record<string, string> = {
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
    <div className="px-4 py-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Pipeline</p>
          <h1 className="text-2xl font-bold">Opportunity Hub</h1>
        </div>

        <div className="rounded-2xl bg-white border px-4 py-3 text-sm text-gray-600">
          {opportunities.length} opportunities
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className="rounded-3xl bg-white border p-10 text-center text-gray-500">
          No opportunities yet. Sync Gmail from the dashboard.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {columns.map((status) => {
            const items = opportunities.filter((o) => o.status === status);

            return (
              <section
                key={status}
                className="rounded-3xl bg-white border p-4 shadow-sm flex flex-col min-h-[420px]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${columnColors[status]}`}
                  >
                    {status}
                  </span>

                  <span className="text-sm text-gray-500">{items.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-4 text-center text-sm text-gray-400">
                      Empty
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-2xl border p-4 hover:shadow-md transition bg-white"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 leading-snug">
                              {item.title}
                            </p>

                            <p className="text-sm text-gray-500 mt-1 truncate">
                              {item.company}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-gray-500">Deadline</span>
                            <span className="font-medium text-gray-800 text-right">
                              {formatDate(item.deadline)}
                            </span>
                          </div>

                          {item.sourceEmail && (
                            <div className="pt-2 border-t">
                              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Source
                              </p>
                              <p className="text-xs text-gray-600 break-all">
                                {item.sourceEmail}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}