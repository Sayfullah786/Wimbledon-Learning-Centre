"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [guardian, setGuardian] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = api.getToken();
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setGuardian(res.data))
        .catch(() => {
          api.setToken(null);
          setGuardian(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    api.setToken(res.data.token);
    setGuardian(res.data.guardian);
    return res.data;
  }, []);

  const register = useCallback(async (data) => {
    const res = await api.post("/auth/register", data);
    api.setToken(res.data.token);
    setGuardian(res.data.guardian);
    return res.data;
  }, []);

  const logout = useCallback(() => {
    api.setToken(null);
    setGuardian(null);
  }, []);

  const value = {
    guardian,
    isAuthenticated: !!guardian,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
