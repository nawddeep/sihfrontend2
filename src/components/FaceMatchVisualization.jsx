import React from "react";
import { UserCheck, AlertTriangle } from "lucide-react";

export default function FaceMatchVisualization({ confidence, showDetails = true }) {
  const isHighConfidence = confidence > 90;
  const isMediumConfidence = confidence > 70 && confidence <= 90;
  const isLowConfidence = confidence <= 70;

  const getColor = () => {
    if (isHighConfidence) return "bg-emerald-400";
    if (isMediumConfidence) return "bg-amber-400";
    return "bg-rose-400";
  };

  const getTextColor = () => {
    if (isHighConfidence) return "text-emerald-400";
    if (isMediumConfidence) return "text-amber-400";
    return "text-rose-400";
  };

  const getStatus = () => {
    if (isHighConfidence) return "Match Confirmed";
    if (isMediumConfidence) return "Review Required";
    return "Mismatch Detected";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isHighConfidence ? (
            <UserCheck className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          )}
          <span className="text-xs font-semibold text-slate-300">AI Confidence Score</span>
        </div>
        <span className={`text-sm font-bold ${getTextColor()}`}>
          {confidence}%
        </span>
      </div>
      
      <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getColor()}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
      
      <div className="flex items-center justify-between text-[10px]">
        <span className={`px-2 py-0.5 rounded-full border ${
          isHighConfidence 
            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
            : isMediumConfidence
            ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
            : "bg-rose-500/10 text-rose-300 border-rose-500/30"
        }`}>
          {getStatus()}
        </span>
        <span className="text-slate-500">
          Threshold: 90%
        </span>
      </div>
      
      {showDetails && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-slate-500">Facial Landmarks</div>
            <div className="text-xs font-semibold text-emerald-300">68/68</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-slate-500">Liveness</div>
            <div className="text-xs font-semibold text-emerald-300">Passed</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-[10px] text-slate-500">Match Quality</div>
            <div className={`text-xs font-semibold ${
              confidence > 90 ? "text-emerald-300" : 
              confidence > 70 ? "text-amber-300" : 
              "text-rose-300"
            }`}>
              {confidence > 90 ? "High" : confidence > 70 ? "Medium" : "Low"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

