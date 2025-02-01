import { create } from 'zustand';

const useQuranHeaderVerse = create((set) => ({
    quranHeaderVerse: null,
  setQuranHeaderVerse: (verse) => set({ quranHeaderVerse: verse }),
}));

export default useQuranHeaderVerse;
