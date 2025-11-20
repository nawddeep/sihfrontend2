import React, { useState } from "react";
import { Shield, CheckCircle2, Clock, Hash } from "lucide-react";

export default function BlockchainVerification({ documentId, onVerify }) {
  const [verificationState, setVerificationState] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyOnBlockchain = async () => {
    setIsVerifying(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const hash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const blockNumber = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().toISOString();
    
    const result = {
      blockNumber,
      timestamp,
      verified: true,
      hash,
      gasUsed: Math.floor(Math.random() * 50000) + 100000,
      confirmations: Math.floor(Math.random() * 10) + 1,
    };
    
    setVerificationState(result);
    setIsVerifying(false);
    
    if (onVerify) {
      onVerify(result);
    }
  };

  if (!verificationState && !isVerifying) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-300">
            Blockchain Verification
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          Verify this document on the blockchain for immutable record keeping.
        </p>
        <button
          onClick={verifyOnBlockchain}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-xs font-medium text-slate-950 py-2 transition-colors"
        >
          <Shield className="w-3.5 h-3.5" />
          Verify on Blockchain
        </button>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-sky-400 animate-spin" />
          <span className="text-xs font-semibold text-sky-300">
            Verifying on Blockchain...
          </span>
        </div>
        <div className="space-y-1.5 text-[10px] text-slate-400">
          <div>• Submitting transaction to network</div>
          <div>• Waiting for block confirmation</div>
          <div>• Validating document hash</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-300">
          Blockchain Verified
        </span>
      </div>
      
      <div className="space-y-2 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Transaction Hash:</span>
          <div className="flex items-center gap-1.5">
            <Hash className="w-3 h-3 text-slate-500" />
            <span className="font-mono text-[10px] text-slate-300">
              {verificationState.hash.slice(0, 20)}...
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Block Number:</span>
          <span className="font-mono text-slate-300">
            #{verificationState.blockNumber.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Confirmations:</span>
          <span className="text-emerald-300 font-semibold">
            {verificationState.confirmations}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Gas Used:</span>
          <span className="text-slate-300">
            {verificationState.gasUsed.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Timestamp:</span>
          <span className="text-slate-300 text-[10px]">
            {new Date(verificationState.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-emerald-500/20">
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-300/80">
          <Shield className="w-3 h-3" />
          <span>Document hash permanently stored on blockchain</span>
        </div>
      </div>
    </div>
  );
}

