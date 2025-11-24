import React from "react";
import { motion } from "framer-motion";

/**
 * Enhanced CyberButton with micro-interactions
 * Scale on click, glow effects, loading states
 */
export default function EnhancedCyberButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  leftIcon: LeftIcon,
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseClass =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-500 hover:bg-primary-400 text-dark-950 focus:ring-primary-400",
    outline:
      "border-2 border-primary-500 text-primary-300 hover:bg-primary-500/10 focus:ring-primary-400",
    ghost:
      "bg-transparent text-dark-300 hover:text-dark-100 hover:bg-dark-800 focus:ring-dark-600",
    danger:
      "bg-danger-500 hover:bg-danger-400 text-dark-950 focus:ring-danger-400",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[11px]",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${sizeClass} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          />
          Processing...
        </>
      ) : (
        <>
          {LeftIcon && (
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring" }}
            >
              <LeftIcon className="w-4 h-4" />
            </motion.div>
          )}
          {children}
        </>
      )}
    </motion.button>
  );
}
