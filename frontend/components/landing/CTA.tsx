import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50" />
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-10 -z-10 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="mx-auto max-w-5xl">
        <div className="glass relative overflow-hidden rounded-[32px] border border-white/40 px-8 py-14 text-center shadow-2xl shadow-emerald-100/40 sm:px-12">
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 to-white/40" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg shadow-emerald-500/25">
              🛡️
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Never let the door close on you.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Stay organized, discover opportunities, and let SAVIOUR help you
              take the right step at the right time.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                Get Started with SAVIOUR
                <span>→</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
              <div className="glass rounded-full px-4 py-2">🔒 Privacy First</div>
              <div className="glass rounded-full px-4 py-2">✨ AI Powered</div>
              <div className="glass rounded-full px-4 py-2">🎯 Student Focused</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}