import {
  Bell,
  Brain,
  CalendarClock,
  LayoutDashboard,
  Mail,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Smart Inbox",
    description:
      "Automatically finds internships, placements, scholarships, interviews, and hackathons from your Gmail.",
  },
  {
    icon: CalendarClock,
    title: "Deadline Tracker",
    description:
      "Keep every important application deadline, assessment, and event organized in one timeline.",
  },
  {
    icon: Brain,
    title: "Career Assistant",
    description:
      "Get AI-powered summaries, recommendations, and quick answers from your career-related emails.",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Receive timely reminders before deadlines so you never miss an opportunity.",
  },
  {
    icon: LayoutDashboard,
    title: "Opportunity Hub",
    description:
      "View internships, interviews, applications, and opportunities from one unified dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "Secure Google OAuth, read-only Gmail access, and complete control over your connected account.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Everything you need to stay one step ahead.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR keeps your opportunities organized, your deadlines visible,
            and your next step always clear—so you can focus on achieving your
            goals.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-300 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 transition-colors duration-300 group-hover:bg-indigo-600">
                  <Icon
                    size={28}
                    className="text-indigo-600 transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
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