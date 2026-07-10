import React from "react";
import { ArrowLeft, ArrowRight, CreditCard, Download, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Step2Payment = ({
  club,
  form,
  uniqueRef,
  remainingSessionsCount,
  errorMessage,
  submitting,
  handlePayment,
  handleInvoice,
  setStep,
}) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="space-y-4"
    >
      {/* Error Box */}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs">
          {errorMessage}
        </div>
      )}

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
          <span className="text-gray-900 font-medium truncate min-w-0">
            {club.name}
          </span>
          <span className="text-gray-500">Sessions</span>
          <span className="text-gray-900 font-medium">
            {remainingSessionsCount} Sessions
          </span>
          <span className="text-gray-500 font-semibold pt-2 border-t border-gray-200">
            Reference
          </span>
          <span className="text-gray-900 font-bold font-mono pt-2 border-t border-gray-200">
            {uniqueRef}
          </span>
          <span className="text-gray-500 font-semibold pt-2 border-t border-gray-200">
            Total
          </span>
          <span className="text-main font-bold text-base pt-2 border-t border-gray-200">
            £{((club.price_per_block ? parseFloat(club.price_per_block) : 11.00) * remainingSessionsCount).toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Choose how you&apos;d like to complete your registration:
      </p>

      {/* Payment options */}
      <button
        id="payWithStripe"
        onClick={handlePayment}
        disabled={submitting}
        className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-main/40 hover:bg-main/[0.02] transition-all duration-300 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-main/10 to-main/5 flex items-center justify-center group-hover:from-main/20 group-hover:to-main/10 transition-all">
          {submitting ? <Loader2 className="w-6 h-6 text-main animate-spin" /> : <CreditCard className="w-6 h-6 text-main" />}
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
        disabled={submitting}
        className="w-full group flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-sec/40 hover:bg-sec/[0.02] transition-all duration-300 text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sec/10 to-sec/5 flex items-center justify-center group-hover:from-sec/20 group-hover:to-sec/10 transition-all">
          {submitting ? <Loader2 className="w-6 h-6 text-sec animate-spin" /> : <Download className="w-6 h-6 text-sec" />}
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
          disabled={submitting}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to details
        </button>
      </div>
    </motion.div>
  );
};

export default Step2Payment;
