"use client";
import React, { useEffect } from "react";

const ZohoForm = () => {
  useEffect(() => {
    // Load Zoho analytics script
    const script = document.createElement("script");
    script.src =
      "https://crm.zohopublic.eu/crm/WebFormAnalyticsServeServlet?rid=7a4275eef8c52e67ab9b850bb1bbb2e8da05e70a89f1d9f6b271433c2a6cf5246e4e9f1f497b598e5dda072c2613af7fgid4fe6353234a604d7b425087b851709e0817b017caf3828ad65bcd066965e3256gid8b4fbfc96727d6dcd337f1165bd4e8e8afa9e1c11b5e5ffa95ac9f118e457dcbgid2c1820ebe908296489bfd7b7a855cbf44e6704b61a3259148b22e288baacf6f9&tw=63151522bb6f134eed160be5608bfacdf5de6015059b14c2e641edfc9a2579bb";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const checkMandatory = (e) => {
    const form = e.target;
    const nameField = form["Last Name"];
    if (!nameField.value.trim()) {
      alert("Name cannot be empty");
      nameField.focus();
      e.preventDefault();
      return false;
    }
    form.querySelector(".formsubmit")?.setAttribute("disabled", true);
    return true;
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Enquiry Form
      </h2>
      <form
        id="webform840433000001078014"
        action="https://crm.zoho.eu/crm/WebToLeadForm"
        name="WebToLeads840433000001078014"
        method="POST"
        acceptCharset="UTF-8"
        onSubmit={checkMandatory}
        className="space-y-4"
      >
        <input
          type="hidden"
          name="xnQsjsdp"
          value="3dfd8e558e9ae88490910b5a97f199978de6bcf0887f8367c641962881c97c4f"
        />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input
          type="hidden"
          name="xmIwtLD"
          value="25964d3ff724203c3b12523a61d7870e60309cb6928557d9cf26173ef0a2e085692f6bf757a0f2d4d5dc3ea281e793f9"
        />
        <input type="hidden" name="actionType" value="TGVhZHM=" />
        <input
          type="hidden"
          name="returnURL"
          value="https://wimbledonlearningcentre.com"
        />

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="Last_Name" className="font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="Last_Name"
            name="Last Name"
            maxLength="80"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="Email" className="font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            maxLength="100"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="Phone" className="font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            maxLength="30"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Enquiry */}
        <div className="flex flex-col">
          <label
            htmlFor="Description"
            className="font-medium text-gray-700 mb-1"
          >
            Enquiry
          </label>
          <textarea
            id="Description"
            name="Description"
            className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            rows={4}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button
            type="reset"
            className="bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ZohoForm;
