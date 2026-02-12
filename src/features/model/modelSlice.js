import { createSlice } from "@reduxjs/toolkit";

/**
 * Available Models
 * Later this can come from backend.
 */
const AVAILABLE_MODELS = [
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { id: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
];

/**
 * Load selected model from localStorage
 */
const getInitialModel = () => {
  const savedModel = localStorage.getItem("app_selected_model");

  if (savedModel) {
    return savedModel;
  }

  // Default model
  return AVAILABLE_MODELS[0].id;
};

const initialState = {
  selectedModel: getInitialModel(),
  models: AVAILABLE_MODELS,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.selectedModel = action.payload;
      localStorage.setItem("app_selected_model", action.payload);
    },
  },
});

export const { setModel } = modelSlice.actions;

export default modelSlice.reducer;
