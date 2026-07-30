const items = [
  {
    title: "Google OAuth Security",
    desc: "Connect securely through Google’s authentication system. We never ask for or store your password.",
    icon: "🛡️",
  },
  {
    title: "Read-Only Access",
    desc: "SAVIOUR only reads career-related emails. We never send, delete, or modify your emails.",
    icon: "🔒",
  },
  {
    title: "Your Data Protected",
    desc: "Your personal information is handled securely with privacy-first architecture.",
    icon: "✨",
  },
];

export default function Security() {
  return (
    <section id="security" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-emerald-800">
            🔒 Security
          </div>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Your privacy comes
            <span className="text-gradient"> first.</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR is designed with security at its foundation, giving you
            complete control over your data.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`card-3d reveal rounded-3xl p-8 ${index === 1 ? "reveal-delay-1" : index === 2 ? "reveal-delay-2" : ""}`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}