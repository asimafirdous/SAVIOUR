'use client';

import { useState } from "react";

const faqs = [
  {
    question: "Is my Gmail password stored?",
    answer:
      "No. SAVIOUR never stores your Gmail password. Authentication happens securely through Google OAuth, so your credentials remain with Google.",
  },
  {
    question: "Can SAVIOUR read all my emails?",
    answer:
      "SAVIOUR is designed to identify career-related emails such as internships, interviews, deadlines, scholarships, and opportunities. We use the minimum permissions required.",
  },
  {
    question: "Who is SAVIOUR built for?",
    answer:
      "SAVIOUR is built for students, graduates, and early-career professionals who want to organize opportunities and never miss important deadlines.",
  },
  {
    question: "Can I disconnect my Gmail account?",
    answer:
      "Yes. You always have full control and can remove SAVIOUR's access from your Google Account at any time.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40" />
      <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        <div className="text-center">

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Frequently asked questions.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Everything you need to know about SAVIOUR, your privacy, and how
            the product works.
          </p>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div
                key={faq.question}
                className="glass overflow-hidden rounded-3xl border border-white/40 shadow-lg shadow-emerald-100/30 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-emerald-700 transition-transform duration-300 ${open ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-emerald-100/70 px-6 pb-6 pt-4">
                      <p className="leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}