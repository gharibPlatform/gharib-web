import { verseByKey } from "../../../utils/quran/quran";
import { useEffect, useState } from "react";
import QuranHighlightsVerse from "./QuranHighlightsVerse";
import { Bookmark, Loader2 } from "lucide-react";

export default function QuranHighlights({
  handleVerseClick,
  highlights,
  isLoadingHighlights,
}) {
  const [verses, setVerses] = useState({});

  useEffect(() => {
    const fetchVerses = async () => {
      const newVerses = {};

      for (const highlight of highlights) {
        try {
          const verseKey = `${highlight.surah}:${highlight.start_verse}`;

          if (!newVerses[verseKey]) {
            const verseData = await verseByKey(verseKey);
            newVerses[verseKey] = verseData;
          }
        } catch (error) {
          console.error(
            `Failed to fetch verse for highlight ${highlight.id}:`,
            error
          );
          const verseKey = `${highlight.surah}:${highlight.start_verse}`;
          newVerses[verseKey] = {
            verse_key: verseKey,
            text: `Verse ${verseKey}`,
            error: true,
          };
        }
      }

      setVerses(newVerses);
    };

    if (highlights?.length > 0) {
      fetchVerses();
    } else {
      setVerses({});
    }
  }, [highlights]);

  const sortedVerseKeys = Object.keys(verses).sort((a, b) => {
    const highlightA = highlights.find(
      (h) => `${h.surah}:${h.start_verse}` === a
    );
    const highlightB = highlights.find(
      (h) => `${h.surah}:${h.start_verse}` === b
    );
    const dateA = new Date(highlightA?.created_at || 0);
    const dateB = new Date(highlightB?.created_at || 0);
    return dateB - dateA;
  });

  const handleVerseClickWithHighlight = (verseKey) => {
    const highlight = highlights.find(
      (h) => `${h.surah}:${h.start_verse}` === verseKey
    );
    const verseData = verses[verseKey];

    handleVerseClick(verseData, highlight.content, highlight.created_at);
  };

  return (
    <div className="space-y-3">
      {isLoadingHighlights ? (
        <div className="flex items-center justify-center py-8 text-[var(--g-color)]">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--o-color)] mr-2" />
          <p className="text-sm">Loading highlights...</p>
        </div>
      ) : !highlights || highlights.length === 0 ? (
        <div className="text-center py-8 text-[var(--g-color)]">
          <Bookmark className="w-8 h-8 text-[var(--o-color)] mx-auto mb-2" />
          <p className="text-sm">No highlights yet</p>
          <p className="text-xs mt-1">Click on a verse to highlight it</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 m-4">
            <Bookmark className="w-4 h-4 text-[var(--o-color)]" />
            <span className="text-[var(--w-color)] text-sm font-medium">
              Your Highlights ({highlights.length})
            </span>
          </div>
          {sortedVerseKeys.map((verseKey) => {
            const verseData = verses[verseKey];
            const highlight = highlights.find(
              (h) => `${h.surah}:${h.start_verse}` === verseKey
            );

            return (
              <QuranHighlightsVerse
                key={verseKey}
                verse={verseData}
                highlightContent={highlight.content}
                highlightDate={highlight.created_at}
                onClick={() => handleVerseClickWithHighlight(verseKey)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
