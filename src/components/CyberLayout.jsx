import React from "react";
import clsx from "clsx";

/**
 * CyberLayout
 *
 * Full-screen wrapper that applies the dark cyber security grid background
 * plus a soft radial glow overlay. Use this to wrap top-level pages
 * or dashboard shells.
 */
export default function CyberLayout({ children, className }) {
  return (
    <div className={clsx("min-h-screen bg-dark-950 bg-cyber-grid text-dark-50 relative overflow-hidden", className)}>
      {/* Radial gradient glow overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.20),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.95),_transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}
