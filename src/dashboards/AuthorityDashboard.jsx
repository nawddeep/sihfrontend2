import React, { useState } from "react";
import { authorityOverview, fraudCases, analyticsSeries, stateWiseFraudData } from "../mockData";
import {
  Globe2,
  Map,
  UserX,
  UserCircle2,
  BarChart3,
  PieChart as IconPieChart,
  LineChart,
  Ban,
  ShieldOff,
} from "lucide-react";
import AdvancedAnalytics from "../components/AdvancedAnalytics";
import ReportGenerator from "../components/ReportGenerator";
import IndiaFraudHeatmap from "../components/IndiaFraudHeatmap";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#f97373"];

export default function AuthorityDashboard() {
  const [cases, setCases] = useState(fraudCases);
  const [selectedState, setSelectedState] = useState(null);
  const [analyticsTab, setAnalyticsTab] = useState("fraud");

  const suspendEntity = (id) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Suspended / Banned" } : c))
    );
  };

  const { activeExams, centresOnline, totalCandidates, flaggedCandidates } =
    authorityOverview;

  const visibleCases = selectedState
    ? cases.filter((c) => c.stateCode === selectedState)
    : cases;

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <section className="grid xl:grid-cols-[1.4fr,1.6fr] gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  National Exam Snapshot
                </div>
                <p className="text-[11px] text-slate-500">
                  Aggregated view across all participating states & centres.
                </p>
              </div>
              <Globe2 className="w-5 h-5 text-sky-300" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Tile
                label="Active Exams"
                value={activeExams}
                sub="Concurrent exam sessions"
              />
              <Tile
                label="Centres Online"
                value={centresOnline}
                sub="Streaming health data"
              />
              <Tile
                label="Total Candidates"
                value={totalCandidates.toLocaleString()}
                sub="Registered for current window"
              />
              <Tile
                label="Flagged Candidates"
                value={flaggedCandidates}
                sub="Under investigation"
                accent="rose"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Academic Record Integrity
                </div>
                <p className="text-[11px] text-slate-500">
                  Authentic vs fake degrees across the region.
                </p>
              </div>
              <IconPieChart className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400"
                    style={{ width: `${authorityOverview.authenticPercentage}%` }}
                  />
                </div>
                <div className="h-3 mt-1 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-rose-400"
                    style={{
                      width: `${
                        authorityOverview.fakePercentage +
                        authorityOverview.pendingPercentage
                      }%`,
                    }}
                  />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                  <LegendPill
                    color="bg-emerald-400"
                    label="Authentic"
                    value={`${authorityOverview.authenticPercentage}%`}
                  />
                  <LegendPill
                    color="bg-rose-400"
                    label="Fake"
                    value={`${authorityOverview.fakePercentage}%`}
                  />
                  <LegendPill
                    color="bg-amber-400"
                    label="Pending Review"
                    value={`${authorityOverview.pendingPercentage}%`}
                  />
                </div>
              </div>
              <div className="w-24 h-24 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center flex-col text-xs">
                <span className="text-[10px] text-slate-400">Integrity</span>
                <span className="text-xl font-semibold text-emerald-300">
                  {authorityOverview.authenticPercentage}%
                </span>
                <span className="text-[10px] text-slate-500">pass verification</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                India Fraud Heat Map
              </div>
              <p className="text-[11px] text-slate-500">
                State-wise fraud density and verification performance.
              </p>
            </div>
            <Map className="w-5 h-5 text-slate-200" />
          </div>
          <div className="flex-1 rounded-xl bg-slate-900 border border-slate-800 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>
                {selectedState
                  ? `Focused on ${Object.keys(stateWiseFraudData).find(
                      (name) => stateWiseFraudData[name].state_code === selectedState
                    )}`
                  : "All States"}
              </span>
              <span className="text-slate-500 text-[10px]">
                Click a tile to drill down
              </span>
            </div>
            <IndiaFraudHeatmap
              data={stateWiseFraudData}
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-[1.4fr,1.6fr] gap-4 md:gap-6">
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Fraud Detection — Students & Staff
              </div>
              <p className="text-[11px] text-slate-500">
                Take instant action on high-confidence fraud cases.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ReportGenerator data={cases} reportType="fraud-summary" />
              <UserX className="w-5 h-5 text-rose-300" />
            </div>
          </div>
          <div className="space-y-2 text-xs max-h-64 overflow-auto pr-1">
            {visibleCases.map((c) => (
              <div
                key={c.id}
                className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-100">{c.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {c.refId}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {c.entityType} • {c.centre}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-[10px] ${
                      c.status === "Suspended / Banned"
                        ? "border-rose-500/60 text-rose-300 bg-rose-500/10"
                        : "border-amber-500/60 text-amber-300 bg-amber-500/10"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400">{c.issue}</div>
                  <div className="flex gap-1.5">
                    {c.entityType === "Student" ? (
                      <button
                        onClick={() => suspendEntity(c.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/60 text-rose-200 px-2 py-1"
                      >
                        <Ban className="w-3 h-3" />
                        <span className="text-[10px]">Suspend Student</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => suspendEntity(c.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/60 text-rose-200 px-2 py-1"
                      >
                        <ShieldOff className="w-3 h-3" />
                        <span className="text-[10px]">Ban Staff</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {cases.length === 0 && (
              <p className="text-[11px] text-slate-500">
                No fraud cases currently escalated to authority level.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Analytics — Fraud, Verification & Security
              </div>
              <p className="text-[11px] text-slate-500">
                Trends over time to guide policy & intervention.
              </p>
            </div>
            <BarChart3 className="w-5 h-5 text-sky-300" />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-slate-300">
                  Monthly Fraud & Attempts
                </span>
                <UserCircle2 className="w-4 h-4 text-slate-400" />
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsSeries.fraudTrend}>
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #1e293b",
                        fontSize: 10,
                      }}
                    />
                    <Bar
                      dataKey="attempted"
                      fill="#38bdf8"
                      radius={[3, 3, 0, 0]}
                    />
                    <Bar dataKey="fraud" fill="#f97373" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-slate-300">
                  Daily Verification Rate
                </span>
                <LineChart className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsSeries.verificationRates}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#1e293b"
                      vertical={false}
                    />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #1e293b",
                        fontSize: 10,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="verified"
                      stroke="#22c55e"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      stroke="#facc15"
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 grid grid-cols-[1.2fr,1.4fr] gap-3 items-center">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <IconPieChart className="w-4 h-4 text-sky-300" />
                <span className="text-[11px] text-slate-300">
                  Centre Security Score Distribution
                </span>
              </div>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsSeries.securityScoreDist}
                      dataKey="value"
                      nameKey="label"
                      innerRadius={18}
                      outerRadius={34}
                      paddingAngle={2}
                    >
                      {analyticsSeries.securityScoreDist.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#020617",
                        border: "1px solid #1e293b",
                        fontSize: 10,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-1.5 text-[11px]">
              {analyticsSeries.securityScoreDist.map((s, idx) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-lg bg-slate-900/80 border border-slate-800 px-2 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-slate-200">{s.label}</span>
                  </div>
                  <span className="text-slate-400">{s.value}% of centres</span>
                </div>
              ))}
              <p className="text-[10px] text-slate-500">
                Scores come from CCTV uptime, biometric integrity and device health signals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
              Advanced Analytics & AI Insights
            </div>
            <p className="text-[11px] text-slate-500">
              Fraud pattern recognition, time-based analysis, and predictive alerts.
            </p>
          </div>
        </div>
        <AdvancedAnalytics />
      </section>
    </div>
  );
}

function Tile({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl bg-slate-950 border border-slate-800 px-3 py-3">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div
        className={`text-base font-semibold ${
          accent === "rose" ? "text-rose-300" : "text-slate-50"
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-[10px] text-slate-500">{sub}</div>}
    </div>
  );
}

function LegendPill({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1.5">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-slate-200 text-[11px]">{label}</span>
      </div>
      <span className="text-slate-400 text-[11px]">{value}</span>
    </div>
  );
}
