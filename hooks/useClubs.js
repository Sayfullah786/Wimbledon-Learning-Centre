"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

/**
 * Fetch clubs by school slug.
 * Re-fetches when schoolSlug changes.
 *
 * @param {string|null} schoolSlug - The school slug to filter by
 * @returns {{ clubs: Array, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useClubs(schoolSlug) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClubs = useCallback(async () => {
    if (!schoolSlug) {
      setClubs([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/clubs/school/${schoolSlug}`);
      setClubs(res.data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch clubs:", err);
    } finally {
      setLoading(false);
    }
  }, [schoolSlug]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return { clubs, loading, error, refetch: fetchClubs };
}

/**
 * Fetch a single club's details by ID.
 *
 * @param {string|null} clubId - The club UUID to fetch
 * @returns {{ club: Object|null, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useClubDetails(clubId) {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClub = useCallback(async () => {
    if (!clubId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/clubs/${clubId}`);
      setClub(res.data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch club details:", err);
    } finally {
      setLoading(false);
    }
  }, [clubId]);

  useEffect(() => {
    fetchClub();
  }, [fetchClub]);

  return { club, loading, error, refetch: fetchClub };
}
