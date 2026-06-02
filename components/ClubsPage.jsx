"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  Search,
  ChevronDown,
  Calendar,
  Clock,
  ArrowRight,
  Code,
  Cpu,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clubSchools, clubsBySchool, yearGroups } from "@/constants/clubs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Button from "./ui/Button";

/* ───── Combobox (shadcn Popover + Command) ───── */
const SchoolCombobox = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className={`w-full max-w-lg mx-auto flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-2xl px-5 py-4 cursor-pointer transition-all duration-300 ${
            open
              ? "border-main/60 shadow-[0_0_30px_rgba(34,158,189,0.15)]"
              : "border-white/20 hover:border-white/40"
          }`}
        >
          <Search className="w-5 h-5 text-white/50 flex-shrink-0" />
          <span className={`flex-1 text-left text-sm sm:text-base ${selected ? "text-white" : "text-white/40"}`}>
            {selected || "Search or select a school..."}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-white/50 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border-gray-100 shadow-2xl"
        align="center"
        sideOffset={8}
      >
        <Command className="rounded-2xl">
          <CommandInput placeholder="Type to search schools..." className="text-sm" />
          <CommandList>
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {clubSchools.map((school) => (
                <CommandItem
                  key={school}
                  value={school}
                  onSelect={() => {
                    onSelect(school);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 cursor-pointer text-sm"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selected === school
                        ? "border-main bg-main"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === school && (
                      <Check className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                  <span className={selected === school ? "font-medium text-main" : ""}>
                    {school}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/* ───── Club Card ───── */
const ClubCard = ({ club, onApply }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-main/30 hover:shadow-[0_8px_30px_rgba(34,158,189,0.10)] transition-all duration-400 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-1.5 h-full rounded-r-full bg-gradient-to-b from-main to-[#4cc9e0]" />

    <div className="flex items-start gap-4 mb-5">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-main/10 to-sec/10 flex items-center justify-center flex-shrink-0">
        <Code className="w-7 h-7 text-main" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg sm:text-xl">
          {club.title}
        </h3>
        <p className="text-main text-sm font-medium mt-1">{club.subtitle}</p>
      </div>
    </div>

    {/* Dates */}
    <div className="bg-gray-50 rounded-xl p-4 sm:p-5 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="w-4 h-4 text-main" />
        <span className="text-sm font-semibold text-gray-900">Dates</span>
      </div>
      <div className="space-y-1.5">
        {club.dates.map((d, i) => (
          <div key={i} className="flex gap-2 text-sm">
            <span className="text-gray-900 font-medium min-w-[3.5rem]">
              {d.month}
            </span>
            <span className="text-gray-400">—</span>
            <span className="text-gray-600">{d.days.join(", ")}</span>
          </div>
        ))}
      </div>
    </div>

    <p className="text-gray-600 text-sm leading-relaxed mb-6">
      {club.description}
    </p>

    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1.5">
          <Clock className="w-3.5 h-3.5" />
          {club.sessions} Sessions
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {club.day}
        </span>
      </div>
      <Button size="m" variant="primary" icon={ArrowRight} onClick={onApply}>
        Apply Now
      </Button>
    </div>
  </motion.div>
);



/* ═══════ Main Page ═══════ */
const ClubsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // School selection is stored in the URL: /clubs?school=...
  const selectedSchool = searchParams.get("school") || null;

  const setSelectedSchool = (school) => {
    const params = new URLSearchParams(searchParams.toString());
    if (school) {
      params.set("school", school);
    } else {
      params.delete("school");
    }
    router.replace(`/clubs?${params.toString()}`, { scroll: false });
  };

  const clubs = selectedSchool ? clubsBySchool[selectedSchool] || [] : [];

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
              selected={selectedSchool}
              onSelect={setSelectedSchool}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════ CLUBS RESULTS ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <AnimatePresence mode="wait">
            {!selectedSchool ? (
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
                key={selectedSchool}
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
                    <span className="text-main">{selectedSchool}</span>
                  </h2>
                </div>

                <div className="max-w-2xl mx-auto flex flex-col gap-6">
                  {clubs.length > 0 ? (
                    clubs.map((club) => (
                      <ClubCard
                        key={club.id}
                        club={club}
                        onApply={() =>
                          router.push(
                            `/clubs/${club.id}?school=${encodeURIComponent(selectedSchool)}`
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
