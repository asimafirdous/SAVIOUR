"use client";

import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F6FAF8] p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl text-white">
            🛡️
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to SAVIOUR
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in with Google to continue
          </p>
        </div>

        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
          className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.2 0 6.1 1.1 8.3 3.2l6.2-6.2C34.7 2.7 29.7 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.3 5.7C11.7 13.2 17.3 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.7-2 5-4.2 6.6l6.6 5.1c3.8-3.5 6.4-8.7 6.4-15.7z"
            />
            <path
              fill="#FBBC05"
              d="M9.9 28.9c-.5-1.5-.8-3.1-.8-4.9s.3-3.4.8-4.9l-7.3-5.7C.9 16.7 0 20.2 0 24s.9 7.3 2.6 10.6l7.3-5.7z"
            />
            <path
              fill="#34A853"
              d="M24 48c5.7 0 10.5-1.9 14-5.2l-6.6-5.1c-1.8 1.2-4.2 1.9-7.4 1.9-6.7 0-12.3-3.7-14.1-9.2l-7.3 5.7C6.5 42.6 14.6 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>
      </div>
    </main>
  );
}