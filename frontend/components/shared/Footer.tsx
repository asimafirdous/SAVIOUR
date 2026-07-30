import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-emerald-100 bg-gradient-to-b from-white to-emerald-50/70">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-teal-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg text-white shadow-lg">
                🛡️
              </div>

              <div>
                <p className="font-semibold tracking-[0.18em] text-emerald-700">
                  SAVIOUR
                </p>
                <p className="text-sm text-slate-500">
                  Never let the door close on you.
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md leading-7 text-slate-600">
              SAVIOUR helps students and graduates stay ahead of internships,
              placements, hackathons, scholarships, and interviews with an
              AI-powered opportunity dashboard.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="glass rounded-xl px-4 py-3 text-sm text-slate-700">
                🔒 Privacy First
              </div>

              <div className="glass rounded-xl px-4 py-3 text-sm text-slate-700">
                ✨ AI Powered
              </div>
            </div>
          </div>

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
                <a href="#how-it-works" className="transition hover:text-emerald-700">
                  How it works
                </a>
              </li>

              <li>
                <a href="#security" className="transition hover:text-emerald-700">
                  Security
                </a>
              </li>

              <li>
                <Link href="/dashboard" className="transition hover:text-emerald-700">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>
                <a href="#faq" className="transition hover:text-emerald-700">
                  FAQ
                </a>
              </li>

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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 SAVIOUR. All rights reserved.</p>
          <p>Built with privacy, security, and student success in mind.</p>
        </div>
      </div>
    </footer>
  );
}