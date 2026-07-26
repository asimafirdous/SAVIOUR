import {
  ShieldCheck,
  Eye,
  LockKeyhole,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "Google OAuth Security",
    description:
      "Connect securely through Google's authentication system. We never ask for or store your password.",
  },
  {
    icon: Eye,
    title: "Read-Only Access",
    description:
      "SAVIOUR only reads career-related emails. We never send, delete, or modify your emails.",
  },
  {
    icon: LockKeyhole,
    title: "Your Data Protected",
    description:
      "Your personal information is handled securely with privacy-first architecture.",
  },
];

export default function Security() {
  return (
    <section id="security" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          title="Your privacy comes first."
          description="SAVIOUR is designed with security at its foundation, giving you complete control over your data."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                  <Icon
                    size={28}
                    className="text-indigo-600"
                  />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}