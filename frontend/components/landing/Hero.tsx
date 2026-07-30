import Link from "next/link";

const opportunities = [
  { title: "Google Internship", time: "Deadline Tomorrow" },
  { title: "Adobe OA", time: "2 Days Left" },
  { title: "Hackathon", time: "5 Days Left" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="float absolute left-10 top-24 h-32 w-32 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="float-delay absolute right-10 top-40 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-50/80 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="reveal">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Your AI Career Guardian
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
            Never let the
            <br />
            <span className="text-gradient">door close on you.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            SAVIOUR transforms your Gmail into an AI-powered career assistant.
            Track internships, interviews, hackathons, and deadlines—all in one
            place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/login" className="btn-primary px-6 py-4 text-base font-semibold">
              Continue with Google
            </Link>

            <a
              href="#features"
              className="btn-secondary px-6 py-4 text-base font-semibold"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-emerald-600">🔒</span>
              Read-only Gmail access
            </div>
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2">
              <span className="text-emerald-600">✨</span>
              AI-powered summaries
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-1 relative">
          <div className="glow-emerald glass-strong relative overflow-hidden rounded-[2rem] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/50 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg text-white shadow-lg">
                  🛡️
                </div>
                <div>
                  <p className="font-semibold text-slate-900">SAVIOUR</p>
                  <p className="text-xs text-slate-500">AI Opportunity Hub</p>
                </div>
              </div>
              <div className="glass rounded-full px-3 py-1 text-xs text-emerald-700">
                Live
              </div>
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-5 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/80">Upcoming Opportunities</p>
                  <p className="mt-2 text-3xl font-black">12</p>
                </div>
                <div className="rounded-2xl bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur">
                  +3 Today
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {opportunities.map((item, index) => (
                <div
                  key={item.title}
                  className={`card-3d reveal rounded-3xl p-5 ${index === 0 ? "reveal-delay-1" : index === 1 ? "reveal-delay-2" : "reveal-delay-3"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.time}</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
                      ⏰
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/80 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  ✨
                </div>
                <div>
                  <p className="font-semibold text-slate-900">SAVIOUR AI</p>
                  <p className="text-sm text-slate-600">
                    Apply to Google today. Your skills strongly match this role.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="float glass absolute -right-4 top-10 hidden rounded-2xl p-4 shadow-xl lg:block">
            <p className="text-xs text-slate-500">Reminder</p>
            <p className="font-semibold text-slate-900">Adobe OA in 48h</p>
          </div>

          <div className="float-delay glass absolute -left-4 bottom-10 hidden rounded-2xl p-4 shadow-xl lg:block">
            <p className="text-xs text-slate-500">Detected</p>
            <p className="font-semibold text-slate-900">3 new opportunities</p>
          </div>
        </div>
      </div>
    </section>
  );
}