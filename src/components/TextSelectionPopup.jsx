import React, { useEffect, useState } from "react";

/**
 * TextSelectionPopup
 * -------------------
 * Shows small popup when user selects text.
 * Parent decides what to do with selected text.
 */

const TextSelectionPopup = ({ onSelect }) => {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setPosition({
          top: rect.top + window.scrollY - 40,
          left: rect.left + window.scrollX,
        });
      } else {
        setSelectedText("");
        setPosition(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!selectedText || !position) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        background: "#111",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        cursor: "pointer",
        zIndex: 1000,
      }}
      onClick={() => {
        onSelect && onSelect(selectedText);
        setSelectedText("");
        setPosition(null);
      }}
    >
      Ask about this
    </div>
  );
};

export default TextSelectionPopup;
