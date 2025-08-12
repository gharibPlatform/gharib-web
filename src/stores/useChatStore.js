import { create } from "zustand";

import { getGroupMessages } from "../utils/group/apiGroupMessages";

const useChatStore = create((set, get) => ({
  chats: {}, // { chatId: { messages: [], hasFetched: false } },

  openChat: async (chatId) => {
    const state = get();
    if (state.chats[chatId]?.hasFetched) return; // already loaded

    try {
      const data = await getGroupMessages(chatId);
      set({
        chats: {
          ...state.chats,
          [chatId]: { messages: data, hasFetched: true },
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  addMessage: (chatId, message) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          messages: [...(state.chats[chatId]?.messages || []), message],
        },
      },
    }));
  },
}));
export default useChatStore;
