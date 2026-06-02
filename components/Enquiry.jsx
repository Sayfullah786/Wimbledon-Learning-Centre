import React from "react";
import ZohoEnquiryForm from "./ui/ZohoEnquiryForm";
import OpeningHours from "./ui/OpeningHours";

const Enquiry = () => {
  return (
    <>
      {/* <ZohoForm /> */}
      <section id="enquiry" className="p-sec sm:!pt-0">
        <div className="maxWSec mx-auto ">
          <h2 className="font-bebas h2 sm:mb-8 text-center">
            Have an <span className="text-main">Enquiry?</span>
          </h2>
          <div className="flex max-lg:flex-col sm:gap-6">
            {/* Detail */}
            <div className="flex-1 px-6 py-6 flex flex-col gap-8 items-center text-center">
              <div>
                <h4 className="h4">Let us help!</h4>
                <p className="text-gray-600 mt-1 max-w-[54ch] text-sm">
                  If you're unsure about what type of tuition will work best for
                  you, just tell us a little more about your needs. We will get
                  back to you as soon as possible with the answers you need!
                </p>
              </div>
              <div>
                <h4 className="h4">Wimbledon Learning Centre</h4>
                <p className="text-gray-600 mt-1 max-w-[54ch] text-sm">
                  hello@wimbledonlearningcentre.com
                </p>
              </div>

              <OpeningHours />
            </div>

            <div className="max-lg:hidden w-px min-h-full py-12">
              <div className="w-full h-full bg-main/20"></div>
            </div>

            {/* Form */}
            <ZohoEnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
