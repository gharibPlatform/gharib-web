import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
    }),
    {
      name: "my-zustand-store",
    }
  )
);
export default useUserStore;