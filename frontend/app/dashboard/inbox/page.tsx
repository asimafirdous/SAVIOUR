import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Inbox, Sparkles } from "lucide-react";

export default async function InboxPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/login");

  const emails = await prisma.email.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Inbox className="text-emerald-600" />
        <div>
          <h1 className="text-2xl font-bold">Smart Inbox</h1>
          <p className="text-sm text-gray-500">
            AI-filtered career emails from Gmail
          </p>
        </div>
      </div>

      {emails.length === 0 ? (
        <div className="rounded-3xl bg-white border p-10 text-center text-gray-500">
          No important emails yet.
        </div>
      ) : (
        <div className="space-y-4">
          {emails.map((item: (typeof emails)[number]) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">{item.subject}</p>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {item.sender}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${item.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : item.priority === "Low"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {item.priority || "Medium"}
                </span>
              </div>

              {item.summary && (
                <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                  {item.summary}
                </p>
              )}

              {item.actionRequired && (
                <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-emerald-600" />
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                      AI Action
                    </p>
                  </div>

                  <p className="text-sm text-emerald-900">
                    {item.actionRequired}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}