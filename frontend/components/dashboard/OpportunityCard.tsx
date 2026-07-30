type Props = {
  company: string;
  role: string;
  status: "Applied" | "OA Pending" | "Interview";
  deadline: string;
};

export default function OpportunityCard({
  company,
  role,
  status,
  deadline,
}: Props) {
  const statusColor = {
    Applied: "bg-slate-100 text-slate-700",
    "OA Pending": "bg-amber-100 text-amber-700",
    Interview: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{company}</p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">{role}</h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <span>Deadline</span>
        <span className="font-medium text-gray-900">{deadline}</span>
      </div>
    </div>
  );
}