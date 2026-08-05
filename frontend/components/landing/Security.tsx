import Image from "next/image";

const securityFeatures = [
  {
    image: "/images/privacy.png",
    title: "Google OAuth Security",
    desc: "Connect securely through Google’s authentication system. We never ask for or store your password.",
  },
  {
    image: "/images/gmail.png",
    title: "Read-Only Access",
    desc: "SAVIOUR only reads career-related emails. We never send, delete, or modify your emails.",
  },
  {
    image: "/images/settings.png",
    title: "Your Data Protected",
    desc: "Your personal information is handled securely with privacy-first architecture.",
  },
];

export default function Security() {
  return (
    <section
      id="security"
      className="relative overflow-hidden py-24 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/70 to-white" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Your privacy comes
            <span className="text-gradient"> first.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            SAVIOUR is designed with security at its foundation, giving you
            complete control over your data.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {securityFeatures.map((item, index) => (
            <div
              key={item.title}
              className={`card-3d reveal rounded-3xl p-8 ${
                index === 1
                  ? "reveal-delay-1"
                  : index === 2
                  ? "reveal-delay-2"
                  : ""
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-1 ring-emerald-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={38}
                  height={38}
                  className="object-contain"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {item.desc}
              </p>

              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{
                    width:
                      index === 0 ? "88%" : index === 1 ? "100%" : "92%",
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