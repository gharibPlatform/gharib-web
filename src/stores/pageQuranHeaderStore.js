import { create } from 'zustand';

const useQuranHeaderPage = create((set) => ({
  quranHeaderPage: "",
  setQuranHeaderPage: (page) => set({ quranHeaderPage: page }),
}));

export default useQuranHeaderPage;
