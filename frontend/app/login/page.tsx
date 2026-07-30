'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F0FDF4] flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-emerald-100">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg">
            🛡️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Welcome to SAVIOUR
          </h1>

          <p className="mt-2 text-slate-600">
            Sign in with Google to connect your Gmail and start tracking opportunities.
          </p>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17 3.3 14.8 2.4 12 2.4 6.9 2.4 2.8 6.5 2.8 11.6S6.9 20.8 12 20.8c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.9-.1-1.3z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-slate-500">
          We only request the permissions needed to organize your opportunities and deadlines.
        </p>
      </div>
    </main>
  );
}