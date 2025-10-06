import { listChapters } from '@/utils/quran/quran';
import { create } from 'zustand';

const useQuranHeaderChapter = create((set) => ({
    quranHeaderChapter: null,
    priority: false,
    goToPath: false,
    fromChapter: null,
    toChapter: null,
    quranChapters: null,
    pageToFetch : null,
  fetchQuranChapters: async () => {
    const data = await listChapters();
    set({ quranChapters: data });
  },
  setFromChapter: (chapter) => set({ fromChapter: chapter }),
  setToChapter: (chapter) => set({ toChapter: chapter }),
  setQuranHeaderChapter: (chapter) => set({ quranHeaderChapter: chapter }),
  setPriority: (priority) => set({ priority }),
  setGoToPath: (goToPath) => set({ goToPath }),
  setPageToFetch: (pageToFetch) => set({ pageToFetch }),
}));

export default useQuranHeaderChapter;
