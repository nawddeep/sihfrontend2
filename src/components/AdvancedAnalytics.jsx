import React from "react";
import { TrendingUp, AlertTriangle, Clock, Brain } from "lucide-react";

export default function AdvancedAnalytics() {
  const fraudPatterns = [
    { pattern: "Duplicate Biometrics", percentage: 34 },
    { pattern: "Forged Documents", percentage: 28 },
    { pattern: "Impersonation", percentage: 23 },
    { pattern: "Collaboration", percentage: 15 },
  ];

  const peakHours = [
    { hour: "09:00", incidents: 12 },
    { hour: "10:00", incidents: 18 },
    { hour: "11:00", incidents: 15 },
    { hour: "12:00", incidents: 8 },
    { hour: "13:00", incidents: 5 },
    { hour: "14:00", incidents: 10 },
    { hour: "15:00", incidents: 14 },
  ];

  const maxIncidents = Math.max(...peakHours.map(h => h.incidents));

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Fraud Pattern Recognition */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-rose-300" />
          <h4 className="text-xs font-semibold text-rose-300">
            Top Fraud Patterns Detected
          </h4>
        </div>
        <div className="space-y-2 text-xs">
          {fraudPatterns.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">{item.pattern}</span>
                <span className="text-rose-400 font-semibold">{item.percentage}%</span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-400 transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time-based Analysis */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-sky-300" />
          <h4 className="text-xs font-semibold text-sky-300">
            Peak Fraud Hours
          </h4>
        </div>
        <div className="space-y-1.5">
          {peakHours.map((hour, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 w-12">{hour.hour}</span>
              <div className="flex-1 h-4 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 transition-all"
                  style={{ width: `${(hour.incidents / maxIncidents) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-300 w-6 text-right">
                {hour.incidents}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Alerts */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-amber-300" />
          <h4 className="text-xs font-semibold text-amber-300">
            AI Predictions
          </h4>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-semibold text-amber-300">Risk Alert</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              23% higher fraud risk predicted for upcoming weekend sessions based on historical patterns
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30">
            <div className="flex items-center gap-1.5 mb-1">
              <Brain className="w-3.5 h-3.5 text-sky-300" />
              <span className="font-semibold text-sky-300">Pattern Detected</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Similar fraud patterns detected in 3 centres - possible coordinated attempt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

