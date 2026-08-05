import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/80">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-teal-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-emerald-400/30 blur-xl" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-white ring-1 ring-emerald-100 shadow-xl shadow-emerald-200/40 transition-transform duration-300 hover:-translate-y-1">
                  <Image
                    src="/images/logo.png"
                    alt="SAVIOUR Logo"
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <p className="text-lg font-black tracking-[0.18em] text-slate-900">
                  SAVIOUR
                </p>

                <p className="text-sm font-medium text-emerald-600">
                  Never let the door close on you.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-600">
              SAVIOUR helps students and graduates stay ahead of internships,
              placements, hackathons, scholarships, and interviews with an
              intelligent opportunity dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-emerald-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                Privacy First
              </div>

              <div className="rounded-xl border border-emerald-200 bg-white/80 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
                Student Success
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>
                <a href="#features" className="transition hover:text-emerald-700">
                  Features
                </a>
              </li>

              <li>
                <a href="#security" className="transition hover:text-emerald-700">
                  Security
                </a>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-emerald-700"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Legal
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="transition hover:text-emerald-700">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 SAVIOUR. All rights reserved.</p>

          <p className="text-center md:text-right">
            Built with privacy, security, and student success in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}