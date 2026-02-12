import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "../features/chat/chatSlice";
import authReducer from "../features/auth/authSlice";
import modelReducer from "../features/model/modelSlice";
import themeReducer from "../features/theme/themeSlice";

/**
 * Root Redux Store
 * -----------------
 * - Central state container
 * - Combines all feature slices
 * - DevTools enabled in development
 * - Ready for middleware extension
 */

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    model: modelReducer,
    theme: themeReducer,
  },

  devTools: import.meta.env.MODE !== "production",

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      // Disabled because:
      // - We may store File objects (uploads)
      // - We may store non-serializable Gemini responses
      // Prevents unnecessary warnings
    }),
});

/**
 * Optional (Good Practice for Type Safety if using TS later)
 *
 * export const RootState = store.getState;
 * export const AppDispatch = store.dispatch;
 */
