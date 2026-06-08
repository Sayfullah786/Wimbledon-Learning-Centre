"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { courseHighlights, coursesList } from "@/constants/courses";
import contacts from "@/constants/contacts";
import Button from "./ui/Button";

/* ───── Highlight Card ───── */
const HighlightCard = ({ highlight, index }) => {
  const Icon = highlight.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-main/30 hover:shadow-[0_8px_30px_rgba(34,158,189,0.10)] transition-[border-color,box-shadow] duration-500 relative"
    >
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full bg-gradient-to-r from-main/0 via-main to-main/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-main/10 to-sec/10 flex items-center justify-center mb-4 group-hover:from-main/20 group-hover:to-sec/20 transition-all duration-300">
        <Icon className="w-6 h-6 text-main" />
      </div>
      <h3 className="font-semibold text-gray-900 text-lg">{highlight.title}</h3>
      <p className="text-gray-500 text-sm mt-2 leading-relaxed">
        {highlight.description}
      </p>
    </motion.div>
  );
};

/* ───── Course Card ───── */
const CourseCard = ({ course, index }) => {
  const Icon = course.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 hover:border-main/30 hover:shadow-[0_8px_30px_rgba(34,158,189,0.10)] transition-[border-color,box-shadow] duration-500 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-r-full transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: course.color }}
      />
      <div className="flex items-start gap-4 sm:gap-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: course.color + "15" }}
        >
          <Icon className="w-7 h-7" style={{ color: course.color }} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-xl">{course.title}</h3>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mt-2">
            {course.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
              <CalendarCheck className="w-3.5 h-3.5" />
              {course.format}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ───── Main Page ───── */
const CoursesPage = () => {
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
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-sec" />
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                Weekly Classes
              </span>
            </div>

            <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white tracking-wide leading-[1.1]">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                Courses
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 leading-relaxed max-w-2xl">
              We currently offer weekly classes online and in person, focusing on
              technology fundamentals — you can book a{" "}
              <span className="text-white font-medium">free taster session</span>{" "}
              below.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={`mailto:${contacts.email}?subject=Free%20Taster%20Session`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="m" variant="primary" icon={ArrowRight}>
                  Book Free Taster
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ HIGHLIGHTS ══════════ */}
      <section className="py-16 sm:py-24 bg-gray-50/50">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-main text-sm font-semibold tracking-wide uppercase">
              Why learn with us
            </span>
            <h2 className="font-bebas h2 mt-2">
              What Makes Us{" "}
              <span className="text-main">Different</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {courseHighlights.map((highlight, i) => (
              <HighlightCard key={i} highlight={highlight} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ COURSES LIST ══════════ */}
      <section className="hidden py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-main text-sm font-semibold tracking-wide uppercase">
              What we teach
            </span>
            <h2 className="font-bebas h2 mt-2">
              Available{" "}
              <span className="text-main">Courses</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-lg mx-auto">
              Choose the right programme for your child and get started with a
              free taster session.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto flex flex-col gap-5">
            {coursesList.map((course, i) => (
              <CourseCard key={i} course={course} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 bg-gray-50/50">
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
                Try a class for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sec to-[#ffc14d]">
                  free
                </span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
                Not sure where to start? Book a free taster session and let your
                child experience our teaching style first-hand.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <a
                  href={`mailto:${contacts.email}?subject=Free%20Taster%20Session`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="m" variant="primary" icon={ArrowRight}>
                    Book Free Taster
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

export default CoursesPage;
