import { create } from 'zustand';

const useQuranHeaderChapter = create((set) => ({
    quranHeaderChapter: null,
    priority: false,
    goToPath: false,
  setQuranHeaderChapter: (chapter) => set({ quranHeaderChapter: chapter }),
  setPriority: (priority) => set({ priority }),
  setGoToPath: (goToPath) => set({ goToPath }),
}));

export default useQuranHeaderChapter;
