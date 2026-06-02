import React from "react";

const iconSizeClasses = {
  small: "p-2",
  medium: "p-2",
  large: "p-3",
  icon: "",
};

const Button = ({
  children,
  size = "m",
  variant = "primary",
  icon: Icon = null,
  iconPosition = "right",
  onClick,
  disabled = false,
  className = "",
}) => {
  // ===== Size presets =====
  const sizes = {
    s: {
      button: "text-xs gap-2 font-normal",
      icon: "w-7 h-7 p-1.5 rounded-lg",
    },
    m: {
      button: "text-sm gap-2 font-normal",
      icon: "w-8 h-8 p-1.5 rounded-lg",
    },
    l: {
      button: "text-base gap-2 font-normal",
      icon: "w-9 h-9 p-2 rounded-lg",
    },
  };

  // ===== Variants =====
  const variants = {
    primary:
      "bg-white text-gray-900 hover:ring hover:ring-main hover:text-gray-950",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "bg-transparent border-2 border-main text-main hover:bg-main/30",
    ghost: "bg-transparent hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
    icon: "bg-transparent",
  };

  // ===== Icon color logic per variant =====
  const iconColors = {
    primary: "bg-main group-hover:bg-gray-900 text-white",
    secondary: "bg-gray-400 group-hover:bg-gray-500 text-white",
    outline: "bg-main group-hover:bg-main text-white",
    ghost: "!p-1 text-gray-600 group-hover:text-gray-900",
    danger: "bg-red-700 group-hover:bg-red-800 text-white",
    icon: "bg-white group-hover:bg-main group-hover:text-white",
  };

  const iconOnly = !children;
  // ===== Render =====
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer inline-flex items-center justify-center
        font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-default
        group relative overflow-hidden
        ${sizes[size].button}
        ${variants[variant]}
        ${className}
        ${!iconOnly ? "rounded-xl p-1.5" : "rounded-lg"}
      `}
    >
      {/* Icon Left */}
      {Icon && iconPosition === "left" && (
        <div
          className={`
            transition-all duration-300 relative z-10
            ${iconColors[variant]} ${sizes[size].icon}
          `}
        >
          <Icon className="w-full h-full" />
        </div>
      )}

      {/* Label */}
      {children && (
        <span
          className={`${variant === "primary" ? "px-6" : ""} relative z-10`}
        >
          {children}
        </span>
      )}

      {/* Icon Right */}
      {Icon && iconPosition === "right" && (
        <div
          className={`
            transition-all duration-300 relative z-10
            ${iconColors[variant]} ${sizes[size].icon}
          `}
        >
          <Icon className="w-full h-full" />
        </div>
      )}

      {/* Shine Effect (Primary variant only) */}
      {variant === "primary" && (
        <div
          className="
          absolute rotate-[30deg] scale-y-150 bg-main/15
          transition-all duration-700 -left-20 top-0
          h-[150%] w-12 group-hover:left-[calc(100%+1rem)] group-active:-left-16
        "
        />
      )}
    </button>
  );
};

export default Button;
