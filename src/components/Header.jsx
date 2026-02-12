import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ModelSwitcher from "./ModelSwitcher";
import ThemeToggle from "./ThemeToggle";
import ShareChatButton from "../features/chat/ShareChatButton";
import { logout } from "../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const { chats, currentChatId } = useSelector(
    (state) => state.chat
  );

  const currentChat = chats.find(
    (c) => c.id === currentChatId
  );

  return (
    <div style={styles.header}>
      {/* Left - Chat Title */}
      <div style={styles.leftSection}>
        <h3 style={styles.title}>
          {currentChat?.title || "New Chat"}
        </h3>
      </div>

      {/* Right - Controls */}
      <div style={styles.rightSection}>
        <ModelSwitcher />
        <ThemeToggle />
        <ShareChatButton />

        {/* Logout Button */}
        <button
          onClick={() => dispatch(logout())}
          style={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

/* ===========================
   Styles
=========================== */

const styles = {
  header: {
    height: "60px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },

  leftSection: {
    display: "flex",
    alignItems: "center",
  },

  title: {
    fontSize: "16px",
    fontWeight: "600",
    margin: 0,
  },

  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoutButton: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #ff4d4f",
    backgroundColor: "#fff",
    color: "#ff4d4f",
    cursor: "pointer",
    fontSize: "13px",
  },
};
