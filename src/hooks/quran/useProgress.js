import { useMemo } from "react";

export function useProgress(quranHeaderVerse, quranHeaderChapter) {
  return useMemo(() => {
    const totalVersesInChapter = quranHeaderChapter?.verses_count || 1;
    const rate = 100 / totalVersesInChapter;
    return quranHeaderVerse * rate;
  }, [quranHeaderVerse, quranHeaderChapter]);
}