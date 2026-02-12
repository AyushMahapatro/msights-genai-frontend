import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const isDark = mode === "dark";

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      style={{
        ...styles.button,
        backgroundColor: isDark ? "#111827" : "#f3f4f6",
        color: isDark ? "#ffffff" : "#111827",
      }}
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;

/* ===========================
   Styles
=========================== */

const styles = {
  button: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s ease",
  },
};
