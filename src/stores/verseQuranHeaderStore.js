import { create } from "zustand";

const useQuranHeaderVerse = create((set) => ({
  quranHeaderVerse: null,
  fromVerse: null,
  toVerse: null,
  goToVerse: null,
  activeVerse: null,
  setToVerse: (verse) => set({ toVerse: verse }),
  setFromVerse: (verse) => set({ fromVerse: verse }),
  setQuranHeaderVerse: (verse) => set({ quranHeaderVerse: verse }),
  setGoToVerse: (verse) => set({ goToVerse: verse }),
  setActiveVerse: (verse) => set({ activeVerse: verse }),
}));

export default useQuranHeaderVerse;
