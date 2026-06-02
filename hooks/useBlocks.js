"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

/**
 * Fetch enrollable session blocks for a club.
 * Re-fetches when clubId changes.
 *
 * @param {string|null} clubId - The club UUID to filter by
 * @returns {{ blocks: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useBlocks(clubId) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlocks = useCallback(async () => {
    if (!clubId) {
      setBlocks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/blocks?club_id=${clubId}&enrollable_only=true`);
      setBlocks(res.data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch blocks:", err);
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  return { blocks, loading, error, refetch: fetchBlocks };
}
