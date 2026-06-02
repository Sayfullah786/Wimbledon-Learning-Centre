"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";

/**
 * Admin dashboard hook.
 *
 * @returns {{
 *   dashboard: object|null,
 *   fetchDashboard: Function,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useAdmin() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/admin/dashboard");
      setDashboard(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/admin/login", { email, password });
      api.setToken(res.data.token);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { dashboard, fetchDashboard, adminLogin, loading, error };
}
