import React, { useState } from "react";
import { submitFeedback } from "./feedbackService";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    try {
      setLoading(true);

      // Mock service call (backend later)
      await submitFeedback(feedback);

      setSubmitted(true);
    } catch (err) {
      console.error("Feedback failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {!submitted ? (
          <>
            <h3 style={styles.title}>Your Feedback</h3>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please share your feedback..."
              style={styles.textarea}
            />

            <div style={styles.actions}>
              <button
                onClick={onClose}
                style={styles.cancelButton}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={styles.submitButton}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={styles.title}>Thank You 🙌</h3>
            <p>Your feedback has been received.</p>

            <button
              onClick={() => {
                setSubmitted(false);
                setFeedback("");
                onClose();
              }}
              style={styles.submitButton}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;

/* ===========================
   Styles
=========================== */

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    maxWidth: "90%",
  },

  title: {
    marginBottom: "15px",
  },

  textarea: {
    width: "100%",
    height: "100px",
    resize: "none",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    marginBottom: "15px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  cancelButton: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer",
  },

  submitButton: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
};
