"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronDown } from "lucide-react";
import schedule from "@/constants/schedule";

const OpeningHours = () => {
  const [expanded, setExpanded] = useState(true);

  const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const today = todayIndex === 0 ? 6 : todayIndex - 1; // adjust so Mon=0
  const todaySchedule = schedule[today];

  return (
    <section className="w-fit border border-black/10 rounded-xl shadow-sm px-3 py-2">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Clock className="text-main size-4" />
          <p className="text-base font-semibold text-gray-800">
            Open Today <span className="text-main">{todaySchedule.hours}</span>
          </p>
        </div>

        <motion.button
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="m-1 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <ChevronDown className="size-5" />
        </motion.button>
      </div>

      {/* Expandable Schedule with Animation */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="schedule"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden mt-3 border-t border-gray-200 pt-3"
          >
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex justify-between py-1.5 px-3 rounded-lg text-xs ${
                  index === today
                    ? "bg-main/10 text-main font-medium"
                    : "text-gray-700"
                }`}
              >
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OpeningHours