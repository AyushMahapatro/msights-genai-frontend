import React, { useState } from "react";

const MessageItem = ({ message }) => {
  const isUser = message.role === "user";
  const isLoading = message.loading;

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: isUser ? "flex-end" : "flex-start",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            padding: "12px 16px",
            borderRadius: "16px",
            backgroundColor: isUser ? "#4f46e5" : "#f3f4f6",
            color: isUser ? "#ffffff" : "#111827",
            fontSize: "14px",
            lineHeight: "1.5",
            wordBreak: "break-word",
          }}
        >
          {isLoading ? (
            <TypingIndicator />
          ) : (
            <>
              {message.content && (
                <div style={{ marginBottom: message.files?.length ? "10px" : 0 }}>
                  {message.content}
                </div>
              )}

              {message.files && message.files.length > 0 && (
                <div style={styles.imageContainer}>
                  {message.files.map((file, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="uploaded"
                      style={styles.image}
                      onClick={() =>
                        setSelectedImage(URL.createObjectURL(file))
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            style={styles.modalImage}
          />
        </div>
      )}
    </>
  );
};

export default MessageItem;

/* ======================
   Typing Indicator
====================== */

const TypingIndicator = () => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      <Dot />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </div>
  );
};

const Dot = ({ delay = "0s" }) => {
  return (
    <div
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: "#6b7280",
        animation: `bounce 1s infinite`,
        animationDelay: delay,
      }}
    />
  );
};

/* ======================
   Styles
====================== */

const styles = {
  imageContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  image: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.3)",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },

  modalImage: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "10px",
  },
};
