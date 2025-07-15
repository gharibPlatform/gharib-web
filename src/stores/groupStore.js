import {
  getGroups,
  getGroupSettings,
  patchGroupSettings,
  updateGroup,
  updateGroupSettings,
} from "@/utils/apiGroup";
import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: null,
  fetchGroups: async () => {
    const data = await getGroups();
    set({ groups: data });
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
