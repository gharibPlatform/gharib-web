import { useMemo } from "react";

export function useCurrentReadVerse(currentKhatma, quranHeaderVerse) {
  return useMemo(() => {
    if (!currentKhatma) return;
    return quranHeaderVerse > currentKhatma.currentVerse ? quranHeaderVerse : undefined;
  }, [quranHeaderVerse, currentKhatma]);
}