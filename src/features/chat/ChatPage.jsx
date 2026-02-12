import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewChat } from "./chatSlice";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatPage = () => {
  const dispatch = useDispatch();

  const { chats, currentChatId } = useSelector(
    (state) => state.chat
  );

  const currentChat = chats.find(
    (c) => c.id === currentChatId
  );

  // Ensure at least one chat exists
  useEffect(() => {
    if (chats.length === 0) {
      dispatch(createNewChat());
    }
  }, [chats.length, dispatch]);

  const hasMessages =
    currentChat && currentChat.messages.length > 0;

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div style={styles.chatSection}>
        {/* Header always visible */}
        <Header />

        {/* Conditional Body */}
        {!hasMessages ? (
          <WelcomeLayout />
        ) : (
          <ChatLayout />
        )}
      </div>
    </div>
  );
};

export default ChatPage;

/* ===========================
   Welcome Layout
=========================== */

const WelcomeLayout = () => {
  return (
    <div style={styles.welcomeContainer}>
      <h1 style={styles.heading}>Hi 👋</h1>
      <p style={styles.subHeading}>
        What’s on your mind?
      </p>

      <div style={styles.welcomeInputWrapper}>
        <ChatInput isWelcome />
      </div>
    </div>
  );
};

/* ===========================
   Chat Layout
=========================== */

const ChatLayout = () => {
  return (
    <div style={styles.chatContainer}>
      <div style={styles.messageArea}>
        <MessageList />
      </div>

      <div style={styles.inputArea}>
        <ChatInput />
      </div>
    </div>
  );
};

/* ===========================
   Styles
=========================== */

const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
  },

  chatSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  welcomeContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subHeading: {
    fontSize: "18px",
    marginBottom: "30px",
    opacity: 0.7,
  },

  welcomeInputWrapper: {
    width: "100%",
    maxWidth: "600px",
  },

  chatContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1, // important fix (not 100vh anymore)
  },

  messageArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  },

  inputArea: {
    padding: "10px 20px",
    borderTop: "1px solid #e5e7eb",
  },
};
