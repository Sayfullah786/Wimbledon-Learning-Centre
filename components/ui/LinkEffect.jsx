"use client";
import React from "react";
import { motion } from "framer-motion";

const LinkEffect = ({
  children,
  icon: Icon = null,
  iconPosition = "left",
  className = "",
}) => {
  const transition = {
    duration: 0.5,
    ease: [0.215, 0.61, 0.355, 1],
  };

  const textVariants = {
    initial: { y: 0 },
    hover: { y: "-100%" },
  };

  const textAltVariants = {
    initial: { y: "100%" },
    hover: { y: "0%" },
  };

  const iconVariants = {
    initial: { x: 0, y: 0 },
    hover: { x: "100%", y: "-100%" },
  };

  const iconAltVariants = {
    initial: { x: "-100%", y: "100%" },
    hover: { x: 0, y: 0 },
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-[0.3em] text-inherit font-inherit leading-[1.5] whitespace-nowrap py-[0.2em] px-[0.6em] cursor-pointer ${className}`}
      initial="initial"
      whileHover="hover"
      animate="initial"
    >
      {/* Left Icon */}
      {Icon && iconPosition === "left" && (
        <span className="relative h-full flex overflow-hidden">
          <motion.span
            className="flex p-[0.3em] h-full"
            variants={iconVariants}
            transition={transition}
          >
            <Icon className="w-[1em] h-[1em]" />
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 flex p-[0.3em] h-full"
            variants={iconAltVariants}
            transition={transition}
          >
            <Icon className="w-[1em] h-[1em]" />
          </motion.span>
        </span>
      )}

      {/* Text */}
      <span className="relative flex overflow-hidden mt-0.5">
        <motion.span
          className="block"
          variants={textVariants}
          transition={transition}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0 block"
          variants={textAltVariants}
          transition={transition}
        >
          {children}
        </motion.span>
      </span>

      {/* Right Icon */}
      {Icon && iconPosition === "right" && (
        <span className="relative h-full flex overflow-hidden">
          <motion.span
            className="flex p-[0.3em] h-full"
            variants={iconVariants}
            transition={transition}
          >
            <Icon className="w-[1em] h-[1em]" />
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 flex p-[0.3em] h-full"
            variants={iconAltVariants}
            transition={transition}
          >
            <Icon className="w-[1em] h-[1em]" />
          </motion.span>
        </span>
      )}
    </motion.span>
  );
};

export default LinkEffect;
