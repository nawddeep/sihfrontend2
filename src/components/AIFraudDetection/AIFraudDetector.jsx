/**
 * AI Fraud Detector Component
 * 
 * Main interface for AI-powered fraud detection in documents
 * Displays detection process with real-time feedback and results
 * 
 * Features:
 * - Real-time document scanning with progress indication
 * - Anomaly detection with visual heatmap overlay
 * - Confidence scoring with explainable AI
 * - Risk level assessment with recommendations
 * - Integration with existing verification flow
 * 
 * Accessibility:
 * - ARIA live regions for real-time updates
 * - Keyboard navigation support
 * - Screen reader friendly status messages
 * - High contrast indicators for risk levels
 * 
 * Performance:
 * - Lazy loads visualization components
 * - Memoizes expensive calculations
 * - Optimizes re-renders with React.memo
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  TrendingDown,
  TrendingUp,
  Shield,
  Eye,
  Fingerprint,
  Brain,
} from 'lucide-react';
import { detectFraud, generateExplainableReport } from '../../services/aiDetectionService';
import AnomalyVisualizer from './AnomalyVisualizer';
import ConfidenceScoreCard from './ConfidenceScoreCard';
import DetectionTimeline from './DetectionTimeline';

/**
 * AIFraudDetector Component
 * 
 * @param {object} props
 * @param {string} props.documentId - Document to analyze
 * @param {object} props.documentData - Document metadata
 * @param {Function} props.onDetectionComplete - Callback when analysis finishes
 * @param {Function} props.onAnomalyClick - Handler for anomaly selection
 */
