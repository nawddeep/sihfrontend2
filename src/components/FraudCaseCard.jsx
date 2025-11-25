import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  FileText,
  ChevronRight,
  Flag,
} from "lucide-react";
import CyberButton from "./CyberButton";
import { logResolution } from "../services/simulationService.js";

/**
 * FraudCaseCard Component
 * Shared between CentreStaffDashboard and AuthorityDashboard
 * 
 * Props:
 *   - caseData: { id, studentId, studentName, docType, status, severity, confidence, timestamp }
 *   - onResolve: (caseId, resolution, notes) => void
 *   - resolvedBy: user ID performing action
 */
export default function FraudCaseCard({ caseData, onResolve, resolvedBy = "SYSTEM" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isResolving, setIsResolving] = useState(false);
  const [selectedResolution, setSelectedResolution] = useState(null);
  const [notes, setNotes] = useState("");

  const handleResolution = async (resolution) => {
    setIsResolving(true);
    try {
      // Log to audit trail
      await logResolution(caseData.id, resolvedBy, resolution, notes);
      
      // Call parent callback
      onResolve && onResolve(caseData.id, resolution, notes);
      
      // Reset form
      setSelectedResolution(null);
      setNotes("");
      setIsExpanded(false);
    } catch (err) {
      console.error("Failed to resolve case:", err);
    } finally {
      setIsResolving(false);
    }
  };

  const severityColor = {
    high: "text-danger-400 bg-danger-500/10 border-danger-500/40",
    medium: "text-warning-400 bg-warning-500/10 border-warning-500/40",
    low: "text-info-400 bg-info-500/10 border-info-500/40",
  }[caseData.severity] || "text-dark-400 bg-dark-700/20 border-dark-700";

  const statusColor = {
    "Review Required": "text-warning-300 bg-warning-500/10",
    "Confirmed": "text-danger-300 bg-danger-500/10",
    "Cleared": "text-accent-300 bg-accent-500/10",
    "Escalated": "text-info-300 bg-info-500/10",
  }[caseData.status] || "text-dark-300 bg-dark-700/20";

  return (
    <div className={`rounded-xl border transition-all duration-300 ${severityColor} overflow-hidden`}>
      {/* Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-black/20 transition-colors"
      >
        <div className="flex items-start gap-3 flex-1 text-left">
          <div className="mt-0.5">
            <AlertTriangle className="w-5 h-5 text-current" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold">{caseData.studentName}</span>
              <span className="text-[10px] font-mono bg-black/30 px-2 py-0.5 rounded">
                {caseData.studentId}
              </span>
            </div>
            <div className="text-xs text-current/70">
              {caseData.docType} • Confidence: {caseData.confidence}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium ${statusColor}`}
          >
            {caseData.status === "Cleared" ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <Flag className="w-3 h-3" />
            )}
            {caseData.status}
          </span>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-current/20 px-4 py-3 bg-black/10 space-y-3">
          {/* Case Details */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-current/60">Case ID</span>
              <div className="font-mono font-medium text-current/90">{caseData.id}</div>
            </div>
            <div>
              <span className="text-current/60">Created</span>
              <div className="flex items-center gap-1 text-current/90">
                <Clock className="w-3 h-3" />
                {new Date(caseData.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-current/60">Document Type</span>
              <div className="flex items-center gap-1 text-current/90 mt-1">
                <FileText className="w-3 h-3" />
                {caseData.docType}
              </div>
            </div>
          </div>

          {/* Notes Input (only show if not resolved) */}
          {caseData.status === "Review Required" && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-current/70">
                Resolution Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this case..."
                className="w-full text-xs rounded-lg bg-black/30 border border-current/20 px-3 py-2 text-current placeholder:text-current/50 focus:outline-none focus:ring-2 focus:ring-current/40"
                rows={3}
              />
            </div>
          )}

          {/* Resolution Buttons */}
          <div className="flex gap-2 pt-2">
            {caseData.status === "Review Required" ? (
              <>
                <CyberButton
                  size="sm"
                  onClick={() => handleResolution("Fraud Confirmed")}
                  disabled={isResolving}
                  leftIcon={AlertTriangle}
                  className="flex-1"
                >
                  {isResolving ? "Processing..." : "Fraud Confirmed"}
                </CyberButton>
                <CyberButton
                  size="sm"
                  variant="outline"
                  onClick={() => handleResolution("Cleared")}
                  disabled={isResolving}
                  leftIcon={CheckCircle2}
                  className="flex-1"
                >
                  {isResolving ? "Processing..." : "Clear Case"}
                </CyberButton>
              </>
            ) : (
              <div className="w-full text-xs text-current/70 text-center py-2 bg-black/20 rounded-lg">
                Case resolved on {new Date(caseData.timestamp).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
