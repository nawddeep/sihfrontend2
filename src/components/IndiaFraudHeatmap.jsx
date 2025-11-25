import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * IndiaFraudHeatmap
 * Schematic, tile-based India state heatmap using stateWiseFraudData.
 * States are rendered as clickable tiles with a green→red gradient based on fraud_density.
 */
export default function IndiaFraudHeatmap({ data, selectedState, onStateSelect }) {
  const [hovered, setHovered] = useState(null);

  const states = useMemo(
    () =>
      Object.entries(data || {}).map(([name, info]) => ({
        name,
        ...info,
      })),
    [data]
  );

  const { minDensity, maxDensity } = useMemo(() => {
    if (!states.length) return { minDensity: 0, maxDensity: 1 };
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    states.forEach((s) => {
      if (typeof s.fraud_density === "number") {
        min = Math.min(min, s.fraud_density);
        max = Math.max(max, s.fraud_density);
      }
    });
    if (!isFinite(min) || !isFinite(max)) return { minDensity: 0, maxDensity: 1 };
    return { minDensity: min, maxDensity: max };
  }, [states]);

  const getColorForDensity = (d) => {
    if (maxDensity === minDensity) {
      return "#22c55e"; // default green
    }
    const t = (d - minDensity) / (maxDensity - minDensity);
    // interpolate between green (#22c55e) and red (#ef4444)
    const rStart = 34,
      gStart = 197,
      bStart = 94;
    const rEnd = 239,
      gEnd = 68,
      bEnd = 68;
    const r = Math.round(rStart + (rEnd - rStart) * t);
    const g = Math.round(gStart + (gEnd - gStart) * t);
    const b = Math.round(bStart + (bEnd - bStart) * t);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleTileClick = (stateCode) => {
    if (onStateSelect) {
      // Toggle off if the same state is clicked again
      onStateSelect(stateCode === selectedState ? null : stateCode);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
        {states.map((s) => {
          // selectedState is treated as a state_code (e.g. 'MH', 'UP') for drill-down
          const isActive = selectedState === s.state_code;
          const baseColor = getColorForDensity(s.fraud_density ?? minDensity);
          return (
            <motion.button
              key={s.state_code}
              type="button"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered((prev) => (prev?.state_code === s.state_code ? null : prev))}
              onFocus={() => setHovered(s)}
              onBlur={() => setHovered(null)}
              onClick={() => handleTileClick(s.state_code)}
              className={`relative aspect-[4/3] rounded-md border text-[9px] font-mono flex items-center justify-center overflow-hidden transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                isActive ? "shadow-glow-md border-primary-400" : "border-dark-800"
              }`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              style={{
                background: `linear-gradient(145deg, rgba(15,23,42,0.92), rgba(15,23,42,0.85)), ${baseColor}`,
              }}
            >
              <span className="z-10 text-dark-100">
                {s.state_code}
              </span>
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: `radial-gradient(circle at 30% 30%, ${baseColor}, transparent 60%)` }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.state_code}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full rounded-xl bg-dark-950/95 border border-dark-700 px-3 py-2 text-[10px] text-dark-100 shadow-glow-sm backdrop-blur"
          >
            <div className="font-semibold text-[11px] mb-0.5">{hovered.name}</div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5">
              <span className="text-dark-400">
                Fraud density: <span className="text-danger-300">{Math.round((hovered.fraud_density ?? 0) * 100)}%</span>
              </span>
              <span className="text-dark-400">
                Cases: <span className="text-dark-100">{hovered.fraud_cases}</span>
              </span>
              <span className="text-dark-400">
                Verification: <span className="text-accent-300">{hovered.verification_rate}%</span>
              </span>
            </div>
            {hovered.risk_level && (
              <div className="mt-0.5 text-[9px] text-dark-500">
                Risk level: <span className="uppercase">{hovered.risk_level}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-dark-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          <span>Low fraud density</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <span>High fraud density</span>
        </div>
      </div>
    </div>
  );
}
