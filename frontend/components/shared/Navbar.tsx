import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          SAVIOUR
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            href="#features"
            className="text-slate-600 transition hover:text-indigo-600"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-slate-600 transition hover:text-indigo-600"
          >
            How It Works
          </Link>

          <Link
            href="#security"
            className="text-slate-600 transition hover:text-indigo-600"
          >
            Security
          </Link>

          <Link
            href="#ai"
            className="text-slate-600 transition hover:text-indigo-600"
          >
            AI Assistant
          </Link>

          <Link
            href="#faq"
            className="text-slate-600 transition hover:text-indigo-600"
          >
            FAQ
          </Link>

        </div>

        {/* Login Button */}
        <button className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700">
          Login
        </button>

      </div>
    </nav>
  );
}