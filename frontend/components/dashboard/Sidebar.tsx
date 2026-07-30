import { Home, Mail, Calendar, Bell, Settings } from "lucide-react";

const items = [
  { label: "Overview", icon: Home },
  { label: "Opportunities", icon: Mail },
  { label: "Deadlines", icon: Calendar },
  { label: "Reminders", icon: Bell },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-gray-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center px-6">
        <div className="h-9 w-9 rounded-xl bg-emerald-500" />
        <span className="ml-3 text-lg font-semibold text-gray-900">SAVIOUR</span>
      </div>

      <nav className="space-y-1 px-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}