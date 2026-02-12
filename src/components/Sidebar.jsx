import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewChat,
  setCurrentChat,
} from "../features/chat/chatSlice";

import FeedbackModal from "../features/feedback/FeedbackModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { chats, currentChatId } = useSelector(
    (state) => state.chat
  );

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <div style={styles.sidebar}>
        {/* Top Section */}
        <div style={styles.topSection}>
          <button
            onClick={() => dispatch(createNewChat())}
            style={styles.newChatButton}
          >
            + New Chat
          </button>
        </div>

        {/* Chat List */}
        <div style={styles.chatList}>
          {chats.map((chat) => {
            const isActive = chat.id === currentChatId;

            return (
              <div
                key={chat.id}
                onClick={() => dispatch(setCurrentChat(chat.id))}
                style={{
                  ...styles.chatItem,
                  backgroundColor: isActive
                    ? "#e5e7eb"
                    : "transparent",
                }}
              >
                {chat.title}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div style={styles.bottomSection}>
          <button
            onClick={() => setIsFeedbackOpen(true)}
            style={styles.feedbackButton}
          >
            💬 Feedback
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </>
  );
};

export default Sidebar;

/* ===========================
   Styles
=========================== */

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    padding: "16px",
  },

  topSection: {
    marginBottom: "20px",
  },

  newChatButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },

  chatList: {
    flex: 1,
    overflowY: "auto",
  },

  chatItem: {
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "6px",
    fontSize: "14px",
    transition: "background 0.2s",
  },

  bottomSection: {
    marginTop: "auto",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
  },

  feedbackButton: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
};
