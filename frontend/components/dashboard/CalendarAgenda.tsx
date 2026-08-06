import { CalendarDays, Clock } from "lucide-react";

const days = [
  "S", "M", "T", "W", "T", "F", "S"
];

export default function CalendarAgenda({ items = [] }: any) {
  const today = new Date();
  const month = today.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const currentDay = today.getDate();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Calendar */}
      <div className="rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-emerald-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Calendar</h3>
              <p className="text-sm text-slate-500">{month}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
          {days.map((d, index) => (
            <div key={`${d}-${index}`} className="py-2">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const active = day === currentDay;
            const hasEvent = [3, 7, 12, 18, 24].includes(day);

            return (
              <div
                key={day}
                className={`relative flex aspect-square items-center justify-center rounded-2xl text-sm font-medium transition ${active
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {day}

                {hasEvent && !active && (
                  <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda */}
      <div className="rounded-3xl bg-white border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Clock className="text-emerald-600" size={24} />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Upcoming Agenda</h3>
              <p className="text-sm text-slate-500">What needs your attention next</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-center text-slate-500">
              No upcoming events
            </div>
          ) : (
            items.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 transition hover:shadow-md ${index === 0 ? "border-emerald-200 bg-emerald-50/40" : ""
                  }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 truncate">
                      {item.title}
                    </p>

                    {item.subtitle && (
                      <p className="text-sm text-slate-600 mt-1 truncate">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm border">
                    {item.date}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}