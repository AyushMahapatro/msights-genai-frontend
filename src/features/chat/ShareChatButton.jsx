import React, { useState } from "react";
import { useSelector } from "react-redux";

const ShareChatButton = () => {
  const [copied, setCopied] = useState(false);

  const { chats, currentChatId } = useSelector(
    (state) => state.chat
  );

  const currentChat = chats.find(
    (c) => c.id === currentChatId
  );

  const hasMessages =
    currentChat && currentChat.messages.length > 0;

  const handleShare = async () => {
    if (!hasMessages) return;

    try {
      const chatData = {
        title: currentChat.title,
        messages: currentChat.messages,
      };

      await navigator.clipboard.writeText(
        JSON.stringify(chatData, null, 2)
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy chat:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={!hasMessages}
      style={{
        ...styles.button,
        opacity: hasMessages ? 1 : 0.5,
        cursor: hasMessages ? "pointer" : "not-allowed",
      }}
    >
      {copied ? "✅ Copied!" : "Share"}
    </button>
  );
};

export default ShareChatButton;

/* ===========================
   Styles
=========================== */

const styles = {
  button: {
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "13px",
    transition: "all 0.2s ease",
  },
};
