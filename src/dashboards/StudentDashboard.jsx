import React, { useState } from "react";
import { studentRecord } from "../mockData";
import {
  FileText,
  CheckCircle2,
  Hourglass,
  AlertTriangle,
  UploadCloud,
  Plus,
} from "lucide-react";
import BlockchainVerification from "../components/BlockchainVerification";
import SecureQRCredential from "../components/SecureQRCredential";
import DocumentComparisonTool from "../components/DocumentComparisonTool";

const statusColor = (status) => {
  if (status === "Verified") return "text-emerald-400 bg-emerald-500/10";
  if (status === "Flagged as Fake") return "text-rose-400 bg-rose-500/10";
  if (status === "Pending") return "text-amber-400 bg-amber-500/10";
  return "text-slate-300 bg-slate-700/40";
};

export default function StudentDashboard() {
  const [docs, setDocs] = useState(studentRecord.documents);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewDoc, setPreviewDoc] = useState(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const mapped = files.map((f, idx) => ({
      id: `local-${Date.now()}-${idx}`,
      name: f.name,
      type: "Uploaded",
      status: "Pending",
      lastChecked: "—",
      integrityScore: 0,
    }));
    setUploadQueue((prev) => [...prev, ...mapped]);
  };

  const triggerVerification = () => {
    if (!uploadQueue.length) return;
    setIsVerifying(true);
    setTimeout(() => {
      setDocs((existing) => {
        const updatedQueue = uploadQueue.map((d, i) => ({
          ...d,
          status: i % 3 === 0 ? "Flagged as Fake" : "Verified",
          lastChecked: "2025-11-19 09:30",
          integrityScore: i % 3 === 0 ? 15 : 97,
        }));
        return [...existing, ...updatedQueue];
      });
      setUploadQueue([]);
      setIsVerifying(false);
      setActiveTab("status");
    }, 900);
  };

  const verifiedCount = docs.filter((d) => d.status === "Verified").length;
  const fakeCount = docs.filter((d) => d.status === "Flagged as Fake").length;

  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      !searchTerm ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const orderedForTimeline = [...docs].sort((a, b) => {
    if (a.lastChecked === "—") return 1;
    if (b.lastChecked === "—") return -1;
    return a.lastChecked.localeCompare(b.lastChecked);
  });

  return (
    <div className="relative px-4 md:px-6 py-5 space-y-6">
      {/* Tabs */}
      <div className="border-b border-slate-800 mb-2 flex flex-wrap gap-2 text-xs">
        {[
          { id: "overview", label: "Overview" },
          { id: "documents", label: "My Documents" },
          { id: "status", label: "Verification Status" },
          { id: "upload", label: "Upload" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-full border text-[11px] transition-colors ${
              activeTab === tab.id
                ? "bg-sky-500/10 border-sky-500 text-sky-300"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <>
          <section className="grid md:grid-cols-[2fr,1.4fr] gap-4 md:gap-6">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-sky-300 uppercase tracking-wide">
                    Academic Profile
                  </div>
                  <div className="text-lg font-semibold">
                    {studentRecord.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {studentRecord.programme} • {studentRecord.institution}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ID: <span className="font-mono">{studentRecord.id}</span> •{" "}
                    {studentRecord.year}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 px-3 py-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="text-[11px] text-emerald-200">
                      Identity Verified
                    </span>
                  </div>
                  <div className="flex gap-1 text-[10px] text-slate-400 flex-wrap">
                    {studentRecord.semesters.map((s) => (
                      <div
                        key={s.sem}
                        className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700/80"
                      >
                        {s.sem}: <span className="font-semibold">{s.sgpa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-sky-950/80 via-slate-950 to-slate-950 border border-sky-800/40 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-sky-300 uppercase tracking-wide">
                    Verification Summary
                  </div>
                  <div className="text-sm text-slate-200">
                    Snapshot of your document integrity
                  </div>
                </div>
                <FileText className="w-5 h-5 text-sky-300" />
              </div>

              <div className="space-y-3 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Verified</span>
                  <span>
                    {verifiedCount} / {docs.length}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300"
                    style={{
                      width: `${docs.length ? (verifiedCount / docs.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified & authentic
                  </span>
                  <span className="flex items-center gap-1 text-rose-300">
                    <AlertTriangle className="w-3 h-3" />
                    Fake flagged: {fakeCount}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* My Documents Tab */}
      {activeTab === "documents" && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                My Documents
              </div>
              <p className="text-[11px] text-slate-500">
                Search, filter, and inspect your uploaded academic records.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or type..."
                className="w-40 md:w-56 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="all">All statuses</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Flagged as Fake">Flagged as Fake</option>
              </select>
              <div className="relative">
                <button className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-[11px] text-slate-100 hover:border-sky-500/60 transition-colors">
                  Actions ▾
                </button>
                {/* Placeholder for future actions dropdown (export, download, etc.) */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs border-separate border-spacing-y-1">
              <thead className="text-[11px] text-slate-400">
                <tr>
                  <th className="text-left font-medium pb-2">Document</th>
                  <th className="text-left font-medium pb-2">Type</th>
                  <th className="text-left font-medium pb-2">Status</th>
                  <th className="text-left font-medium pb-2">Integrity</th>
                  <th className="text-left font-medium pb-2">Last Check</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((d) => (
                  <tr
                    key={d.id}
                    className="align-middle hover:bg-slate-900/70 cursor-pointer"
                    onClick={() => setPreviewDoc(d)}
                  >
                    <td className="py-1.5 pr-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center">
                          <FileText className="w-3.5 h-3.5 text-slate-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-slate-100">
                            {d.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-1.5 pr-2 text-[11px] text-slate-400">
                      {d.type}
                    </td>
                    <td className="py-1.5 pr-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(
                          d.status
                        )}`}
                      >
                        {d.status === "Verified" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : d.status === "Pending" ? (
                          <Hourglass className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        {d.status}
                      </span>
                    </td>
                    <td className="py-1.5 pr-2 text-[11px] text-slate-300">
                      {d.integrityScore ? `${d.integrityScore}%` : "—"}
                    </td>
                    <td className="py-1.5 text-[11px] text-slate-400">
                      {d.lastChecked}
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-4 text-center text-[11px] text-slate-500"
                    >
                      No documents match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Verification Status Tab */}
      {activeTab === "status" && (
        <section className="grid lg:grid-cols-[1.3fr,1.7fr] gap-4 md:gap-6">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Verification Progress
                </div>
                <p className="text-[11px] text-slate-500">
                  Overall status across all uploaded credentials.
                </p>
              </div>
              <FileText className="w-5 h-5 text-slate-300" />
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Verified</span>
                <span>
                  {verifiedCount} / {docs.length}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-400"
                  style={{
                    width: `${docs.length ? (verifiedCount / docs.length) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Flagged as Fake</span>
                <span>{fakeCount}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Verification Timeline
                </div>
                <p className="text-[11px] text-slate-500">
                  Chronological view of when each document was assessed.
                </p>
              </div>
              <FileText className="w-5 h-5 text-slate-300" />
            </div>

            <div className="max-h-72 overflow-auto space-y-3 text-[11px]">
              {orderedForTimeline.map((d) => (
                <div
                  key={d.id}
                  className="relative pl-4 border-l border-slate-700/70"
                >
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-100">{d.name}</span>
                    <span className="text-slate-500 font-mono">{d.lastChecked}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor(
                        d.status
                      )}`}
                    >
                      {d.status === "Verified" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : d.status === "Pending" ? (
                        <Hourglass className="w-3 h-3" />
                      ) : (
                        <AlertTriangle className="w-3 h-3" />
                      )}
                      {d.status}
                    </span>
                    <span className="text-slate-400">
                      Integrity: {d.integrityScore ? `${d.integrityScore}%` : "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upload Tab */}
      {activeTab === "upload" && (
        <section className="grid lg:grid-cols-[1.3fr,1.7fr] gap-4 md:gap-6">
          <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Upload New Documents
                </div>
                <p className="text-[11px] text-slate-400">
                  PDF / Image uploads are cross-checked against the central registry (mock).
                </p>
              </div>
              <UploadCloud className="w-5 h-5 text-sky-400" />
            </div>

            <label className="flex flex-col items-center justify-center border border-dashed border-slate-700 rounded-xl bg-slate-900/60 px-4 py-8 cursor-pointer hover:border-sky-500/60 hover:bg-slate-900 transition">
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileSelect}
                accept=".pdf,image/*"
              />
              <UploadCloud className="w-7 h-7 text-sky-400 mb-2" />
              <span className="text-xs font-medium text-slate-100">
                Drop PDF / Images here or click to browse
              </span>
              <span className="text-[10px] text-slate-500 mt-1">
                Files stay on this browser — demo only.
              </span>
            </label>

            {uploadQueue.length > 0 && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">
                    Ready for cross-check:{" "}
                    <span className="font-semibold">
                      {uploadQueue.length} file(s)
                    </span>
                  </span>
                  <button
                    onClick={triggerVerification}
                    disabled={isVerifying}
                    className="inline-flex items-center gap-1 rounded-full bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-300 px-3 py-1.5 text-[11px] font-medium text-slate-950"
                  >
                    {isVerifying ? (
                      <>
                        <Hourglass className="w-3 h-3 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        Cross-Check Now
                      </>
                    )}
                  </button>
                </div>
                <ul className="space-y-1 max-h-28 overflow-auto pr-1">
                  {uploadQueue.map((d) => (
                    <li
                      key={d.id}
                      className="flex items-center justify-between rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1.5"
                    >
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-200">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {d.name}
                      </span>
                      <span className="text-[10px] text-slate-500">Pending</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Blockchain Verification
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Deep-dive for a single selected credential.
                  </p>
                </div>
              </div>
              <BlockchainVerification
                documentId={selectedDoc?.id || docs[0]?.id}
                onVerify={(result) => {
                  console.log("Blockchain verification:", result);
                }}
              />
            </div>

            <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                Secure QR Credential
              </div>
              <SecureQRCredential
                studentId={studentRecord.id}
                documentId={selectedDoc?.id || docs[0]?.id}
                documentName={selectedDoc?.name || docs[0]?.name}
              />
            </div>
          </div>
        </section>
      )}

      {/* Quick actions & comparison remain accessible below all tabs */}
      <section className="grid lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-1">
          <BlockchainVerification
            documentId={selectedDoc?.id || docs[0]?.id}
            onVerify={(result) => {
              console.log("Blockchain verification:", result);
            }}
          />
        </div>

        <div className="lg:col-span-1">
          <SecureQRCredential
            studentId={studentRecord.id}
            documentId={selectedDoc?.id || docs[0]?.id}
            documentName={selectedDoc?.name || docs[0]?.name}
          />
        </div>

        <div className="lg:col-span-1 rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-3">
            Quick Actions
          </div>
          <div className="space-y-2 text-xs">
            <button
              onClick={() =>
                setSelectedDoc(
                  docs.find((d) => d.status === "Verified") || docs[0]
                )
              }
              className="w-full text-left rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 hover:border-sky-500/40 transition-colors"
            >
              <div className="font-medium text-slate-200">Select Verified Document</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Choose a document to drive blockchain & QR views.
              </div>
            </button>
          </div>
        </div>
      </section>

      {selectedDoc && (
        <section className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <DocumentComparisonTool
            original={selectedDoc}
            submitted={selectedDoc}
            onAnalyze={(analysis) => {
              console.log("Document analysis:", analysis);
            }}
          />
        </section>
      )}

      {/* Document preview modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full rounded-2xl bg-slate-950 border border-slate-800 p-5 shadow-glow-md">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  Document Preview
                </div>
                <div className="text-sm text-slate-100 truncate">
                  {previewDoc.name}
                </div>
              </div>
              <button
                className="text-slate-400 hover:text-slate-100 text-xs"
                onClick={() => setPreviewDoc(null)}
              >
                Close
              </button>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-500">Type: </span>
                {previewDoc.type}
              </div>
              <div>
                <span className="text-slate-500">Status: </span>
                {previewDoc.status}
              </div>
              <div>
                <span className="text-slate-500">Integrity: </span>
                {previewDoc.integrityScore
                  ? `${previewDoc.integrityScore}%`
                  : "—"}
              </div>
              <div>
                <span className="text-slate-500">Last checked: </span>
                {previewDoc.lastChecked}
              </div>
            </div>
            <p className="mt-3 text-[10px] text-slate-500">
              Full document rendering is not wired in this demo; this modal acts as
              a focused summary view for quick checks.
            </p>
          </div>
        </div>
      )}

      {/* Floating Upload FAB */}
      <button
        type="button"
        onClick={() => setActiveTab("upload")}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 inline-flex items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/30 w-11 h-11 md:w-12 md:h-12 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
