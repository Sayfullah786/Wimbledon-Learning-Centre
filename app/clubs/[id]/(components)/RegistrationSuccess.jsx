import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const RegistrationSuccess = ({ childName }) => {
  return (
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
          {childName}
        </span>
        .
      </p>
    </motion.div>
  );
};

export default RegistrationSuccess;
