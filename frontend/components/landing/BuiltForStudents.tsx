import {
  Briefcase,
  Building2,
  Trophy,
  GraduationCap,
  Mic,
  BadgeCheck,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

const items = [
  {
    icon: Briefcase,
    title: "Internships",
  },
  {
    icon: Building2,
    title: "Placements",
  },
  {
    icon: Trophy,
    title: "Hackathons",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
  },
  {
    icon: Mic,
    title: "Interviews",
  },
  {
    icon: BadgeCheck,
    title: "Certifications",
  },
];

export default function BuiltForStudents() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
        title="Built for students chasing opportunities."
        description="SAVIOUR keeps your career opportunities organized, so you can focus on preparing instead of searching."/>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Icon
                  size={36}
                  className="mx-auto text-indigo-600"
                />

                <h3 className="mt-4 font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}