import { useMemo } from "react";

export function useKhatmaProgress(
  currentKhatma,
  khatmaDetails,
  quranHeaderChapter,
  currentReadVerse,
  verseIndexMap
) {
  return useMemo(() => {
    if (
      !currentKhatma ||
      !khatmaDetails ||
      !quranHeaderChapter ||
      !verseIndexMap ||
      currentReadVerse == null
    ) {
      return [0, 0, null, null];
    }

    const startGroupIndex = verseIndexMap[`${khatmaDetails.startSurah}:${khatmaDetails.startVerse}`];
    const endGroupIndex = verseIndexMap[`${khatmaDetails.endSurah}:${khatmaDetails.endVerse}`];
    const startSelfIndex = verseIndexMap[`${currentKhatma.startShareSurah}:${currentKhatma.startShareVerse}`];
    const endSelfIndex = verseIndexMap[`${currentKhatma.endShareSurah}:${currentKhatma.endShareVerse}`];
    const currentIndex = verseIndexMap[`${quranHeaderChapter.id}:${currentReadVerse}`];

    if (![startGroupIndex, endGroupIndex, startSelfIndex, endSelfIndex, currentIndex].every(Number.isFinite)) {
      return [0, 0, null, null];
    }

    const totalGroupCount = endGroupIndex - startGroupIndex + 1;
    const totalSelfCount = endSelfIndex - startSelfIndex + 1;
    let currentSelfCount = currentIndex - startSelfIndex + 1;

    currentSelfCount = Math.max(0, Math.min(currentSelfCount, totalSelfCount));

    const khatmaSelfProgress = (currentSelfCount * 100) / totalSelfCount;
    const khatmaGroupProgress = (currentSelfCount * 100) / totalGroupCount;

    if (currentIndex <= startSelfIndex) return [0, 0];
    if (currentIndex >= endSelfIndex) return [100, (totalSelfCount * 100) / totalGroupCount];

    return [khatmaSelfProgress, khatmaGroupProgress, currentReadVerse, quranHeaderChapter.id];
  }, [
    currentKhatma,
    currentReadVerse,
    quranHeaderChapter,
    khatmaDetails,
    verseIndexMap,
  ]);
}
