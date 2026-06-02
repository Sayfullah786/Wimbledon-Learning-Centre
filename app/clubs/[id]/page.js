"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Code,
  CheckCircle,
  CreditCard,
  Download,
  Cpu,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clubsBySchool } from "@/constants/clubs";
import Button from "@/components/ui/Button";

/* ─── find a club by its id across all schools ─── */
function findClub(id) {
  for (const clubs of Object.values(clubsBySchool)) {
    const found = clubs.find((c) => c.id === id);
    if (found) return found;
  }
  return null;
}

/* ─── Club Detail Panel (left side) ─── */
const ClubDetail = ({ club, school, backHref, router }) => (
  <div className="flex flex-col gap-6">
    {/* Breadcrumbs */}
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <button
        onClick={() => router.push(backHref)}
        className="hover:text-main font-medium transition-colors cursor-pointer flex items-center gap-1"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Clubs
      </button>
    </div>

    {/* Title */}
    <div>
      <h1 className="font-bebas text-4xl sm:text-5xl text-gray-900 leading-tight tracking-wide">
        {club.title}
      </h1>
      <p className="text-main font-semibold mt-2 text-base">{club.subtitle}</p>
    </div>

    {/* Description */}
    <p className="text-gray-600 text-base leading-relaxed">{club.description}</p>

    {/* Quick Stats */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-main/10 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-main" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">Sessions</p>
          <p className="text-gray-900 font-bold text-lg">{club.sessions}</p>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-main/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-5 h-5 text-main" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium">Day</p>
          <p className="text-gray-900 font-bold text-lg">{club.day}</p>
        </div>
      </div>
    </div>

    {/* Price */}
    <div className="bg-gradient-to-r from-main/5 to-[#4cc9e0]/5 border border-main/15 rounded-2xl p-5">
      <p className="text-xs text-gray-400 font-medium mb-1">Total Price</p>
      <p className="font-bebas text-5xl text-main tracking-wide">
        £{club.price?.toFixed(2) || "60.00"}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        for all {club.sessions} sessions
      </p>
    </div>

    {/* Dates */}
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-main" />
        <span className="text-sm font-semibold text-gray-900">
          Session Dates
        </span>
      </div>
      <div className="space-y-2">
        {club.dates.map((d, i) => (
          <div key={i} className="flex gap-3 text-sm">
            <span className="text-gray-900 font-semibold min-w-[4.5rem]">
              {d.month}
            </span>
            <span className="text-gray-400">—</span>
            <span className="text-gray-600">{d.days.join(", ")}</span>
          </div>
        ))}
      </div>
    </div>

    {/* What you'll learn */}
    <div className="border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-4 h-4 text-main" />
        <span className="text-sm font-semibold text-gray-900">
          What We Cover
        </span>
      </div>
      <ul className="space-y-2.5">
        {[
          "Python programming fundamentals",
          "MakeCode Arcade (Blocks & JavaScript)",
          "Creative game design projects",
          "Computational thinking skills",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-main mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/* ─── Registration Form (right side) ─── */
const RegistrationForm = ({ club, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    parentEmail: "",
    parentPhone: "",
    yearGroup: "",
    comments: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [uniqueRef, setUniqueRef] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canProceed =
    form.parentName &&
    form.childName &&
    form.parentEmail &&
    form.parentPhone &&
    form.yearGroup;

  const handleContinueToPayment = () => {
    if (!canProceed) return;
    const firstWord = form.childName.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "").toUpperCase() || "STUDENT";
    const rand = Math.floor(1000 + Math.random() * 9000);
    setUniqueRef(`WLC-${firstWord}-${rand}`);
    setStep(2);
  };

  const handlePayment = () => {
    setSubmitted(true);
    onSuccess?.();
  };

  const handleInvoice = async () => {
    let currentRef = uniqueRef;
    if (!currentRef) {
      const firstWord = form.childName.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "").toUpperCase() || "STUDENT";
      const rand = Math.floor(1000 + Math.random() * 9000);
      currentRef = `WLC-${firstWord}-${rand}`;
      setUniqueRef(currentRef);
    }

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const teal = [34, 158, 189];
    const dark = [17, 17, 17];
    const grey = [100, 100, 100];
    const lightGrey = [240, 240, 240];
    const w = 210;
    const pad = 20;
    let y = 20;

    // ── Header bar ──
    doc.setFillColor(...teal);
    doc.rect(0, 0, w, 14, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("WIMBLEDON LEARNING CENTRE", pad, 9);
    doc.setFont("helvetica", "normal");
    doc.text("INVOICE", w - pad, 9, { align: "right" });

    y = 28;

    // ── Invoice meta ──
    doc.setTextColor(...dark);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice", pad, y);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grey);
    doc.text(`Date: ${new Date().toLocaleDateString("en-GB")}`, w - pad, y - 4, { align: "right" });
    doc.text(`Ref: ${currentRef}`, w - pad, y + 2, { align: "right" });

    y += 10;
    doc.setDrawColor(...teal);
    doc.setLineWidth(0.5);
    doc.line(pad, y, w - pad, y);
    y += 8;

    // ── Section helper ──
    const sectionTitle = (title) => {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...teal);
      doc.text(title.toUpperCase(), pad, y);
      y += 5;
      doc.setDrawColor(...lightGrey);
      doc.setLineWidth(0.3);
      doc.line(pad, y, w - pad, y);
      y += 4;
    };

    const row = (label, value) => {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...grey);
      doc.text(label, pad, y);
      doc.setTextColor(...dark);
      doc.setFont("helvetica", "bold");
      doc.text(String(value), pad + 50, y);
      y += 6;
    };

    // ── Club Details ──
    sectionTitle("Club Details");
    row("Club", club.title);
    row("Day", club.day);
    row("Sessions", `${club.sessions} sessions`);
    const datesStr = club.dates.map((d) => `${d.month}: ${d.days.join(", ")}`).join("  |  ");
    // wrap long dates
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grey);
    doc.text("Dates", pad, y);
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    const wrapped = doc.splitTextToSize(datesStr, w - pad - pad - 50);
    doc.text(wrapped, pad + 50, y);
    y += wrapped.length * 5 + 3;

    y += 4;

    // ── Registration Details ──
    sectionTitle("Registration Details");
    row("Parent / Guardian", form.parentName);
    row("Child's Name", form.childName);
    row("Year Group", form.yearGroup);
    row("Email", form.parentEmail);
    row("Phone", form.parentPhone);
    if (form.comments) row("Comments", form.comments);

    y += 4;

    // ── Payment ──
    sectionTitle("Payment");
    row("Sessions", `${club.sessions} sessions included`);

    // Total row with background
    y += 2;
    doc.setFillColor(...teal);
    doc.roundedRect(pad, y - 4, w - pad * 2, 12, 2, 2, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("Total Due", pad + 4, y + 4);
    doc.text(`\u00a3${(club.price ?? 60).toFixed(2)}`, w - pad - 4, y + 4, { align: "right" });
    y += 18;

    // ── Bank Transfer ──
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...teal);
    doc.text("Bank Transfer Instructions:", pad, y);
    y += 5;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...dark);
    doc.text(
      `Account Name: Wimbledon Learning Centre   Sort Code: XX-XX-XX   Account No: XXXXXXXX`,
      pad, y
    );
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.setTextColor(220, 38, 38);
    doc.text(`Payment Reference: ${currentRef}`, pad, y);
    y += 4.5;

    doc.setFont("helvetica", "oblique");
    doc.setFontSize(7.5);
    doc.setTextColor(...grey);
    doc.text("(CRITICAL: You MUST include this exact Reference number as the payment reference when making your transfer.)", pad, y);

    // ── Footer ──
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grey);
    doc.text(
      "Wimbledon Learning Centre  \u00b7  contact@wimbledonlearningcentre.co.uk  \u00b7  wimbledonlearningcentre.co.uk",
      w / 2, 287,
      { align: "center" }
    );
    doc.setDrawColor(...lightGrey);
    doc.line(pad, 283, w - pad, 283);

    doc.save(`WLC-Invoice-${currentRef}.pdf`);
  };

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-main/60 focus:ring-2 focus:ring-main/10 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Form header */}
      <div className="bg-gradient-to-r from-[#0a2e3d] to-[#0e3a4d] px-6 sm:px-8 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Club Registration</h2>
            <p className="text-white/60 text-xs mt-0.5 truncate max-w-full">
              {club.title}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-3">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s
                  ? "bg-main text-white"
                  : "bg-white/10 text-white/40"
                  }`}
              >
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span
                className={`text-xs font-medium ${step >= s ? "text-white" : "text-white/40"
                  }`}
              >
                {s === 1 ? "Your Details" : "Payment"}
              </span>
              {s < 2 && (
                <div
                  className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${step > 1 ? "bg-main" : "bg-white/20"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form body */}
      <div className="px-6 sm:px-8 py-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-10"
            >
              <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 text-xl mb-2">
                Registration Submitted!
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
                We&apos;ll be in touch soon with confirmation details for{" "}
                <span className="font-medium text-gray-700">
                  {form.childName}
                </span>
                .
              </p>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Parent / Guardian Name *</label>
                  <input
                    id="parentName"
                    className={inputClass}
                    placeholder="Full name"
                    value={form.parentName}
                    onChange={handleChange("parentName")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Child&apos;s Name *</label>
                  <input
                    id="childName"
                    className={inputClass}
                    placeholder="Full name"
                    value={form.childName}
                    onChange={handleChange("childName")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    id="parentEmail"
                    type="email"
                    className={inputClass}
                    placeholder="parent@email.com"
                    value={form.parentEmail}
                    onChange={handleChange("parentEmail")}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    id="parentPhone"
                    type="tel"
                    className={inputClass}
                    placeholder="07XXX XXXXXX"
                    value={form.parentPhone}
                    onChange={handleChange("parentPhone")}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Child&apos;s Year Group *</label>
                <input
                  id="yearGroup"
                  className={inputClass}
                  placeholder="e.g. Year 3"
                  value={form.yearGroup}
                  onChange={handleChange("yearGroup")}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Any Other Comments{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="comments"
                  className={`${inputClass} resize-none h-24`}
                  placeholder="Allergies, additional needs, etc."
                  value={form.comments}
                  onChange={handleChange("comments")}
                />
              </div>
              <div className="pt-2 flex justify-end">
                <Button
                  size="m"
                  variant="primary"
                  icon={ArrowRight}
                  onClick={handleContinueToPayment}
                  disabled={!canProceed}
                >
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-4"
            >
              {/* Summary */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Registration Summary
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-gray-500">Child</span>
                  <span className="text-gray-900 font-medium">
                    {form.childName}
                  </span>
                  <span className="text-gray-500">Year Group</span>
                  <span className="text-gray-900 font-medium">
                    {form.yearGroup}
                  </span>
                  <span className="text-gray-500">Club</span>
                  <span className="text-gray-900 font-medium truncate">
                    {club.title}
                  </span>
                  <span className="text-gray-500">Sessions</span>
                  <span className="text-gray-900 font-medium">
                    {club.sessions} Sessions
                  </span>
                  <span className="text-gray-500 font-semibold pt-2 border-t border-gray-200">
                    Reference
                  </span>
                  <span className="text-red-500 font-bold font-mono pt-2 border-t border-gray-200">
                    {uniqueRef}
                  </span>
                  <span className="text-gray-500 font-semibold pt-2 border-t border-gray-200">
                    Total
                  </span>
                  <span className="text-main font-bold text-base pt-2 border-t border-gray-200">
                    £{club.price?.toFixed(2) || "60.00"}
                  </span>
                </div>
              </div>

              {/* Warning box */}
              <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4 text-xs text-amber-800 space-y-1">
                <p className="font-semibold flex items-center gap-1">
                  <span>⚠️</span> IMPORTANT BANK TRANSFER INSTRUCTION:
                </p>
                <p>
                  If you choose to pay via Bank Transfer, you <span className="font-bold underline text-amber-950">MUST</span> enter the reference <span className="font-bold font-mono text-amber-950 px-1.5 py-0.5 bg-amber-100/70 rounded border border-amber-200/50">{uniqueRef}</span> as your payment reference so we can verify your booking.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                Choose how you&apos;d like to complete your registration:
              </p>

              {/* Payment options */}
              <button
                id="payWithStripe"
                onClick={handlePayment}
                className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-main/40 hover:bg-main/[0.02] transition-all duration-300 text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-main/10 to-main/5 flex items-center justify-center group-hover:from-main/20 group-hover:to-main/10 transition-all">
                  <CreditCard className="w-6 h-6 text-main" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-gray-900 text-sm">
                    Pay with Stripe
                  </span>
                  <span className="block text-gray-500 text-xs mt-0.5">
                    Secure online payment via card
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-main transition-colors" />
              </button>

              <button
                id="downloadInvoice"
                onClick={handleInvoice}
                className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-sec/40 hover:bg-sec/[0.02] transition-all duration-300 text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sec/10 to-sec/5 flex items-center justify-center group-hover:from-sec/20 group-hover:to-sec/10 transition-all">
                  <Download className="w-6 h-6 text-sec" />
                </div>
                <div className="flex-1">
                  <span className="block font-semibold text-gray-900 text-sm">
                    Download Invoice
                  </span>
                  <span className="block text-gray-500 text-xs mt-0.5">
                    Download PDF &amp; pay via bank transfer
                  </span>
                </div>
                <Download className="w-4 h-4 text-gray-400 group-hover:text-sec transition-colors" />
              </button>

              <div className="pt-2 flex justify-start">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════ Page ═══════ */
export default function ClubApplyPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const school = searchParams.get("school");

  // Next.js 16: params is a Promise — must be unwrapped with React.use()
  const { id } = React.use(params);

  // Build the back href: /clubs?school=... if we know the school
  const backHref = school
    ? `/clubs?school=${encodeURIComponent(school)}`
    : "/clubs";

  const club = findClub(id);

  if (!club) {
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
            <ClubDetail club={club} school={school} backHref={backHref} router={router} />
          </motion.div>

          {/* ── Right: Registration form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            <RegistrationForm club={club} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
