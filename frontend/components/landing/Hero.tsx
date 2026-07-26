import { ArrowRight, Calendar, Briefcase } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-16 lg:flex-row">
      {/* Left Side */}
      <div className="max-w-2xl">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
          Your AI Career Guardian
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
          Never let the
          <span className="text-indigo-600"> door close </span>
          on you.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          SAVIOUR transforms your Gmail into an AI-powered career assistant.
          Track internships, interviews, hackathons, and deadlines—all in one
          place.
        </p>

        <button className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Continue with Google
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Upcoming Opportunities
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              <div>
                <p className="font-semibold">Google Internship</p>
                <p className="text-sm text-slate-500">Deadline Tomorrow</p>
              </div>
            </div>
            <Calendar className="text-slate-400" />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              <div>
                <p className="font-semibold">Adobe OA</p>
                <p className="text-sm text-slate-500">2 Days Left</p>
              </div>
            </div>
            <Calendar className="text-slate-400" />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="text-indigo-600" />
              <div>
                <p className="font-semibold">Hackathon</p>
                <p className="text-sm text-slate-500">5 Days Left</p>
              </div>
            </div>
            <Calendar className="text-slate-400" />
          </div>
        </div>
      </div>
    </section>
  );
}