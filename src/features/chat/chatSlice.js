import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { sendMessage } from "../../services/chatService";

/* ===============================
   Async Thunk - Send Message
================================ */

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const { selectedModel } = state.model;
      const { token } = state.auth;

      const response = await sendMessage({
        prompt: payload.prompt,
        files: payload.files,
        model: selectedModel,
        token,
      });

      return response.reply;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


/* ===============================
   Initial State
================================ */

const initialState = {
  chats: [],
  currentChatId: null,
  isGenerating: false,
  error: null,
};

/* ===============================
   Slice
================================ */

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createNewChat: (state) => {
      const newChatId = nanoid();

      state.chats.push({
        id: newChatId,
        title: "New Chat",
        messages: [],
      });

      state.currentChatId = newChatId;
    },

    setCurrentChat: (state, action) => {
      state.currentChatId = action.payload;
    },

    addUserMessage: (state, action) => {
      const { content, files = [] } = action.payload;
    
      const chat = state.chats.find(
        (c) => c.id === state.currentChatId
      );
    
      if (!chat) return;
    
      chat.messages.push({
        id: nanoid(),
        role: "user",
        content,
        files, // ✅ store files in message
      });
    
      if (chat.messages.length === 1) {
        chat.title = content
          ? content.substring(0, 30)
          : "Image Chat";
      }
    },
    

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ===============================
         Pending
      ================================ */
      .addCase(sendMessageThunk.pending, (state) => {
        state.isGenerating = true;
        state.error = null;

        const chat = state.chats.find(
          (c) => c.id === state.currentChatId
        );

        if (!chat) return;

        chat.messages.push({
          id: "assistant-loading",
          role: "assistant",
          content: "",
          loading: true,
        });
      })

      /* ===============================
         Fulfilled
      ================================ */
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        const chat = state.chats.find(
          (c) => c.id === state.currentChatId
        );

        if (!chat) return;

        const index = chat.messages.findIndex(
          (m) => m.id === "assistant-loading"
        );

        if (index !== -1) {
          chat.messages[index] = {
            id: nanoid(),
            role: "assistant",
            content: action.payload,
          };
        }

        state.isGenerating = false;
      })

      /* ===============================
         Rejected
      ================================ */
      .addCase(sendMessageThunk.rejected, (state, action) => {
        const chat = state.chats.find(
          (c) => c.id === state.currentChatId
        );

        if (chat) {
          const index = chat.messages.findIndex(
            (m) => m.id === "assistant-loading"
          );

          if (index !== -1) {
            chat.messages[index] = {
              id: nanoid(),
              role: "assistant",
              content:
                "⚠️ Something went wrong. Please try again.",
            };
          }
        }

        state.isGenerating = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const {
  createNewChat,
  setCurrentChat,
  addUserMessage,
  clearError,
} = chatSlice.actions;

export default chatSlice.reducer;
