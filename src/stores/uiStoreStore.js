import { create } from "zustand";

const useUiStore = create((set) => ({
  activeTab: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useUiStore;
