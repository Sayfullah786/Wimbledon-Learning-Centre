"use client";

import { useState, useCallback } from "react";
import api from "@/lib/api";

/**
 * Enrollment and payment actions.
 *
 * @returns {{
 *   enroll: Function,
 *   createCheckout: Function,
 *   cancelEnrollment: Function,
 *   getMyEnrollments: Function,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useEnrollment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Create an enrollment (pending payment).
   */
  const enroll = useCallback(async (studentId, blockId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/enrollments", {
        student_id: studentId,
        block_id: blockId,
      });
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a Stripe Checkout session and redirect.
   */
  const createCheckout = useCallback(async (studentId, blockId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/payments/create-checkout", {
        student_id: studentId,
        block_id: blockId,
      });

      // Redirect to Stripe
      if (res.data.sessionUrl) {
        window.location.href = res.data.sessionUrl;
      }

      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Cancel an enrollment.
   */
  const cancelEnrollment = useCallback(async (enrollmentId) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.patch(`/enrollments/${enrollmentId}/cancel`);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get current guardian's enrollments.
   */
  const getMyEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/enrollments/my");
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { enroll, createCheckout, cancelEnrollment, getMyEnrollments, loading, error };
}
