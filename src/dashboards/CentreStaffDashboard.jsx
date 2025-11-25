import React, { useState } from "react";
import { centreSummary, centreBiometricList, fraudSuspects } from "../mockData";
import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  UploadCloud,
  FileSpreadsheet,
  Image,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Sparkles,
  CalendarDays,
  Activity,
  ClipboardList,
  BellRing,
  Radar,
} from "lucide-react";
import FaceMatchVisualization from "../components/FaceMatchVisualization";
import DocumentComparisonTool from "../components/DocumentComparisonTool";

export default function CentreStaffDashboard() {
  const [suspects, setSuspects] = useState(fraudSuspects);
  const [bulkFiles, setBulkFiles] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setBulkFiles(files.map((f) => f.name));
  };

  const markSuspect = (id, action) => {
    setSuspects((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, resolvedAs: action === "clear" ? "Cleared" : "Fraud Confirmed" }
          : s
      )
    );
  };

  const presentPct = (centreSummary.present / centreSummary.totalStudents) * 100;
  const securityScore = centreSummary.securityScore;

  const [selectedSuspect, setSelectedSuspect] = useState(null);

  const heroStats = [
    {
      label: "Attendance locked",
      value: `${presentPct.toFixed(1)}%`,
      detail: `${centreSummary.present}/${centreSummary.totalStudents} scanned`,
      accent: "from-emerald-400/90 to-sky-400/70",
      icon: UserCheck,
    },
    {
      label: "Security score",
      value: `${securityScore}/100`,
      detail: "Devices, CCTV, biometrics",
      accent: "from-sky-400/80 to-indigo-400/60",
      icon: ShieldCheck,
    },
    {
      label: "Alerts under review",
      value: centreSummary.fraudIncidents,
      detail: "Fraud / impersonation",
      accent: "from-rose-400/80 to-amber-400/70",
      icon: AlertTriangle,
    },
  ];

  const nextSlotWindow = "Slot 02 · 10:30 IST";

  const opsSignals = [
    {
      icon: CalendarDays,
      text: "Hall sequencing auto-synced for afternoon shift",
      tone: "text-sky-300",
    },
    {
      icon: BellRing,
      text: `${centreSummary.fraudIncidents} escalations awaiting manual acknowledgement`,
      tone: "text-rose-200",
    },
    {
      icon: ClipboardList,
      text: "Bulk verification run queued for 480 admit cards",
      tone: "text-emerald-200",
    },
  ];

  const navItems = [
    { id: "overview", label: "Ops Pulse", helper: "Primary stats" },
    { id: "students", label: "Student Mgmt", helper: "Roster & controls" },
    { id: "biometrics", label: "Biometrics", helper: "Match history" },
    { id: "bulk", label: "Bulk Verify", helper: "CSV/ZIP uploads" },
    { id: "fraud", label: "Fraud Desk", helper: "Photo review" },
    { id: "reports", label: "Reports", helper: "Mock exports" },
  ];

  return (
    <div className="relative min-h-full pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_60%),radial-gradient(circle_at_bottom,_rgba(248,113,113,0.12),transparent_45%)]" />
      <div className="relative px-4 md:px-6 py-6 space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-950 to-slate-950/90 px-5 py-6 md:px-8 md:py-8 text-slate-50 shadow-[0_25px_80px_rgba(2,6,23,0.6)] fade-up-soft">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.25),transparent_50%)]" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-white/10 text-[11px] uppercase tracking-[0.25em] text-primary-100">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Centre Command Console
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-white">
                    {centreSummary.name}
                  </h1>
                  <p className="text-sm text-slate-300">
                    Centre ID <span className="font-mono">{centreSummary.centreId}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 text-xs text-slate-300">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-emerald-200">
                  <Activity className="w-4 h-4" />
                  Live slot monitored
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CalendarDays className="w-4 h-4 text-sky-300" />
                  Next compliance sweep: {nextSlotWindow}
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Radar className="w-4 h-4 text-emerald-200" />
                  Devices synced 2 mins ago
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-4 flex flex-col gap-2 fade-up-soft fade-delay-${idx + 1}`}
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-300">
                      <span>{stat.label}</span>
                      <Icon className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="text-[11px] text-slate-400">{stat.detail}</div>
                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${stat.accent}`} />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-200 fade-up-soft fade-delay-3">
              {opsSignals.map(({ icon: Icon, text, tone }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 border border-white/10 ${tone}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-2 flex flex-wrap gap-2 text-xs fade-up-soft fade-delay-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 min-w-[130px] rounded-xl px-3 py-2 text-left transition-all ${
                activeSection === item.id
                  ? "bg-sky-500/10 border border-sky-500/50 text-sky-100 shadow-[0_0_25px_rgba(56,189,248,0.25)]"
                  : "border border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="text-[11px] font-semibold">{item.label}</div>
              <div className="text-[10px] text-slate-500">{item.helper}</div>
            </button>
          ))}
        </div>

      {/* Overview */}
      {activeSection === "overview" && (
        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Registered Students"
            icon={Users}
            value={centreSummary.totalStudents}
            chip="Centre Cohort"
          />
          <StatCard
            title="Present vs Absent"
            icon={UserCheck}
            value={`${centreSummary.present} / ${centreSummary.totalStudents}`}
            sub={`${presentPct.toFixed(1)}% present`}
            accent="emerald"
          />
          <StatCard
            title="Fraud / Cheating Incidents"
            icon={UserX}
            value={centreSummary.fraudIncidents}
            sub="Logged in current session"
            accent="rose"
          />
          <StatCard
            title="Security Score"
            icon={ShieldCheck}
            value={`${securityScore}/100`}
            sub="Device uptime, CCTV, biometrics"
            accent="sky"
          />
        </section>
      )}

      {/* Student Management */}
      {activeSection === "students" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Student Management
              </div>
              <p className="text-[11px] text-slate-500">
                High-level view of students associated with this centre.
              </p>
            </div>
            {/* For demo purposes, reuse biometric list as student roster */}
            <div className="flex flex-wrap gap-2 text-xs">
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="w-40 md:w-56 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 hover:border-sky-500/60 transition-colors">
                Export CSV
              </button>
              <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 hover:border-sky-500/60 transition-colors">
                Export PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-3">
            <StatCard title="Total" icon={Users} value={centreSummary.totalStudents} />
            <StatCard
              title="Present"
              icon={UserCheck}
              value={centreSummary.present}
              accent="emerald"
            />
            <StatCard
              title="Absent"
              icon={UserX}
              value={centreSummary.absent}
              accent="rose"
            />
            <StatCard
              title="Flagged"
              icon={AlertTriangle}
              value={centreSummary.fraudIncidents}
              accent="rose"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate border-spacing-y-1">
              <thead className="text-[11px] text-slate-400">
                <tr>
                  <th className="text-left pb-2">Student</th>
                  <th className="text-left pb-2">Room</th>
                  <th className="text-left pb-2">Thumb</th>
                  <th className="text-left pb-2">Face</th>
                  <th className="text-left pb-2">Status</th>
                  <th className="text-left pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {centreBiometricList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/70">
                    <td className="py-1.5 pr-2">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-100">{s.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">{s.id}</span>
                      </div>
                    </td>
                    <td className="py-1.5 pr-2 text-[11px] text-slate-300">{s.room}</td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <Badge label={s.thumb} tone={s.thumb === "MATCH" ? "emerald" : "rose"} />
                    </td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <Badge label={s.face} tone={s.face === "MATCH" ? "emerald" : "amber"} />
                    </td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <Badge
                        label={s.status}
                        tone={
                          s.status === "Verified"
                            ? "emerald"
                            : s.status === "Denied"
                            ? "rose"
                            : "amber"
                        }
                      />
                    </td>
                    <td className="py-1.5 text-[11px] text-slate-400">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Biometric Verification */}
      {activeSection === "biometrics" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Biometric Verification History
              </div>
              <p className="text-[11px] text-slate-500">
                Students assigned to this centre with recent biometric outcomes.
              </p>
            </div>
            <UserCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate border-spacing-y-1">
              <thead className="text-[11px] text-slate-400">
                <tr>
                  <th className="text-left pb-2">Student</th>
                  <th className="text-left pb-2">Room</th>
                  <th className="text-left pb-2">Thumb</th>
                  <th className="text-left pb-2">Face</th>
                  <th className="text-left pb-2">Status</th>
                  <th className="text-left pb-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {centreBiometricList.map((s) => (
                  <tr key={s.id}>
                    <td className="py-1.5 pr-2">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-100">{s.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">{s.id}</span>
                      </div>
                    </td>
                    <td className="py-1.5 pr-2 text-[11px] text-slate-300">{s.room}</td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <Badge label={s.thumb} tone={s.thumb === "MATCH" ? "emerald" : "rose"} />
                    </td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <div className="space-y-1">
                        <Badge label={s.face} tone={s.face === "MATCH" ? "emerald" : "amber"} />
                        {s.face === "MISMATCH" && (
                          <div className="mt-1">
                            <FaceMatchVisualization
                              confidence={
                                s.face === "MATCH" ? 95 : s.face === "MISMATCH" ? 45 : 75
                              }
                              showDetails={false}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-1.5 pr-2 text-[11px]">
                      <Badge
                        label={s.status}
                        tone={
                          s.status === "Verified"
                            ? "emerald"
                            : s.status === "Denied"
                            ? "rose"
                            : "amber"
                        }
                      />
                    </td>
                    <td className="py-1.5 text-[11px] text-slate-400">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Bulk Verification */}
      {activeSection === "bulk" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Academic Record — Bulk Verification
              </div>
              <p className="text-[11px] text-slate-500">
                Upload CSV / ZIP of degree records mapped with university IDs.
              </p>
            </div>
            <FileSpreadsheet className="w-5 h-5 text-sky-300" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-3 py-4 cursor-pointer hover:border-sky-500/60 hover:bg-slate-900">
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.zip"
                multiple
                onChange={handleBulkUpload}
              />
              <UploadCloud className="w-5 h-5 text-sky-400 mb-1" />
              <span className="font-medium text-slate-100">Upload CSV / ZIP</span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                Degree datasets, university dumps
              </span>
            </label>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-3">
              <div className="text-[11px] text-slate-300 mb-1.5">Upload Queue</div>
              {bulkFiles.length === 0 ? (
                <div className="text-[11px] text-slate-500">
                  No files yet. Upload to trigger mock verification.
                </div>
              ) : (
                <ul className="space-y-1 max-h-20 overflow-auto pr-1">
                  {bulkFiles.map((name, idx) => (
                    <li
                      key={`${name}-${idx}`}
                      className="flex items-center justify-between text-[11px] rounded-lg bg-slate-950 border border-slate-800 px-2 py-1"
                    >
                      <span className="truncate max-w-[140px]">{name}</span>
                      <span className="text-[10px] text-emerald-300">Ready</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Fraud Detection */}
      {activeSection === "fraud" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Fraud Detection — Manual Photo Review
              </div>
              <p className="text-[11px] text-slate-500">
                Compare admit card photo vs live capture for flagged candidates.
              </p>
            </div>
            <AlertTriangle className="w-5 h-5 text-rose-300" />
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {suspects.map((s) => (
              <div
                key={s.id}
                className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-3 space-y-2"
              >
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-100">{s.name}</span>
                    <span className="font-mono text-[10px] text-slate-500">{s.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{s.reason}</p>
                  {s.resolvedAs && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                      Marked as {s.resolvedAs}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <div className="flex-1 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Image className="w-3.5 h-3.5 mr-1" />
                    Admit
                  </div>
                  <div className="flex-1 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Image className="w-3.5 h-3.5 mr-1" />
                    Live
                  </div>
                </div>
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <button className="inline-flex items-center justify-center gap-1 rounded-full bg-slate-800 text-slate-100 px-2 py-1">
                    <Eye className="w-3 h-3" />
                    Zoom
                  </button>
                  <button
                    onClick={() => markSuspect(s.id, "clear")}
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 px-2 py-1"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Clear
                  </button>
                  <button
                    onClick={() => markSuspect(s.id, "fraud")}
                    className="inline-flex items-center justify-center gap-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/40 px-2 py-1"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Mark Fraud
                  </button>
                </div>
                <div className="pt-2 border-t border-slate-800">
                  <FaceMatchVisualization
                    confidence={
                      s.severity === "High" ? 45 : s.severity === "Medium" ? 65 : 85
                    }
                    showDetails={true}
                  />
                </div>
              </div>
            ))}
            {suspects.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No suspects currently flagged by the system.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Reports */}
      {activeSection === "reports" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-3">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            Reports (Mock)
          </div>
          <p className="text-[11px] text-slate-500">
            Generate export artefacts for fraud summaries and verification runs.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-left hover:border-sky-500/60 transition-colors">
              Fraud Summary Report
            </button>
            <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-left hover:border-sky-500/60 transition-colors">
              Verification Batch Report
            </button>
            <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-left hover:border-sky-500/60 transition-colors">
              Attendance Anomalies
            </button>
          </div>
        </section>
      )}
      </div>
    </div>
  );
}

function StatCard({ title, icon: Icon, value, sub, chip, accent }) {
  const colorMap = {
    emerald: "from-emerald-500/15 via-slate-950 to-slate-950",
    rose: "from-rose-500/15 via-slate-950 to-slate-950",
    sky: "from-sky-500/15 via-slate-950 to-slate-950",
  };
  const gradient = accent ? colorMap[accent] : "from-slate-800/40 to-slate-950";

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${gradient} border border-slate-800/80 p-3.5 md:p-4 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-wide">
            {title}
          </div>
          {chip && (
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-950/80 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300 mt-1">
              {chip}
            </div>
          )}
        </div>
        <div className="w-8 h-8 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
          <Icon className="w-4 h-4 text-slate-200" />
        </div>
      </div>
      <div className="text-sm md:text-lg font-semibold text-slate-50 mb-0.5">
        {value}
      </div>
      {sub && <div className="text-[11px] text-slate-400">{sub}</div>}
    </div>
  );
}

function Badge({ label, tone }) {
  const map = {
    emerald: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
    rose: "bg-rose-500/10 text-rose-300 border border-rose-500/30",
    amber: "bg-amber-500/10 text-amber-300 border border-amber-500/30",
  };
  const cls = map[tone] || "bg-slate-800 text-slate-200 border border-slate-700";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}
    >
      {label}
    </span>
  );
}
