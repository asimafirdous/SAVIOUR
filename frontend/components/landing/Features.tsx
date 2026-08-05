import Image from "next/image";

const features = [
  {
    image: "/images/inbox.png",
    title: "Smart Inbox",
    desc: "Automatically finds internships, placements, scholarships, interviews, and hackathons from your Gmail.",
  },
  {
    image: "/images/deadlines.png",
    title: "Deadline Tracker",
    desc: "Keep every important application deadline, assessment, and event organized in one timeline.",
  },
  {
    image: "/images/career.png",
    title: "Career Assistant",
    desc: "Get AI-powered summaries, recommendations, and quick answers from your career-related emails.",
  },
  {
    image: "/images/reminders.png",
    title: "Smart Reminders",
    desc: "Receive timely reminders before deadlines so you never miss an opportunity.",
  },
  {
    image: "/images/opportunity.png",
    title: "Opportunity Hub",
    desc: "View internships, interviews, applications, and opportunities from one unified dashboard.",
  },
  {
    image: "/images/privacy.png",
    title: "Privacy First",
    desc: "Secure Google OAuth, read-only Gmail access, and complete control over your connected account.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-emerald-50/70" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Everything you need to stay
            <span className="text-gradient"> one step ahead.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR keeps your opportunities organized, your deadlines visible,
            and your next step always clear.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-3d reveal rounded-3xl p-8 ${
                index % 3 === 1
                  ? "reveal-delay-1"
                  : index % 3 === 2
                  ? "reveal-delay-2"
                  : ""
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-200">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.desc}
              </p>

              <button className="mt-6 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800">
                Learn more →
              </button>

              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{
                    width:
                      index % 3 === 0
                        ? "76%"
                        : index % 3 === 1
                        ? "88%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}