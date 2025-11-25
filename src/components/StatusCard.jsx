import React from "react";
import clsx from "clsx";

/**
 * StatusCard
 *
 * type:
 * - success: green accent border & glow
 * - danger: red danger border & glow
 */

const typeStyles = {
  success: {
    border: "border-accent-500/40",
    glow: "shadow-glow-success",
    badgeBg: "bg-accent-500/15",
    badgeText: "text-accent-300",
  },
  danger: {
    border: "border-danger-500/40",
    glow: "shadow-glow-danger",
    badgeBg: "bg-danger-500/15",
    badgeText: "text-danger-300",
  },
};

export default function StatusCard({
  type = "success",
  title,
  description,
  icon: Icon,
  children,
  className,
}) {
  const styles = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={clsx(
        "relative rounded-xl bg-dark-900/80 border px-4 py-3 md:px-5 md:py-4 backdrop-blur-sm transition-shadow",
        styles.border,
        styles.glow,
        className
      )}
    >
      {/* Gradient border accent */}
      <div className="pointer-events-none absolute inset-[1px] rounded-[11px] border border-transparent bg-gradient-to-r from-primary-500/30 via-dark-900 to-primary-700/20 opacity-60" />

      <div className="relative z-10 flex items-start gap-3">
        {Icon && (
          <div
            className={clsx(
              "mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-dark-700 shadow-glow-sm",
              styles.badgeBg
            )}
          >
            <Icon className="w-4 h-4 text-primary-200" />
          </div>
        )}
        <div className="space-y-1 text-sm">
          {title && <h3 className="font-semibold text-dark-50">{title}</h3>}
          {description && (
            <p className="text-xs text-dark-300 leading-relaxed">{description}</p>
          )}
          {children && <div className="mt-2 text-xs text-dark-200">{children}</div>}
        </div>
      </div>
    </div>
  );
}
