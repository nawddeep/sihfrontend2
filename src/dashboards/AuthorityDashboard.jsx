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
  Sparkles,
  ShieldCheck,
  Radar,
  Activity,
  BellRing,
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

  const verifiedCountEstimate = Math.round(
    (authorityOverview.authenticPercentage / 100) * totalCandidates
  );

  const heroStats = [
    {
      label: "National exams live",
      value: activeExams,
      detail: "Concurrent sessions across networks",
      accent: "from-sky-400/90 to-indigo-400/70",
      icon: Globe2,
    },
    {
      label: "Verified candidates",
      value: verifiedCountEstimate.toLocaleString(),
      detail: "Cleared biometric + document stack",
      accent: "from-emerald-400/80 to-teal-400/60",
      icon: ShieldCheck,
    },
    {
      label: "Integrity pass rate",
      value: `${authorityOverview.authenticPercentage}%`,
      detail: "AI adjudicated authenticity ratio",
      accent: "from-amber-400/80 to-rose-400/50",
      icon: BarChart3,
    },
  ];

  const authoritySignals = [
    {
      icon: BellRing,
      tone: "text-rose-200",
      text: `${flaggedCandidates} high-risk candidates awaiting final orders`,
    },
    {
      icon: Radar,
      tone: "text-sky-200",
      text: `${centresOnline} centres streaming biometric logs live`,
    },
    {
      icon: Activity,
      tone: "text-emerald-200",
      text: "Predictive analytics scanning for emerging fraud rings",
    },
  ];

  return (
    <div className="relative min-h-full pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_60%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.12),transparent_45%)]" />
      <div className="relative px-4 md:px-6 py-6 space-y-6">
        <section className="relative overflow-hidden rounded-lg border border-govGray-300 bg-white tricolor-top px-5 py-6 md:px-8 md:py-8 text-govNavy-700 shadow-[0_25px_80px_rgba(2,6,23,0.6)] fade-up-soft">
          <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.25),transparent_50%)]" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 border border-govGray-300 text-[11px] uppercase tracking-[0.25em] text-primary-50">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  National Command Oversight
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-govNavy-700">
                    Higher Authority Intelligence Console
                  </h1>
                  <p className="text-sm text-govGray-700">
                    Real-time macro view across exams, centres, fraud pipelines and predictive AI.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3 text-xs text-govGray-700">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1 text-emerald-200">
                  <ShieldCheck className="w-4 h-4" />
                  Compliance seal active
                </div>
                <div className="flex items-center gap-2 text-govGray-700">
                  <Radar className="w-4 h-4 text-sky-300" />
                  {centresOnline} centres streaming telemetry
                </div>
                <div className="flex items-center gap-2 text-govGray-600">
                  <BellRing className="w-4 h-4 text-rose-200" />
                  {flaggedCandidates} escalations in review queue
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border border-govGray-300 bg-white/5 px-4 py-4 flex flex-col gap-2 fade-up-soft fade-delay-${idx + 1}`}
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-govGray-700">
                      <span>{stat.label}</span>
                      <Icon className="w-4 h-4 text-govNavy-700/70" />
                    </div>
                    <div className="text-2xl font-semibold text-govNavy-700">{stat.value}</div>
                    <div className="text-[11px] text-govGray-600">{stat.detail}</div>
                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${stat.accent}`} />
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] text-govNavy-700 fade-up-soft fade-delay-3">
              {authoritySignals.map(({ icon: Icon, tone, text }) => (
                <span
                  key={text}
                  className={`inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 border border-govGray-300 ${tone}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid xl:grid-cols-[1.4fr,1.6fr] gap-4 md:gap-6">
        <div className="space-y-4">
          <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                  National Exam Snapshot
                </div>
                <p className="text-[11px] text-govGray-600">
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

          <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                  Academic Record Integrity
                </div>
                <p className="text-[11px] text-govGray-600">
                  Authentic vs fake degrees across the region.
                </p>
              </div>
              <IconPieChart className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-3 rounded-full bg-govGray-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400"
                    style={{ width: `${authorityOverview.authenticPercentage}%` }}
                  />
                </div>
                <div className="h-3 mt-1 rounded-full bg-govGray-100 overflow-hidden">
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
              <div className="w-24 h-24 rounded-full bg-govGray-100 border border-govGray-300 flex items-center justify-center flex-col text-xs">
                <span className="text-[10px] text-govGray-600">Integrity</span>
                <span className="text-xl font-semibold text-emerald-300">
                  {authorityOverview.authenticPercentage}%
                </span>
                <span className="text-[10px] text-govGray-600">pass verification</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                India Fraud Heat Map
              </div>
              <p className="text-[11px] text-govGray-600">
                State-wise fraud density and verification performance.
              </p>
            </div>
            <Map className="w-5 h-5 text-govNavy-700" />
          </div>
          <div className="flex-1 rounded-xl bg-govGray-100 border border-govGray-300 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[11px] text-govGray-700">
              <span>
                {selectedState
                  ? `Focused on ${Object.keys(stateWiseFraudData).find(
                      (name) => stateWiseFraudData[name].state_code === selectedState
                    )}`
                  : "All States"}
              </span>
              <span className="text-govGray-600 text-[10px]">
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
        <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                Fraud Detection — Students & Staff
              </div>
              <p className="text-[11px] text-govGray-600">
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
                className="rounded-xl bg-white border border-govGray-300 px-3 py-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-govNavy-700">{c.name}</span>
                      <span className="font-mono text-[10px] text-govGray-600">
                        {c.refId}
                      </span>
                    </div>
                    <div className="text-[10px] text-govGray-600">
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
                  <div className="text-[11px] text-govGray-600">{c.issue}</div>
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
              <p className="text-[11px] text-govGray-600">
                No fraud cases currently escalated to authority level.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
                Analytics — Fraud, Verification & Security
              </div>
              <p className="text-[11px] text-govGray-600">
                Trends over time to guide policy & intervention.
              </p>
            </div>
            <BarChart3 className="w-5 h-5 text-sky-300" />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 text-xs">
            <div className="rounded-xl bg-white border border-govGray-300 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-govGray-700">
                  Monthly Fraud & Attempts
                </span>
                <UserCircle2 className="w-4 h-4 text-govGray-600" />
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

            <div className="rounded-xl bg-white border border-govGray-300 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-govGray-700">
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

          <div className="rounded-xl bg-white border border-govGray-300 p-3 grid grid-cols-[1.2fr,1.4fr] gap-3 items-center">
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <IconPieChart className="w-4 h-4 text-sky-300" />
                <span className="text-[11px] text-govGray-700">
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
                  className="flex items-center justify-between rounded-lg bg-govGray-100/80 border border-govGray-300 px-2 py-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    <span className="text-govNavy-700">{s.label}</span>
                  </div>
                  <span className="text-govGray-600">{s.value}% of centres</span>
                </div>
              ))}
              <p className="text-[10px] text-govGray-600">
                Scores come from CCTV uptime, biometric integrity and device health signals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white border border-govGray-300 gov-card p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-govGray-700 uppercase tracking-wide">
              Advanced Analytics & AI Insights
            </div>
            <p className="text-[11px] text-govGray-600">
              Fraud pattern recognition, time-based analysis, and predictive alerts.
            </p>
          </div>
        </div>
        <AdvancedAnalytics />
        </section>
      </div>
    </div>
  );
}

function Tile({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl bg-white border border-govGray-300 px-3 py-3">
      <div className="text-[11px] text-govGray-600">{label}</div>
      <div
        className={`text-base font-semibold ${
          accent === "rose" ? "text-rose-300" : "text-govNavy-700"
        }`}
      >
        {value}
      </div>
      {sub && <div className="text-[10px] text-govGray-600">{sub}</div>}
    </div>
  );
}

function LegendPill({ color, label, value }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1.5">
        <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-govNavy-700 text-[11px]">{label}</span>
      </div>
      <span className="text-govGray-600 text-[11px]">{value}</span>
    </div>
  );
}
