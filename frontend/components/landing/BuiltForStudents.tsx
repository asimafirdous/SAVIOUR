import Link from "next/link";

const items = [
  {
    title: "Internships",
    description:
      "Track internship applications, assessments, and deadlines in one place.",
    icon: "💼",
  },
  {
    title: "Placements",
    description:
      "Never miss campus drives, coding rounds, or interview schedules.",
    icon: "🏢",
  },
  {
    title: "Hackathons",
    description:
      "Keep registration dates, team updates, and submission timelines visible.",
    icon: "🏆",
  },
  {
    title: "Scholarships",
    description:
      "Organize scholarship opportunities and required documents effortlessly.",
    icon: "🎓",
  },
  {
    title: "Interviews",
    description:
      "Get reminders for interviews, meetings, and follow-up actions.",
    icon: "🎤",
  },
  {
    title: "Certifications",
    description:
      "Keep certification deadlines, exams, and learning milestones on track.",
    icon: "📜",
  },
];

export default function BuiltForStudents() {
  return (
    <section id="students" className="relative overflow-hidden px-6 py-24 scroll-mt-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40" />
      <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-700 backdrop-blur-md">
            🎯 Student Focused
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Built for students chasing opportunities.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            SAVIOUR keeps your career opportunities organized, so you can focus
            on preparing instead of searching.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="glass group relative overflow-hidden rounded-[28px] border border-white/40 p-6 shadow-lg shadow-emerald-100/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-100/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-700">
                  <span>Track now</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass mt-14 overflow-hidden rounded-[32px] border border-white/40 shadow-xl shadow-emerald-100/40">
          <div className="grid gap-8 p-8 sm:grid-cols-3 sm:p-10">
            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-slate-900">500+</p>
              <p className="mt-2 text-sm text-slate-600">
                Opportunities tracked
              </p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-slate-900">24/7</p>
              <p className="mt-2 text-sm text-slate-600">
                AI monitoring
              </p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="mt-2 text-sm text-slate-600">
                Privacy-first design
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
          >
            Start Tracking Opportunities
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}