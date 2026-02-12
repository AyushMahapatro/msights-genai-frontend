import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleMockSSO = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate SSO delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock user + token
      dispatch(
        loginSuccess({
          user: { name: "JLR User", email: "user@jlr.com" },
          token: "mock-jlr-token-123",
        })
      );

      navigate("/");
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Branding Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.brandWrapper}>
          <h1 style={styles.logo}>JLR</h1>
          <div style={styles.divider}></div>
          <p style={styles.subtitle}>Facility Monitoring</p>
        </div>
      </div>

      {/* Right Login Section */}
      <div style={styles.rightPanel}>
        <div style={styles.loginCard}>
          <h2 style={styles.heading}>Log In</h2>

          <button
            onClick={handleMockSSO}
            disabled={loading}
            style={{
              ...styles.ssoButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "JLR User Sign In"}
          </button>

          {error && (
            <p style={styles.errorText}>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

/* ===========================
   Styles
=========================== */

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },

  leftPanel: {
    width: "280px",
    background: "#0b3d2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },

  brandWrapper: {
    textAlign: "center",
  },

  logo: {
    fontSize: "48px",
    letterSpacing: "4px",
    margin: 0,
  },

  divider: {
    height: "1px",
    background: "#fff",
    margin: "16px 0",
  },

  subtitle: {
    fontSize: "16px",
    margin: 0,
  },

  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  },

  loginCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  heading: {
    marginBottom: "30px",
  },

  ssoButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#0b3d2e",
    color: "#fff",
    fontWeight: "500",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },

  errorText: {
    color: "red",
    marginTop: "15px",
    fontSize: "13px",
  },
};
