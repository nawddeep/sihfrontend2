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
      <div className="rounded-xl border border-dark-800 bg-dark-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-danger-300" />
          <h4 className="text-xs font-semibold text-danger-300">
            Top Fraud Patterns Detected
          </h4>
        </div>
        <div className="space-y-2 text-xs">
          {fraudPatterns.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-dark-300">{item.pattern}</span>
                <span className="text-danger-400 font-semibold">{item.percentage}%</span>
              </div>
              <div className="h-1.5 bg-dark-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-danger-400 transition-all"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time-based Analysis */}
      <div className="rounded-xl border border-dark-800 bg-dark-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-primary-300" />
          <h4 className="text-xs font-semibold text-primary-300">
            Peak Fraud Hours
          </h4>
        </div>
        <div className="space-y-1.5">
          {peakHours.map((hour, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-[10px] text-dark-400 w-12">{hour.hour}</span>
              <div className="flex-1 h-4 bg-dark-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-400 transition-all"
                  style={{ width: `${(hour.incidents / maxIncidents) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-dark-300 w-6 text-right">
                {hour.incidents}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Alerts */}
      <div className="rounded-xl border border-dark-800 bg-dark-950 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4 text-warning-300" />
          <h4 className="text-xs font-semibold text-warning-300">
            AI Predictions
          </h4>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-2.5 rounded-lg bg-warning-500/10 border border-warning-500/30">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-warning-300" />
              <span className="font-semibold text-warning-300">Risk Alert</span>
            </div>
            <p className="text-dark-300 leading-relaxed">
              23% higher fraud risk predicted for upcoming weekend sessions based on historical patterns
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-primary-500/10 border border-primary-500/30">
            <div className="flex items-center gap-1.5 mb-1">
              <Brain className="w-3.5 h-3.5 text-primary-300" />
              <span className="font-semibold text-primary-300">Pattern Detected</span>
            </div>
            <p className="text-dark-300 leading-relaxed">
              Similar fraud patterns detected in 3 centres - possible coordinated attempt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

