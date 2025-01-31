import { create } from 'zustand';

const useQuranHeaderVerse = create((set) => ({
    quranHeaderVerse: null,
  setQuranHeaderVerse: (chapter) => set({ quranHeaderVerse: chapter }),
}));

export default useQuranHeaderVerse;
