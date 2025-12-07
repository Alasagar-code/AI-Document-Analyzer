import React, { createContext, useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export function AuthProvider({ children }) {
  // Do NOT auto-initialize auth state from localStorage —
  // keep the app showing the Login page until an explicit login occurs.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken || null;
  });
  const [loading] = useState(false);

  // Sync across tabs
  useEffect(() => {
    console.log("[AuthContext] Setting up storage event listener");
    const onStorage = (e) => {
      try {
        if (e.key === "token") {
          const newToken = localStorage.getItem("token");
          console.log("[AuthContext] Storage event: token changed to:", !!newToken);
          setToken(newToken);
        }
        if (e.key === "user") {
          const raw = localStorage.getItem("user");
          const newUser = raw ? JSON.parse(raw) : null;
          console.log("[AuthContext] Storage event: user changed to:", newUser);
          setUser(newUser);
        }
      } catch (err) {
        console.error("[AuthContext] Storage event parse error:", err);
      }
    };
    globalThis.addEventListener("storage", onStorage);
    return () => {
      console.log("[AuthContext] Removing storage event listener");
      globalThis.removeEventListener("storage", onStorage);
    };
  }, []);

  const login = useCallback((newToken, userData) => {
    try {
      console.log("[AuthContext] login() called with token:", !!newToken, "user:", userData?.email);
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("[AuthContext] Saved to localStorage");
    } catch (e) {
      console.error("[AuthContext] Failed to save to localStorage:", e);
    }
    setToken(newToken);
    setUser(userData);
    console.log("[AuthContext] State updated");
  }, []);

  const logout = useCallback(() => {
    try {
      console.log("[AuthContext] logout() called");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("[AuthContext] Cleared localStorage");
    } catch (e) {
      console.error("[AuthContext] Failed to remove from localStorage:", e);
    }
    setToken(null);
    setUser(null);
    // notify backend; ignore errors
    api.post("/api/auth/logout").catch((err) => {
      console.error("[AuthContext] Backend logout call failed:", err.message);
    });
  }, []);

  const value = useMemo(
    () => {
      console.log("[AuthContext] Memoized value updated - user:", user?.email, "token:", !!token);
      return { user, token, login, logout, loading };
    },
    [user, token, login, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
  
AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContext;
