import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, AlertCircle, Zap } from 'lucide-react';

export default function AntiSpoofingIndicator({ spoofingDetected = false, confidence = 98 }) {
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisProgress(prev => (prev >= 100 ? 100 : prev + 5));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const spoofTests = [
    {
      name: 'Texture Analysis',
      status: 'passed',
      description: 'Analyzes surface texture patterns to detect printed photos or masks',
      confidence: 99,
    },
    {
      name: 'Blood Flow Detection',
      status: 'passed',
      description: 'Detects rPPG (remote photoplethysmography) signals indicating blood circulation',
      confidence: 96,
    },
    {
      name: 'Frequency Analysis',
      status: 'passed',
      description: 'Analyzes frequency spectrum to detect digital artifacts and compression',
      confidence: 94,
    },
    {
      name: '3D Depth Detection',
      status: 'passed',
      description: 'Measures facial depth to distinguish from flat 2D images',
      confidence: 97,
    },
    {
      name: 'Micro-expression Analysis',
      status: 'passed',
      description: 'Detects spontaneous micro-expressions impossible to replicate',
      confidence: 92,
    },
    {
      name: 'Eye Movement Tracking',
      status: 'passed',
      description: 'Tracks eye movement patterns and saccades indicating liveness',
      confidence: 95,
    },
  ];

  const getOverallStatus = () => {
    if (spoofingDetected) return { status: 'alert', color: 'red', label: 'Spoof Detected' };
    if (confidence >= 95) return { status: 'verified', color: 'green', label: 'Authentic' };
    if (confidence >= 85) return { status: 'likely', color: 'blue', label: 'Likely Authentic' };
    return { status: 'uncertain', color: 'yellow', label: 'Uncertain' };
  };

  const overallStatus = getOverallStatus();
  const passedTests = spoofTests.filter(t => t.status === 'passed').length;

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-lg border relative overflow-hidden ${
          overallStatus.color === 'red'
            ? 'bg-red-900/20 border-red-700'
            : overallStatus.color === 'green'
            ? 'bg-green-900/20 border-green-700'
            : overallStatus.color === 'blue'
            ? 'bg-blue-900/20 border-blue-700'
            : 'bg-yellow-900/20 border-yellow-700'
        }`}
      >
        {/* Animated Background */}
        {!spoofingDetected && (
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #138808 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, #0066CC 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {overallStatus.color === 'red' ? (
              <AlertTriangle size={32} className="text-red-500" />
            ) : (
              <Shield size={32} className={`text-${overallStatus.color}-500`} />
            )}
            <div>
              <h4 className={`text-xl font-bold text-${overallStatus.color}-500`}>
                {overallStatus.label}
              </h4>
              <p className="text-sm text-gray-400">
                {spoofingDetected
                  ? 'Spoof attack detected - verification denied'
                  : 'Anti-spoofing verification complete'}
              </p>
            </div>
          </div>

          {/* Confidence Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className={`px-3 py-1 rounded-full border ${
              overallStatus.color === 'red'
                ? 'bg-red-500/20 border-red-500 text-red-400'
                : overallStatus.color === 'green'
                ? 'bg-green-500/20 border-green-500 text-green-400'
                : overallStatus.color === 'blue'
                ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
            }`}
          >
            <span className="font-bold">{confidence}%</span>
          </motion.div>
        </div>

        {/* Confidence Meter */}
        <div className="space-y-2">
          <div className="h-3 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${
                overallStatus.color === 'red'
                  ? 'from-red-500 to-red-700'
                  : overallStatus.color === 'green'
                  ? 'from-green-500 to-green-700'
                  : overallStatus.color === 'blue'
                  ? 'from-blue-500 to-blue-700'
                  : 'from-yellow-500 to-yellow-700'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </motion.div>

      {/* Test Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold text-saffron">Test Results</h4>
          <span className="text-sm font-bold text-green-400">
            {passedTests}/{spoofTests.length} Passed
          </span>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-saffron to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${(passedTests / spoofTests.length) * 100}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Individual Tests */}
        <div className="space-y-2">
          {spoofTests.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50"
            >
              {/* Status Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
              >
                {test.status === 'passed' ? (
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-1" />
                )}
              </motion.div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-300">{test.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{test.description}</p>

                {/* Confidence Indicator */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${test.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-green-400 w-10 text-right">
                    {test.confidence}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Threat Detection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3 flex items-center gap-2">
          <Zap size={18} />
          Threat Detection
        </h4>

        <div className="space-y-2">
          {[
            { threat: 'Presentation Attack (2D/3D)', status: 'not-detected', severity: 'critical' },
            { threat: 'Printed Photo Attack', status: 'not-detected', severity: 'high' },
            { threat: 'Mask/Prosthetic Attack', status: 'not-detected', severity: 'high' },
            { threat: 'Video Replay Attack', status: 'not-detected', severity: 'critical' },
            { threat: 'Deep Fake Detection', status: 'not-detected', severity: 'critical' },
            { threat: 'Morphing Attack', status: 'not-detected', severity: 'high' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-center justify-between p-2 rounded-lg ${
                item.status === 'not-detected'
                  ? 'bg-green-900/20 border border-green-700'
                  : 'bg-red-900/20 border border-red-700'
              }`}
            >
              <span className="text-sm text-gray-300">{item.threat}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${
                  item.status === 'not-detected' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.status === 'not-detected' ? '✓ Safe' : '⚠ Detected'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advanced Analysis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">Advanced Indicators</h4>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Brightness Change', value: '0.3°' },
            { label: 'Head Pose Variation', value: '8.2°' },
            { label: 'Pupil Diameter Change', value: '12.5%' },
            { label: 'Blink Detection Rate', value: '18 blinks/min' },
            { label: 'Skin Elasticity Score', value: '94%' },
            { label: 'Face Symmetry Index', value: '96%' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-gray-700/50 p-2 rounded-lg border border-gray-600/50"
            >
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className="text-sm font-bold text-saffron">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendation */}
      {spoofingDetected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border border-red-700 bg-red-900/20"
        >
          <div className="flex gap-3 items-start">
            <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-red-400">Spoof Attack Detected</p>
              <p className="text-gray-400 mt-1">
                This attempt has been blocked. The system detected a spoofing attack. Verify
                user identity through alternative means.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
