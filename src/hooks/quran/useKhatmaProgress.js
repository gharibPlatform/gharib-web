import { useMemo } from "react";

export function useKhatmaProgress(currentKhatma, quranHeaderChapter, currentReadVerse, verseIndexMap) {
  return useMemo(() => {
    if (!currentKhatma) return;

    const total = verseIndexMap[
      `${currentKhatma.endShareSurah}:${currentKhatma.endShareVerse}`
    ] - verseIndexMap[
      `${currentKhatma.startShareSurah}:${currentKhatma.startShareVerse}`
    ];

    const current = verseIndexMap[`${quranHeaderChapter.id}:${currentReadVerse}`] -
      verseIndexMap[`${currentKhatma.startShareSurah}:${currentKhatma.startShareVerse}`];

    return (current * 100) / total;
  }, [currentKhatma, currentReadVerse, quranHeaderChapter]);
}