import { create } from 'zustand';

const useShouldFetch = create((set) => ({
  shouldFetch: "",
  setShouldFetch: (which) => set({ shouldFetch: which }),
}));

export default useShouldFetch;
