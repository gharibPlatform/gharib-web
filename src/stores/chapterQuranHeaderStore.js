import { create } from 'zustand';

const useQuranHeaderChapter = create((set) => ({
    quranHeaderChapter: null,
    priority: false,
    goToPath: false,
    fromChapter: null,
    toChapter: null,
  setFromChapter: (chapter) => set({ fromChapter: chapter }),
  setToChapter: (chapter) => set({ toChapter: chapter }),
  setQuranHeaderChapter: (chapter) => set({ quranHeaderChapter: chapter }),
  setPriority: (priority) => set({ priority }),
  setGoToPath: (goToPath) => set({ goToPath }),
}));

export default useQuranHeaderChapter;
