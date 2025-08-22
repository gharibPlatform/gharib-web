import { Clock, Calendar } from "lucide-react";

export default function KhatmaCard({ khatma, onContinue }) {
  return (
    <div className="rounded-xl bg-[var(--dark-color)] p-4 border border-white/5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium mb-1">{khatma.title}</h4>
          <p className="text-sm text-white/70">{khatma.group}</p>
        </div>
        <button
          onClick={() => onContinue(khatma)}
          className="text-xs bg-[var(--b-color-hover)] hover:bg-[var(--b-color)] px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
        >
          Continue
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
        <Calendar size={14} />
        <span>
          {khatma.startDate} - {khatma.endDate}
        </span>
      </div>

      {/* Progress Section */}
      <div className="space-y-2 mb-3">
        {/* Personal Progress - Blue */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[var(--b-color)]">Your progress</span>
            <span className="text-[var(--b-color)]">
              {khatma.personalProgress}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-[var(--b-color)] h-2 rounded-full transition-all duration-500"
              style={{ width: `${khatma.personalProgress}%` }}
            ></div>
          </div>
        </div>

        {khatma.type === "group" && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--o-color)]">Group progress</span>
              <span className="text-[var(--o-color)]">
                {khatma.groupProgress}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-[var(--o-color)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${khatma.groupProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1 text-white/70">
          <Clock size={14} />
          <span>{khatma.timeLeft}</span>
        </div>
        <span className="text-white/70 capitalize">{khatma.type} khatma</span>
      </div>
    </div>
  );
}
