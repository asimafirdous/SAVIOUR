import Image from "next/image";

const studentFeatures = [
  {
    image: "/images/career.png",
    title: "Internships",
    desc: "Track internship applications, assessments, and deadlines in one place.",
  },
  {
    image: "/images/opportunity.png",
    title: "Placements",
    desc: "Never miss campus drives, coding rounds, or interview schedules.",
  },
  {
    image: "/images/calendar.png",
    title: "Hackathons",
    desc: "Keep registration dates, team updates, and submission timelines visible.",
  },
  {
    image: "/images/deadlines.png",
    title: "Scholarships",
    desc: "Organize scholarship opportunities and required documents effortlessly.",
  },
  {
    image: "/images/gmeet.png",
    title: "Interviews",
    desc: "Get reminders for interviews, meetings, and follow-up actions.",
  },
  {
    image: "/images/gmail.png",
    title: "Career Emails",
    desc: "Bring important career communication together from your inbox.",
  },
];

export default function BuiltForStudents() {
  return (
    <section
      id="built-for-students"
      className="relative overflow-hidden py-24 scroll-mt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-emerald-50/70" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Built for every
            <span className="text-gradient"> student journey.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            From your first internship application to your final placement,
            SAVIOUR keeps every opportunity organized.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {studentFeatures.map((item, index) => (
            <div
              key={item.title}
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
                  src={item.image}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {item.desc}
              </p>

              <button className="mt-6 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800">
                Track now →
              </button>

              <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{
                    width:
                      index % 3 === 0
                        ? "72%"
                        : index % 3 === 1
                        ? "84%"
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