// components/CreateKhatmaModal/QuranRangeSelector.jsx
import { useState, useRef, useEffect } from "react";
import { BookOpen } from "lucide-react";
import FormField from "./FormField";

export default function QuranRangeSelector({
  startSurah,
  startVerse,
  endSurah,
  endVerse,
  onStartSurahChange,
  onStartVerseChange,
  onEndSurahChange,
  onEndVerseChange,
  errors = {},
  surahOptions = [],
}) {
  const [showStartDropdown, setShowStartDropdown] = useState(false);
  const [showEndDropdown, setShowEndDropdown] = useState(false);
  const startDropdownRef = useRef(null);
  const endDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startDropdownRef.current &&
        !startDropdownRef.current.contains(event.target)
      ) {
        setShowStartDropdown(false);
      }
      if (
        endDropdownRef.current &&
        !endDropdownRef.current.contains(event.target)
      ) {
        setShowEndDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSurahName = (surahNumber) => {
    const surah = surahOptions.find((s) => s.number === parseInt(surahNumber));
    return surah ? `${surah.number}. ${surah.name}` : `Surah ${surahNumber}`;
  };

  const getMaxVerse = (surahNumber) => {
    if (!surahNumber) return 1;
    const surah = surahOptions.find((s) => s.number === parseInt(surahNumber));
    return surah ? surah.verses : 1;
  };

  return (
    <div className="pt-4 border-t border-[var(--g-color)] border-opacity-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
          <BookOpen size={16} className="text-white" />
        </div>
        <div>
          <h3 className="text-[var(--w-color)] font-bold">Quran Range</h3>
          <p className="text-[var(--g-color)] text-sm">
            Select reading portion
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Start Range */}
        <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
          <label className="text-[var(--w-color)] font-medium text-sm mb-3 block">
            Start From
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative" ref={startDropdownRef}>
              <div
                className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 cursor-pointer transition-all ${
                  errors.startSurah
                    ? "border-[var(--r-color)]"
                    : "border-[var(--g-color)] border-opacity-30"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStartDropdown(!showStartDropdown);
                  setShowEndDropdown(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {startSurah ? getSurahName(startSurah) : "Surah"}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {showStartDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-[var(--dark-color)] border-2 border-[var(--g-color)] border-opacity-30 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                  {surahOptions.map((surah) => (
                    <div
                      key={surah.number}
                      className="p-3 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 transition-colors"
                      onClick={() => {
                        onStartSurahChange(surah.number);
                        setShowStartDropdown(false);
                      }}
                    >
                      <div className="text-[var(--w-color)] text-sm">
                        {surah.number}. {surah.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <input
                type="number"
                value={startVerse}
                onChange={(e) => onStartVerseChange(e.target.value)}
                min="1"
                max={getMaxVerse(startSurah)}
                className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 text-sm ${
                  errors.startVerse
                    ? "border-[var(--r-color)]"
                    : "border-[var(--g-color)] border-opacity-30"
                }`}
                placeholder="Verse"
              />
            </div>
          </div>
        </div>

        {/* End Range */}
        <div className="bg-[var(--dark-color)] p-4 rounded-xl border border-[var(--g-color)] border-opacity-20">
          <label className="text-[var(--w-color)] font-medium text-sm mb-3 block">
            End At
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative" ref={endDropdownRef}>
              <div
                className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 cursor-pointer transition-all ${
                  errors.endSurah
                    ? "border-[var(--r-color)]"
                    : "border-[var(--g-color)] border-opacity-30"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEndDropdown(!showEndDropdown);
                  setShowStartDropdown(false);
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    {endSurah ? getSurahName(endSurah) : "Surah"}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {showEndDropdown && (
                <div className="absolute z-20 w-full mt-1 bg-[var(--dark-color)] border-2 border-[var(--g-color)] border-opacity-30 rounded-lg shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                  {surahOptions.map((surah) => (
                    <div
                      key={surah.number}
                      className="p-3 hover:bg-[var(--main-color)] cursor-pointer border-b border-[var(--g-color)] border-opacity-10 last:border-b-0 transition-colors"
                      onClick={() => {
                        onEndSurahChange(surah.number);
                        setShowEndDropdown(false);
                      }}
                    >
                      <div className="text-[var(--w-color)] text-sm">
                        {surah.number}. {surah.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <input
                type="number"
                value={endVerse}
                onChange={(e) => onEndVerseChange(e.target.value)}
                min="1"
                max={getMaxVerse(endSurah)}
                className={`w-full bg-[var(--main-color)] text-[var(--w-color)] rounded-lg border py-2 px-3 text-sm ${
                  errors.endVerse
                    ? "border-[var(--r-color)]"
                    : "border-[var(--g-color)] border-opacity-30"
                }`}
                placeholder="Verse"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
