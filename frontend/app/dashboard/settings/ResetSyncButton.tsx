"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ResetSyncButton() {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const confirmed = window.confirm(
      "This will remove all synced opportunities, reminders, and inbox summaries from SAVIOUR. Your Gmail account will remain connected. Continue?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch("/api/reset-sync", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reset failed");
      }

      alert("SAVIOUR data has been reset successfully.");

      window.location.href = "/dashboard";
    } catch (error: any) {
      alert(error.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      <Trash2 size={16} />
      {loading ? "Resetting..." : "Reset"}
    </button>
  );
}