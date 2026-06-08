"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Search, Calendar, Code, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSchools } from "@/hooks/useSchools";
import { useClubs } from "@/hooks/useClubs";

import { SchoolCombobox } from "./SchoolCombobox";
import { ClubCard } from "./ClubCard";
import { ClubSkeleton } from "./ClubSkeleton";

const ClubsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch schools from API
  const { schools, loading: schoolsLoading } = useSchools();

  // School selection is stored in the URL: /clubs?school=slug
  const selectedSchoolSlug = searchParams.get("school") || null;

  // Find selected school object
  const selectedSchool = useMemo(() => {
    return schools.find((s) => s.slug === selectedSchoolSlug) || null;
  }, [schools, selectedSchoolSlug]);

  // Fetch clubs from API when school changes
  const { clubs, loading: clubsLoading } = useClubs(selectedSchoolSlug);

  const setSelectedSchool = (school) => {
    const params = new URLSearchParams(searchParams.toString());
    if (school) {
      params.set("school", school.slug);
    } else {
      params.delete("school");
    }
    router.replace(`/clubs?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e3d] via-[#0e3a4d] to-[#122a35] pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-main/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sec/8 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="maxWSec relative z-10 px-4 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-sec" />
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                Coding & STEM Focused
              </span>
            </div>

            <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white tracking-wide leading-[1.1]">
              After School{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                Clubs
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 leading-relaxed max-w-xl mx-auto">
              We provide coding and STEM focused after school club sessions at
              schools in{" "}
              <span className="text-white font-medium">
                Merton and Wandsworth
              </span>
              .
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
              {[
                { icon: Code, label: "Python & MakeCode" },
                { icon: Cpu, label: "STEM Activities" },
                { icon: Calendar, label: "Term-Time Sessions" },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5"
                >
                  <pill.icon className="w-4 h-4 text-sec" />
                  <span className="text-white/80 text-xs sm:text-sm font-medium">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Combobox */}
            <SchoolCombobox
              schools={schools}
              selected={selectedSchool?.name || null}
              onSelect={setSelectedSchool}
              loading={schoolsLoading}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════ CLUBS RESULTS ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <AnimatePresence mode="wait">
            {!selectedSchoolSlug ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="font-semibold text-gray-400 text-lg">
                  Select a school above
                </h3>
                <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
                  Choose your child&apos;s school to see available after school
                  clubs and register.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedSchoolSlug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-10 sm:mb-14">
                  <span className="text-main text-sm font-semibold tracking-wide uppercase">
                    Available Clubs
                  </span>
                  <h2 className="font-bebas h2 mt-2">
                    <span className="text-main">{selectedSchool?.name || selectedSchoolSlug}</span>
                  </h2>
                </div>

                <div className="max-w-2xl mx-auto flex flex-col gap-6">
                  {clubsLoading ? (
                    <>
                      <ClubSkeleton />
                      <ClubSkeleton />
                    </>
                  ) : clubs.length > 0 ? (
                    clubs.map((club) => (
                      <ClubCard
                        key={club.id}
                        club={club}
                        onApply={() =>
                          router.push(
                            `/clubs/${club.id}?school=${encodeURIComponent(selectedSchoolSlug)}`
                          )
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No active clubs at the moment. Please check back soon.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default ClubsPage;
