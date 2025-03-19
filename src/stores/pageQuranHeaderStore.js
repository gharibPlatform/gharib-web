import { create } from 'zustand';

const useQuranHeaderPage = create((set) => ({
    goToPathPages: false,
    quranHeaderPage: 0,
    fromPage: 0,
    toPage: 0,
  setFromPage: (fromPage) => set({ fromPage }),
  setToPage: (toPage) => set({ toPage }),
  setQuranHeaderPage: (page) => set({ quranHeaderPage: page }),
  setGoToPathPages: (goToPathPages) => set({ goToPathPages }),

}));

export default useQuranHeaderPage;
