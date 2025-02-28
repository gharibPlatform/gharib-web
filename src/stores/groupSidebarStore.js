import { create } from "zustand";

const useGroupSidebarStore = create((set) => ({
  groupSidebar: false,
  setGroupSidebar: (value) => set({ groupSidebar: value }),
}));

export default useGroupSidebarStore;
``