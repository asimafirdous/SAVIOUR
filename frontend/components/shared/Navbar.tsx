'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg transition-all duration-300 sm:px-6 ${scrolled
          ? "border-white/20 bg-white/75 backdrop-blur-2xl shadow-emerald-100/60"
          : "border-white/40 bg-white/60 backdrop-blur-xl shadow-black/5"
          }`}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-emerald-400/30 blur-lg opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white ring-1 ring-emerald-100 shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-emerald-200/50">
              <Image
                src="/images/logo.png"
                alt="SAVIOUR Logo"
                width={34}
                height={34}
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="leading-tight">
            <p className="text-lg font-black tracking-[0.18em] text-slate-900">
              SAVIOUR
            </p>

            <p className="text-xs font-medium text-emerald-600">
              Career Intelligence
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            How it works
          </a>

          <a
            href="#built-for-students"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            Built For Students
          </a>

          <a
            href="#security"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            Security
          </a>

          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 transition hover:text-emerald-700"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-xl border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-white sm:inline-flex"
          >
            Sign in
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 sm:px-5"
          >
            Get Started
            <span>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}