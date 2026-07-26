import {
  Bot,
  CalendarClock,
  Sparkles,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

export default function AISection() {
  return (
    <section id="ai" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          title="Meet your AI career assistant."
          description="SAVIOUR understands your opportunities, summarizes important emails, and helps you decide what needs attention."
        />


        {/* AI Preview */}
        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

          {/* Header */}
          <div className="flex items-center gap-4 border-b border-slate-200 pb-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
              <Bot
                className="text-indigo-600"
                size={26}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                SAVIOUR AI
              </h3>

              <p className="text-sm text-slate-500">
                Your personal career assistant
              </p>
            </div>

          </div>


          {/* AI Message */}
          <div className="mt-8 rounded-2xl bg-slate-50 p-6">

            <div className="flex gap-3">

              <Sparkles
                className="mt-1 text-indigo-600"
                size={22}
              />

              <p className="leading-7 text-slate-700">
                Hey Asima 👋
                <br />
                I found 3 important opportunities from your inbox that need
                your attention.
              </p>

            </div>

          </div>


          {/* Opportunity Card */}
          <div className="mt-6 rounded-2xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <CalendarClock
                className="text-indigo-600"
                size={24}
              />

              <h4 className="font-semibold text-slate-900">
                Google Software Engineering Internship
              </h4>

            </div>


            <div className="mt-4 space-y-2 text-slate-600">

              <p>
                ⏰ Deadline: Tomorrow, 11:59 PM
              </p>

              <p>
                🎯 AI Recommendation:
                Apply today. Your skills match this opportunity.
              </p>

            </div>

          </div>


          {/* Fake Input */}
          <div className="mt-6 rounded-xl border border-slate-200 px-5 py-4 text-slate-400">
            Ask SAVIOUR anything about your opportunities...
          </div>


        </div>

      </div>
    </section>
  );
}