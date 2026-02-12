import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addUserMessage,
  sendMessageThunk,
} from "./chatSlice";

import FileUploader from "../../components/FileUploader";

const ChatInput = ({ isWelcome = false }) => {
  const dispatch = useDispatch();
  const { isGenerating } = useSelector((state) => state.chat);

  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((!input.trim() && files.length === 0) || isGenerating) return;

    const userPrompt = input.trim();

    // 1️⃣ Add user message (include file info optionally)
    dispatch(
      addUserMessage({
        content: userPrompt,
        files,
      })
    );
    

    // 2️⃣ Trigger async backend call
    dispatch(
      sendMessageThunk({
        prompt: userPrompt,
        files,
      })
    );

    // 3️⃣ Clear input + files
    setInput("");
    setFiles([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}
    >
      {/* File Preview + Upload */}
      <FileUploader files={files} setFiles={setFiles} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative", flex: 1 }}>
          <input
            type="text"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            style={{
              width: "100%",
              padding: "14px 45px 14px 16px",
              borderRadius: "25px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px",
            }}
          />

          {/* Spinner inside input */}
          {isGenerating && (
            <div
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <Spinner />
            </div>
          )}
        </div>

        {!isGenerating && (
          <button
            type="submit"
            style={{
              padding: "10px 16px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#4f46e5",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatInput;

/* ======================
   Spinner
====================== */

const Spinner = () => {
  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        border: "2px solid #ccc",
        borderTop: "2px solid #4f46e5",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
};
