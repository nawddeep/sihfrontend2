import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export default function ComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(100);
  const containerRef = useRef(null);

  const handleMouseMove = e => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = e => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newPosition = ((touch.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchend', () => setIsDragging(false));

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', () => setIsDragging(false));
        window.removeEventListener('touchend', () => setIsDragging(false));
      };
    }
  }, [isDragging]);

  // Mock biometric images
  const refImage = `https://api.placeholder.com/400/300?text=Reference+Image+(${zoom}%)`;
  const liveImage = `https://api.placeholder.com/400/300?text=Live+Capture+(${zoom}%)`;

  const matchScore = 92;
  const confidence = 0.98;

  return (
    <div className="space-y-4">
      {/* Main Comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
      >
        {/* Comparison Container */}
        <div
          ref={containerRef}
          className="relative w-full bg-black"
          style={{ aspectRatio: '4/3' }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Reference Image (Left) */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ scale: zoom / 100 }}
              className="w-full h-full flex items-center justify-center bg-gray-900"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl font-bold opacity-20">📷</div>
                  <p className="mt-2">Reference Image</p>
                </div>
              </div>
            </motion.div>
            {/* Label */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2 py-1 bg-saffron/20 border border-saffron text-xs font-bold text-saffron rounded">
                REFERENCE
              </span>
            </div>
          </div>

          {/* Live Image (Right) */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <motion.div
              style={{ scale: zoom / 100 }}
              className="w-full h-full flex items-center justify-center bg-gray-900"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl font-bold opacity-20">📸</div>
                  <p className="mt-2">Live Capture</p>
                </div>
              </div>
            </motion.div>
            {/* Label */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-1 bg-blue-500/20 border border-blue-500 text-xs font-bold text-blue-400 rounded">
                LIVE
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-saffron via-orange-400 to-saffron cursor-col-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: isDragging ? 1.2 : 1 }}
            >
              <div className="w-12 h-12 bg-saffron/20 border-2 border-saffron rounded-full flex items-center justify-center backdrop-blur">
                <div className="flex gap-1">
                  <ChevronLeft size={16} className="text-saffron" />
                  <ChevronRight size={16} className="text-saffron" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Zoom Controls */}
          <div className="absolute bottom-3 right-3 flex gap-2 bg-black/50 p-2 rounded-lg border border-gray-600">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setZoom(Math.max(100, zoom - 10))}
              className="p-1 hover:bg-white/10 rounded transition"
            >
              <ZoomOut size={16} className="text-gray-300" />
            </motion.button>
            <span className="text-xs font-bold text-gray-300 self-center px-2">{zoom}%</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-1 hover:bg-white/10 rounded transition"
            >
              <ZoomIn size={16} className="text-gray-300" />
            </motion.button>
          </div>

          {/* Position Indicator */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center">
            <p className="text-xs text-gray-400">{sliderPosition.toFixed(0)}%</p>
          </div>
        </div>

        {/* Slider Progress */}
        <div className="px-4 py-2 border-t border-gray-700 bg-gray-800/50">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-saffron to-orange-600"
              style={{ width: `${sliderPosition}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Match Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <p className="text-sm text-gray-400 mb-2">Match Score</p>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-saffron">{matchScore}%</div>
            <div className="flex-1">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-saffron to-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${matchScore}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-green-400">Strong Match</p>
            </div>
          </div>
        </motion.div>

        {/* Confidence Level */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
        >
          <p className="text-sm text-gray-400 mb-2">Confidence</p>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-blue-400">
              {(confidence * 100).toFixed(0)}%
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-xs text-blue-400">Very High</p>
            </div>
          </div>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-4 rounded-lg border border-green-700 bg-green-900/20"
        >
          <p className="text-sm text-gray-400 mb-2">Status</p>
          <div className="text-2xl font-bold text-green-400 mb-1">Verified</div>
          <p className="text-xs text-green-300">Identity confirmed</p>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">Feature Comparison</h4>

        <div className="space-y-3">
          {[
            { feature: 'Face Geometry', score: 94, match: 'excellent' },
            { feature: 'Skin Texture', score: 91, match: 'excellent' },
            { feature: 'Iris Pattern', score: 92, match: 'excellent' },
            { feature: 'Facial Landmarks', score: 89, match: 'good' },
            { feature: 'Lighting Adaptation', score: 87, match: 'good' },
            { feature: 'Head Pose Alignment', score: 88, match: 'good' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg border border-gray-600/50"
            >
              <span className="text-sm text-gray-300">{item.feature}</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${
                      item.match === 'excellent'
                        ? 'from-green-500 to-green-700'
                        : 'from-blue-500 to-blue-700'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                  />
                </div>
                <span className="text-sm font-bold text-saffron w-8 text-right">
                  {item.score}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Points */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-green-700 bg-green-900/10"
      >
        <h4 className="text-sm font-bold text-green-400 mb-3">Verification Summary</h4>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Face geometry matches reference image with 94% accuracy</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Biometric features consistently aligned across both images</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Liveness indicators confirm genuine present-time capture</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Anti-spoofing tests passed - no manipulation detected</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
