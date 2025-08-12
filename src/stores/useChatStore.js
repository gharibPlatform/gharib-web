import { create } from "zustand";


const useChatStore = create((set, get) => ({
  chats: {}, // { chatId: { messages: [], hasFetched: false } }
  
  openChat: async (chatId) => {
    const state = get();
    if (state.chats[chatId]?.hasFetched) return; // already loaded

    // Fetch from backend
    const res = await fetch(`/api/chats/${chatId}/messages`);
    const data = await res.json();

    set({
      chats: {
        ...state.chats,
        [chatId]: { messages: data, hasFetched: true }
      }
    });
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          messages: [...(state.chats[chatId]?.messages || []), message]
        }
      }
    }));
  }
}));
