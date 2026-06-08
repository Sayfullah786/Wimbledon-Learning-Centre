"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useClubDetails } from "@/hooks/useClubs";
import { useBlocks } from "@/hooks/useBlocks";

import ClubDetail from "./(components)/ClubDetail";
import RegistrationForm from "./(components)/RegistrationForm";

function ClubApplyPageInner({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const school = searchParams.get("school");

  const { id } = React.use(params);

  const backHref = school
    ? `/clubs?school=${encodeURIComponent(school)}`
    : "/clubs";

  const { club, loading: clubLoading, error: clubError } = useClubDetails(id);
  const { blocks, loading: blocksLoading } = useBlocks(id);

  const activeBlock = blocks?.[0] || null;

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
      {/* Main layout */}
      <div className="maxWSec px-4 sm:px-10 md:px-16 pb-10 sm:pb-16 pt-10 sm:pt-30">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-start">
          {/* ── Left: Club details ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ClubDetail club={club} activeBlock={activeBlock} school={school} backHref={backHref} router={router} remainingSessionsCount={remainingSessionsCount} pastSessionsCount={pastSessionsCount} />
          </motion.div>

          {/* ── Right: Registration form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
