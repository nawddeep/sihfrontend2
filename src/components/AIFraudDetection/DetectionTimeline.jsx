/**
 * Detection Timeline Component
 * 
 * Description: Shows the detection process steps with animations
 * Provides visual feedback during AI analysis
 * 
 * Features:
 * - Step-by-step process visualization
 * - Animated progress indicators
 * - Real-time status messages
 * 
 * Accessibility:
 * - ARIA live regions
 * - Progress announcements
 * - Semantic markup
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Brain, BarChart3, CheckCircle, Zap } from 'lucide-react';

/**
 * DetectionTimeline Component
 * 
 * @param {object} props
 * @param {string} props.phase - Current detection phase
 */
export default function DetectionTimeline({ phase = 'idle' }) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    if (phase === 'analyzing') {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev.length >= 3) return [];
          return [...prev, prev.length];
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const phases = [
    {
      id: 'scanning',
      label: 'Scanning Document',
      description: 'Analyzing document structure and content',
      icon: Eye,
    },
    {
      id: 'analyzing',
      label: 'Running AI Analysis',
      description: 'Processing with ML models',
      icon: Brain,
    },
    {
      id: 'reporting',
      label: 'Generating Report',
      description: 'Compiling detailed findings',
      icon: BarChart3,
    },
    {
      id: 'complete',
      label: 'Analysis Complete',
      description: 'Ready to review results',
      icon: CheckCircle,
    },
  ];

  const phaseIndex = phases.findIndex(p => p.id === phase);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="flex-shrink-0"
        >
          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </motion.div>
        <div>
          <h3 className="font-semibold text-blue-900 dark:text-blue-200">
            AI Fraud Detection in Progress
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Advanced analysis running
            <span className="inline-flex gap-1 ml-1">
              {dots.map((dot) => (
                <motion.span
                  key={dot}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.6 }}
                  className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              ))}
            </span>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {phases.map((step, index) => {
          const isActive = index <= phaseIndex;
          const isCurrentPhase = index === phaseIndex;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection line */}
              {index < phases.length - 1 && (
                <motion.div
                  className="absolute left-6 top-12 w-0.5 h-8 bg-blue-200 dark:bg-blue-700"
                  animate={{
                    backgroundColor: isActive ? '#3b82f6' : '#bfdbfe',
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Step */}
              <div className="flex items-start gap-4">
                {/* Icon Circle */}
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{
                    scale: isCurrentPhase ? 1.1 : 1,
                    boxShadow: isCurrentPhase
                      ? '0 0 20px rgba(37, 99, 235, 0.4)'
                      : 'none',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={isCurrentPhase ? { rotate: 360 } : { rotate: 0 }}
                    transition={{
                      duration: isCurrentPhase ? 1 : 0,
                      repeat: isCurrentPhase ? Infinity : 0,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="pt-2 flex-1">
                  <motion.h4
                    className={`font-semibold ${
                      isActive
                        ? 'text-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {step.label}
                  </motion.h4>
                  <p
                    className={`text-sm ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-500 dark:text-gray-500'
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Progress indicator for current phase */}
                  {isCurrentPhase && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 max-w-xs h-1 bg-blue-200 dark:bg-blue-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        Processing...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-semibold text-blue-600 dark:text-blue-400">Status:</span> 
          {' '}
          {phase === 'scanning' && 'Analyzing document structure and extracting features...'}
          {phase === 'analyzing' && 'Running multiple ML models for fraud detection...'}
          {phase === 'reporting' && 'Generating detailed analysis report...'}
          {phase === 'complete' && 'Analysis complete! Review the results below.'}
        </p>
      </motion.div>

      {/* Estimated Time */}
      <div className="text-xs text-blue-600 dark:text-blue-400 text-center">
        Estimated time: ~2 seconds
      </div>
    </motion.div>
  );
}
