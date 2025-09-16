import { useState, useEffect } from "react";
import { X, BookOpen, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function UpdateProgressModal({
  isOpen,
  setIsOpen,
  userKhatmasProgress,
}) {
  const [expandedKhatma, setExpandedKhatma] = useState(null);
  const [selectedParts, setSelectedParts] = useState(new Set());

  const groupVersesIntoParts = (verses) => {
    if (verses.length === 0) return [];

    const numericVerses = verses.map((v) =>
      typeof v === "string" && v.includes(":")
        ? parseFloat(v.replace(":", "."))
        : Number(v)
    );
    numericVerses.sort((a, b) => a - b);

    const parts = [];
    let start = numericVerses[0];
    let end = numericVerses[0];

    for (let i = 1; i < numericVerses.length; i++) {
      if (Math.abs(numericVerses[i] - end - 0.1) < 0.2) {
        end = numericVerses[i];
      } else {
        const startFormatted = formatVerseNumber(start);
        const endFormatted = formatVerseNumber(end);
        parts.push({
          id: `${startFormatted}-${endFormatted}`,
          range:
            startFormatted === endFormatted
              ? startFormatted
              : `${startFormatted} to ${endFormatted}`,
          start: start,
          end: end,
          verses: Array.from(
            { length: Math.round((end - start) / 0.1) + 1 },
            (_, i) => formatVerseNumber(start + i * 0.1)
          ),
        });

        start = numericVerses[i];
        end = numericVerses[i];
      }
    }

    // Add the last part
    const startFormatted = formatVerseNumber(start);
    const endFormatted = formatVerseNumber(end);
    parts.push({
      id: `${startFormatted}-${endFormatted}`,
      range:
        startFormatted === endFormatted
          ? startFormatted
          : `${startFormatted} to ${endFormatted}`,
      start: start,
      end: end,
      verses: Array.from(
        { length: Math.round((end - start) / 0.1) + 1 },
        (_, i) => formatVerseNumber(start + i * 0.1)
      ),
    });

    return parts;
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
    const allSelectedVerses = [];

    userKhatmasProgress.forEach((khatmaProgress, khatmaIndex) => {
      const parts = groupVersesIntoParts(khatmaProgress.versesInThisKhatma);
      parts.forEach((part) => {
        if (selectedParts.has(part.id)) {
          allSelectedVerses.push(...part.verses);
        }
      });
    });

    console.log("Updating progress with selected verses:", allSelectedVerses);
    alert(`Progress updated for ${allSelectedVerses.length} verses!`);
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
