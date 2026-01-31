import {
  getGroupSettings,
  patchGroupSettings,
  updateGroupSettings,
} from "@/utils/group/apiGroupSettings";
import { getGroups, updateGroup } from "@/utils/group/apiGroup";

import { create } from "zustand";

const useGroupStore = create((set, get) => ({
  groups: null,
  loadingGroups: false,
  errorGroups: null,

  fetchGroups: async (forceRefresh = false) => {
    // Only skip if we're already loading
    if (get().loadingGroups) return;

    // Don't return early if groups exist - always allow forced refresh
    if (get().groups && !forceRefresh) {
      // You could still fetch in background, but for now let's fetch anyway
      // Or you can remove this early return completely
    }

    try {
      set({ loadingGroups: true });
      const data = await getGroups();
      set({ groups: data, loadingGroups: false, errorGroups: null });
    } catch (error) {
      set({ errorGroups: error, loadingGroups: false });
      throw error;
    }
  },

  group: null,

  setGroups: (newGroups) => set({ groups: newGroups }),

  // Force refresh method
  refreshGroups: async () => {
    return get().fetchGroups(true); // Force refresh
  },

  // Manually add a group to the store
  addGroup: (newGroup) => {
    const currentGroups = get().groups || [];
    // Check if group already exists
    if (!currentGroups.some((group) => group.id === newGroup.id)) {
      set({ groups: [...currentGroups, newGroup] });
    }
  },

  // Manually remove a group from the store
  removeGroup: (groupId) => {
    const currentGroups = get().groups || [];
    set({ groups: currentGroups.filter((group) => group.id !== groupId) });
  },

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
