import { create } from 'zustand';

const useQuranHeaderPage = create((set) => ({
  quranHeaderPage: "",
  goToPathPages: false,
  setQuranHeaderPage: (page) => set({ quranHeaderPage: page }),
  setGoToPathPages: (goToPathPages) => set({ goToPathPages }),

}));

export default useQuranHeaderPage;
