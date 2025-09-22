import {
  deleteKhatma,
  getKhatmaDetails,
  getKhatmaMembership,
  getListKhatma,
  updateKhatma,
  getKhatmaByGroup,
} from "@/utils/khatma/apiKhatma";
import { create } from "zustand";

const useKhatmaStore = create((set) => ({
  khatmaDetails: null,
  userKhatmas: null,
  khatmaMembership: null,
  khatmaSelfMembership: null,
  groupKhatmas: null,
  currentKhatma: null,
  readVersesKeys: [],
  membersInKhatma: [],
  
  setReadVersesKeys: (verseKey) =>
    set((state) => {
      const filteredKeys = state.readVersesKeys.filter(
        (key) => key !== verseKey
      );
      const newKeys = [...filteredKeys, verseKey];

      return { readVersesKeys: newKeys };
    }),
  setCurrentKhatma: (data) => set({ currentKhatma: data }),
  setKhatmaSelfMembership: (data) => set({ khatmaSelfMembership: data }),
  fetchKhatmaDetails: async (khatmaId) => {
    const data = await getKhatmaDetails(khatmaId);
    set({ khatmaDetails: data });
    return data;
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
    set({ khatmaMembership: data.results[0] });
    return data;
  },

  fetchGroupKhatmas: async (groupId) => {
    const data = await getKhatmaByGroup(groupId);
    set({ groupKhatmas: data });
  },

  fetchMembersInKhatma: async (khatmaId) => {
    const data = await getKhatmaMembership(khatmaId);
    set({ membersInKhatma: data.results });
  },
}));

export default useKhatmaStore;
