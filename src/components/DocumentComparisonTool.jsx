import React, { useState } from "react";
import { FileText, AlertTriangle, CheckCircle2, XCircle, Scan } from "lucide-react";

export default function DocumentComparisonTool({ original, submitted, onAnalyze }) {
  const [differences, setDifferences] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDocuments = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = [
        { field: 'University Seal', status: 'mismatch', confidence: 95, details: 'Seal pattern does not match official template' },
        { field: 'Signature', status: 'suspicious', confidence: 78, details: 'Signature shows signs of digital manipulation' },
        { field: 'Dates', status: 'match', confidence: 100, details: 'All dates verified against records' },
        { field: 'Watermark', status: 'missing', confidence: 100, details: 'Security watermark not detected' },
        { field: 'Font Consistency', status: 'match', confidence: 98, details: 'Fonts match official standards' },
        { field: 'Paper Texture', status: 'suspicious', confidence: 65, details: 'Texture analysis suggests digital print' },
      ];
      
      setDifferences(analysis);
      setIsAnalyzing(false);
      
      if (onAnalyze) {
        onAnalyze(analysis);
      }
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'match':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'mismatch':
      case 'missing':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'suspicious':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'match':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'mismatch':
      case 'missing':
        return <XCircle className="w-3 h-3" />;
      case 'suspicious':
        return <AlertTriangle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scan className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-300">
            Document Comparison Analysis
          </span>
        </div>
        <button
          onClick={analyzeDocuments}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-300 text-xs font-medium text-slate-950 px-3 py-1.5 transition-colors"
        >
          {isAnalyzing ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Scan className="w-3.5 h-3.5" />
              Analyze Documents
            </>
          )}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            Original Record
          </h4>
          <div className="aspect-[3/4] bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500">Original Document</p>
              <p className="text-[10px] text-slate-600">From Central Registry</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-rose-400" />
            Submitted Document
          </h4>
          <div className="aspect-[3/4] bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center">
            <div className="text-center space-y-2">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-500">Submitted Document</p>
              <p className="text-[10px] text-slate-600">User Upload</p>
            </div>
          </div>
        </div>
      </div>

      {differences.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-slate-300">Analysis Results</h4>
          <div className="space-y-1.5">
            {differences.map((diff, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-2.5 rounded-lg border ${getStatusColor(diff.status)}`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(diff.status)}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{diff.field}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{diff.details}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="text-[10px] font-semibold">
                    {diff.confidence}%
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Overall Match Score:</span>
              <span className="text-sky-300 font-semibold">
                {Math.round(
                  differences.reduce((acc, d) => acc + (d.status === 'match' ? d.confidence : 0), 0) /
                  differences.filter(d => d.status === 'match').length || 0
                )}%
              </span>
            </div>
          </div>
        </div>
      )}

      {isAnalyzing && differences.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-400">Analyzing documents with AI...</p>
            <p className="text-xs text-slate-500">Comparing seals, signatures, watermarks, and metadata</p>
          </div>
        </div>
      )}
    </div>
  );
}

