import { create } from "zustand";
import { getBrothers } from "../../utils/apiUser";

const useBrothersStore = create((set, get) => ({
  brothers: [],
  isLoadingBrothers: false,
  setBrothers: (brothers) => set({ brothers }),
  setIsLoadingBrothers: (isLoadingBrothers) => set({ isLoadingBrothers }),

  fetchBrothers: async () => {
    const state = get();
    if (state.brothers.length > 0) return;

    set({ isLoadingBrothers: true });
    try {
      const data = await getBrothers();
      set({ brothers: data.brothers, isLoadingBrothers: false });
    } catch (error) {
      console.error("Error fetching brothers:", error);
      set({ isLoadingBrothers: false });
    }
  },

  refreshBrothers: async () => {
    set({ isLoadingBrothers: true });
    try {
      const data = await getBrothers();
      set({ brothers: data, isLoadingBrothers: false });
    } catch (error) {
      console.error("Error fetching brothers:", error);
      set({ isLoadingBrothers: false });
    }
  },
}));

export default useBrothersStore;
