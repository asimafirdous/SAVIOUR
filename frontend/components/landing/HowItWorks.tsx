import {
  Mail,
  Brain,
  Rocket,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    icon: Mail,
    title: "Connect Gmail",
    description:
      "Securely connect your Gmail account using Google OAuth. We only use read-only access.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Understands",
    description:
      "SAVIOUR analyzes your career emails and identifies internships, deadlines, interviews, and opportunities.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Stay Ahead",
    description:
      "Get reminders, summaries, and a clear view of what needs your attention next.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          title="From your inbox to your opportunities."
          description="SAVIOUR turns scattered emails into organized actions, helping you focus on what matters."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-3xl bg-white p-8 shadow-sm border border-slate-200"
              >

                <span className="text-sm font-semibold text-indigo-600">
                  {step.number}
                </span>

                <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                  <Icon
                    size={28}
                    className="text-indigo-600"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {step.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}