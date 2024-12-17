import { create } from 'zustand';

const useKhatmasContentStore = create((set) => ({
  name: "",
  percentage: 0,
  timeLeft: "",
  status: "",
  personalProgress: 0,
  activeTabStore: "brothers",
  share: "",
  pages: 0,
  remainingPages: 0,
  length: 0,
  startDate: "",
  endDate: "",

  updateKhatmasContent: (newData) => set((state) => ({
    name: newData.name || state.name,
    percentage: newData.percentage || state.percentage,
    timeLeft: newData.timeLeft || state.timeLeft,
    status: newData.status || state.status,
    personalProgress: newData.personalProgress || state.personalProgress,
    activeTabStore: newData.activeTabStore ?? state.activeTabStore, 
    share: newData.share || state.share,
    pages: newData.pages || state.pages,
    remainingPages: newData.remainingPages || state.remainingPages,
    length: newData.length || state.length,
    startDate: newData.startDate || state.startDate,
    endDate: newData.endDate || state.endDate,
  })),
  
}));

export default useKhatmasContentStore;
