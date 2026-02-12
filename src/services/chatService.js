/**
 * Chat Service
 * ------------
 * Handles communication with backend API.
 * Frontend never talks directly to Gemini.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * Send chat message to backend
 *
 * @param {Object} params
 * @param {string} params.prompt
 * @param {string} params.model
 * @param {string} params.token
 */
export const sendMessage = async ({ prompt, model, token }) => {
  try {
    const response = await fetch(`${BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        prompt,
        model,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch response");
    }

    const data = await response.json();

    return data; // Expected: { reply: "AI response text" }

  } catch (error) {
    console.error("Chat Service Error:", error.message);
    throw error;
  }
};
