import { create } from "zustand";

const useQuranHeaderVerse = create((set) => ({
  quranHeaderVerse: null,
  fromVerse: null,
  toVerse: null,
  goToVerse: null,
  totalVerses: 0,
  setToVerse: (verse) => set({ toVerse: verse }),
  setFromVerse: (verse) => set({ fromVerse: verse }),
  setQuranHeaderVerse: (verse) => set({ quranHeaderVerse: verse }),
  setGoToVerse: (verse) => set({ goToVerse: verse }),
  setRange: (startChapter, startVerse, endChapter, endVerse, quranChapters) => {
    let total = 0;

    if (
      startChapter &&
      startVerse != null &&
      endChapter &&
      endVerse != null &&
      (startChapter < endChapter ||
        (startChapter === endChapter && startVerse <= endVerse))
    ) {
      for (let i = startChapter; i <= endChapter; i++) {
        const chapter = quranChapters.find((c) => c.id === i);
        if (!chapter) continue;

        if (i === startChapter && i === endChapter) {
          total += endVerse - startVerse + 1;
        } else if (i === startChapter) {
          total += chapter.verses_count - startVerse + 1;
        } else if (i === endChapter) {
          total += endVerse;
        } else {
          total += chapter.verses_count;
        }
      }
    }

    set({
      totalVerses: total,
    });
  },
}));

export default useQuranHeaderVerse;
