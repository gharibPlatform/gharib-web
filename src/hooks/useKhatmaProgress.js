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
    if (!khatmaSelfMembership?.currentSurah || !quranChapters) return null;

    // currentSurah is now an integer (like 2)
    return quranChapters.find(
      (ch) => ch.id === parseInt(khatmaSelfMembership.currentSurah)
    );
  }, [quranChapters, khatmaSelfMembership?.currentSurah]);

  const userProgress = useMemo(() => {
    if (
      !selfStartChapter ||
      !selfEndChapter ||
      !currentChapter ||
      !khatmaSelfMembership?.currentVerse
    )
      return null;

    const startKey = `${selfStartChapter.id}:${khatmaSelfMembership.startShareVerse}`;
    const endKey = `${selfEndChapter.id}:${khatmaSelfMembership.endShareVerse}`;
    const currentKey = `${currentChapter.id}:${khatmaSelfMembership.currentVerse}`;

    const startAbs = verseIndexMap[startKey];
    const endAbs = verseIndexMap[endKey];
    const currentAbs = verseIndexMap[currentKey];

    if (!startAbs || !endAbs || !currentAbs) return null;

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
    if (khatmaSelfMembership && khatmaDetails && quranChapters) {
      // All chapter references are now integers
      const startChapterSelf = quranChapters.find(
        (ch) => ch.id === parseInt(khatmaSelfMembership.startShareSurah)
      );
      const endChapterSelf = quranChapters.find(
        (ch) => ch.id === parseInt(khatmaSelfMembership.endShareSurah)
      );
      const startChapterGroup = quranChapters.find(
        (ch) => ch.id === parseInt(khatmaDetails.startSurah)
      );
      const endChapterGroup = quranChapters.find(
        (ch) => ch.id === parseInt(khatmaDetails.endSurah)
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
