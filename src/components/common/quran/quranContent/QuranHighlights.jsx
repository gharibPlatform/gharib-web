import { verseByKey } from "../../../../utils/quran/quran";
import { useEffect, useState } from "react";
import QuranHighlightsVerse from "./QuranHighlightsVerse";

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
    <>
      {isLoadingHighlights ? (
        <div className="text-[var(--lighter-color)] text-center pt-2">
          Loading your highlights...
        </div>
      ) : !highlights || highlights.length === 0 ? (
        <div className="text-[var(--lighter-color)] text-center pt-4">
          No highlights yet. Click on a verse to create your first highlight!
        </div>
      ) : (
        <div className="flex flex-col text-white flex-wrap px-2 gap-6 pt-2">
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
    </>
  );
}
