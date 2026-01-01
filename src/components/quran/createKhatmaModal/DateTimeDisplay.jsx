// components/CreateKhatmaModal/DateTimeDisplay.jsx
import { Calendar, Clock } from "lucide-react";

export default function DateTimeDisplay() {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gradient-to-r from-[var(--dark-color)] to-[var(--main-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-[var(--w-color)]">
          <Calendar size={14} className="text-[var(--w-color)]" />
          <span className="font-medium">Started:</span>
          <span>{formatDate(new Date())}</span>
        </div>
        <div className="flex items-center gap-2 text-[var(--w-color)]">
          <Clock size={14} className="text-[var(--w-color)]" />
          <span className="font-medium">At:</span>
          <span>{formatTime(new Date())}</span>
        </div>
      </div>
    </div>
  );
}
