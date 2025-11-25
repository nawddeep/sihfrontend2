import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import FraudCaseCard from "../components/FraudCaseCard";
import SignatureVerificationSection from "../components/SignatureVerification/SignatureVerificationSection";
import {
  AnimatedCard,
  SlideIn,
  FadeUp,
  CountUpAnimation,
  StaggeredContainer,
  StaggeredItem,
  PulseEffect,
  LoadingSpinner,
} from "../components/animations/AnimatedComponents";

export default function CentreStaffDashboardAnimated() {
  const [suspects, setSuspects] = useState(
    fraudSuspects.map(s => ({
      id: s.id,
      studentId: s.id,
      studentName: s.name,
      docType: s.docType || "Previous Degree",
      status: s.resolvedAs || "Review Required",
      severity: s.severity?.toLowerCase() || "high",
      confidence: s.confidence || 87,
      timestamp: new Date(),
      reason: s.reason,
    }))
  );
  const [bulkFiles, setBulkFiles] = useState([]);
  const [activeCase, setActiveCase] = useState(null);

  const handleBulkUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setBulkFiles(files.map((f) => f.name));
  };

  const handleResolution = (caseId, resolution, notes) => {
    setSuspects((prev) =>
      prev.map(s =>
        s.id === caseId
          ? { ...s, status: resolution === "Fraud Confirmed" ? "Confirmed" : "Cleared" }
          : s
      )
    );
  };

  const presentPct = (centreSummary.present / centreSummary.totalStudents) * 100;
  const securityScore = centreSummary.securityScore;

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      {/* Animated Stats Cards */}
      <motion.section
        className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {[
          {
            title: "Total Registered Students",
            icon: Users,
            value: centreSummary.totalStudents,
            chip: "Centre Cohort",
            delay: 0,
          },
          {
            title: "Present vs Absent",
            icon: UserCheck,
            value: `${centreSummary.present} / ${centreSummary.totalStudents}`,
            sub: `${presentPct.toFixed(1)}% present`,
            accent: "emerald",
            delay: 0.1,
          },
          {
            title: "Fraud / Cheating Incidents",
            icon: UserX,
            value: centreSummary.fraudIncidents,
            sub: "Logged in current session",
            accent: "rose",
            delay: 0.2,
          },
          {
            title: "Security Score",
            icon: ShieldCheck,
            value: `${securityScore}/100`,
            sub: "Device uptime, CCTV, biometrics",
            accent: "sky",
            delay: 0.3,
          },
        ].map((stat, idx) => (
          <FadeUp key={idx} delay={stat.delay}>
            <AnimatedCard className="rounded-2xl bg-dark-950/80 border border-dark-800/80 p-3.5 md:p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <div className="text-[11px] text-dark-400 uppercase tracking-wide">
                    {stat.title}
                  </div>
                  {stat.chip && (
                    <div className="inline-flex items-center gap-1 rounded-full bg-dark-950/80 border border-dark-700 px-2 py-0.5 text-[10px] text-dark-300 mt-1">
                      {stat.chip}
                    </div>
                  )}
                </div>
                <div className="w-8 h-8 rounded-xl bg-dark-950/80 border border-dark-800 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-dark-200" />
                </div>
              </div>
              <motion.div
                className="text-sm md:text-lg font-semibold text-dark-50 mb-0.5"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: stat.delay + 0.3, type: 'spring' }}
              >
                {typeof stat.value === "number" ? (
                  <CountUpAnimation value={stat.value} />
                ) : (
                  stat.value
                )}
              </motion.div>
              {stat.sub && (
                <div className="text-[11px] text-dark-400">{stat.sub}</div>
              )}
            </AnimatedCard>
          </FadeUp>
        ))}
      </motion.section>

      <section className="grid lg:grid-cols-[1.3fr,1.7fr] gap-4 md:gap-6">
        {/* Biometric Table */}
        <FadeUp delay={0.5}>
          <AnimatedCard className="rounded-2xl bg-dark-950/80 border border-dark-800/80 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-dark-300 uppercase tracking-wide">
                  Biometric Verification
                </div>
              </div>
              <UserCheck className="w-5 h-5 text-accent-300" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-separate border-spacing-y-1">
                <thead className="text-[11px] text-dark-400">
                  <tr>
                    <th className="text-left pb-2">Student</th>
                    <th className="text-left pb-2">Thumb</th>
                    <th className="text-left pb-2">Face</th>
                    <th className="text-left pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <StaggeredContainer delay={0.6}>
                    {centreBiometricList.map((s) => (
                      <StaggeredItem key={s.id}>
                        <motion.tr
                          whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                          className="group"
                        >
                          <td className="py-1.5 pr-2">
                            <div className="flex flex-col">
                              <span className="text-[11px] text-dark-100">{s.name}</span>
                            </div>
                          </td>
                          <td className="py-1.5 pr-2">
                            <Badge
                              label={s.thumb}
                              tone={s.thumb === "MATCH" ? "emerald" : "rose"}
                            />
                          </td>
                          <td className="py-1.5 pr-2">
                            <Badge
                              label={s.face}
                              tone={s.face === "MATCH" ? "emerald" : "amber"}
                            />
                          </td>
                          <td className="py-1.5 pr-2">
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
                        </motion.tr>
                      </StaggeredItem>
                    ))}
                  </StaggeredContainer>
                </tbody>
              </table>
            </div>
          </AnimatedCard>
        </FadeUp>

        <div className="space-y-4">
          {/* Bulk Upload */}
          <FadeUp delay={0.6}>
            <AnimatedCard className="rounded-2xl bg-dark-950/80 border border-dark-800/80 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-dark-300 uppercase tracking-wide">
                    Bulk Verification
                  </div>
                </div>
                <FileSpreadsheet className="w-5 h-5 text-primary-300" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <label className="flex flex-col items-center justify-center rounded-xl border border-dashed border-dark-700 bg-dark-900/60 px-3 py-4 cursor-pointer hover:border-primary-500/60 hover:bg-dark-900">
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv,.xlsx,.zip"
                    multiple
                    onChange={handleBulkUpload}
                  />
                  <UploadCloud className="w-5 h-5 text-primary-400 mb-1" />
                  <span className="font-medium text-dark-100">Upload CSV / ZIP</span>
                </label>
                <div className="rounded-xl border border-dark-800 bg-dark-900/60 px-3 py-3">
                  <div className="text-[11px] text-dark-300 mb-1.5">Files Ready</div>
                  <div className="text-xs font-semibold text-accent-300">
                    {bulkFiles.length}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </FadeUp>

          {/* Signature + Document Comparison */}
          <FadeUp delay={0.6}>
            <AnimatedCard className="rounded-2xl bg-dark-950/80 border border-dark-800/80 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-dark-300 uppercase tracking-wide">
                    Signature & Document Review
                  </div>
                  <p className="text-[11px] text-dark-500">
                    Compare uploaded degree documents and corresponding signatures side-by-side.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div className="border border-dark-800/80 rounded-xl p-3 bg-dark-950/80">
                  <SignatureVerificationSection />
                </div>
                <div className="border border-dark-800/80 rounded-xl p-3 bg-dark-950/80">
                  <DocumentComparisonTool
                    original={activeCase || suspects[0]}
                    submitted={activeCase || suspects[0]}
                    onAnalyze={() => {}}
                  />
                </div>
              </div>
            </AnimatedCard>
          </FadeUp>

          {/* Fraud Cases */}
          <FadeUp delay={0.7}>
            <AnimatedCard className="rounded-2xl bg-dark-950/80 border border-dark-800/80 p-4 md:p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-dark-300 uppercase tracking-wide">
                    Fraud Cases
                  </div>
                </div>
                <AlertTriangle className="w-5 h-5 text-danger-300" />
              </div>
              <motion.div className="space-y-3">
                <StaggeredContainer delay={0.8}>
                  {suspects.slice(0, 3).map((caseData) => (
                    <StaggeredItem key={caseData.id}>
                      <FraudCaseCard
                        caseData={caseData}
                        onResolve={handleResolution}
                        resolvedBy="CEN001"
                        onSelect={() => setActiveCase(caseData)}
                      />
                    </StaggeredItem>
                  ))}
                </StaggeredContainer>
              </motion.div>
            </AnimatedCard>
          </FadeUp>
        </div>
      </section>

      {/* Slide-out panel for focused case review */}
      <AnimatePresence>
        {activeCase && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-16 bottom-0 w-full max-w-md bg-dark-950/95 border-l border-dark-800/80 shadow-glow-md z-40 overflow-y-auto"
          >
            <div className="p-4 border-b border-dark-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-dark-300 uppercase tracking-wide">
                  Case Detail
                </div>
                <div className="text-sm text-dark-100 font-medium">
                  {activeCase.studentName} ({activeCase.studentId})
                </div>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="text-dark-400 hover:text-dark-100 text-xs"
              >
                Close
              </button>
            </div>
            <div className="p-4 space-y-3 text-xs text-dark-300">
              <div>
                <span className="text-dark-400">Document type:</span> {activeCase.docType}
              </div>
              <div>
                <span className="text-dark-400">Reason:</span> {activeCase.reason}
              </div>
              <div>
                <span className="text-dark-400">Confidence:</span> {activeCase.confidence}%
              </div>
              <div className="mt-2">
                <DocumentComparisonTool
                  original={activeCase}
                  submitted={activeCase}
                  onAnalyze={() => {}}
                />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function Badge({ label, tone }) {
  const map = {
    emerald: "bg-accent-500/10 text-accent-300 border border-accent-500/30",
    rose: "bg-danger-500/10 text-danger-300 border border-danger-500/30",
    amber: "bg-warning-500/10 text-warning-300 border border-warning-500/30",
  };
  const cls = map[tone] || "bg-dark-800 text-dark-200 border border-dark-700";
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}
    >
      {label}
    </motion.span>
  );
}
