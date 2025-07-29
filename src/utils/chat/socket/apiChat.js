import api from "../../api";

const MESSAGING_BASE = "/api/v1";

export const messagingApi = {
  // Group Chat Endpoints
  groups: {
    list: () => api.get(`${MESSAGING_BASE}/groups/`),
    retrieve: (groupId) => api.get(`${MESSAGING_BASE}/groups/${groupId}/`),
    create: (data) => api.post(`${MESSAGING_BASE}/groups/`, data),
    update: (groupId, data) =>
      api.patch(`${MESSAGING_BASE}/groups/${groupId}/`, data),
    delete: (groupId) => api.delete(`${MESSAGING_BASE}/groups/${groupId}/`),
    members: {
      list: (groupId) =>
        api.get(`${MESSAGING_BASE}/groups/${groupId}/members/`),
      add: (groupId, userId) =>
        api.post(`${MESSAGING_BASE}/groups/${groupId}/members/`, {
          user_id: userId,
        }),
      remove: (groupId, userId) =>
        api.delete(`${MESSAGING_BASE}/groups/${groupId}/members/${userId}/`),
    },
    messages: {
      list: (groupId, params = {}) =>
        api.get(`${MESSAGING_BASE}/groups/${groupId}/messages/`, { params }),
      send: (groupId, messageData) =>
        api.post(`${MESSAGING_BASE}/groups/${groupId}/messages/`, messageData),
      update: (groupId, messageId, text) =>
        api.patch(
          `${MESSAGING_BASE}/groups/${groupId}/messages/${messageId}/`,
          { text }
        ),
      delete: (groupId, messageId) =>
        api.delete(
          `${MESSAGING_BASE}/groups/${groupId}/messages/${messageId}/`
        ),
    },
    status: (groupId) => api.get(`${MESSAGING_BASE}/groups/${groupId}/status/`),
  },

  // Direct Messages Endpoints
  directMessages: {
    list: (userId) =>
      api.get(`${MESSAGING_BASE}/direct-messages/?user_id=${userId}`),
    conversation: (chatId) =>
      api.get(`${MESSAGING_BASE}/direct-messages/${chatId}/`),
    send: (userId, messageData) =>
      api.post(`${MESSAGING_BASE}/direct-messages/`, {
        ...messageData,
        recipient_id: userId,
      }),
    update: (messageId, text) =>
      api.patch(`${MESSAGING_BASE}/direct-messages/${messageId}/`, { text }),
    delete: (messageId) =>
      api.delete(`${MESSAGING_BASE}/direct-messages/${messageId}/`),
  },

  // Chat Management Endpoints
  chats: {
    list: () => api.get(`${MESSAGING_BASE}/chats/`),
    markAsRead: (messageIds) =>
      api.post(`${MESSAGING_BASE}/chats/mark_read/`, {
        message_ids: messageIds,
      }),
    clearHistory: (chatId) =>
      api.post(`${MESSAGING_BASE}/chats/${chatId}/clear_history/`),
    mute: (chatId) => api.post(`${MESSAGING_BASE}/chats/${chatId}/mute/`),
    unmute: (chatId) => api.post(`${MESSAGING_BASE}/chats/${chatId}/unmute/`),
  },

  // User Status Endpoints
  userStatus: {
    check: (userId) => api.get(`${MESSAGING_BASE}/user_status/${userId}/`),
    setStatus: (status) =>
      api.post(`${MESSAGING_BASE}/user_status/`, { status }),
  },

  // Message Search
  search: {
    messages: (query) =>
      api.get(
        `${MESSAGING_BASE}/search/messages/?q=${encodeURIComponent(query)}`
      ),
    groups: (query) =>
      api.get(
        `${MESSAGING_BASE}/search/groups/?q=${encodeURIComponent(query)}`
      ),
    users: (query) =>
      api.get(`${MESSAGING_BASE}/search/users/?q=${encodeURIComponent(query)}`),
  },

  // File Uploads
  uploads: {
    messageAttachment: (file) => {
      const formData = new FormData();
      formData.append("file", file);
      return api.post(
        `${MESSAGING_BASE}/uploads/message_attachment/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  },
};

export const wsActions = {
  sendMessage: (text, replyTo = null, messageUuid = null) => ({
    action: "send_message",
    message: text,
    reply: replyTo,
    message_uuid: messageUuid || crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  }),

  updateMessage: (messageId, newText) => ({
    action: "update_message",
    message_id: messageId,
    message: newText,
    timestamp: new Date().toISOString(),
  }),

  deleteMessage: (messageId) => ({
    action: "delete_message",
    message_id: messageId,
  }),

  getUserStatus: (userId) => ({
    action: "get_user_status",
    user_id: userId,
  }),

  getGroupStatus: () => ({
    action: "get_group_status",
  }),

  disconnect: () => ({
    action: "disconnect",
  }),
};

export default messagingApi;
