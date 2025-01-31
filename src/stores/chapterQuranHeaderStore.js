import { create } from 'zustand';

const useQuranHeaderChapter = create((set) => ({
    quranHeaderChapter: null,
  setQuranHeaderChapter: (chapter) => set({ quranHeaderChapter: chapter }),
}));

export default useQuranHeaderChapter;
