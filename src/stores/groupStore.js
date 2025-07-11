import { getGroups } from "@/utils/apiGroup";
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
}));

export default useGroupStore;
