import { create } from 'zustand';

const useQuranHeaderVerse = create((set) => ({
    quranHeaderVerse: null,
    fromVerse: null,
    toVerse: null,
  setToVerse: (verse) => set({ toVerse: verse }),
  setFromVerse: (verse) => set({ fromVerse: verse }),
  setQuranHeaderVerse: (verse) => set({ quranHeaderVerse: verse }),
}));

export default useQuranHeaderVerse;
