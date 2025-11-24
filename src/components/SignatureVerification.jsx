import React, { useState } from "react";
import {
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  ArrowLeft,
  Shield,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import LoadingState from "./LoadingState";
import { simulateSignatureVerification } from "../services/simulationService";

export default function SignatureVerification() {
  const [currentView, setCurrentView] = useState("upload"); // 'upload', 'results', 'dashboard'
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [threshold, setThreshold] = useState(80);
  const [verificationMode, setVerificationMode] = useState("general");
  const [userFilter, setUserFilter] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const result = await simulateSignatureVerification(
        selectedFile,
        verificationMode,
        threshold,
        userFilter
      );
      setVerificationResult(result);
      setCurrentView("results");
    } catch (err) {
      console.error("Signature verification simulation failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (currentView === "dashboard") {
    return <SignatureDashboard onBack={() => setCurrentView("upload")} />;
  }

  if (currentView === "results" && verificationResult) {
    return (
      <SignatureResults
        result={verificationResult}
        uploadedImage={preview}
        onBack={() => {
          setCurrentView("upload");
          setVerificationResult(null);
          setPreview(null);
          setSelectedFile(null);
        }}
      />
    );
  }

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-primary-300 uppercase tracking-wide">
            Signature Verification
          </div>
          <h2 className="text-xl font-semibold text-dark-100 mt-1">
            Upload Signature for Verification
          </h2>
          <p className="text-sm text-dark-400 mt-1">
            Upload a clear image of the signature you want to verify
          </p>
        </div>
        <button
          onClick={() => setCurrentView("dashboard")}
          className="inline-flex items-center gap-2 rounded-lg bg-dark-900 border border-primary-500/30 px-3 py-2 text-xs font-medium text-primary-300 hover:border-primary-500/50 transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          Dashboard
        </button>
      </div>

      <div className="grid lg:grid-cols-[1.5fr,1fr] gap-6">
        {/* Upload Area */}
        <div className="space-y-4">
          <div
            className="rounded-2xl border-2 border-dashed border-primary-500/30 bg-dark-950/80 p-8 hover:border-primary-500/50 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDragDrop}
          >
            {!preview ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center border border-primary-500/30">
                  <Upload className="w-8 h-8 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-200">
                    Drop your signature image here
                  </h3>
                  <p className="text-sm text-dark-400 mt-1">or</p>
                </div>
                <label className="inline-flex items-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-400 active:scale-95 px-4 py-2 text-sm font-medium text-dark-950 cursor-pointer transition-all duration-300 shadow-glow-sm hover:shadow-glow-md">
                  <Upload className="w-4 h-4" />
                  Browse Files
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-dark-500">
                  PNG, JPG, JPEG, BMP (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto rounded-lg border border-dark-800"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-danger-500 hover:bg-danger-400 flex items-center justify-center text-dark-950 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-dark-950/80 border border-primary-500/20 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary-400" />
              <h3 className="text-sm font-semibold text-dark-300">
                Verification Settings
              </h3>
            </div>

            <div className="space-y-4">
              {/* Verification Mode */}
              <div>
                <label className="text-xs font-medium text-dark-400 mb-2 block">
                  Verification Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setVerificationMode("general")}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      verificationMode === "general"
                        ? "bg-primary-500/20 border border-primary-500/40 text-primary-300"
                        : "bg-dark-900 border border-dark-800 text-dark-400 hover:border-primary-500/30"
                    }`}
                  >
                    General Search
                  </button>
                  <button
                    onClick={() => setVerificationMode("user-specific")}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      verificationMode === "user-specific"
                        ? "bg-primary-500/20 border border-primary-500/40 text-primary-300"
                        : "bg-dark-900 border border-dark-800 text-dark-400 hover:border-primary-500/30"
                    }`}
                  >
                    User-Specific
                  </button>
                </div>
              </div>

              {/* User Filter */}
              {verificationMode === "user-specific" && (
                <div>
                  <label className="text-xs font-medium text-dark-400 mb-2 block">
                    Expected User ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., john_doe_001"
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="w-full rounded-lg bg-dark-900 border border-dark-700 px-3 py-2 text-sm text-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
              )}

              {/* Threshold */}
              <div>
                <label className="text-xs font-medium text-dark-400 mb-2 block">
                  Similarity Threshold: {threshold}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-dark-500 mt-1">
                  <span>50%</span>
                  <span>72.5%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={!preview || isProcessing}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-400 active:scale-95 disabled:bg-dark-700 disabled:text-dark-400 disabled:cursor-not-allowed text-sm font-medium text-dark-950 py-2.5 transition-all duration-300 shadow-glow-md hover:shadow-glow-lg disabled:shadow-none"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-dark-950 border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Verify Signature
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl bg-dark-950/80 border border-accent-500/20 p-5">
            <h3 className="text-xs font-semibold text-accent-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              For Best Results
            </h3>
            <ul className="space-y-1.5 text-xs text-dark-400">
              <li>• Use dark signatures on white background</li>
              <li>• Ensure good lighting (no shadows)</li>
              <li>• Avoid blurry images</li>
              <li>• High contrast preferred</li>
              <li>• Quality score 6+</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignatureResults({ result, uploadedImage, onBack }) {
  const isVerified = result.decision === "VERIFIED";

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-primary-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Upload
      </button>

      {/* Decision Card */}
      <div
        className={`rounded-2xl border-2 p-6 ${
          isVerified
            ? "bg-accent-500/5 border-accent-500/30 shadow-glow-success"
            : "bg-danger-500/5 border-danger-500/30 shadow-glow-danger"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isVerified
                ? "bg-accent-500/20 border border-accent-500/40"
                : "bg-danger-500/20 border border-danger-500/40"
            }`}
          >
            {isVerified ? (
              <CheckCircle2 className="w-8 h-8 text-accent-400" />
            ) : (
              <XCircle className="w-8 h-8 text-danger-400" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-dark-100">
              {isVerified ? "✅ SIGNATURE VERIFIED" : "❌ SIGNATURE REJECTED"}
            </h1>
            <p className="text-sm text-dark-400 mt-1">{result.reason}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <div className="text-xs text-dark-500">Match Score</div>
            <div className="text-lg font-semibold text-dark-200">
              {result.best_score.toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="text-xs text-dark-500">Confidence</div>
            <div className="text-lg font-semibold text-dark-200">
              {result.confidence}
            </div>
          </div>
          <div>
            <div className="text-xs text-dark-500">Threshold</div>
            <div className="text-lg font-semibold text-dark-200">
              {result.threshold}%
            </div>
          </div>
          <div>
            <div className="text-xs text-dark-500">Matches Analyzed</div>
            <div className="text-lg font-semibold text-dark-200">
              {result.matches_analyzed}
            </div>
          </div>
        </div>
      </div>

      {/* Image and Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-dark-950/80 border border-dark-800 p-5">
          <h3 className="text-xs font-semibold text-dark-300 mb-3">
            Uploaded Signature
          </h3>
          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Uploaded Signature"
              className="w-full rounded-lg border border-dark-800"
            />
          )}
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-dark-800 p-5">
          <h3 className="text-xs font-semibold text-dark-300 mb-3">
            Matched User
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-dark-400">User ID</span>
              <span className="text-dark-200 font-mono">
                {result.matched_user}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-dark-400">Timestamp</span>
              <span className="text-dark-200">
                {new Date().toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignatureDashboard({ onBack }) {
  const stats = {
    totalVerifications: 1250,
    verifiedCount: 1087,
    rejectedCount: 163,
    averageConfidence: 87.5,
    successRate: 86.96,
    avgProcessTime: 2.3,
  };

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-primary-300 uppercase tracking-wide">
            Signature Verification
          </div>
          <h2 className="text-xl font-semibold text-dark-100 mt-1">
            Dashboard & Analytics
          </h2>
        </div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg bg-dark-900 border border-primary-500/30 px-3 py-2 text-xs font-medium text-primary-300 hover:border-primary-500/50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-dark-950/80 border border-primary-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary-400" />
            <span className="text-xs font-semibold text-dark-300">
              Total Verifications
            </span>
          </div>
          <div className="text-2xl font-bold text-dark-100">
            {stats.totalVerifications.toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-accent-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-accent-400" />
            <span className="text-xs font-semibold text-dark-300">Verified</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">
            {stats.verifiedCount.toLocaleString()}
          </div>
          <div className="text-xs text-dark-500 mt-1">
            {stats.successRate.toFixed(2)}% success rate
          </div>
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-danger-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-danger-400" />
            <span className="text-xs font-semibold text-dark-300">Rejected</span>
          </div>
          <div className="text-2xl font-bold text-dark-100">
            {stats.rejectedCount}
          </div>
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-primary-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            <span className="text-xs font-semibold text-dark-300">
              Avg Confidence
            </span>
          </div>
          <div className="text-2xl font-bold text-dark-100">
            {stats.averageConfidence.toFixed(1)}%
          </div>
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-warning-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-warning-400" />
            <span className="text-xs font-semibold text-dark-300">
              Avg Process Time
            </span>
          </div>
          <div className="text-2xl font-bold text-dark-100">
            {stats.avgProcessTime.toFixed(1)}s
          </div>
        </div>

        <div className="rounded-2xl bg-dark-950/80 border border-primary-500/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary-400" />
            <span className="text-xs font-semibold text-dark-300">
              Unique Users
            </span>
          </div>
          <div className="text-2xl font-bold text-dark-100">156</div>
        </div>
      </div>
    </div>
  );
}



