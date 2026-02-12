import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";

const MessageList = () => {
  const { chats, currentChatId } = useSelector(
    (state) => state.chat
  );

  const currentChat = chats.find(
    (c) => c.id === currentChatId
  );

  const messages = currentChat?.messages || [];

  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!currentChat) {
    return null;
  }

  return (
    <div>
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      {/* Scroll Anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
