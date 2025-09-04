import {
  acceptBrotherRequest,
  denyBrotherRequest,
  getBrotherRequests,
  sendBrotherRequest,
} from "@/utils/notifications";
import { create } from "zustand";

const useNotificationsStore = create((set, get) => ({
  notifications: null,
  loadingNotifications: false,
  errorNotifications: null,

  fetchNotifications: async () => {
    if (get().notifications || get().loadingNotifications) return;
    try {
      set({ loadingNotifications: true });
      const data = await getBrotherRequests();
      set({ notifications: data, loadingNotifications: false });
    } catch (error) {
      set({ errorNotifications: error, loadingNotifications: false });
    }
  },
  
}));

export default useNotificationsStore;
