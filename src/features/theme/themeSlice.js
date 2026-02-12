import { createSlice } from "@reduxjs/toolkit";

/**
 * Get initial theme:
 * 1. Check localStorage
 * 2. If not found → check system preference
 * 3. Default to light
 */
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("app_theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDark ? "dark" : "light";
};

const initialState = {
  mode: getInitialTheme(), // "light" | "dark"
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("app_theme", state.mode);
    },

    setTheme: (state, action) => {
      state.mode = action.payload; // expects "light" or "dark"
      localStorage.setItem("app_theme", state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
