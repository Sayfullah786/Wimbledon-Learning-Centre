"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useClubDetails } from "@/hooks/useClubs";
import { useBlocks } from "@/hooks/useBlocks";

import ClubDetail from "./(components)/ClubDetail";
import RegistrationForm from "./(components)/RegistrationForm";

function ClubApplyPageInner({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const school = searchParams.get("school");
  const paymentStatus = searchParams.get("payment");

  const { id } = React.use(params);

  const backHref = school
    ? `/clubs?school=${encodeURIComponent(school)}`
    : "/clubs";

  const { club, loading: clubLoading, error: clubError } = useClubDetails(id);
  const { blocks, loading: blocksLoading } = useBlocks(id);

  const activeBlock = blocks?.[0] || null;

  // Payment cancelled toast
  const [showCancelToast, setShowCancelToast] = useState(false);

  useEffect(() => {
    if (paymentStatus === "cancelled") {
      setShowCancelToast(true);
      // Clean the URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete("payment");
      window.history.replaceState({}, "", url.toString());
      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => setShowCancelToast(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  // Calculate pro-rata session counts
  const currentLondonStr = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/London' }).replace(' ', 'T');
  const startTimeStr = club?.schedules?.[0]?.start_time || "00:00";

  const pastSessionsCount = activeBlock?.session_dates?.filter(d => {
    const sessionDateTimeStr = `${d.session_date.substring(0, 10)}T${startTimeStr}:00`;
    return sessionDateTimeStr < currentLondonStr;
  }).length || 0;
  const totalSessions = activeBlock ? (activeBlock.session_dates?.length || activeBlock.total_sessions || 0) : 10;
  const remainingSessionsCount = totalSessions - pastSessionsCount;

  if (clubLoading || blocksLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-main animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (clubError || !club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-bebas text-4xl text-gray-900 mb-3">
            Club Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            We couldn&apos;t find that club. Please go back and try again.
          </p>
          <Button
            size="m"
            variant="primary"
            icon={ArrowLeft}
            onClick={() => router.push(backHref)}
          >
            Back to Clubs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Payment cancelled toast */}
      <AnimatePresence>
        {showCancelToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[90%] max-w-md"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Payment cancelled</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  No charges were made. You can try again when you&apos;re ready.
                </p>
              </div>
              <button
                onClick={() => setShowCancelToast(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout */}
      <div className="maxWSec px-4 sm:px-10 md:px-16 pb-10 sm:pb-16 pt-10 sm:pt-30">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-start">
          {/* ── Left: Club details ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex"
          >
            <ClubDetail club={club} activeBlock={activeBlock} school={school} backHref={backHref} router={router} remainingSessionsCount={remainingSessionsCount} pastSessionsCount={pastSessionsCount} />
          </motion.div>

          {/* ── Right: Registration form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex"
          >
            <RegistrationForm club={club} activeBlock={activeBlock} remainingSessionsCount={remainingSessionsCount} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";

export default function ClubApplyPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="w-10 h-10 text-main animate-spin" />
        </div>
      }
    >
      <ClubApplyPageInner params={params} />
    </Suspense>
  );
}
