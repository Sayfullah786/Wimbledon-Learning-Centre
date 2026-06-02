"use client";

import { useState } from "react";

const ZohoWebform = () => {
  const [status, setStatus] = useState("idle");

  const handleSubmit = () => {
    console.log("Form submitted");
    setStatus("sending");

    setTimeout(() => setStatus("sent"), 1200);
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form
      method="POST"
      action="https://crm.zoho.eu/crm/WebForm?rid=1a409e3561f4ed98610beee216b9a7e1"
      target="zoho_iframe"
      onSubmit={handleSubmit}
      className="w-full max-w-lg flex items-center gap-2 border border-gray-300 rounded-2xl p-2 shadow-sm bg-white max-sm:text-sm"
    >
      {/* Hidden Zoho Fields */}
      <input
        type="hidden"
        name="xnQsjsdp"
        value="74f3a4b0309e693c8eb0483031c9f266e150910c03b800297b17cfb717c361d1"
      />
      <input
        type="hidden"
        name="xmIwtLD"
        value="8cad7cec3ebca01da9b83c4a6571770f9bed1934f1410bb86ff6f3d3bdd86fa1316740dc6b00088404d23b17f569b4c2"
      />
      <input type="hidden" name="actionType" value="Q3VzdG9tTW9kdWxlNA==" />
      <input
        type="hidden"
        name="returnURL"
        value="https://wimbledonlearningcentre.com"
      />

      {/* Email Input (Browser Validation Works 👍) */}
      <input
        type="email"
        name="Email"
        required
        placeholder="Enter your email address"
        className="w-full px-2 py-1 sm:py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring focus:ring-main transition text-xs sm:text-sm"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className={`${
          status === "sent"
            ? "bg-sec"
            : status === "sending"
            ? "bg-gray-400"
            : "bg-main hover:bg-black"
        } text-white whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-sm`}
      >
        {status === "sending"
          ? "Sending…"
          : status === "sent"
          ? "Sent!"
          : "Get Resources"}
      </button>

      {/* Invisible iframe for Zoho */}
      <iframe name="zoho_iframe" style={{ display: "none" }}></iframe>
    </form>
  );
};

export default ZohoWebform;
