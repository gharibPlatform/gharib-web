import {
  deleteKhatma,
  getKhatmaDetails,
  updateKhatma,
} from "@/utils/apiKhatma";
import { create } from "zustand";

const useKhatmaStore = create((set) => ({
  khatmaDetails: null,
  fetchKhatmaDetails: async (khatmaId) => {
    const data = await getKhatmaDetails(khatmaId);
    set({ khatmaDetails: data });
  },

  updateKhatmaDetails: async (khatmaId, data) => {
    await updateKhatma(khatmaId, data); //this is a patch request
    set((state) => ({
      khatmaDetails: {
        ...state.khatmaDetails,
        ...data,
      },
    }));
  },

  deleteKhatma: async (khatmaId) => {
    (await deleteKhatma(khatmaId), set({ khatmasDetails: null }));
  },
}));

export default useKhatmaStore;
