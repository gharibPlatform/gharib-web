import { Clock, Users, BookOpen, Edit3 } from "lucide-react";
import indexToStringSurah from "../../../../../indexToStringSurah.json";
import { useCalculateTimeLeft } from "../../../../hooks/logic/calculateTimeLeft";

export default function CurrentKhatma({
  name,
  group,
  finishDate,
  currentSurah,
  currentVerse,
  selfProgress,
  groupProgress,
  isDirty,
  handleUpdateProgress,
}) {
  
  const timeLeft = useCalculateTimeLeft(finishDate);

  return (
    <div
      className="sticky top-3 mx-auto z-50
                    bg-[var(--secondary-color)] text-white px-5 py-3.5 rounded-xl shadow-lg 
                    flex items-center justify-between gap-4 w-fit max-w-3xl
                    border border-white/10"
    >
      <div className="flex flex-col whitespace-nowrap min-w-[150px]">
        <div className="flex items-center gap-2 mb-1">
          <Clock className="h-4.5 w-4.5 text-[var(--o-color)]" />
          <p className="font-semibold text-base">{name}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 opacity-70" />
          <p className="text-sm opacity-80">Group: {group}</p>
        </div>
      </div>

      <div className="flex flex-col items-center min-w-[180px]">
        <div className="flex justify-between w-full mb-1 gap-2">
          <p className="text-xs font-medium opacity-90 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--o-color)] mr-1.5"></span>
            Group Progress
          </p>
          <p className="text-xs font-medium opacity-90 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--b-color)] mr-1.5"></span>
            Your Progress
          </p>
        </div>

        <div className="w-full h-2.5 bg-white/20 rounded-full mt-1 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-2.5 bg-[var(--o-color)] rounded-full transition-all duration-500 z-20"
            style={{ width: `${groupProgress}%` }}
          />
          <div
            className="absolute top-0 left-0 h-2.5 bg-[var(--b-color)] rounded-full transition-all duration-700"
            style={{ width: `${selfProgress}%` }}
          />
        </div>

        <div className="flex justify-between w-full mt-1.5">
          <p className="text-sm font-semibold text-[var(--o-color)]">
            {groupProgress}%
          </p>
          <p className="text-sm font-semibold text-[var(--b-color)]">
            {selfProgress}%
          </p>
        </div>
      </div>

      <div className="flex flex-col text-right whitespace-nowrap min-w-[160px]">
        <div className="flex items-center justify-end gap-2 mb-1">
          <BookOpen className="h-4.5 w-4.5" />
          <p className="font-semibold text-base">
            {indexToStringSurah[currentSurah].name} {currentVerse}
          </p>
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <Clock className="h-4 w-4 opacity-70" />
          <p className="text-sm opacity-80">{timeLeft}</p>
        </div>
      </div>

      <button
        disabled={isDirty}
        onClick={handleUpdateProgress}
        className={`bg-[var(--o-color)] text-white px-4 py-2 rounded-md font-semibold 
                         hover:bg-[var(--o-color-hover)] transition-all duration-200 flex items-center gap-2
                         shadow-md hover:shadow-lg whitespace-nowrap text-sm
                         ${isDirty ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <Edit3 className="h-4 w-4" />
        Update Progress
      </button>
    </div>
  );
}
