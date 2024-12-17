import { create } from 'zustand';

const useNameHeaderStore = create((set) => ({
  nameHeader: "",
  setNameHeader: (name) => set({ nameHeader: name }),
}));

export default useNameHeaderStore;
