/**
 * Anomaly Visualizer Component
 * 
 * Description: Displays visual heatmap overlay showing suspicious regions
 * in documents with interactive highlighting
 * 
 * Features:
 * - Heatmap rendering with canvas
 * - Interactive anomaly highlighting
 * - Real-time updates with smooth animations
 * - Responsive design for mobile
 * 
 * Accessibility:
 * - ARIA labels for interactive elements
 * - Keyboard navigation support
 * - Screen reader descriptions
 * 
 * Performance:
 * - Memoized component to prevent unnecessary re-renders
 * - Canvas rendering for performance
 * - Efficient event handling
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, Eye, EyeOff } from 'lucide-react';

/**
 * AnomalyVisualizer Component
 * 
 * @param {object} props
 * @param {Array} props.anomalies - Array of detected anomalies
 * @param {object} props.selectedAnomaly - Currently selected anomaly
 * @param {string} props.documentImage - URL to document image
 */
const AnomalyVisualizer = React.memo(function AnomalyVisualizer({
  anomalies = [],
  selectedAnomaly = null,
  documentImage = null,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [intensity, setIntensity] = useState(60);
  const [containerWidth, setContainerWidth] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  /**
   * Get color for anomaly based on severity
   */
  const severityColor = useMemo(() => ({
    critical: { r: 220, g: 20, b: 60, hex: '#DC143C' },
    high: { r: 255, g: 153, b: 51, hex: '#FF9933' },
    medium: { r: 0, g: 102, b: 204, hex: '#0066CC' },
    low: { r: 19, g: 136, b: 8, hex: '#138808' },
  }), []);

  /**
   * Draw heatmap on canvas
   */
  useEffect(() => {
    if (!canvasRef.current || !showHeatmap || anomalies.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match container
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.width * 0.75; // Maintain aspect ratio

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw heatmap for each anomaly
    anomalies.forEach((anomaly) => {
      const severity = anomaly.severity || 'medium';
      const color = severityColor[severity];
      const opacity = (intensity / 100) * 0.6;

      // Convert percentage-based location to pixel-based
      const x = (anomaly.location.x / 100) * canvas.width;
      const y = (anomaly.location.y / 100) * canvas.height;
      const width = (anomaly.location.width / 100) * canvas.width;
      const height = (anomaly.location.height / 100) * canvas.height;

      // Draw gradient circle effect
      const gradient = ctx.createRadialGradient(
        x + width / 2,
        y + height / 2,
        0,
        x + width / 2,
        y + height / 2,
        Math.max(width, height) / 2 + 20
      );

      gradient.addColorStop(
        0,
        `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`
      );
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rectangle outline
      ctx.strokeStyle = color.hex;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      // Draw corner markers
      const markerSize = 8;
      ctx.fillStyle = color.hex;
      ctx.fillRect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);
      ctx.fillRect(x + width - markerSize / 2, y - markerSize / 2, markerSize, markerSize);
      ctx.fillRect(x - markerSize / 2, y + height - markerSize / 2, markerSize, markerSize);
      ctx.fillRect(
        x + width - markerSize / 2,
        y + height - markerSize / 2,
        markerSize,
        markerSize
      );
    });
  }, [anomalies, showHeatmap, intensity, severityColor]);

  /**
   * Handle window resize for responsive canvas
   */
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (anomalies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center"
      >
        <Eye className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
        <p className="text-gray-600 dark:text-gray-300">
          No anomalies detected. Document appears clean.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      ref={containerRef}
      className="space-y-4"
    >
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-govSaffron-600 dark:text-govSaffron-300" />
            <h3 className="font-semibold text-govNavy-700 dark:text-white">
              Anomaly Heatmap
            </h3>
          </div>

          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={() => setShowHeatmap(!showHeatmap)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label={showHeatmap ? 'Hide heatmap' : 'Show heatmap'}
            aria-pressed={showHeatmap}
          >
            {showHeatmap ? (
              <Eye className="w-5 h-5 text-govBlue-600 dark:text-govBlue-300" />
            ) : (
              <EyeOff className="w-5 h-5 text-govGray-500 dark:text-govGray-300" />
            )}
          </motion.button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-4 gap-2 text-xs">
          {Object.entries(severityColor).map(([severity, color]) => (
            <div
              key={severity}
              className="flex items-center gap-2 p-2 bg-govGray-50 dark:bg-govGray-700 rounded"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color.hex }}
              />
              <span className="capitalize text-govNavy-600 dark:text-govGray-100">
                {severity}
              </span>
            </div>
          ))}
        </div>

        {/* Canvas Container */}
        <motion.div
          className="relative bg-govGray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <canvas
            ref={canvasRef}
            className="w-full border border-gray-300 dark:border-gray-600"
            role="img"
            aria-label={`Heatmap showing ${anomalies.length} detected anomalies`}
          />

          {/* Document Preview Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-govGray-400 dark:text-govGray-500">
            <p className="text-sm">Document Preview Area</p>
          </div>
        </motion.div>

        {/* Intensity Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
          <label
            htmlFor="heatmap-intensity"
            className="text-sm font-medium text-govNavy-700 dark:text-govGray-100"
            >
              Heatmap Intensity
            </label>
          <span className="text-sm font-semibold text-govNavy-700 dark:text-white">
              {intensity}%
            </span>
          </div>
          <input
            id="heatmap-intensity"
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-govGray-200 dark:bg-govGray-700 rounded-lg appearance-none cursor-pointer accent-govBlue-600"
            aria-label="Adjust heatmap intensity"
          />
        </div>

        {/* Anomalies List */}
        <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-govNavy-700 dark:text-white">
            Detected Issues
          </h4>

          {anomalies.map((anomaly, index) => {
            const color = severityColor[anomaly.severity];
            const isSelected = selectedAnomaly?.index === index;

            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border-l-4 transition-all ${
                  isSelected
                    ? 'bg-govBlue-50 dark:bg-govBlue-900/20 border-govBlue-500'
                    : 'bg-govGray-50 dark:bg-gray-700 border-govGray-300 dark:border-govGray-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: color.hex }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="font-semibold text-govNavy-700 dark:text-white text-sm">
                        {anomaly.type}
                      </h5>
                      <span
                        className="px-2 py-1 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: color.hex + '20',
                          color: color.hex,
                        }}
                      >
                        {anomaly.confidence}%
                      </span>
                    </div>
                      <p className="text-xs text-govGray-600 dark:text-govGray-300 mt-1 line-clamp-2">
                      {anomaly.explanation}
                    </p>
                    <div className="text-xs text-govGray-500 dark:text-gray-400 mt-2">
                      Location: ({anomaly.location.x}%, {anomaly.location.y}%) |
                      Size: {anomaly.location.width}% × {anomaly.location.height}%
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detailed View */}
      {selectedAnomaly && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-govBlue-50 dark:bg-govBlue-900/20 border border-govBlue-200 dark:border-govBlue-700 rounded-lg space-y-3"
        >
          <h4 className="font-semibold text-govBlue-900 dark:text-govBlue-100">
            {selectedAnomaly.type}
          </h4>

          {selectedAnomaly.detailedAnalysis && (
            <div className="space-y-2">
              {Object.entries(selectedAnomaly.detailedAnalysis).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm text-govBlue-800 dark:text-govBlue-100"
                >
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="text-right">
                    {typeof value === 'object'
                      ? JSON.stringify(value)
                      : String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

AnomalyVisualizer.displayName = 'AnomalyVisualizer';

export default AnomalyVisualizer;
