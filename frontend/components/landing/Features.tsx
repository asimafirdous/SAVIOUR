const features = [
  {
    title: "Smart Inbox",
    desc: "Automatically finds internships, placements, scholarships, interviews, and hackathons from your Gmail.",
    icon: "📬",
  },
  {
    title: "Deadline Tracker",
    desc: "Keep every important application deadline, assessment, and event organized in one timeline.",
    icon: "⏰",
  },
  {
    title: "Career Assistant",
    desc: "Get AI-powered summaries, recommendations, and quick answers from your career-related emails.",
    icon: "✨",
  },
  {
    title: "Smart Reminders",
    desc: "Receive timely reminders before deadlines so you never miss an opportunity.",
    icon: "🔔",
  },
  {
    title: "Opportunity Hub",
    desc: "View internships, interviews, applications, and opportunities from one unified dashboard.",
    icon: "📊",
  },
  {
    title: "Privacy First",
    desc: "Secure Google OAuth, read-only Gmail access, and complete control over your connected account.",
    icon: "🔒",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-emerald-800">
            ⚡ Product Features
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Everything you need to stay
            <span className="text-gradient"> one step ahead.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR keeps your opportunities organized, your deadlines visible,
            and your next step always clear—so you can focus on achieving your
            goals.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-3d reveal rounded-3xl p-7 ${index % 3 === 1 ? "reveal-delay-1" : index % 3 === 2 ? "reveal-delay-2" : ""}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {feature.desc}
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                Learn more
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}