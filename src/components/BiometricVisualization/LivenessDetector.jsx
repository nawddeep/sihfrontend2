import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function LivenessDetector({ isDetecting = true, livenessScore = 85 }) {
  const [detectionPhase, setDetectionPhase] = useState('blinking'); // blinking, smile, head_turn
  const [phaseProgress, setPhaseProgress] = useState(0);

  useEffect(() => {
    if (!isDetecting) return;

    const interval = setInterval(() => {
      setPhaseProgress(prev => {
        if (prev >= 100) {
          setDetectionPhase(curr => {
            const phases = ['blinking', 'smile', 'head_turn'];
            const nextIndex = (phases.indexOf(curr) + 1) % phases.length;
            return phases[nextIndex];
          });
          return 0;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isDetecting]);

  const getPhaseLabel = () => {
    const labels = {
      blinking: 'Detecting Blink Pattern',
      smile: 'Detecting Smile',
      head_turn: 'Detecting Head Movement',
    };
    return labels[detectionPhase] || 'Analyzing...';
  };

  const getLivenessStatus = () => {
    if (livenessScore >= 90) return { status: 'verified', color: 'green', label: 'Verified' };
    if (livenessScore >= 75) return { status: 'likely', color: 'blue', label: 'Likely Human' };
    if (livenessScore >= 50) return { status: 'uncertain', color: 'yellow', label: 'Uncertain' };
    return { status: 'fake', color: 'red', label: 'Suspected Spoof' };
  };

  const status = getLivenessStatus();

  return (
    <div className="space-y-4">
      {/* Main Detection Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gray-800 rounded-lg border border-gray-700 p-6 overflow-hidden"
      >
        {/* Background Animation */}
        {isDetecting && (
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #FF9933 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, #0066CC 0%, transparent 50%)',
                'radial-gradient(circle at 50% 100%, #138808 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center py-8">
          {/* Face Circle */}
          <motion.div
            className={`w-32 h-40 rounded-full border-4 flex items-center justify-center relative overflow-hidden ${
              isDetecting
                ? `border-${status.color}-500 bg-${status.color}-500/5`
                : `border-gray-600 bg-gray-700/50`
            }`}
          >
            {/* Eyes */}
            <div className="absolute top-1/3 left-1/4">
              <motion.div
                animate={{ scaleY: [1, 0, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-4 h-6 bg-white rounded-full"
              />
            </div>
            <div className="absolute top-1/3 right-1/4">
              <motion.div
                animate={{ scaleY: [1, 0, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-4 h-6 bg-white rounded-full"
              />
            </div>

            {/* Mouth */}
            <motion.path
              className="absolute bottom-1/4"
              animate={{
                d: [
                  'M 40 60 Q 50 65 60 60',
                  'M 40 60 Q 50 70 60 60',
                  'M 40 60 Q 50 65 60 60',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Pulse Ring */}
            <motion.div
              className={`absolute inset-0 border-2 border-${status.color}-500 rounded-full`}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </motion.div>

          {/* Detection Phase */}
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold text-gray-300 mb-2">
              {isDetecting ? getPhaseLabel() : 'Detection Complete'}
            </p>

            {isDetecting && (
              <>
                {/* Progress Bar */}
                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-gradient-to-r from-saffron to-orange-600"
                    animate={{ width: `${phaseProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Loading Animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 mx-auto mt-3"
                >
                  <Loader size={24} className="text-saffron" />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Liveness Score */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-300">Liveness Score</span>
          <span className={`text-2xl font-bold text-${status.color}-500`}>
            {livenessScore}%
          </span>
        </div>

        {/* Score Bar */}
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-saffron to-orange-600"
            initial={{ width: 0 }}
            animate={{ width: `${livenessScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          {status.status === 'verified' ? (
            <CheckCircle size={18} className={`text-${status.color}-500`} />
          ) : (
            <AlertCircle size={18} className={`text-${status.color}-500`} />
          )}
          <span className={`text-sm font-semibold text-${status.color}-500`}>
            {status.label}
          </span>
        </div>
      </motion.div>

      {/* Detection Phases */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">Detection Steps</h4>
        <div className="space-y-2">
          {['Blink Detection', 'Smile Detection', 'Head Movement'].map((phase, idx) => {
            const isActive = detectionPhase === ['blinking', 'smile', 'head_turn'][idx];
            const isComplete = ['blinking', 'smile', 'head_turn'].indexOf(detectionPhase) > idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  isActive
                    ? 'border-saffron bg-saffron/10'
                    : isComplete
                    ? 'border-green-600 bg-green-600/10'
                    : 'border-gray-600 bg-gray-700/50'
                }`}
              >
                {isComplete ? (
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                ) : isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Loader size={18} className="text-saffron flex-shrink-0" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                )}
                <span className={`text-sm font-semibold ${
                  isActive
                    ? 'text-saffron'
                    : isComplete
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}>
                  {phase}
                </span>
                {isActive && (
                  <div className="ml-auto text-xs text-saffron font-semibold">
                    {phaseProgress}%
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Anti-Spoofing Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3">Anti-Spoofing Checks</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Blood Flow', status: 'verified' },
            { label: 'Texture Analysis', status: 'verified' },
            { label: 'Frequency Analysis', status: livenessScore > 75 ? 'verified' : 'warning' },
            { label: 'Micro-expressions', status: livenessScore > 80 ? 'verified' : 'checking' },
          ].map((check, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-2 rounded-lg border flex items-center gap-2 ${
                check.status === 'verified'
                  ? 'border-green-600 bg-green-600/10'
                  : check.status === 'warning'
                  ? 'border-yellow-600 bg-yellow-600/10'
                  : 'border-blue-600 bg-blue-600/10'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  check.status === 'verified'
                    ? 'bg-green-500'
                    : check.status === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}
              />
              <span className="text-xs text-gray-300">{check.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
