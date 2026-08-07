import { CalendarDays, Clock, Briefcase, Trophy, GraduationCap, Video } from "lucide-react";
import { ExternalLink } from "lucide-react";

type TimelineItem = {
  id: string;
  title: string;
  type: "internship" | "oa" | "interview" | "hackathon" | "scholarship" | "other";
  date: string;
  subtitle?: string | null;
  source?: "linkedin" | "gmail" | "hackathon" | "company" | "career";
};

function getIcon(type: TimelineItem["type"]) {
  switch (type) {
    case "internship":
      return <Briefcase className="h-5 w-5" />;
    case "oa":
      return <Clock className="h-5 w-5" />;
    case "interview":
      return <Video className="h-5 w-5" />;
    case "hackathon":
      return <Trophy className="h-5 w-5" />;
    case "scholarship":
      return <GraduationCap className="h-5 w-5" />;
    default:
      return <CalendarDays className="h-5 w-5" />;
  }
}

function getColor(type: TimelineItem["type"]) {
  switch (type) {
    case "internship":
      return "from-emerald-500 to-teal-500";
    case "oa":
      return "from-orange-500 to-amber-500";
    case "interview":
      return "from-blue-500 to-cyan-500";
    case "hackathon":
      return "from-violet-500 to-fuchsia-500";
    case "scholarship":
      return "from-pink-500 to-rose-500";
    default:
      return "from-slate-500 to-slate-600";
  }
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="rounded-3xl bg-white border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Upcoming Timeline</h2>
          <p className="mt-1 text-sm text-slate-600">
            Deadlines, interviews, and assessments in chronological order
          </p>
        </div>

        <div className="hidden rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 sm:block">
          {items.length} items
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex gap-4">
            {/* line */}
            {index !== items.length - 1 && (
              <div className="absolute left-5 top-12 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-emerald-200 to-transparent" />
            )}

            {/* icon */}
            <div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${getColor(
                item.type
              )} text-white shadow-lg`}
            >
              {getIcon(item.type)}
            </div>

            {/* content */}
            <div className="card-3d flex-1 rounded-3xl p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
                    {item.source === "linkedin"
                      ? "LinkedIn"
                      : item.source === "gmail"
                        ? "Gmail"
                        : item.source === "hackathon"
                          ? "Hackathon"
                          : item.source === "company"
                            ? "Company"
                            : "Career"}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  {item.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}