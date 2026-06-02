"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

/**
 * Fetch all active schools from the API.
 *
 * @returns {{ schools: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchools = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/schools");
      setSchools(res.data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch schools:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  return { schools, loading, error, refetch: fetchSchools };
}
