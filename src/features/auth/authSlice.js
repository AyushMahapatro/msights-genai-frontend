import { createSlice } from "@reduxjs/toolkit";

/**
 * Load auth state from localStorage
 */
const loadAuthFromStorage = () => {
  try {
    const storedAuth = localStorage.getItem("app_auth");
    if (!storedAuth) return null;

    return JSON.parse(storedAuth);
  } catch (error) {
    console.error("Failed to parse auth from storage", error);
    return null;
  }
};

const persistedAuth = loadAuthFromStorage();

const initialState = {
  user: persistedAuth?.user || null,
  token: persistedAuth?.token || null,
  isAuthenticated: !!persistedAuth?.token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.loading = false;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem(
        "app_auth",
        JSON.stringify({ user, token })
      );
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("app_auth");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
