import { create } from "zustand";

const useGroupSidebarStore = create((set) => ({
  isGroupSidebarOpen: false,
  setGroupSidebar: (value) => set({ isGroupSidebarOpen: value }),
}));

export default useGroupSidebarStore;
