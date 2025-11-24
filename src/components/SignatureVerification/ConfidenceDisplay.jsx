import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Zap } from "lucide-react";
import { CountUpAnimation, PulseEffect } from "../animations/AnimatedComponents";

export default function ConfidenceDisplay({ score = 0, status = "pending", matchedPoints = 0 }) {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    setDisplayScore(score);
  }, [score]);

  const getStatusInfo = () => {
    if (status === "verified")
      return {
        label: "Verified",
        color: "text-accent-400",
        bg: "bg-accent-500/10",
        border: "border-accent-500/30",
        icon: CheckCircle2,
      };
    if (status === "rejected")
      return {
        label: "Rejected",
        color: "text-danger-400",
        bg: "bg-danger-500/10",
        border: "border-danger-500/30",
        icon: AlertTriangle,
      };
    if (status === "warning")
      return {
        label: "Review Required",
        color: "text-warning-400",
        bg: "bg-warning-500/10",
        border: "border-warning-500/30",
        icon: AlertTriangle,
      };
    return {
      label: "Analyzing",
      color: "text-primary-400",
      bg: "bg-primary-500/10",
      border: "border-primary-500/30",
      icon: Zap,
    };
  };

  const info = getStatusInfo();
  const StatusIcon = info.icon;

  return (
    <div className="space-y-4">
      {/* Main Confidence Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-lg border ${info.bg} ${info.border} backdrop-blur-sm`}
      >
        <div className="flex items-start justify-between">
          {/* Score Display */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-dark-200 mb-3">Similarity Score</h4>

            <motion.div className="flex items-baseline gap-2">
              <motion.span
                key={displayScore}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-4xl font-bold ${info.color}`}
              >
                {displayScore.toFixed(1)}
              </motion.span>
              <span className="text-lg text-dark-400">%</span>
            </motion.div>

            {/* Confidence Bar */}
            <div className="mt-4 space-y-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="h-2 rounded-full bg-gradient-to-r from-danger-500 via-warning-500 to-accent-500 overflow-hidden"
              >
                <motion.div
                  className={`h-full ${
                    displayScore >= 85
                      ? "bg-accent-500/60"
                      : displayScore >= 70
                      ? "bg-warning-500/60"
                      : "bg-danger-500/60"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${displayScore}%` }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                />
              </motion.div>

              {/* Confidence Labels */}
              <div className="flex justify-between text-xs text-dark-400">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <PulseEffect intensity={status === "analyzing" ? 1 : 0}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="flex-shrink-0 ml-4"
            >
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${info.bg} ${info.border} border`}>
                <StatusIcon className={`w-5 h-5 ${info.color}`} />
                <span className={`text-sm font-semibold ${info.color}`}>{info.label}</span>
              </div>
            </motion.div>
          </PulseEffect>
        </div>
      </motion.div>

      {/* Detailed Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3"
      >
        {/* Matched Points */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-lg bg-dark-900/60 border border-dark-700 hover:border-primary-500/30 transition-all"
        >
          <p className="text-xs text-dark-400 mb-2">Matched Points</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-primary-400"
          >
            <CountUpAnimation value={matchedPoints} duration={2} />
          </motion.div>
          <p className="text-[10px] text-dark-500 mt-1">Feature matches detected</p>
        </motion.div>

        {/* Confidence Level */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-lg bg-dark-900/60 border border-dark-700 hover:border-accent-500/30 transition-all"
        >
          <p className="text-xs text-dark-400 mb-2">Confidence Level</p>
          <motion.div
            key={displayScore}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-accent-400"
          >
            {displayScore >= 85 ? "Very High" : displayScore >= 70 ? "High" : "Moderate"}
          </motion.div>
          <p className="text-[10px] text-dark-500 mt-1">Overall trust score</p>
        </motion.div>

        {/* Analysis Time */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-lg bg-dark-900/60 border border-dark-700 hover:border-secondary-500/30 transition-all"
        >
          <p className="text-xs text-dark-400 mb-2">Analysis Time</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-bold text-secondary-400"
          >
            2.34s
          </motion.div>
          <p className="text-[10px] text-dark-500 mt-1">Processing duration</p>
        </motion.div>

        {/* Match Accuracy */}
        <motion.div
          whileHover={{ y: -2 }}
          className="p-4 rounded-lg bg-dark-900/60 border border-dark-700 hover:border-primary-500/30 transition-all"
        >
          <p className="text-xs text-dark-400 mb-2">Accuracy</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold text-accent-400"
          >
            99.2%
          </motion.div>
          <p className="text-[10px] text-dark-500 mt-1">Pattern recognition</p>
        </motion.div>
      </motion.div>

      {/* Verdict Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-4 rounded-lg border ${
          displayScore >= 85
            ? "bg-accent-500/5 border-accent-500/30"
            : displayScore >= 70
            ? "bg-warning-500/5 border-warning-500/30"
            : "bg-danger-500/5 border-danger-500/30"
        }`}
      >
        <p className="text-xs font-semibold text-dark-200 mb-2">Analysis Verdict</p>
        <p
          className={`text-sm ${
            displayScore >= 85
              ? "text-accent-300"
              : displayScore >= 70
              ? "text-warning-300"
              : "text-danger-300"
          }`}
        >
          {displayScore >= 85
            ? "Signature matches with high confidence. Recommended for acceptance."
            : displayScore >= 70
            ? "Signature has moderate confidence. Manual review recommended."
            : "Signature has low confidence. Recommend rejection or additional verification."}
        </p>
      </motion.div>
    </div>
  );
}
