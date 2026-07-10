"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, ArrowRight, AlertCircle, School, BookOpen, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { useFormStore } from "@/lib/store";

function EnrollmentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const clearForm = useFormStore((state) => state.clearForm);

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found. This page can only be accessed after a successful payment.");
      setLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        const res = await api.get(`/payments/verify-session/${encodeURIComponent(sessionId)}`);
        if (res.success && res.data) {
          setSessionData(res.data);
          clearForm();
        } else {
          setError("Could not verify payment session.");
        }
      } catch (err) {
        console.error("Session verification failed:", err);
        setError("Could not verify your payment. If you were charged, please contact us and we'll sort it out.");
      } finally {
        setLoading(false);
      }
    };

    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-main animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-28 sm:py-36 px-4">
        <div className="maxWSec">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-7 h-7 text-amber-500" />
            </div>
            <h1 className="font-semibold text-gray-900 text-xl mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {error}
            </p>
            <button
              onClick={() => router.push("/clubs")}
              className="inline-flex items-center gap-2 bg-main text-white px-6 py-3 rounded-xl font-medium text-sm hover:bg-main/90 transition-colors cursor-pointer"
            >
              Back to Clubs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isPaid = sessionData?.status === "paid";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top section */}
      <div className="bg-gradient-to-b from-[#0a2e3d] to-[#0e3a4d] pt-28 sm:pt-36 pb-16 sm:pb-20 px-4">
        <div className="maxWSec">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto text-center"
          >

            <h1 className="text-white font-bold text-2xl sm:text-3xl mb-2">
              {isPaid ? "Thank you for your payment" : "Payment processing"}
            </h1>
            <p className="text-white/50 text-sm sm:text-base">
              {isPaid
                ? "Your spot is now secured."
                : "We're processing your payment. You'll receive confirmation shortly."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Details section */}
      <div className="maxWSec px-4 sm:px-10 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {/* Main details card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Enrollment info */}
            <div className="p-6 sm:p-8">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-5">
                Enrollment Details
              </h2>

              <div className="space-y-4">
                {sessionData?.clubName && (
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Club</p>
                      <p className="text-sm font-medium text-gray-900">{sessionData.clubName}</p>
                    </div>
                  </div>
                )}

                {sessionData?.blockName && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Term</p>
                      <p className="text-sm font-medium text-gray-900">{sessionData.blockName}</p>
                    </div>
                  </div>
                )}

                {sessionData?.schoolName && (
                  <div className="flex items-start gap-3">
                    <School className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">School</p>
                      <p className="text-sm font-medium text-gray-900">{sessionData.schoolName}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Amount */}
            {sessionData?.amountTotal != null && (
              <div className="border-t border-gray-100 px-6 sm:px-8 py-5 flex items-center justify-between">
                <span className="text-sm text-gray-500">Amount paid</span>
                <span className="text-xl font-bold text-gray-900">
                  £{sessionData.amountTotal.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 text-center mt-5 leading-relaxed max-w-md mx-auto">
            If you have any questions about your enrollment, contact us.
          </p>

          {/* CTA */}
          <div className="mt-8 flex justify-center pb-16">
            <button
              id="backToClubsFromSuccess"
              onClick={() => router.push("/clubs")}
              className="inline-flex items-center gap-2 bg-main text-white px-7 py-3 rounded-xl font-medium text-sm hover:bg-main/90 transition-colors cursor-pointer"
            >
              Browse More Clubs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EnrollmentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 text-main animate-spin" />
        </div>
      }
    >
      <EnrollmentSuccessContent />
    </Suspense>
  );
}
