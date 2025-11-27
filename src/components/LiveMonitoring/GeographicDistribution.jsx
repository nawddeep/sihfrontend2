import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

export default function GeographicDistribution({ stateData = [] }) {
  const canvasRef = useRef(null);

  // Approximate state coordinates for visualization
  const stateCoordinates = {
    'Maharashtra': { x: 0.45, y: 0.55 },
    'Delhi': { x: 0.48, y: 0.35 },
    'Karnataka': { x: 0.42, y: 0.65 },
    'Tamil Nadu': { x: 0.48, y: 0.78 },
    'Gujarat': { x: 0.32, y: 0.45 },
    'Uttar Pradesh': { x: 0.52, y: 0.38 },
    'West Bengal': { x: 0.65, y: 0.32 },
    'Andhra Pradesh': { x: 0.52, y: 0.68 },
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateData.length) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Draw heatmap background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 153, 51, 0.05)');
    gradient.addColorStop(0.5, 'rgba(0, 102, 204, 0.05)');
    gradient.addColorStop(1, 'rgba(19, 136, 8, 0.05)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Find max fraud rate for scaling
    const maxFraudRate = Math.max(...stateData.map(s => s.fraudRate));

    // Draw state points with fraud intensity
    stateData.forEach(state => {
      const coords = stateCoordinates[state.state];
      if (!coords) return;

      const x = coords.x * width;
      const y = coords.y * height;

      // Fraud rate intensity (0-1)
      const intensity = state.fraudRate / maxFraudRate;

      // Draw outer circle (intensity based)
      const radius = 15 + intensity * 20;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

      if (intensity > 0.6) {
        // High fraud - red
        gradient.addColorStop(0, 'rgba(255, 100, 100, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.2)');
      } else if (intensity > 0.3) {
        // Medium fraud - orange
        gradient.addColorStop(0, 'rgba(255, 165, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 165, 0, 0.2)');
      } else {
        // Low fraud - green
        gradient.addColorStop(0, 'rgba(19, 136, 8, 0.8)');
        gradient.addColorStop(1, 'rgba(19, 136, 8, 0.2)');
      }

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Draw center circle
      ctx.fillStyle = '#FF9933';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Draw state label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(state.state.split(' ')[0], x, y + radius + 15);
    });

    // Draw border
    ctx.strokeStyle = '#444444';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, width, height);
  }, [stateData]);

  if (!stateData.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    );
  }

  // Calculate statistics
  const highFraudStates = stateData.filter(s => s.fraudRate > 8).sort((a, b) => b.fraudRate - a.fraudRate);
  const lowFraudStates = stateData.filter(s => s.fraudRate <= 8).sort((a, b) => a.fraudRate - b.fraudRate);

  return (
    <div className="space-y-4">
      {/* Canvas Heatmap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3 flex items-center gap-2">
          <MapPin size={16} />
          India Fraud Heatmap
        </h4>
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full border border-gray-700 rounded"
        />
        <div className="mt-3 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-600 to-green-400" />
            <span className="text-gray-400">Low (0-4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-400" />
            <span className="text-gray-400">Medium (4-8%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-600 to-red-400" />
            <span className="text-gray-400">High (8%+)</span>
          </div>
        </div>
      </motion.div>

      {/* State Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* High Fraud States */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-red-700/30"
        >
          <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
            <TrendingUp size={16} />
            High Fraud States
          </h4>
          <div className="space-y-2">
            {highFraudStates.map((state, idx) => (
              <motion.div
                key={state.state}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex justify-between items-center p-2 bg-red-900/20 rounded border border-red-700/20"
              >
                <span className="text-sm text-gray-300">{state.state}</span>
                <div className="flex gap-2 text-xs">
                  <span className="font-bold text-red-400">{state.fraudRate.toFixed(1)}%</span>
                  <span className="text-gray-500">{state.verifications.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Low Fraud States */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-green-700/30"
        >
          <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
            <TrendingDown size={16} />
            Safe States
          </h4>
          <div className="space-y-2">
            {lowFraudStates.map((state, idx) => (
              <motion.div
                key={state.state}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex justify-between items-center p-2 bg-green-900/20 rounded border border-green-700/20"
              >
                <span className="text-sm text-gray-300">{state.state}</span>
                <div className="flex gap-2 text-xs">
                  <span className="font-bold text-green-400">{state.fraudRate.toFixed(1)}%</span>
                  <span className="text-gray-500">{state.verifications.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        {[
          { label: 'Avg Fraud Rate', value: (stateData.reduce((s, a) => s + a.fraudRate, 0) / stateData.length).toFixed(1) + '%' },
          { label: 'Highest', value: Math.max(...stateData.map(s => s.fraudRate)).toFixed(1) + '%' },
          { label: 'Lowest', value: Math.min(...stateData.map(s => s.fraudRate)).toFixed(1) + '%' },
          { label: 'Total States', value: stateData.length },
        ].map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-lg font-bold text-saffron">{stat.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
