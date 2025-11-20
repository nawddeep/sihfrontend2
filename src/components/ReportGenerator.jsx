import React from "react";
import { FileDown, Download, FileText } from "lucide-react";

export default function ReportGenerator({ data, reportType = "fraud-summary" }) {
  const generateReport = (type) => {
    const timestamp = new Date().toISOString();
    
    const reportData = {
      generated: timestamp,
      type: type,
      version: "1.0",
      data: data || {},
      metadata: {
        generatedBy: "SIH Verification Platform",
        format: "JSON",
      },
    };

    // Create downloadable file
    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    if (!data || !Array.isArray(data)) return;
    
    const headers = Object.keys(data[0] || {});
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => generateReport("fraud-summary")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-medium text-slate-950 px-3 py-1.5 transition-colors"
      >
        <FileDown className="w-3.5 h-3.5" />
        Fraud Report (JSON)
      </button>
      <button
        onClick={() => generateReport("verification-log")}
        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 px-3 py-1.5 transition-colors"
      >
        <FileText className="w-3.5 h-3.5" />
        Export Logs
      </button>
      {data && Array.isArray(data) && data.length > 0 && (
        <button
          onClick={exportAsCSV}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-medium text-slate-950 px-3 py-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      )}
    </div>
  );
}

