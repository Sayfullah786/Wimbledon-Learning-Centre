"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Trophy,
  Monitor,
  Dumbbell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { hafPartners, hafLocations, hafFaqs } from "@/constants/haf";
import contacts from "@/constants/contacts";
import Button from "./ui/Button";

/* ───── Accordion Item ───── */
const FaqItem = ({ faq, index, isOpen, onToggle }) => {
  const Icon = faq.icon;
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
          ? "border-main/30 bg-main/[0.03] shadow-[0_4px_24px_rgba(34,158,189,0.08)]"
          : "border-gray-200 bg-white hover:border-gray-300"
        }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left cursor-pointer group"
        aria-expanded={isOpen}
      >
        <span
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
              ? "bg-main text-white"
              : "bg-gray-100 text-gray-500 group-hover:bg-main/10 group-hover:text-main"
            }`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <span className="flex-1 pt-1.5">
          <span className="font-semibold text-gray-900 text-sm sm:text-base">
            {faq.question}
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 mt-2 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-main" : ""
            }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.5rem]">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LocationCard = ({ location, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:border-main/30 hover:shadow-[0_8px_30px_rgba(34,158,189,0.10)] transition-[border-color,box-shadow] duration-500"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full bg-gradient-to-r from-main/0 via-main to-main/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-main/10 to-sec/10 flex items-center justify-center flex-shrink-0 group-hover:from-main/20 group-hover:to-sec/20 transition-all duration-300">
          <MapPin className="w-6 h-6 text-main" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {location.borough}
          </h3>
          <p className="text-gray-500 text-sm mt-1">{location.venue}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ───── Main Page ───── */
const HafPage = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const handleToggle = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="min-h-screen">
      {/* ══════════ HERO ══════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a2e3d] via-[#0e3a4d] to-[#122a35] pt-28 sm:pt-36 pb-16 sm:pb-24">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-main/10 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sec/8 blur-[80px]" />
          {/* Grid pattern */}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-sec" />
              <span className="text-white/80 text-xs sm:text-sm font-medium">
                Holiday Activities & Food Programme
              </span>
            </div>

            <h1 className="font-bebas text-4xl sm:text-5xl md:text-7xl text-white tracking-wide leading-[1.1]">
              HAF Holiday{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                Camps
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 leading-relaxed max-w-2xl">
              We are proud partners with{" "}
              <span className="text-white font-medium">
                {hafPartners.join(", ")}
              </span>
              {"'s "}
              Holidays Activities programmes.
            </p>
            <p className="text-white/60 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">
              We currently run technology focused camps during the holiday breaks
              with a mix of sporting activities to enrich the local community
              with technology and physical activities.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={`mailto:${contacts.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="m" variant="primary" icon={ArrowRight}>
                  Get in Touch
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-10 sm:mt-14"
          >
            {[
              { icon: Monitor, label: "Technology Camps" },
              { icon: Dumbbell, label: "Sporting Activities" },
              { icon: Trophy, label: "Real-World Projects" },
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
          </motion.div>
        </div>
      </section>

      {/* ══════════ LOCATIONS ══════════ */}
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
              Where we operate
            </span>
            <h2 className="font-bebas h2 mt-2">
              Our <span className="text-main">Locations</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-lg mx-auto">
              Find a camp near you across our partner boroughs in London.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {hafLocations.map((location, i) => (
              <LocationCard key={i} location={location} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE OFFER ══════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="maxWSec px-4 sm:px-10 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-main/5 to-sec/5">
                <Image
                  src="/hero2.webp"
                  alt="HAF camp activities"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sec/10 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-sec" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Real-World Projects
                        </p>
                        <p className="text-gray-500 text-xs">
                          Games, apps & websites kids can share
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative dot */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-main/5 -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-sec/5 -z-10" />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="text-main text-sm font-semibold tracking-wide uppercase">
                What we do
              </span>
              <h2 className="font-bebas h2 mt-2">
                Tech Meets <span className="text-sec">Sport</span>
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Programming & Coding",
                    desc: "Kids build real projects—games, apps, and websites—they can play and share with family and friends.",
                  },
                  {
                    title: "Physical Activities",
                    desc: "A balanced mix of sporting activities keeps kids active and energised throughout the day.",
                  },
                  {
                    title: "Free Nutritious Meals",
                    desc: 'Hot meals provided daily plus "Food Education" sessions on nutrition and healthy snack preparation.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 mt-0.5 rounded-lg bg-main/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-main" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
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
              Got questions?
            </span>
            <h2 className="font-bebas h2 mt-2">
              Frequently Asked{" "}
              <span className="text-main">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-md mx-auto">
              Everything you need to know about our HAF holiday camps.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {hafFaqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFaq === i}
                onToggle={handleToggle}
              />
            ))}
          </div>
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
            {/* Decorative */}
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
                Ready to join our next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-main to-[#4cc9e0]">
                  camp?
                </span>
              </h2>
              <p className="text-white/60 text-sm sm:text-base mt-4 max-w-lg mx-auto leading-relaxed">
                Contact us to find out about upcoming holiday camp dates and
                available places for your child.
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

export default HafPage;
