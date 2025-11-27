import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Fingerprint, Scan, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function MultiFacetMatch({ matchScores = {} }) {
  const [expandedScore, setExpandedScore] = useState('overall');

  const scores = {
    overall: matchScores.overall || 87,
    face: matchScores.face || 89,
    iris: matchScores.iris || 85,
    fingerprint: matchScores.fingerprint || 88,
    voice: matchScores.voice || 82,
    behavioural: matchScores.behavioural || 83,
  };

  const biometricMethods = [
    {
      key: 'face',
      label: 'Face Recognition',
      icon: Eye,
      score: scores.face,
      threshold: 85,
      details: {
        landmarks: 468,
        confidence: 95,
        resolution: '1080p',
        liveness: 'Verified',
      },
    },
    {
      key: 'iris',
      label: 'Iris Scan',
      icon: Scan,
      score: scores.iris,
      threshold: 85,
      details: {
        patterns: 256,
        uniqueness: 98,
        clarity: 94,
        response: '250ms',
      },
    },
    {
      key: 'fingerprint',
      label: 'Fingerprint',
      icon: Fingerprint,
      score: scores.fingerprint,
      threshold: 85,
      details: {
        minutiae: 42,
        minutiaConfidence: 99,
        quality: 96,
        storage: 'Encrypted',
      },
    },
  ];

  const getScoreColor = (score, threshold = 85) => {
    if (score >= threshold) return { color: 'green', bg: 'bg-green-900/20', border: 'border-green-700' };
    if (score >= threshold - 10) return { color: 'yellow', bg: 'bg-yellow-900/20', border: 'border-yellow-700' };
    return { color: 'red', bg: 'bg-red-900/20', border: 'border-red-700' };
  };

  const getScoreStatus = (score) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 85) return 'Strong Match';
    if (score >= 75) return 'Good Match';
    if (score >= 60) return 'Weak Match';
    return 'No Match';
  };

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-saffron transition"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-lg font-bold text-saffron mb-2">Overall Match Score</h4>
            <p className="text-sm text-gray-400">Combined biometric verification result</p>
          </div>
          <CheckCircle size={28} className="text-green-500" />
        </div>

        {/* Score Display */}
        <div className="flex items-center gap-8">
          {/* Large Score Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="relative w-24 h-24"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#444444"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#FF9933"
                strokeWidth="8"
                strokeDasharray="282.7"
                initial={{ strokeDashoffset: 282.7 }}
                animate={{ strokeDashoffset: 282.7 * (1 - scores.overall / 100) }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-saffron">{scores.overall}</p>
                <p className="text-xs text-gray-400">%</p>
              </div>
            </div>
          </motion.div>

          {/* Score Info */}
          <div className="flex-1">
            <p className="text-2xl font-bold text-white mb-2">{getScoreStatus(scores.overall)}</p>
            <p className="text-sm text-gray-400 mb-4">
              {scores.overall >= 85
                ? 'All biometric modalities confirm user identity with high confidence'
                : 'Some biometric modalities need verification'}
            </p>

            {/* Thresholds */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Confidence Level</span>
                <span className="text-saffron font-semibold">{scores.overall.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-saffron to-orange-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${scores.overall}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Biometric Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {biometricMethods.map((method, idx) => {
          const Icon = method.icon;
          const scoreColor = getScoreColor(method.score, method.threshold);

          return (
            <motion.button
              key={method.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() =>
                setExpandedScore(expandedScore === method.key ? 'overall' : method.key)
              }
              whileHover={{ scale: 1.02 }}
              className={`text-left p-4 rounded-lg border transition cursor-pointer ${
                scoreColor.bg
              } ${scoreColor.border}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <Icon size={20} className={`text-${scoreColor.color}-500`} />
                  <span className="font-semibold text-gray-300">{method.label}</span>
                </div>
                {method.score >= method.threshold ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <AlertCircle size={18} className="text-yellow-500" />
                )}
              </div>

              {/* Score */}
              <p className={`text-3xl font-bold text-${scoreColor.color}-500 mb-2`}>
                {method.score}%
              </p>

              {/* Threshold */}
              <div className="text-xs text-gray-400 mb-2">
                Threshold: {method.threshold}%
              </div>

              {/* Mini Progress */}
              <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${scoreColor.color}-500`}
                  style={{ width: `${Math.min(100, (method.score / method.threshold) * 100)}%` }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expandedScore !== 'overall' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 overflow-hidden"
          >
            {biometricMethods
              .filter(m => m.key === expandedScore)
              .map(method => (
                <div key={method.key}>
                  <h4 className="text-lg font-bold text-saffron mb-4 flex items-center gap-2">
                    {React.createElement(method.icon, { size: 20 })}
                    {method.label} Details
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(method.details).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-700 p-3 rounded-lg"
                      >
                        <p className="text-xs text-gray-400 capitalize mb-1">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm font-bold text-saffron">{value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Analytics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h4 className="text-sm font-bold text-saffron mb-3 flex items-center gap-2">
          <TrendingUp size={18} />
          Multimodal Analysis
        </h4>

        <div className="space-y-3">
          {[
            { metric: 'Cross-Modal Consistency', value: 92 },
            { metric: 'Temporal Stability', value: 88 },
            { metric: 'Fusion Quality', value: 94 },
            { metric: 'Anti-Spoofing Score', value: 96 },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center p-2 bg-gray-700/50 rounded"
            >
              <span className="text-sm text-gray-300">{item.metric}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-saffron to-orange-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  />
                </div>
                <span className="text-sm font-bold text-saffron w-10 text-right">
                  {item.value}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`p-4 rounded-lg border flex gap-3 ${
          scores.overall >= 85
            ? 'border-green-700 bg-green-900/20'
            : 'border-yellow-700 bg-yellow-900/20'
        }`}
      >
        <CheckCircle
          size={20}
          className={scores.overall >= 85 ? 'text-green-500' : 'text-yellow-500'}
        />
        <div className="text-sm">
          <p className={`font-semibold ${scores.overall >= 85 ? 'text-green-400' : 'text-yellow-400'}`}>
            {scores.overall >= 85 ? 'Verified' : 'Review Recommended'}
          </p>
          <p className="text-gray-400">
            {scores.overall >= 85
              ? 'User identity verified through multiple biometric modalities'
              : 'Some biometric scores are below threshold. Manual review recommended.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
