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
} from "lucide-react";
import FaceMatchVisualization from "../components/FaceMatchVisualization";
import DocumentComparisonTool from "../components/DocumentComparisonTool";
import NotificationSystem from "../components/NotificationSystem";

export default function CentreStaffDashboard() {
  const [suspects, setSuspects] = useState(fraudSuspects);
  const [bulkFiles, setBulkFiles] = useState([]);

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

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <NotificationSystem />
      
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

      <section className="grid lg:grid-cols-[1.3fr,1.7fr] gap-4 md:gap-6">
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
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
                              confidence={s.face === "MATCH" ? 95 : s.face === "MISMATCH" ? 45 : 75}
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
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
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
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
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
            <div className="space-y-2">
              {suspects.map((s) => (
                <div
                  key={s.id}
                  className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-3 space-y-3"
                >
                  <div className="grid grid-cols-[1.4fr,1.4fr,auto] gap-3 items-center">
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-100">{s.name}</span>
                        <span className="font-mono text-[10px] text-slate-500">{s.id}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{s.reason}</p>
                      {s.resolvedAs && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 border border-slate-700 px-2 py-0.5 text-[10px] text-slate-300 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                          Marked as {s.resolvedAs}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-16 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                        <Image className="w-4 h-4 mr-1" />
                        Admit Card Photo
                      </div>
                      <div className="flex-1 h-16 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-slate-500">
                        <Image className="w-4 h-4 mr-1" />
                        Live Capture
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-[11px]">
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
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <FaceMatchVisualization 
                      confidence={s.severity === "High" ? 45 : s.severity === "Medium" ? 65 : 85}
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
          </div>

          {selectedSuspect && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <DocumentComparisonTool 
                original={selectedSuspect}
                submitted={selectedSuspect}
                onAnalyze={(analysis) => {
                  console.log("Suspect analysis:", analysis);
                }}
              />
            </div>
          )}
        </div>
      </section>
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
