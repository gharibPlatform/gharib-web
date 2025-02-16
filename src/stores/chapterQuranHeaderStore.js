import { create } from 'zustand';

const useQuranHeaderChapter = create((set) => ({
    quranHeaderChapter: null,
    priority: false,
  setQuranHeaderChapter: (chapter) => set({ quranHeaderChapter: chapter }),
  setPriority: (priority) => set({ priority }),

}));

export default useQuranHeaderChapter;
