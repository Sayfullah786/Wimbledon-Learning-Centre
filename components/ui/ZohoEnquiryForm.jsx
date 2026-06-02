"use client";

import { Send } from "lucide-react";
import Button from "./Button";
import FormField from "./FormField";
import { useState } from "react";

const ZohoEnquiryForm = () => {
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        query: "",
    });

    return (
        <section className="lg:maxWSec flex-1 px-6 py-6 ">
            {/* Header */}
            <div className="text-center mb-6">
                <h4 className="leading-normal h4">Contact us!</h4>
                <p className="text-gray-600 text-sm">if you need more information</p>
            </div>

            {/* Zoho form */}
            <form
                id="crmWebToEntityForm"
                action="https://crm.zoho.eu/crm/WebToLeadForm"
                method="POST"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
                {/* Hidden Zoho fields */}
                <input
                    type="hidden"
                    name="xnQsjsdp"
                    value="1ded89250a7e3b7c115a0d3b2c32fb604698ee9162b662000cde61f998a98d24"
                />
                <input type="hidden" id="zc_gad" name="zc_gad" value="" />
                <input
                    type="hidden"
                    name="xmIwtLD"
                    value="ab32e4f9601990b1669726fce92b40e5aefde27defb8b97ce0cfe84919ec79ca51b13495d2e3ae248d24eca157df0d7f"
                />
                <input type="hidden" name="actionType" value="TGVhZHM=" />
                <input
                    type="hidden"
                    name="returnURL"
                    value="https://wimbledonlearningcentre.com"
                />

                {/* Full Name */}
                <FormField
                    label="Full Name"
                    name="Last Name"
                    placeholder="e.g. John Doe"
                    required
                />

                {/* Phone */}
                <FormField
                    label="Phone"
                    name="Phone"
                    placeholder="+440 00000 0000"
                />

                {/* Email (full width on sm) */}
                <div className="sm:col-span-2">
                    <FormField
                        label="Email"
                        name="Email"
                        placeholder="e.g. johndoe@example.com"
                    />
                </div>

                {/* Query textarea */}
                <div className="col-span-full">
                    <FormField
                        label="Your Query"
                        name="Description"
                        placeholder="Write your message here..."
                        textarea
                    />
                </div>

                {/* Submit */}
                <div className="col-span-full text-center">
                    <Button
                        size="s"
                        variant="primary"
                        type="submit"
                        icon={Send}
                        className="ring ring-black/30"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default ZohoEnquiryForm;
