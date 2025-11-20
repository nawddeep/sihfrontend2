import React from "react";
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

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <NotificationSystem />
      
      <section className="grid lg:grid-cols-[1.6fr,1.2fr] gap-4 md:gap-6">
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
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
            {securityFraudList.map((f) => (
              <div
                key={f.id}
                className="rounded-xl bg-slate-950 border border-rose-500/40 px-3 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-100">{f.name}</span>
                    <span className="font-mono text-[10px] text-slate-500">{f.id}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-200 border border-rose-500/60 px-2 py-0.5 text-[10px]">
                      <AlertTriangle className="w-3 h-3" />
                      {f.alert}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
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
                  <button className="inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-700 text-slate-200 px-2 py-1">
                    <Camera className="w-3 h-3" />
                    View Camera
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/60 text-rose-200 px-2 py-1">
                    <Siren className="w-3 h-3" />
                    Alert Hall Invigilator
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
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
                  className="flex items-center justify-between rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-100">{a.type}</span>
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

          <div className="rounded-2xl bg-gradient-to-br from-sky-500/10 via-slate-950 to-slate-950 border border-sky-700/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                CCTV Health & Security Score
              </div>
              <Shield className="w-5 h-5 text-sky-300" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Camera className="w-3.5 h-3.5 text-slate-200" />
                  <span>
                    Cameras: {workingCams}/{totalCams}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <WifiOff className="w-3.5 h-3.5 text-rose-300" />
                  <span>Offline: {offlineCams}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-semibold text-sky-300">
                  {securityScore}
                  <span className="text-base">/100</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  Auto-computed from device health
                </span>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400"
                style={{ width: `${securityScore}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-[1.5fr,1.1fr] gap-4 md:gap-6">
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Exam Hall Security — Camera Grid
              </div>
              <p className="text-[11px] text-slate-500">
                Placeholder camera tiles show monitored halls and health state.
              </p>
            </div>
            <Camera className="w-5 h-5 text-slate-200" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cameraFeeds.map((cam) => (
              <div
                key={cam.id}
                className="relative h-24 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between p-2"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-200">{cam.id}</span>
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
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{cam.hall}</span>
                  <span>HD • 30 FPS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
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
                  className="flex items-center justify-between rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-slate-200">
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

          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Data Security — Access Log
                </div>
                <p className="text-[11px] text-slate-500">
                  Every sensitive view / export is recorded and tagged.
                </p>
              </div>
              <TerminalSquare className="w-5 h-5 text-slate-200" />
            </div>
            <div className="max-h-40 overflow-auto pr-1">
              {accessLogs.map((l) => (
                <div
                  key={l.id}
                  className="mb-1.5 rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 text-[11px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-slate-200">
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
                  <div className="text-[10px] text-slate-400">{l.action}</div>
                  <div className="text-[10px] text-slate-500">
                    {l.time} • {l.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
