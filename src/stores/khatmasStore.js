import {
  deleteKhatma,
  getKhatmaDetails,
  getKhatmaMembership,
  getListKhatma,
  updateKhatma,
} from "@/utils/apiKhatma";
import { create } from "zustand";

const useKhatmaStore = create((set) => ({
  khatmaDetails: null,
  userKhatmas: null,
  khatmaMembership: null,
  khatmaSelfMembership: null,
  setKhatmaSelfMembership: ( data ) => set({ khatmaSelfMembership : data}),
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

  fetchUserKhatmas: async () => {
    const data = await getListKhatma();
    set({ userKhatmas: data.results });
  },

  fetchKhatmaMembership: async (khatmaId) => {
    const data = await getKhatmaMembership(khatmaId);
    set({ khatmaMembership: data.results });
  },
}));

export default useKhatmaStore;
