import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, CheckCircle2 } from "lucide-react";

export default function SecureQRCredential({ studentId, documentId, documentName }) {
  const [isGenerated, setIsGenerated] = useState(false);
  
  const generateQRData = () => {
    return JSON.stringify({
      id: studentId,
      doc: documentId,
      docName: documentName || "Document",
      timestamp: Date.now(),
      hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      version: "1.0"
    });
  };

  const qrData = generateQRData();

  const downloadQR = () => {
    const svg = document.querySelector('#qr-code-canvas');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${studentId}-${Date.now()}.png`;
        a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2 mb-1">
        <QrCode className="w-4 h-4 text-sky-400" />
        <span className="text-xs font-semibold text-slate-300">
          Secure QR Credential
        </span>
      </div>
      
      <div className="relative">
        <div className="p-3 bg-white rounded-lg">
          <QRCodeSVG
            id="qr-code-canvas"
            value={qrData}
            size={140}
            level="H"
            includeMargin={true}
          />
        </div>
        {isGenerated && (
          <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
        )}
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-[10px] text-slate-400 text-center max-w-[180px]">
          Scan to verify document authenticity
        </p>
        <div className="flex items-center justify-center gap-1 text-[9px] text-slate-500">
          <span className="font-mono">{studentId}</span>
          {documentId && (
            <>
              <span>•</span>
              <span className="font-mono">{documentId}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 w-full">
        <button
          onClick={() => setIsGenerated(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-medium text-slate-950 py-1.5 transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          Generate
        </button>
        <button
          onClick={downloadQR}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 py-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
      
      <div className="w-full pt-2 border-t border-slate-800">
        <div className="text-[9px] text-slate-500 space-y-0.5">
          <div className="flex justify-between">
            <span>Security Level:</span>
            <span className="text-emerald-300">High (H)</span>
          </div>
          <div className="flex justify-between">
            <span>Error Correction:</span>
            <span>30%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