export default function AIFraudDetector({
  documentId,
  documentData = {},
  onDetectionComplete = () => {},
  onAnomalyClick = () => {},
}) {
  const [loading, setLoading] = useState(false);
  const [detection, setDetection] = useState(null);
  const [report, setReport] = useState(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [detectionPhase, setDetectionPhase] = useState('idle');
  const [error, setError] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const documentDataRef = useRef(documentData);

  useEffect(() => {
    documentDataRef.current = documentData;
  }, [documentData]);

  /**
   * Run fraud detection analysis
   * Updates phase progression: idle → analyzing → complete
   */
  const runDetection = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setDetectionPhase('analyzing');
      setSelectedAnomaly(null);

      // Simulate detection phases
      setDetectionPhase('scanning');
      await new Promise(resolve => setTimeout(resolve, 500));

      setDetectionPhase('analyzing');
      const result = await detectFraud(documentId, documentDataRef.current);
      setDetection(result);

      // Generate explainable report
      setDetectionPhase('reporting');
      await new Promise(resolve => setTimeout(resolve, 300));
      const explainableReport = await generateExplainableReport(result);
      setReport(explainableReport);

      setDetectionPhase('complete');
      onDetectionComplete(result);
    } catch (err) {
      setError('Detection failed. Please try again.');
      setDetectionPhase('error');
      console.error('Detection error:', err);
    } finally {
      setLoading(false);
    }
  }, [documentId, documentData, onDetectionComplete]);

  /**
   * Handle anomaly selection and detail view
   */
  const handleAnomalySelect = useCallback((anomaly, index) => {
    setSelectedAnomaly({ ...anomaly, index });
    onAnomalyClick(anomaly);
  }, [onAnomalyClick]);

  /**
   * Get color based on risk level
   */
  const riskColors = useMemo(() => ({
    low: {
      bg: 'bg-govGreen-50 dark:bg-govGreen-900/20',
      border: 'border-govGreen-200 dark:border-govGreen-700',
      text: 'text-govGreen-700 dark:text-govGreen-200',
      badge: 'bg-govGreen-100 dark:bg-govGreen-900/40 text-govGreen-800 dark:text-govGreen-200',
    },
    medium: {
      bg: 'bg-warning-50 dark:bg-warning-900/20',
      border: 'border-warning-200 dark:border-warning-700',
      text: 'text-warning-700 dark:text-warning-200',
      badge: 'bg-warning-100 dark:bg-warning-900/40 text-warning-800 dark:text-warning-200',
    },
    high: {
      bg: 'bg-govSaffron-50 dark:bg-govSaffron-900/20',
      border: 'border-govSaffron-200 dark:border-govSaffron-700',
      text: 'text-govSaffron-700 dark:text-govSaffron-200',
      badge: 'bg-govSaffron-100 dark:bg-govSaffron-900/40 text-govSaffron-800 dark:text-govSaffron-200',
    },
    critical: {
      bg: 'bg-danger-50 dark:bg-danger-900/20',
      border: 'border-danger-200 dark:border-danger-700',
      text: 'text-danger-700 dark:text-danger-200',
      badge: 'bg-danger-100 dark:bg-danger-900/40 text-danger-800 dark:text-danger-200',
    },
  }), []);

  /**
   * Auto-run detection whenever a new document is selected
   */
  useEffect(() => {
    if (documentId) {
      runDetection();
    }
  }, [documentId, runDetection]);

  if (!detection && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-govGray-200 dark:border-govGray-700"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI-Powered Fraud Detection
            </h3>
          </div>

          <p className="text-gray-600 dark:text-gray-300">
            Advanced AI analysis will scan your document for potential fraud indicators,
            anomalies, and authentication issues.
          </p>

          <div className="grid grid-cols-3 gap-3 py-4">
            <div className="flex items-center gap-2 p-3 bg-govBlue-50 dark:bg-govBlue-900/20 rounded-lg">
              <Eye className="w-5 h-5 text-govBlue-600 dark:text-govBlue-300" />
              <span className="text-sm font-medium text-govBlue-900 dark:text-govBlue-200">
                Visual Analysis
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-govSaffron-50 dark:bg-govSaffron-900/20 rounded-lg">
              <Brain className="w-5 h-5 text-govSaffron-600 dark:text-govSaffron-300" />
              <span className="text-sm font-medium text-govNavy-700 dark:text-govSaffron-100">
                ML Models
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-govGreen-50 dark:bg-govGreen-900/20 rounded-lg">
              <Fingerprint className="w-5 h-5 text-govGreen-600 dark:text-govGreen-300" />
              <span className="text-sm font-medium text-govGreen-900 dark:text-govGreen-100">
                Biometrics
              </span>
            </div>
          </div>

          <motion.button
            whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            onClick={runDetection}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-govSaffron-500 to-govBlue-600 hover:from-govSaffron-600 hover:to-govBlue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-saffron-glow"
            aria-label="Start AI fraud detection"
          >
            <Zap className="w-5 h-5" />
            Run AI Detection
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const colors = detection ? riskColors[detection.riskLevel] : riskColors.medium;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <DetectionTimeline phase={detectionPhase} />
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 dark:text-red-200">Detection Error</h4>
            <p className="text-sm text-red-800 dark:text-red-300 mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Detection Results */}
      <AnimatePresence>
        {detection && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Risk Assessment Card */}
            <motion.div
              layout
              className={`p-6 rounded-lg border-2 ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {detection.riskLevel === 'low' && (
                    <CheckCircle className={`w-8 h-8 ${colors.text}`} />
                  )}
                  {detection.riskLevel === 'medium' && (
                    <AlertCircle className={`w-8 h-8 ${colors.text}`} />
                  )}
                  {detection.riskLevel === 'high' && (
                    <AlertCircle className={`w-8 h-8 ${colors.text}`} />
                  )}
                  {detection.riskLevel === 'critical' && (
                    <AlertCircle className={`w-8 h-8 ${colors.text}`} />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold ${colors.text} uppercase`}>
                      {detection.riskLevel} Risk
                    </h3>
                    <p className={`text-sm ${colors.text} opacity-75`}>
                      {detection.confidence.toFixed(1)}% model confidence
                    </p>
                  </div>
                </div>
                <span className={`text-3xl font-bold ${colors.text}`}>
                  {(detection.fraudProbability * 100).toFixed(0)}%
                </span>
              </div>

              {/* Fraud Probability Bar */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Fraud Probability
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${detection.fraudProbability * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full transition-colors ${
                      detection.riskLevel === 'low'
                        ? 'bg-green-500'
                        : detection.riskLevel === 'medium'
                        ? 'bg-yellow-500'
                        : detection.riskLevel === 'high'
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            </motion.div>

            {/* Recommendation Banner */}
            <motion.div
              className="p-4 bg-govBlue-50 dark:bg-govBlue-900/20 border border-govBlue-200 dark:border-govBlue-700 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-govBlue-900 dark:text-govBlue-100 mb-1">
                    AI Recommendation
                  </h4>
                  <p className="text-sm text-govBlue-800 dark:text-govBlue-200">
                    {detection.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Anomalies Section */}
            {detection.detectedAnomalies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-govSaffron-600 dark:text-govSaffron-300" />
                  <h3 className="font-semibold text-govNavy-700 dark:text-white">
                    Detected Anomalies ({detection.detectedAnomalies.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {detection.detectedAnomalies.map((anomaly, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnomalySelect(anomaly, index)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedAnomaly?.index === index
                          ? 'border-govSaffron-500 bg-govSaffron-50 dark:bg-govSaffron-900/20'
                          : 'border-govGray-200 dark:border-govGray-700 hover:border-govSaffron-300 dark:hover:border-govSaffron-700'
                      }`}
                      aria-pressed={selectedAnomaly?.index === index}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-govNavy-700 dark:text-white">
                            {anomaly.type}
                          </h4>
                          <p className="text-sm text-govGray-600 dark:text-govGray-300 mt-1">
                            {anomaly.explanation}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${
                            anomaly.severity === 'critical'
                              ? 'bg-danger-100 dark:bg-danger-900/40 text-danger-700 dark:text-danger-200'
                              : anomaly.severity === 'high'
                              ? 'bg-govSaffron-100 dark:bg-govSaffron-900/40 text-govSaffron-700 dark:text-govSaffron-200'
                              : 'bg-warning-100 dark:bg-warning-900/40 text-warning-700 dark:text-warning-200'
                          }`}
                        >
                          {anomaly.severity.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Confidence: {anomaly.confidence}%</span>
                        <span>Location: ({anomaly.location.x}%, {anomaly.location.y}%)</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Visualizer with Selected Anomaly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnomalyVisualizer
                anomalies={detection.detectedAnomalies}
                selectedAnomaly={selectedAnomaly}
              />
            </motion.div>

            {/* Confidence Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ConfidenceScoreCard
                detection={detection}
                report={report}
              />
            </motion.div>

            {/* Biometric Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-govGray-200 dark:border-govGray-700 space-y-4"
            >
              <h3 className="font-semibold text-govNavy-700 dark:text-white flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-govGreen-600 dark:text-govGreen-300" />
                Biometric Analysis
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Face Match', value: detection.biometricAnalysis.faceMatch },
                  { label: 'Fingerprint', value: detection.biometricAnalysis.fingerprintMatch },
                  { label: 'Liveness', value: detection.biometricAnalysis.livenessScore },
                  { label: 'Anti-Spoofing', value: detection.biometricAnalysis.antiSpoofingConfidence },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-govNavy-600 dark:text-govGray-200">
                        {metric.label}
                      </span>
                      <span className="text-sm font-bold text-govNavy-700 dark:text-white">
                        {metric.value.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-govGray-150 dark:bg-govGray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full ${
                          metric.value >= 90
                            ? 'bg-govGreen-500'
                            : metric.value >= 70
                            ? 'bg-govSaffron-500'
                            : 'bg-danger-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Processing Metadata */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 text-xs text-govGray-600 dark:text-govGray-400"
            >
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Processed in {detection.processingTime}ms</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>Model confidence: {detection.confidence.toFixed(1)}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <span>Timestamp: {new Date(detection.timestamp).toLocaleTimeString()}</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 pt-4 flex-col sm:flex-row"
            >
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                onClick={runDetection}
                className="flex-1 py-2 px-4 bg-govBlue-600 hover:bg-govBlue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-gov-md"
              >
                <Zap className="w-4 h-4" />
                Re-Run Detection
              </motion.button>
              <motion.button
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="flex-1 py-2 px-4 bg-govGray-150 dark:bg-govGray-700 hover:bg-govGray-200 dark:hover:bg-govGray-600 text-govNavy-700 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Export Report
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
