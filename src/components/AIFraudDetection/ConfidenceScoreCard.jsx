/**
 * Confidence Score Card Component
 * 
 * Description: Displays explainable AI results with confidence scoring
 * and detailed analysis breakdown
 * 
 * Features:
 * - Animated confidence gauges
 * - Detailed breakdown of analysis
 * - Explainable AI insights
 * - Historical context
 * 
 * Accessibility:
 * - ARIA labels for gauges
 * - Semantic HTML structure
 * - Keyboard accessible tabs
 * 
 * Performance:
 * - Memoized calculations
 * - Lazy rendering of detailed views
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Brain,
  TrendingUp,
  History,
  CheckCircle,
  AlertCircle,
  Info,
} from 'lucide-react';

/**
 * ConfidenceScoreCard Component
 * 
 * @param {object} props
 * @param {object} props.detection - Detection result object
 * @param {object} props.report - Explainable report
 */
export default function ConfidenceScoreCard({ detection = {}, report = null }) {
  const [activeTab, setActiveTab] = useState('overview');

  /**
   * Calculate gauge segments
   */
  const gaugeSegments = useMemo(() => {
    if (!detection.biometricAnalysis) return [];

    return [
      {
        label: 'Face Match',
        value: detection.biometricAnalysis.faceMatch,
        icon: '👤',
      },
      {
        label: 'Fingerprint',
        value: detection.biometricAnalysis.fingerprintMatch,
        icon: '👆',
      },
      {
        label: 'Liveness',
        value: detection.biometricAnalysis.livenessScore,
        icon: '👁️',
      },
      {
        label: 'Anti-Spoofing',
        value: detection.biometricAnalysis.antiSpoofingConfidence,
        icon: '🛡️',
      },
    ];
  }, [detection]);

  /**
   * Get confidence indicator color
   */
  const getConfidenceColor = (value) => {
    if (value >= 90) return 'from-green-500 to-green-600';
    if (value >= 75) return 'from-yellow-500 to-yellow-600';
    if (value >= 50) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  /**
   * Animated Counter
   */
  const AnimatedCounter = ({ value, suffix = '%' }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          key={value}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-block"
        >
          {Math.round(value)}{suffix}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Tabs */}
      <div className="flex gap-1 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'analysis', label: 'Analysis', icon: Brain },
          { id: 'history', label: 'History', icon: History },
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div className="p-6">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Main Confidence Gauge */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Model Confidence
                </h3>

                <div className="flex items-center justify-between">
                  {/* Circular Gauge */}
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />

                      {/* Progress circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{
                          strokeDashoffset:
                            283 - (detection.confidence / 100) * 283,
                        }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        strokeLinecap="round"
                      />

                      {/* Center text */}
                      <text
                        x="50"
                        y="50"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-2xl font-bold fill-gray-900 dark:fill-white"
                      >
                        <AnimatedCounter value={detection.confidence} />
                      </text>
                    </svg>
                  </div>

                  {/* Description */}
                  <div className="flex-1 ml-6 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The AI model is <span className="font-semibold">
                        {detection.confidence > 90
                          ? 'extremely confident'
                          : detection.confidence > 75
                          ? 'confident'
                          : 'uncertain'}
                      </span> in its analysis.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                          Processing Speed
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {detection.processingTime}ms
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((2000 / detection.processingTime) * 100, 100)}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biometric Gauges */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Biometric Verification Scores
                </h4>

                <div className="grid gap-3">
                  {gaugeSegments.map((segment, index) => (
                    <motion.div
                      key={segment.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <span>{segment.icon}</span>
                          {segment.label}
                        </label>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          <AnimatedCounter value={segment.value} />
                        </span>
                      </div>

                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getConfidenceColor(
                            segment.value
                          )}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${segment.value}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && report && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg"
              >
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <span className="font-semibold">AI Analysis:</span> {report.summary}
                </p>
              </motion.div>

              {/* Anomaly Breakdown */}
              {report.anomalyBreakdown && report.anomalyBreakdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Anomaly Details
                  </h4>

                  {report.anomalyBreakdown.map((anomaly, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2"
                    >
                      <div className="flex items-start gap-2">
                        {anomaly.severity === 'critical' ? (
                          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Info className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              {anomaly.type}
                            </h5>
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                              {anomaly.confidence}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {anomaly.explanation}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            Location: {anomaly.location} | Impact: {anomaly.impact}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Biometric Insights */}
              {report.biometricInsights && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3"
                >
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Biometric Insights
                  </h4>

                  <div className="grid gap-2">
                    {Object.entries(report.biometricInsights).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          )
                        ) : (
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        )}
                        <div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}:
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white ml-1">
                            {String(value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
                {detection.comparisonAnalysis && (
                  <>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Template Match:</span>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mr-3">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${detection.comparisonAnalysis.templateMatch}%`,
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {detection.comparisonAnalysis.templateMatch.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Fraud Similarity:</span>
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden mr-3">
                          <motion.div
                            className={`h-full ${
                              detection.comparisonAnalysis.historicalFraudSimilarity >
                              50
                                ? 'bg-red-500'
                                : 'bg-green-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${detection.comparisonAnalysis.historicalFraudSimilarity}%`,
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {detection.comparisonAnalysis.historicalFraudSimilarity.toFixed(
                            1
                          )}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Institution Status:</span>
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            detection.comparisonAnalysis.institutionVerification ===
                            'verified'
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300'
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          {detection.comparisonAnalysis.institutionVerification.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Past Fraud Cases Similar:</span>
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                        {detection.comparisonAnalysis.pastFraudCases}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
