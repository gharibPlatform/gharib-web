import { Clock, Calendar, BookOpen, Router } from "lucide-react";
import { useState, useEffect } from "react";
import indexToStringSurah from "../../../../../indexToStringSurah.json";
import { useRouter } from "next/navigation";
import useQuranHeaderVerse from "../../../../stores/verseQuranHeaderStore";
import useKhatmaStore from "../../../../stores/khatmasStore";

export default function KhatmaCard({ khatma }) {
  const [timeLeft, setTimeLeft] = useState("");
  const router = useRouter();

  const { setGoToVerse } = useQuranHeaderVerse();
  const { setCurrentKhatma } = useKhatmaStore();

  const handleKhatmaCardClick = (id) => {
    router.push(`/khatmas/${id}`);
  };

  const handleContinueClick = (e, khatma) => {
    e.stopPropagation();
    setGoToVerse(khatma.currentSurah + ":" + khatma.currentVerse);
    router.push(`/quran/khatmas/${khatma.khatma.id}`);
    setCurrentKhatma(khatma);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const finishDate = new Date(khatma.finishDate);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      finishDate.setHours(0, 0, 0, 0);

      const timeDiff = finishDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      if (daysLeft === 0) {
        return "Ends today";
      } else if (daysLeft === 1) {
        return "1 day left";
      } else if (daysLeft > 1) {
        return `${daysLeft} days left`;
      } else {
        return "Completed";
      }
    };

    setTimeLeft(calculateTimeLeft());
  }, [khatma.finishDate]);

  const getCurrentSurahVerse = () => {
    const currentSurah = indexToStringSurah[khatma.currentSurah].name;
    return `${currentSurah}: ${khatma.currentVerse}`;
  };

  return (
    <div className="rounded-xl bg-[var(--dark-color)] hover:bg-[var(--main-color)] p-4 border border-white/5 cursor-pointer">
      <div
        onClick={() => handleKhatmaCardClick(khatma.khatma.id)}
        className="cursor-pointer"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-medium mb-1">{khatma.khatma.name}</h4>
            <p className="text-sm text-white/70">
              {khatma?.khatma?.group_date?.name}
            </p>
          </div>

          <button
            onClick={(e) => handleContinueClick(e, khatma)}
            className="text-xs bg-[var(--b-color-hover)] hover:bg-[var(--b-color)] px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
          >
            Continue
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-[var(--b-color)] mb-3 bg-white/5 p-2 rounded-lg">
          <BookOpen size={14} />
          <span className="font-medium">Currently at:</span>
          <span>{getCurrentSurahVerse()}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
          <Calendar size={14} />
          <span>
            {formatDate(khatma.created_at)} - {formatDate(khatma.finishDate)}
          </span>
        </div>

        <div className="space-y-2 mb-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--b-color)]">Your progress</span>
              <span className="text-[var(--b-color)]">{khatma.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-[var(--b-color)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${khatma.progress}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--o-color)]">Group progress</span>
              <span className="text-[var(--o-color)]">
                {khatma.khatma.progress}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-[var(--o-color)] h-2 rounded-full transition-all duration-500"
                style={{ width: `${khatma.khatma.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1 text-white/70">
            <Clock size={14} />
            <span>{timeLeft}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
