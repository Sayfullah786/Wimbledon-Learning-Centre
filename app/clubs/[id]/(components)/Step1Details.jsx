import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const Step1Details = ({ form, handleChange, canProceed, handleContinueToPayment }) => {
  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-main/60 focus:ring-2 focus:ring-main/10 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
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
          Any Other Comments <span className="text-gray-400 font-normal">(optional)</span>
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
  );
};

export default Step1Details;
