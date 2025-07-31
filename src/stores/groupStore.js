import {
  getGroups,
  getGroupSettings,
  patchGroupSettings,
  updateGroup,
  updateGroupSettings,
} from "@/utils/apiGroup";
import { create } from "zustand";

const useGroupStore = create((set, get) => ({
  groups: null,
  loadingGroups: false,
  errorGroups: null,
  fetchGroups: async () => {
    if (get().groups || get().loadingGroups) return;
    try {
      set({ loadingGroups: true });
      const data = await getGroups();
      set({ groups: data, loadingGroups: false });
    } catch (error) {
      set({ errorGroups: error, loadingGroups: false });
    }
  },

  group: null,
  fetchOneGroup: async (id) => {
    const data = await getGroups(id);
    set({ group: data });
  },

  updateGroup: async (data) => {
    await updateGroup(data);
  },

  groupSettings: null,
  fetchGroupSettings: async (id) => {
    const data = await getGroupSettings(id);
    set({ groupSettings: data });
  },
  updateGroupSettings: async (id, data) => {
    await updateGroupSettings(id, data);
  },
  patchGroupSettings: async (id, data) => {
    await patchGroupSettings(id, data);
  },
}));

export default useGroupStore;
