"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import { techTrack, cyberTrack } from "@/constants/curriculum";
import contacts from "@/constants/contacts";
import Button from "./ui/Button";

/* ───── Road Map Step ───── */
const RoadmapStep = ({ step, index, total, trackColor }) => {
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="relative flex gap-5 sm:gap-8"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Circle */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg relative z-10"
          style={{ backgroundColor: step.color + "18" }}
        >
          <Icon className="w-6 h-6" style={{ color: step.color }} />
        </div>
        {/* Line */}
        {!isLast && (
          <div
            className="w-0.5 flex-1 min-h-8"
            style={{ backgroundColor: step.color + "30" }}
          />
        )}
      </div>

      {/* Content */}
      <div className={`pb-10 ${isLast ? "pb-0" : ""} flex-1`}>
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: step.color }}
        >
          {step.subtitle}
        </span>
        <h3 className="font-semibold text-gray-900 text-lg sm:text-xl mt-1">
          {step.title}
        </h3>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-2">
          {step.description}
        </p>
        {/* Topics */}
        <ul className="mt-4 space-y-2">
          {step?.topics?.map((topic, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <ChevronRight
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: step.color }}
              />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/* ───── Track Section ───── */
const TrackSection = ({ title, accent, track, badge }) => (
  <div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-10"
    >
      <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1.5 mb-4">
        <span className="text-xs sm:text-sm font-medium text-gray-600">
          {badge}
        </span>
      </div>
      <h2 className="font-bebas h2">
        {title}{" "}
        <span className="text-main">{accent}</span>
      </h2>
    </motion.div>

    <div className="max-w-2xl">
      {track.map((step, i) => (
        <RoadmapStep
          key={i}
          step={step}
          index={i}
          total={track.length}
          trackColor={step.color}
        />
      ))}
    </div>
  </div>
);

/* ───── Main Page ───── */
const CurriculumPage = () => {
  return (
    <div className="min-h-screen">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e3d] via-[#0e3a4d] to-[#122a35] pt-28 sm:pt-36 pb-16 sm:pb-24">
        {/* Decorative */}
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
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-sec" />
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                Learning Roadmap
              </span>
            </div>

            <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white tracking-wide leading-[1.1]">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                Curriculum
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 leading-relaxed max-w-2xl">
              A structured roadmap designed to take learners from the
              fundamentals of technology all the way through to recognised
              certifications and advanced specialisations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════ TECHNOLOGY TRACK ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <TrackSection
            title="Technology"
            accent="Track"
            badge="Core Programme"
            track={techTrack}
          />
        </div>
      </section>

      {/* ══════════ CYBER SECURITY TRACK ══════════ */}
      <section className="py-16 sm:py-24 bg-gray-50/50">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <TrackSection
            title="Cyber Security"
            accent="Track"
            badge="Specialist Programme"
            track={cyberTrack}
          />
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2e3d] via-[#0e3a4d] to-[#122a35] p-8 sm:p-12 md:p-16 text-center"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-main/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sec/10 blur-[60px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10">
              <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
                Ready to start your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                  journey?
                </span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
                Get in touch to learn more about our curriculum and find the
                right starting point for your child.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <a
                  href={`mailto:${contacts.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="m" variant="primary" icon={ArrowRight}>
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CurriculumPage;
