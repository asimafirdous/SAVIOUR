import Link from "next/link";
import Image from "next/image";

const badges = [
  "Privacy First",
  "AI Powered",
  "Student Focused",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/70" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="card-3d reveal rounded-[2rem] p-10 md:p-14 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white ring-1 ring-emerald-100 shadow-2xl shadow-emerald-200/40">
            <Image
              src="/images/logo.png"
              alt="SAVIOUR Logo"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Never let the
            <span className="text-gradient"> door close on you.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Stay organized, discover opportunities, and let SAVIOUR help you
            take the right step at the right time.
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-300/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-300/40"
            >
              Get Started with SAVIOUR
              <span className="text-lg">→</span>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge}
                className={`rounded-2xl border border-emerald-200 bg-white/80 px-5 py-3 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-200/40 ${index === 1 ? "ring-2 ring-emerald-100" : ""
                  }`}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}