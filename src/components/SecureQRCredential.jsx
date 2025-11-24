import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, Download, CheckCircle2 } from "lucide-react";
import { generateSecureQRPayload } from "../services/simulationService";

export default function SecureQRCredential({ studentId, documentId, documentName }) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [qrData, setQrData] = useState("{}");
  
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const payload = await generateSecureQRPayload(studentId, documentId, documentName);
        if (isMounted) {
          setQrData(JSON.stringify(payload));
        }
      } catch (err) {
        console.error("Failed to generate secure QR payload", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [studentId, documentId, documentName]);

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
    <div className="flex flex-col items-center gap-3 p-4 bg-dark-950 rounded-xl border border-primary-500/30 shadow-glow-sm">
      <div className="flex items-center gap-2 mb-1">
        <QrCode className="w-4 h-4 text-primary-400" />
        <span className="text-xs font-semibold text-dark-300">
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
          <div className="absolute inset-0 flex items-center justify-center bg-accent-500/20 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-accent-400" />
          </div>
        )}
      </div>
      
      <div className="text-center space-y-1">
        <p className="text-[10px] text-dark-400 text-center max-w-[180px]">
          Scan to verify document authenticity
        </p>
        <div className="flex items-center justify-center gap-1 text-[9px] text-dark-500">
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
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-500 hover:bg-primary-400 active:scale-95 text-xs font-medium text-dark-950 py-1.5 transition-all duration-300 shadow-glow-sm hover:shadow-glow-md"
        >
          <QrCode className="w-3.5 h-3.5" />
          Generate
        </button>
        <button
          onClick={downloadQR}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 text-xs font-medium text-dark-200 py-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      </div>
      
      <div className="w-full pt-2 border-t border-dark-800">
        <div className="text-[9px] text-dark-500 space-y-0.5">
          <div className="flex justify-between">
            <span>Security Level:</span>
            <span className="text-accent-300">High (H)</span>
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

