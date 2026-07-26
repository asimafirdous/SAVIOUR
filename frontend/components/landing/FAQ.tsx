import SectionHeading from "@/components/ui/SectionHeading";

const questions = [
  {
    question: "Is my Gmail password stored?",
    answer:
      "No. SAVIOUR never stores your Gmail password. Authentication happens securely through Google OAuth.",
  },
  {
    question: "Can SAVIOUR read all my emails?",
    answer:
      "No. SAVIOUR is designed to identify career-related emails such as internships, interviews, deadlines, and opportunities.",
  },
  {
    question: "Who is SAVIOUR built for?",
    answer:
      "SAVIOUR is built for students and graduates who want to organize opportunities and never miss important deadlines.",
  },
  {
    question: "Can I disconnect my Gmail account?",
    answer:
      "Yes. You always have control and can remove access whenever you want.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">

        <SectionHeading
          title="Frequently asked questions."
          description="Everything you need to know about SAVIOUR and your privacy."
        />

        <div className="mt-12 space-y-6">
          {questions.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {item.question}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}