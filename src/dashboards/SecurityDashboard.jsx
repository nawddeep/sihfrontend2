import React, { useState } from "react";
import {
  securityFraudList,
  biometricAlerts,
  cameraFeeds,
  frequencyDevices,
  accessLogs,
} from "../mockData";
import {
  Siren,
  AlertTriangle,
  Camera,
  Activity,
  WifiOff,
  Shield,
  Radio,
  TerminalSquare,
  Sparkles,
  ShieldCheck,
  Radar,
  BellRing,
  Fingerprint,
} from "lucide-react";
import NotificationSystem from "../components/NotificationSystem";
import FaceMatchVisualization from "../components/FaceMatchVisualization";

export default function SecurityDashboard() {
  const totalCams = cameraFeeds.length;
  const workingCams = cameraFeeds.filter(
    (c) => c.status === "Online" || c.status === "Degraded"
  ).length;
  const offlineCams = totalCams - workingCams;
  const securityScore = Math.round((workingCams / totalCams) * 100);
  const [activeTab, setActiveTab] = useState("monitoring");

  const criticalAlerts = [...securityFraudList].sort(
    (a, b) => b.riskScore - a.riskScore
  );

  const heroStats = [
    {
      label: "CCTV coverage",
      value: `${securityScore}%`,
      detail: `${workingCams}/${totalCams} cameras streaming`,
      accent: "from-rose-400/90 to-emerald-400/70",
      icon: Camera,
    },
    {
      label: "Offline incidents",
      value: offlineCams,
      detail: "Immediate technician dispatch",
      accent: "from-amber-400/80 to-rose-400/60",
      icon: WifiOff,
    },
    {
      label: "Fraud queue",
      value: criticalAlerts.length,
      detail: "Awaiting acknowledgement",
      accent: "from-rose-500/80 to-pink-400/60",
      icon: Siren,
    },
  ];

  const opsSignals = [
    {
      icon: ShieldCheck,
      tone: "text-emerald-200",
      text: "Zero tamper warnings on biometric vaults",
    },
    {
      icon: Radar,
      tone: "text-sky-200",
      text: "All RF jammers synced < 3 min ago",
    },
    {
      icon: BellRing,
      tone: "text-rose-200",
      text: `${biometricAlerts.length} biometric escalations pending triage`,
    },
  ];

  const tabItems = [
    { id: "monitoring", label: "Monitoring", helper: "CCTV + score" },
    { id: "alerts", label: "Alerts", helper: "Fraud feed" },
    { id: "biometrics", label: "Biometrics", helper: "Anomaly table" },
    { id: "devices", label: "Devices", helper: "RF health" },
    { id: "access", label: "Access Log", helper: "Digital trail" },
  ];

  return (
    <div className="relative min-h-full pb-16">
      <div className="relative px-4 md:px-6 py-6 space-y-6">
        <NotificationSystem />

        <section className="relative overflow-hidden rounded-lg border border-govGray-300 bg-white px-5 py-6 md:px-8 md:py-8 text-govGray-700 shadow-gov-lg tricolor-top fade-up-soft">
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-danger-50 px-3 py-1 border border-danger-200 text-[11px] uppercase tracking-[0.25em] text-danger-700">
                  <Sparkles className="w-4 h-4 text-danger-600" />
                  Security Command Deck
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-govNavy-700">
                    Live Floor Security & Fraud Mitigation
                  </h1>
                  <p className="text-sm text-govGray-600">
                    Unified situational awareness for centre-level security leads.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 text-xs text-govGray-600">
                <div className="inline-flex items-center gap-2 rounded-full bg-govGreen-50 border border-govGreen-200 px-3 py-1 text-govGreen-700">
                  <ShieldCheck className="w-4 h-4" />
                  Biometric vaults lock-in
                </div>
                <div className="flex items-center gap-2 text-govGray-700">
                  <Radar className="w-4 h-4 text-govBlue-500" />
                  Device heartbeat synced 2 mins ago
                </div>
                <div className="flex items-center gap-2 text-govGray-600">
                  <Fingerprint className="w-4 h-4 text-danger-600" />
                  {biometricAlerts.length} biometric anomalies today
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`rounded-lg border border-govGray-300 bg-govGray-50 px-4 py-4 flex flex-col gap-2 fade-up-soft fade-delay-${idx + 1}`}
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-govGray-700">
                      <span>{stat.label}</span>
                      <Icon className="w-4 h-4 text-govNavy-600" />
                    </div>
                    <div className="text-2xl font-semibold text-govNavy-700">{stat.value}</div>
                    <div className="text-[11px] text-govGray-600">{stat.detail}</div>
                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r from-danger-400 via-white to-govGreen-400`} />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-govGray-700 fade-up-soft fade-delay-3">
              {opsSignals.map(({ icon: Icon, tone, text }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1 rounded-full bg-govGray-100 px-3 py-1 border border-govGray-300 text-govGray-700`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="rounded-lg bg-govGray-100 border border-govGray-300 p-2 flex flex-wrap gap-2 text-xs fade-up-soft fade-delay-4">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] rounded-lg px-3 py-2 text-left transition-all ${
                activeTab === tab.id
                  ? "bg-danger-50 border border-danger-300 text-danger-700 shadow-gov-md"
                  : "border border-transparent text-govGray-600 hover:border-govGray-300 hover:text-govGray-700"
              }`}
            >
              <div className="text-[11px] font-semibold">{tab.label}</div>
              <div className="text-[10px] text-govGray-500">{tab.helper}</div>
            </button>
          ))}
        </div>

      <section className="grid lg:grid-cols-[minmax(0,1fr)_18rem] gap-4 md:gap-6">
        {/* Main content by tab */}
        <div className="space-y-4">
          {/* Live Monitoring */}
          {activeTab === "monitoring" && (
            <>
              <div className="rounded-2xl bg-gradient-to-br from-sky-500/10 via-slate-950 to-slate-950 border border-sky-700/60 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-govNavy-700 uppercase tracking-wide">
                    CCTV Health & Security Score
                  </div>
                  <Shield className="w-5 h-5 text-sky-300" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-govGray-700">
                      <Camera className="w-3.5 h-3.5 text-govNavy-700" />
                      <span>
                        Cameras: {workingCams}/{totalCams}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-govGray-700">
                      <WifiOff className="w-3.5 h-3.5 text-rose-300" />
                      <span>Offline: {offlineCams}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-semibold text-sky-300">
                      {securityScore}
                      <span className="text-base">/100</span>
                    </span>
                    <span className="text-[10px] text-govGray-600">
                      Auto-computed from device health
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-govGray-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400"
                    style={{ width: `${securityScore}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                      Exam Hall Security — Camera Grid
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Live camera tiles summarising per-hall health.
                    </p>
                  </div>
                  <Camera className="w-5 h-5 text-govNavy-700" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                  {cameraFeeds.map((cam) => (
                    <div
                      key={cam.id}
                      className="relative h-24 rounded-xl bg-govGray-100 border border-govGray-300 overflow-hidden flex flex-col justify-between p-2"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-govNavy-700">{cam.id}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] ${
                            cam.status === "Online"
                              ? "border-emerald-500/60 text-emerald-300 bg-emerald-500/10"
                              : cam.status === "Degraded"
                              ? "border-amber-500/60 text-amber-300 bg-amber-500/10"
                              : "border-rose-500/60 text-rose-300 bg-rose-500/10"
                          }`}
                        >
                          {cam.status}
                        </span>
                      </div>
                      <div className="flex-1 mt-1 mb-1 rounded-lg bg-slate-950/80 border border-slate-900 flex items-center justify-center text-[10px] text-slate-500">
                        Live Feed Placeholder
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-govGray-600">
                        <span>{cam.hall}</span>
                        <span>HD • 30 FPS</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active Alerts */}
          {activeTab === "alerts" && (
            <>
              <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-semibold text-rose-300 uppercase tracking-wide">
                      Real-Time Fraud Feed
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Students flagged by cameras / biometrics in the last 15 minutes.
                    </p>
                  </div>
                  <Siren className="w-5 h-5 text-rose-300" />
                </div>
                <div className="space-y-2">
                  {[...securityFraudList]
                    .sort((a, b) => b.riskScore - a.riskScore)
                    .map((f) => (
                      <div
                        key={f.id}
                        className="rounded-xl bg-slate-950 border border-rose-500/40 px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="space-y-0.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-govNavy-700">{f.name}</span>
                            <span className="font-mono text-[10px] text-slate-500">{f.id}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-200 border border-rose-500/60 px-2 py-0.5 text-[10px]">
                              <AlertTriangle className="w-3 h-3" />
                              {f.alert}
                            </span>
                          </div>
                          <div className="text-[11px] text-govGray-600">
                            Hall {f.hall} • Source: {f.source}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {f.timestamp} • Risk score: {f.riskScore}/100
                          </div>
                          <div className="mt-2">
                            <FaceMatchVisualization
                              confidence={f.riskScore}
                              showDetails={false}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1 text-[11px]">
                          <button className="inline-flex items-center gap-1 rounded-full bg-govGray-100 border border-govGray-300 text-govNavy-700 px-2 py-1">
                            Acknowledge
                          </button>
                          <button className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/60 text-rose-200 px-2 py-1">
                            Escalate
                          </button>
                          <button className="inline-flex items-center gap-1 rounded-full bg-govGray-100 border border-govGray-300 text-govGray-700 px-2 py-1">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                      Biometric Alerts
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Failed / suspicious authentication attempts across halls.
                    </p>
                  </div>
                  <Activity className="w-5 h-5 text-amber-300" />
                </div>
                <div className="space-y-1.5 text-xs">
                  {biometricAlerts.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-lg bg-slate-950 border border-govGray-300 px-2.5 py-1.5"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-govNavy-700">{a.type}</span>
                          <span className="font-mono text-[10px] text-slate-500">
                            {a.userId}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Hall {a.hall} • {a.time}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          a.severity === "High"
                            ? "border-rose-500/60 text-rose-300 bg-rose-500/10"
                            : a.severity === "Medium"
                            ? "border-amber-500/60 text-amber-300 bg-amber-500/10"
                            : "border-emerald-500/60 text-emerald-300 bg-emerald-500/10"
                        }`}
                      >
                        {a.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Biometric Logs */}
          {activeTab === "biometrics" && (
            <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                    Biometric Logs
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Table view of recent biometric anomalies and events.
                  </p>
                </div>
                <Activity className="w-5 h-5 text-amber-300" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-separate border-spacing-y-1">
                  <thead className="text-[11px] text-govGray-600">
                    <tr>
                      <th className="text-left pb-2">Type</th>
                      <th className="text-left pb-2">User</th>
                      <th className="text-left pb-2">Hall</th>
                      <th className="text-left pb-2">Severity</th>
                      <th className="text-left pb-2">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biometricAlerts.map((a) => (
                      <tr key={a.id} className="hover:bg-govGray-100/70">
                        <td className="py-1.5 pr-2 text-[11px] text-govNavy-700">
                          {a.type}
                        </td>
                        <td className="py-1.5 pr-2 text-[11px] text-govGray-700">
                          {a.userId}
                        </td>
                        <td className="py-1.5 pr-2 text-[11px] text-govGray-700">
                          {a.hall}
                        </td>
                        <td className="py-1.5 pr-2 text-[11px]">
                          <span
                            className={`px-2 py-0.5 rounded-full border text-[10px] ${
                              a.severity === "High"
                                ? "border-rose-500/60 text-rose-300 bg-rose-500/10"
                                : a.severity === "Medium"
                                ? "border-amber-500/60 text-amber-300 bg-amber-500/10"
                                : "border-emerald-500/60 text-emerald-300 bg-emerald-500/10"
                            }`}
                          >
                            {a.severity}
                          </span>
                        </td>
                        <td className="py-1.5 pr-2 text-[11px] text-govGray-600">
                          {a.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Device Health */}
          {activeTab === "devices" && (
            <div className="space-y-4">
              <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div>
                    <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                      Frequency Devices
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Devices jamming unfair wireless communication.
                    </p>
                  </div>
                  <Radio className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="space-y-1.5 text-xs">
                  {frequencyDevices.map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-lg bg-slate-950 border border-govGray-300 px-2.5 py-1.5"
                    >
                      <div className="flex flex-col">
                        <span className="font-mono text-[11px] text-govNavy-700">
                          {d.id}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {d.location}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border ${
                          d.status === "Active"
                            ? "border-emerald-500/60 text-emerald-300 bg-emerald-500/10"
                            : "border-rose-500/60 text-rose-300 bg-rose-500/10"
                        }`}
                      >
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Access Logs */}
          {activeTab === "access" && (
            <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                    Data Security — Access Log
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Every sensitive view / export is recorded and tagged.
                  </p>
                </div>
                <TerminalSquare className="w-5 h-5 text-govNavy-700" />
              </div>
              <div className="max-h-40 overflow-auto pr-1">
                {accessLogs.map((l) => (
                  <div
                    key={l.id}
                    className="mb-1.5 rounded-lg bg-slate-950 border border-govGray-300 px-2.5 py-1.5 text-[11px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-govNavy-700">
                        {l.actor} ({l.role})
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[10px] ${
                          l.status === "Allowed"
                            ? "border-emerald-500/60 text-emerald-300 bg-emerald-500/10"
                            : "border-rose-500/60 text-rose-300 bg-rose-500/10"
                        }`}
                      >
                        {l.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-govGray-600">{l.action}</div>
                    <div className="text-[10px] text-slate-500">
                      {l.time} • {l.ip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Critical alerts sidebar */}
        <aside className="space-y-3 rounded-2xl bg-slate-950/80 border border-rose-500/40 p-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold text-rose-300 uppercase tracking-wide">
                Critical Alerts
              </div>
              <p className="text-[11px] text-slate-500">
                Top high-risk events across all halls.
              </p>
            </div>
            <Siren className="w-5 h-5 text-rose-400" />
          </div>
          <div className="space-y-2 text-xs">
            {criticalAlerts.slice(0, 4).map((a) => (
              <div
                key={a.id}
                className="rounded-lg bg-rose-950/40 border border-rose-500/60 px-3 py-2 text-[11px] animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-rose-100">{a.id}</span>
                  <span className="text-rose-300">{a.riskScore}/100</span>
                </div>
                <div className="text-[11px] text-rose-100">{a.alert}</div>
                <div className="text-[10px] text-rose-200/70">
                  {a.hall} • {a.timestamp}
                </div>
              </div>
            ))}
            {criticalAlerts.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No critical alerts at this moment.
              </p>
            )}
          </div>
        </aside>
      </section>
      </div>
    </div>
  );
}
