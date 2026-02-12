/**
 * Helper Utilities
 * -----------------
 * Reusable pure utility functions.
 */

/**
 * Truncate long text safely
 */
export const truncateText = (text, length = 30) => {
    if (!text) return "";
    return text.length > length
      ? text.substring(0, length) + "..."
      : text;
  };
  
  /**
   * Format timestamp (future ready)
   */
  export const formatTime = (date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  /**
   * Safe JSON parse
   */
  export const safeParse = (value) => {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };
  