import Link from "next/link";
import Image from "next/image";

const opportunities = [
  { title: "Google Internship", time: "Deadline Tomorrow" },
  { title: "Adobe OA", time: "2 Days Left" },
  { title: "Hackathon", time: "5 Days Left" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/80 via-white to-white" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left content */}
        <div className="reveal text-center lg:text-left">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-emerald-800 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Your AI Career Guardian
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
            Never let the
            <br className="hidden sm:block" />
            <span className="text-gradient">door close on you.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0 lg:text-xl">
            SAVIOUR transforms your Gmail into an AI-powered career assistant.
            Track internships, interviews, hackathons, and deadlines—all in one
            place.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/login"
              className="btn-primary w-full px-6 py-4 text-center text-base font-semibold sm:w-auto"
            >
              Continue with Google
            </Link>

            <a
              href="#features"
              className="btn-secondary w-full px-6 py-4 text-center text-base font-semibold sm:w-auto"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Right card */}
        <div className="reveal reveal-delay-1 relative">
          <div className="glow-emerald glass-strong relative overflow-hidden rounded-[1.75rem] p-4 shadow-2xl sm:rounded-[2rem] sm:p-6">
            <div className="flex items-center justify-between border-b border-white/50 pb-4 sm:pb-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-400/30 blur-lg" />

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white ring-1 ring-emerald-100 shadow-lg shadow-emerald-200/40 sm:h-11 sm:w-11">
                    <Image
                      src="/images/logo.png"
                      alt="SAVIOUR Logo"
                      width={24}
                      height={24}
                      className="object-contain sm:h-[26px] sm:w-[26px]"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">SAVIOUR</p>
                  <p className="truncate text-xs text-slate-500">AI Opportunity Hub</p>
                </div>
              </div>

              <div className="glass rounded-full px-3 py-1 text-xs text-emerald-700">
                Live
              </div>
            </div>

            <div className="mt-5 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 p-4 text-white shadow-lg sm:mt-6 sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/80">Upcoming Opportunities</p>
                  <p className="mt-2 text-3xl font-black sm:text-4xl">12</p>
                </div>

                <div className="rounded-2xl bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur">
                  +3 Today
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
              {opportunities.map((item, index) => (
                <div
                  key={item.title}
                  className={`card-3d reveal rounded-3xl p-4 sm:p-5 ${index === 0
                    ? "reveal-delay-1"
                    : index === 1
                      ? "reveal-delay-2"
                      : "reveal-delay-3"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">{item.time}</p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm">
                      ⏰
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/career.png"
                  alt="SAVIOUR AI"
                  width={18}
                  height={18}
                  className="object-contain"
                />

                <p className="font-semibold text-slate-900">SAVIOUR AI</p>
              </div>

              <p className="mt-1 text-sm text-slate-600">
                Apply to Google today. Your skills strongly match this role.
              </p>
            </div>
          </div>

          {/* Floating cards - desktop only */}
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