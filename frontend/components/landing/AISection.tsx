import Image from "next/image";

export default function AISection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/40" />
      <div className="absolute left-10 top-10 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 -z-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center">

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Meet your AI career assistant.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            SAVIOUR understands your opportunities, summarizes important emails,
            and helps you decide what needs attention next.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="glass w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/40 shadow-2xl shadow-emerald-100/40">
            <div className="border-b border-emerald-100 bg-white/60 px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-emerald-400/25 blur-md" />

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white ring-1 ring-emerald-100 shadow-md">
                    <Image
                      src="/images/logo.png"
                      alt="SAVIOUR AI"
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">SAVIOUR AI</p>
                  <p className="text-sm text-slate-600">
                    Your personal career assistant
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 bg-gradient-to-b from-white/80 to-white/60 p-6 backdrop-blur-md">
              <div className="rounded-3xl border border-emerald-100 bg-white/80 p-5 shadow-sm">
                <p className="font-semibold text-slate-900">Hey Asima 👋</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  I found 3 important opportunities from your inbox that need
                  your attention.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-white/80 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Google Software Engineering Internship
                    </p>

                    <p className="mt-1 text-sm text-emerald-700">
                      ⏰ Deadline: Tomorrow, 11:59 PM
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    High Priority
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <p className="text-sm font-medium text-emerald-800">
                    🎯 AI Recommendation
                  </p>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    Apply today. Your skills match this opportunity and the
                    deadline is very close.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3">
                  <span className="text-slate-400">⌨️</span>
                  <p className="text-sm text-slate-500">
                    Ask SAVIOUR anything about your opportunities...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}