const steps = [
  {
    number: "01",
    title: "Connect Gmail",
    desc: "Securely connect your Gmail account using Google OAuth. We only use read-only access.",
  },
  {
    number: "02",
    title: "AI Understands",
    desc: "SAVIOUR analyzes your career emails and identifies internships, deadlines, interviews, and opportunities.",
  },
  {
    number: "03",
    title: "Stay Ahead",
    desc: "Get reminders, summaries, and a clear view of what needs your attention next.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/70 to-white" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            From your inbox to your
            <span className="text-gradient"> opportunities.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR turns scattered emails into organized actions, helping you
            focus on what matters.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`card-3d reveal relative rounded-3xl p-8 ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
            >
              <div className="absolute right-6 top-6 text-5xl font-black text-emerald-100">
                {step.number}
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-xl font-bold text-white shadow-lg">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {step.desc}
              </p>

              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: index === 0 ? "70%" : index === 1 ? "85%" : "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}