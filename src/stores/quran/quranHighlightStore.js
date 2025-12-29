import { create } from "zustand";
import {
  getHighlights,
  updateHighlights,
  deleteHighlights,
  createHighlights,
  getHighlightById,
} from "@/utils/khatma/apiHighlight";

const useQuranHighlightStore = create((set) => ({
  quranHighlights: null,
  currentQuranHighlight: null,
  fetchQuranHighlights: async () => {
    try {
      const highlights = await getHighlights();
      set({ quranHighlights: highlights });
    } catch (error) {
      console.error("Error getting highlights:", error);
    }
  },
  createQuranHighlight: async (data) => {
    try {
      const highlights = await createHighlights(data);
      set({ quranHighlights: highlights });
    } catch (error) {
      console.error("Error creating highlights:", error);
    }
  },
  getQuranHighlightById: async (id) => {
    try {
      const highlight = await getHighlightById(id);
      set({ currentQuranHighlight: highlight });
    } catch (error) {
      console.error("Error getting highlights:", error);
    }
  },
  updateQuranHighlight: async (id, data) => {
    try {
      const highlights = await updateHighlights(id, data);
      set({ quranHighlights: highlights });
    } catch (error) {
      console.error("Error updating highlights:", error);
    }
  },

  deleteQuranHighlight: async (id) => {
    try {
      const highlights = await deleteHighlights(id);
      set({ quranHighlights: highlights });
    } catch (error) {
      console.error("Error deleting highlights:", error);
    }
  },

  setQuranHighlights: (highlights) => set({ quranHighlights: highlights }),
}));

export default useQuranHighlightStore;
