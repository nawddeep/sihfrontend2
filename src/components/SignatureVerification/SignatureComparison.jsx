import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { GlowEffect } from "../animations/AnimatedComponents";

export default function SignatureComparison({ referenceSig, uploadedSig, matchPercentage = 87 }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-dark-100">Comparison Visualization</h4>
          <p className="text-xs text-dark-400 mt-1">Reference vs. Uploaded signature alignment</p>
        </div>

        {/* Overlay Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowOverlay(!showOverlay)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-900/60 border border-dark-700 hover:border-primary-500/50 text-xs font-medium text-primary-300 transition-colors"
        >
          {showOverlay ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          {showOverlay ? "Hide" : "Show"} Overlay
        </motion.button>
      </div>

      {/* Comparison Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        {/* Reference Signature */}
        <motion.div variants={itemVariants}>
          <GlowEffect intensity={0.7}>
            <div className="p-4 rounded-lg border border-dark-700 bg-dark-900/60 space-y-3">
              <div>
                <p className="text-xs font-semibold text-dark-300 uppercase tracking-wide mb-2">
                  Reference Signature
                </p>
                <p className="text-[10px] text-dark-500">From staff records</p>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-video rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 overflow-hidden flex items-center justify-center"
              >
                {/* Placeholder for reference image */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-dark-600 font-script tracking-wider">
                    John
                  </div>
                  <p className="text-[10px] text-dark-500 mt-2">Reference sample</p>
                </div>

                {/* Decorative border pulse */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 border-2 border-primary-500/30 rounded-lg pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-2 rounded-md bg-dark-800/60 text-[10px] text-dark-400 border border-dark-700/50"
              >
                <span className="font-semibold text-primary-400">Status:</span> Baseline established
              </motion.div>
            </div>
          </GlowEffect>
        </motion.div>

        {/* Uploaded Signature */}
        <motion.div variants={itemVariants}>
          <GlowEffect intensity={0.7}>
            <div className="p-4 rounded-lg border border-dark-700 bg-dark-900/60 space-y-3">
              <div>
                <p className="text-xs font-semibold text-dark-300 uppercase tracking-wide mb-2">
                  Uploaded Signature
                </p>
                <p className="text-[10px] text-dark-500">Current submission</p>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-video rounded-lg bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 overflow-hidden flex items-center justify-center"
              >
                {/* Placeholder for uploaded image */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-dark-600 font-script tracking-wider">
                    John
                  </div>
                  <p className="text-[10px] text-dark-500 mt-2">Current submission</p>
                </div>

                {/* Decorative border pulse - different color */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 border-2 border-accent-500/30 rounded-lg pointer-events-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-2 rounded-md bg-dark-800/60 text-[10px] text-dark-400 border border-dark-700/50"
              >
                <span className="font-semibold text-accent-400">Status:</span> Ready for analysis
              </motion.div>
            </div>
          </GlowEffect>
        </motion.div>
      </motion.div>

      {/* Overlay Controls */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 rounded-lg bg-dark-900/60 border border-primary-500/20 space-y-4">
              <div>
                <p className="text-xs font-semibold text-dark-300 mb-2">Overlay Opacity</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={overlayOpacity * 100}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value) / 100)}
                    className="flex-1 h-2 bg-dark-700 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <span className="text-xs font-semibold text-primary-400 w-10 text-right">
                    {Math.round(overlayOpacity * 100)}%
                  </span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-primary-500/5 border border-primary-500/20"
              >
                <p className="text-xs text-primary-300">
                  <span className="font-semibold">Tip:</span> Adjust overlay opacity to better see alignment
                  differences between signatures
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Match Result */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-lg border border-dark-700 bg-dark-900/60 space-y-3"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-dark-100">Overall Match Quality</p>
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl font-bold text-accent-400"
          >
            {matchPercentage}%
          </motion.span>
        </div>

        {/* Match Quality Bar */}
        <div className="space-y-2">
          <motion.div
            className="h-2 rounded-full bg-dark-700 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
              initial={{ width: 0 }}
              animate={{ width: `${matchPercentage}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.div>

          <div className="flex justify-between text-[10px] text-dark-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Match Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-2 p-2 rounded-md bg-accent-500/5 border border-accent-500/20"
        >
          <div className="flex-1 text-xs leading-relaxed text-accent-300">
            <span className="font-semibold">Assessment:</span> Signatures show excellent alignment. Curve
            patterns, stroke width, and overall structure match closely. High confidence in authentication.
          </div>
        </motion.div>
      </motion.div>

      {/* Detection Points */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-lg border border-dark-700 bg-dark-900/60"
      >
        <p className="text-xs font-semibold text-dark-300 mb-3">Key Matching Points</p>

        <div className="grid grid-cols-2 gap-3 text-[10px]">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 p-2 rounded-md bg-dark-800/60 border border-dark-700/50"
          >
            <span className="w-2 h-2 rounded-full bg-accent-400" />
            <span className="text-dark-300">Stroke consistency</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="flex items-center gap-2 p-2 rounded-md bg-dark-800/60 border border-dark-700/50"
          >
            <span className="w-2 h-2 rounded-full bg-accent-400" />
            <span className="text-dark-300">Angle alignment</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 p-2 rounded-md bg-dark-800/60 border border-dark-700/50"
          >
            <span className="w-2 h-2 rounded-full bg-accent-400" />
            <span className="text-dark-300">Curvature match</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-2 p-2 rounded-md bg-dark-800/60 border border-dark-700/50"
          >
            <span className="w-2 h-2 rounded-full bg-accent-400" />
            <span className="text-dark-300">Pressure variation</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
