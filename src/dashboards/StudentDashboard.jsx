import React, { useState } from "react";
import { studentRecord } from "../mockData";
import {
  FileText,
  CheckCircle2,
  Hourglass,
  AlertTriangle,
  UploadCloud,
} from "lucide-react";
import BlockchainVerification from "../components/BlockchainVerification";
import SecureQRCredential from "../components/SecureQRCredential";
import DocumentComparisonTool from "../components/DocumentComparisonTool";
import NotificationSystem from "../components/NotificationSystem";

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
    }, 900);
  };

  const verifiedCount = docs.filter((d) => d.status === "Verified").length;
  const fakeCount = docs.filter((d) => d.status === "Flagged as Fake").length;

  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="px-4 md:px-6 py-5 space-y-6">
      <NotificationSystem />
      
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
                ID: <span className="font-mono">{studentRecord.id}</span> •
                {" "}
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
              <div className="flex gap-1 text-[10px] text-slate-400">
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
                Verification Status
              </div>
              <div className="text-sm text-slate-200">
                Cross-checking uploaded credentials
              </div>
            </div>
            <FileText className="w-5 h-5 text-sky-300" />
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
                className="h-full bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-300"
                style={{
                  width: `${(verifiedCount / docs.length) * 100}%`,
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

      <section className="grid lg:grid-cols-[1.3fr,2fr] gap-4 md:gap-6">
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

        <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                Document Verification Timeline
              </div>
              <p className="text-[11px] text-slate-500">
                Live status of your uploaded academic credentials.
              </p>
            </div>
            <FileText className="w-5 h-5 text-slate-400" />
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
                {docs.map((d) => (
                  <tr key={d.id} className="align-middle">
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
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
              onClick={() => setSelectedDoc(docs.find(d => d.status === "Verified") || docs[0])}
              className="w-full text-left rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 hover:border-sky-500/40 transition-colors"
            >
              <div className="font-medium text-slate-200">Select Document</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Choose a document to verify
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
    </div>
  );
}
