/**
 * Feedback Service
 * ------------------
 * Backend integration can be added later.
 */

export const submitFeedback = async (feedbackText) => {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Feedback submitted:", feedbackText);
        resolve({ success: true });
      }, 1000);
    });
  
    /*
    // Future backend version
    return fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback: feedbackText }),
    });
    */
  };
  