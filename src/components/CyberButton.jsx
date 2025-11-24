import React from "react";
import clsx from "clsx";

/**
 * CyberButton
 *
 * Variants:
 * - primary (default): solid primary button
 * - outline: transparent with primary border
 * - ghost: subtle, for secondary actions
 */
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses = {
  primary:
    "bg-primary-500 text-dark-950 shadow-glow-md hover:bg-primary-400 hover:shadow-glow-lg active:scale-95",
  outline:
    "border border-primary-500/60 text-primary-100 bg-dark-900/60 hover:bg-primary-500/10 hover:shadow-glow-sm active:scale-95",
  ghost:
    "text-dark-100 bg-dark-900/40 hover:bg-dark-800/80 hover:text-primary-100 active:scale-95",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm md:text-base",
};

export default function CyberButton({
  variant = "primary",
  size = "md",
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  ...props
}) {
  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {LeftIcon && <LeftIcon className="w-4 h-4" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4" />}
    </button>
  );
}
