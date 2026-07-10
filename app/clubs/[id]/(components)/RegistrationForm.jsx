import React, { useState } from "react";
import { CheckCircle, Cpu } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useFormStore } from "@/lib/store";
import api from "@/lib/api";
import { generateInvoicePDF } from "./pdfGenerator";
import Step1Details from "./Step1Details";
import Step2Payment from "./Step2Payment";
import RegistrationSuccess from "./RegistrationSuccess";

const RegistrationForm = ({ club, activeBlock, remainingSessionsCount }) => {
  const [step, setStep] = useState(1);
  const form = useFormStore((state) => state.formData);
  const updateField = useFormStore((state) => state.updateField);
  const [submitted, setSubmitted] = useState(false);
  const uniqueRef = useFormStore((state) => state.reference);
  const setUniqueRef = useFormStore((state) => state.setReference);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (e) =>
    updateField(field, e.target.value);

  const canProceed =
    form.parentName &&
    form.childName &&
    form.parentEmail &&
    form.parentPhone &&
    form.yearGroup;

  const handleContinueToPayment = () => {
    if (!canProceed) return;
    if (!uniqueRef) {
      const firstWord = form.childName.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "").toUpperCase() || "STUDENT";
      const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
      setUniqueRef(`WLC-${firstWord}-${rand}`);
    }
    setStep(2);
  };

  const handlePayment = async () => {
    if (!activeBlock) {
      setErrorMessage("No active enrollment block found for this club.");
      return;
    }
    try {
      setSubmitting(true);
      setErrorMessage("");
      const res = await api.post("/payments/create-checkout-frictionless", {
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone,
        childName: form.childName,
        yearGroup: form.yearGroup,
        comments: form.comments,
        blockId: activeBlock.id,
      });

      if (res.data && res.data.sessionUrl) {
        window.location.href = res.data.sessionUrl;
      } else {
        throw new Error("Stripe checkout session URL was not returned.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Failed to initiate Stripe payment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvoice = async () => {
    if (!activeBlock) {
      setErrorMessage("No active enrollment block found for this club.");
      return;
    }
    try {
      setSubmitting(true);
      setErrorMessage("");

      // 1. Ensure we have a reference
      let currentRef = uniqueRef;
      if (!currentRef) {
        const firstWord = form.childName.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, "").toUpperCase() || "STUDENT";
        const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
        currentRef = `WLC-${firstWord}-${rand}`;
        setUniqueRef(currentRef);
      }

      // 2. Log payment and enrollment in database
      await api.post("/payments/create-bank-transfer", {
        parentName: form.parentName,
        parentEmail: form.parentEmail,
        parentPhone: form.parentPhone,
        childName: form.childName,
        yearGroup: form.yearGroup,
        comments: form.comments,
        blockId: activeBlock.id,
        reference: currentRef,
      });

      // 3. Generate and download PDF
      await generateInvoicePDF({
        club,
        activeBlock,
        form,
        currentRef,
        remainingSessionsCount,
      });

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Failed to register bank transfer.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderFormStep = () => {
    if (submitted) {
      return <RegistrationSuccess childName={form.childName} />;
    }

    if (step === 1) {
      return (
        <Step1Details
          form={form}
          handleChange={handleChange}
          canProceed={canProceed}
          handleContinueToPayment={handleContinueToPayment}
        />
      );
    }

    return (
      <Step2Payment
        club={club}
        form={form}
        uniqueRef={uniqueRef}
        remainingSessionsCount={remainingSessionsCount}
        errorMessage={errorMessage}
        submitting={submitting}
        handlePayment={handlePayment}
        handleInvoice={handleInvoice}
        setStep={setStep}
      />
    );
  };

  return (
    <div className="w-full min-w-0 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
      {/* Form header */}
      <div className="bg-gradient-to-r from-[#0a2e3d] to-[#0e3a4d] px-6 sm:px-8 py-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-white font-semibold text-lg">Club Registration</h2>
            <p className="text-white/60 text-xs mt-0.5 truncate max-w-full">
              {club.name}
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
          {renderFormStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegistrationForm;
