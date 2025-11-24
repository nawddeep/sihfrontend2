import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import DragDropSignatureZone from "./DragDropSignatureZone";
import SimilaritySlider from "./SimilaritySlider";
import ConfidenceDisplay from "./ConfidenceDisplay";
import SignatureComparison from "./SignatureComparison";
import { analyzeSignature } from "../../services/simulationService";

export default function SignatureVerificationSection() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Configure, 3: Analyze, 4: Result
  const [uploadedFile, setUploadedFile] = useState(null);
  const [threshold, setThreshold] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const handleFileSelected = (file) => {
    setUploadedFile(file);
    setCurrentStep(2);
  };

  const handleThresholdChange = (value) => {
    setThreshold(value);
  };

  const handleStartAnalysis = async () => {
    if (!uploadedFile) return;

    setCurrentStep(3);
    setIsAnalyzing(true);

    try {
      const result = await analyzeSignature(uploadedFile, true);
      const finalConfidence = result.confidence;

      setConfidence(finalConfidence);
      setAnalysisResult({
        score: finalConfidence,
        status:
          finalConfidence >= threshold
            ? "verified"
            : finalConfidence >= 70
            ? "warning"
            : "rejected",
        matchedPoints: Math.floor(finalConfidence * 0.5) + 30,
      });

      setCurrentStep(4);
    } catch (err) {
      console.error("Signature analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setThreshold(85);
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setConfidence(0);
    setCurrentStep(1);
  };

  const handleAccept = () => {
    // Trigger success animation or callback
    console.log("Signature accepted");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-dark-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-400" />
          Signature Verification
        </h3>
        <p className="text-sm text-dark-400">
          Upload and analyze signature documents with AI-powered verification
        </p>
      </div>

      {/* Progress Steps */}
      <motion.div className="flex items-center justify-between">
        {[
          { step: 1, label: "Upload" },
          { step: 2, label: "Configure" },
          { step: 3, label: "Analyze" },
          { step: 4, label: "Result" },
        ].map((item, idx) => (
          <motion.div
            key={item.step}
            className="flex items-center flex-1"
            animate={{ opacity: currentStep >= item.step ? 1 : 0.5 }}
          >
            {/* Step Circle */}
            <motion.div
              animate={
                currentStep === item.step
                  ? {
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(147, 112, 219, 0.4)",
                    }
                  : currentStep > item.step
                  ? { scale: 1, backgroundColor: "rgb(34, 197, 94)" }
                  : { scale: 1 }
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${
                currentStep >= item.step
                  ? currentStep > item.step
                    ? "border-accent-500/60 bg-accent-500/20 text-accent-400"
                    : "border-primary-500 bg-primary-500/20 text-primary-400"
                  : "border-dark-600 bg-dark-900/60 text-dark-400"
              }`}
            >
              {currentStep > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.step}
            </motion.div>

            {/* Connecting Line */}
            {idx < 3 && (
              <motion.div
                className="flex-1 h-1 mx-2 rounded-full"
                animate={{
                  backgroundColor: currentStep > item.step ? "#22c55e" : "rgb(55, 65, 81)",
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-lg border border-dark-700 bg-dark-900/60 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <DragDropSignatureZone onFileSelected={handleFileSelected} />

                {uploadedFile && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(2)}
                    className="w-full py-2 px-4 rounded-lg bg-primary-500/20 border border-primary-500/50 text-primary-300 font-medium hover:bg-primary-500/30 transition-colors"
                  >
                    Continue to Configuration →
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Configure Threshold */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-lg border border-dark-700 bg-dark-900/60 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <SimilaritySlider onThresholdChange={handleThresholdChange} />

                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 py-2 px-4 rounded-lg border border-dark-600 text-dark-300 font-medium hover:border-dark-500 transition-colors"
                  >
                    ← Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartAnalysis}
                    className="flex-1 py-2 px-4 rounded-lg bg-primary-500/20 border border-primary-500/50 text-primary-300 font-medium hover:bg-primary-500/30 transition-colors"
                  >
                    Start Analysis →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Analyzing */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 rounded-lg border border-dark-700 bg-dark-900/60 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-3 border-primary-500/30 border-t-primary-400 rounded-full"
                />

                <div className="text-center space-y-2">
                  <p className="font-semibold text-dark-100">Analyzing Signature</p>
                  <p className="text-xs text-dark-400">
                    Comparing patterns and extracting features...
                  </p>
                </div>

                {/* Progress indicators */}
                <div className="space-y-2 text-xs text-dark-400 mt-4">
                  <motion.div
                    animate={{ opacity: [0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-400" />
                    Feature extraction...
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-400" />
                    Pattern matching...
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-400" />
                    Confidence calculation...
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Results */}
          {currentStep === 4 && analysisResult && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Confidence Display */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <ConfidenceDisplay
                  score={analysisResult.score}
                  status={analysisResult.status}
                  matchedPoints={analysisResult.matchedPoints}
                />
              </motion.div>

              {/* Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <SignatureComparison matchPercentage={analysisResult.score} />
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3"
              >
                {analysisResult.status === "verified" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="flex-1 py-2 px-4 rounded-lg bg-accent-500/20 border border-accent-500/50 text-accent-300 font-medium hover:bg-accent-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Accept & Verify
                  </motion.button>
                )}

                {analysisResult.status !== "verified" && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 px-4 rounded-lg bg-warning-500/20 border border-warning-500/50 text-warning-300 font-medium hover:bg-warning-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Request Manual Review
                  </motion.button>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 py-2 px-4 rounded-lg border border-dark-600 text-dark-300 font-medium hover:border-dark-500 transition-colors"
                >
                  Try Another
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-lg bg-primary-500/5 border border-primary-500/20"
      >
        <p className="text-xs text-primary-300">
          <span className="font-semibold">ℹ️ How it works:</span> This system uses advanced pattern
          recognition to compare the uploaded signature against the reference on file. The similarity score
          helps determine authentication confidence.
        </p>
      </motion.div>
    </div>
  );
}
