import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { GlowEffect } from "../animations/AnimatedComponents";

export default function SimilaritySlider({ onThresholdChange, disabled = false }) {
  const [threshold, setThreshold] = useState(85);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (onThresholdChange) {
      onThresholdChange(threshold);
    }
  }, [threshold, onThresholdChange]);

  const getThresholdStatus = () => {
    if (threshold < 70) return { label: "Low", color: "text-danger-400", bg: "bg-danger-500/10" };
    if (threshold < 85) return { label: "Medium", color: "text-warning-400", bg: "bg-warning-500/10" };
    return { label: "High", color: "text-accent-400", bg: "bg-accent-500/10" };
  };

  const status = getThresholdStatus();

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-dark-100">Similarity Threshold</h4>
          <p className="text-xs text-dark-400 mt-1">
            Adjust the confidence level required for signature acceptance
          </p>
        </div>

        {/* Current Value */}
        <motion.div
          animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
          className={`px-3 py-2 rounded-lg ${status.bg}`}
        >
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${status.color}`}>{threshold}%</span>
            <span className={`text-xs font-medium ${status.color}`}>{status.label}</span>
          </div>
        </motion.div>
      </div>

      {/* Slider Container with Glow */}
      <GlowEffect intensity={isFocused ? 1 : 0.5}>
        <motion.div
          animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
          className="p-4 rounded-lg bg-dark-900/60 border border-dark-700 transition-all duration-300"
        >
          {/* Custom Slider */}
          <div className="relative pt-2 pb-6">
            {/* Slider Track Background */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-danger-500/30 via-warning-500/30 to-accent-500/30 rounded-full" />

            {/* Filled Track */}
            <motion.div
              className="absolute top-5 left-0 h-1 bg-gradient-to-r from-danger-500 via-warning-500 to-accent-500 rounded-full pointer-events-none"
              style={{ width: `${threshold}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />

            {/* Slider Input */}
            <input
              type="range"
              min="50"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={disabled}
              className="relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-10 slider-thumb disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "transparent",
              }}
            />

            {/* Slider Markers */}
            <div className="flex justify-between text-xs text-dark-500 mt-2">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </motion.div>
      </GlowEffect>

      {/* Threshold Guide */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-3 text-center"
      >
        {/* Low Risk */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-3 rounded-lg bg-danger-500/5 border border-danger-500/20 cursor-help"
        >
          <div className="text-[10px] font-semibold text-danger-300 uppercase tracking-wide">
            Lenient
          </div>
          <p className="text-[11px] text-danger-400 mt-1">50-70%</p>
          <p className="text-[10px] text-dark-400 mt-1">More matches accepted</p>
        </motion.div>

        {/* Medium Risk */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-3 rounded-lg bg-warning-500/5 border border-warning-500/20 cursor-help"
        >
          <div className="text-[10px] font-semibold text-warning-300 uppercase tracking-wide">
            Balanced
          </div>
          <p className="text-[11px] text-warning-400 mt-1">70-85%</p>
          <p className="text-[10px] text-dark-400 mt-1">Recommended setting</p>
        </motion.div>

        {/* High Risk */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-3 rounded-lg bg-accent-500/5 border border-accent-500/20 cursor-help"
        >
          <div className="text-[10px] font-semibold text-accent-300 uppercase tracking-wide">
            Strict
          </div>
          <p className="text-[11px] text-accent-400 mt-1">85-100%</p>
          <p className="text-[10px] text-dark-400 mt-1">Fewer false matches</p>
        </motion.div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`p-3 rounded-lg border flex items-start gap-2 text-xs ${
          threshold >= 85
            ? "bg-accent-500/10 border-accent-500/30 text-accent-300"
            : "bg-warning-500/10 border-warning-500/30 text-warning-300"
        }`}
      >
        {threshold >= 85 ? (
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
        )}
        <span>
          {threshold >= 85
            ? "High accuracy mode - Recommended for critical verification"
            : "Lower threshold - May result in more false positives"}
        </span>
      </motion.div>
    </div>
  );
}
