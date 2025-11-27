import React from "react";
import clsx from "clsx";

/**
 * CyberLayout - Government Edition
 *
 * Full-screen wrapper with Indian government theme
 * Clean professional background with Ashoka pattern
 */
export default function CyberLayout({ children, className }) {
  return (
    <div className={clsx("min-h-screen bg-govGray-100 text-govGray-700 relative overflow-hidden", className)}>
      {/* Ashoka pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(28,54,100,0.05),_transparent_60%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}
