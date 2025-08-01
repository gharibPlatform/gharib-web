import { useEffect, useState, useMemo } from "react";
import verseIndexMap from "../../verseIndexMap.json";

export function useKhatmaProgress(
  khatmaSelfMembership,
  khatmaDetails,
  quranChapters
) {
  const [selfStartChapter, setSelfStartChapter] = useState(null);
  const [selfEndChapter, setSelfEndChapter] = useState(null);
  const [groupStartChapter, setGroupStartChapter] = useState(null);
  const [groupEndChapter, setGroupEndChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentChapter = useMemo(() => {
    return quranChapters?.find(
      (ch) =>
        ch.translated_name.name.toLowerCase() ===
        khatmaSelfMembership?.currentSurah?.toLowerCase()
    );
  }, [quranChapters, khatmaSelfMembership?.currentSurah]);

  const userProgress = useMemo(() => {
    if (
      !selfStartChapter ||
      !selfEndChapter ||
      !currentChapter ||
      !khatmaSelfMembership.currentVerse
    )
      return null;

    const startKey = `${selfStartChapter.id}:${khatmaSelfMembership.startShareVerse}`;
    const endKey = `${selfEndChapter.id}:${khatmaSelfMembership.endShareVerse}`;
    const currentKey = `${currentChapter.id}:${khatmaSelfMembership.currentVerse}`;

    const startAbs = verseIndexMap[startKey];
    const endAbs = verseIndexMap[endKey];
    const currentAbs = verseIndexMap[currentKey];

    return {
      currentAbsolute: currentAbs,
      completed: currentAbs - startAbs,
      remaining: endAbs - currentAbs,
      total: endAbs - startAbs + 1,
      percentage: ((currentAbs - startAbs) / (endAbs - startAbs + 1)) * 100,
      currentChapterId: currentChapter.id,
      currentVerseNumber: khatmaSelfMembership.currentVerse,
    };
  }, [selfStartChapter, selfEndChapter, currentChapter, khatmaSelfMembership]);

  useEffect(() => {
    if (khatmaSelfMembership && quranChapters) {
      const startChapterSelf = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaSelfMembership.startShareSurah.toLowerCase()
      );
      const endChapterSelf = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaSelfMembership.endShareSurah.toLowerCase()
      );

      const startChapterGroup = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaDetails.startSurah.toLowerCase()
      );
      const endChapterGroup = quranChapters.find(
        (ch) =>
          ch.translated_name.name.toLowerCase() ===
          khatmaDetails.endSurah.toLowerCase()
      );

      setSelfStartChapter(startChapterSelf);
      setSelfEndChapter(endChapterSelf);
      setGroupStartChapter(startChapterGroup);
      setGroupEndChapter(endChapterGroup);
      setLoading(false);
    }
  }, [khatmaSelfMembership, khatmaDetails, quranChapters]);

  return {
    selfStartChapter,
    selfEndChapter,
    groupStartChapter,
    groupEndChapter,
    userProgress,
    loading,
    currentChapter,
  };
}
