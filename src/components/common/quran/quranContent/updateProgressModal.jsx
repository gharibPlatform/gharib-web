import { useState, useEffect } from "react";
import { X, BookOpen, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import IndexToString from "../../../../../indexToStringSurah.json";
import { updatePartsKhatma } from "../../../../utils/khatma/apiKhatma";

export default function UpdateProgressModal({
  isOpen,
  setIsOpen,
  userKhatmasProgress,
}) {
  const [expandedKhatma, setExpandedKhatma] = useState(null);
  const [selectedParts, setSelectedParts] = useState(new Set());

  const formatVerseWithSurahName = (verseNumber) => {
    if (typeof verseNumber === "string" && verseNumber.includes(":")) {
      const [surah, verse] = verseNumber.split(":");
      const surahName = IndexToString[surah].name || `Surah ${surah}`;
      console.log({surahName});
      return `${surahName}: ${verse}`;
    }

    return verseNumber.toString();
  };

  const groupVersesIntoParts = (verses) => {
    if (verses.length === 0) return [];

    // Keep as strings and sort properly
    const sortedVerses = [...verses].sort((a, b) => {
      const [surahA, verseA] = a.split(":").map(Number);
      const [surahB, verseB] = b.split(":").map(Number);
      if (surahA !== surahB) return surahA - surahB;
      return verseA - verseB;
    });

    const parts = [];
    let currentPart = [sortedVerses[0]];

    for (let i = 1; i < sortedVerses.length; i++) {
      const [currentSurah, currentVerse] = currentPart[currentPart.length - 1]
        .split(":")
        .map(Number);
      const [nextSurah, nextVerse] = sortedVerses[i].split(":").map(Number);

      if (nextSurah === currentSurah && nextVerse === currentVerse + 1) {
        currentPart.push(sortedVerses[i]);
      } else {
        parts.push(createPartFromVerses(currentPart));
        currentPart = [sortedVerses[i]];
      }
    }

    parts.push(createPartFromVerses(currentPart));
    return parts;
  };

  const createPartFromVerses = (verses) => {
    const firstVerse = verses[0];
    const lastVerse = verses[verses.length - 1];

    return {
      id: `${firstVerse}-${lastVerse}`,
      range:
        verses.length === 1
          ? formatVerseWithSurahName(firstVerse)
          : `${formatVerseWithSurahName(firstVerse)} to ${formatVerseWithSurahName(lastVerse)}`,
      verses: verses,
    };
  };

  const formatVerseNumber = (num) => {
    if (Number.isInteger(num)) return num.toString();

    const parts = num.toString().split(".");
    return `${parts[0]}:${parts[1]}`;
  };

  useEffect(() => {
    if (isOpen) {
      const allParts = new Set();
      userKhatmasProgress.forEach((khatmaProgress) => {
        const parts = groupVersesIntoParts(khatmaProgress.versesInThisKhatma);
        parts.forEach((part) => allParts.add(part.id));
      });
      setSelectedParts(allParts);
      setExpandedKhatma(null);
    }
  }, [isOpen, userKhatmasProgress]);

  const toggleKhatmaExpansion = (index) => {
    if (expandedKhatma === index) {
      setExpandedKhatma(null);
    } else {
      setExpandedKhatma(index);
    }
  };

  const togglePartSelection = (partId, partVerses, khatmaIndex) => {
    const newSelected = new Set(selectedParts);
    if (newSelected.has(partId)) {
      newSelected.delete(partId);
    } else {
      newSelected.add(partId);
    }
    setSelectedParts(newSelected);
  };
  const handleUpdateProgress = () => {
    const khatmaPlayloads = [];

    userKhatmasProgress.forEach((khatmaProgress, khatmaIndex) => {
      const parts = groupVersesIntoParts(khatmaProgress.versesInThisKhatma);
      const khatmaParts = [];

      parts.forEach((part) => {
        if (selectedParts.has(part.id)) {
          const startVerse = part.verses[0].split(":").map(Number);
          const endVerse = part.verses[part.verses.length - 1]
            .split(":")
            .map(Number);

          khatmaParts.push({
            start: startVerse,
            end: endVerse,
          });
        }
      });

      if (khatmaParts.length > 0) {
        khatmaPlayloads.push({
          khatmaId: khatmaProgress.khatma.id,
          parts: khatmaParts,
        });
      }
    });

    console.log("Khatma playloads:", JSON.stringify(khatmaPlayloads));

    khatmaPlayloads.forEach((playload) => {
      updatePartsKhatma(playload.khatmaId, playload.parts);
    });

    alert(`Progress updated for ${khatmaPlayloads.length} khatmas!`);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--main-color)] text-white rounded-lg p-6 shadow-md flex flex-col gap-4 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold flex items-center gap-2">
            <BookOpen size={20} />
            Update Khatma Progress
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-sm opacity-80">
          Select the parts you've completed to update your progress.
        </p>

        <div className="flex flex-col gap-3 overflow-y-auto py-2">
          {userKhatmasProgress.length > 0 ? (
            userKhatmasProgress.map((khatmaProgress, index) => {
              const parts = groupVersesIntoParts(
                khatmaProgress.versesInThisKhatma
              );

              return (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full p-3 flex justify-between items-center hover:bg-white/5"
                    onClick={() => toggleKhatmaExpansion(index)}
                  >
                    <div className="text-left">
                      <p className="font-semibold">
                        {khatmaProgress.khatma.khatma.name || "Unnamed Khatma"}
                      </p>
                      <p className="text-sm opacity-75">
                        {parts.length} parts in this khatma
                      </p>
                    </div>
                    {expandedKhatma === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </button>

                  {expandedKhatma === index && (
                    <div className="p-3 border-t border-white/10">
                      <div className="flex flex-col gap-2">
                        {parts.map((part) => (
                          <button
                            key={part.id}
                            className={`p-3 rounded text-sm flex items-center justify-between ${
                              selectedParts.has(part.id)
                                ? "bg-[var(--o-color)] text-white"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                            onClick={() =>
                              togglePartSelection(part.id, part.verses, index)
                            }
                          >
                            <span>{part.range}</span>
                            {selectedParts.has(part.id) && (
                              <CheckCircle size={16} />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center py-4 opacity-75">No khatmas found.</p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
          <div className="flex justify-between">
            <span className="font-medium">Selected Parts:</span>
            <span className="text-[var(--o-color)] font-semibold">
              {selectedParts.size}
            </span>
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded border border-white/20 hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProgress}
              disabled={selectedParts.size === 0}
              className="px-4 py-2 rounded bg-[var(--o-color)] hover:bg-[var(--o-color-hover)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
