import { useMemo } from "react";
import verseIndexMap from "../../../verseIndexMap.json";

export const useAbsoluteVerseDomain = (
  startSurah,
  startVerse,
  endSurah,
  endVerse,
  currentSurah,
  currentVerse
) => {
  return useMemo(() => {
    const startIndex = verseIndexMap[`${startSurah}:${startVerse}`];
    const endIndex = verseIndexMap[`${endSurah}:${endVerse}`];
    const currentIndex = verseIndexMap[`${currentSurah}:${currentVerse}`];

    if (![startIndex, endIndex, currentIndex].every(Number.isFinite)) {
      return null;
    }

    const goal = endIndex - startIndex + 1;
    const current = currentIndex - startIndex + 1;

    return [current, goal];
  }, [startSurah, startVerse, endSurah, endVerse, currentVerse, currentSurah]);
};
