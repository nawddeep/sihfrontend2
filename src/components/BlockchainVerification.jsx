import React, { useState } from "react";
import { Shield, CheckCircle2, Clock, Hash } from "lucide-react";
import { fetchBlockchainVerification } from "../services/simulationService";

export default function BlockchainVerification({ documentId, onVerify }) {
  const [verificationState, setVerificationState] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const verifyOnBlockchain = async () => {
    setIsVerifying(true);

    try {
      const result = await fetchBlockchainVerification(documentId || "mock-doc-hash");
      const mapped = {
        blockNumber: result.blockNumber,
        timestamp: result.timestamp,
        verified: result.status === "Confirmed",
        hash: result.hash,
        gasUsed: result.gasUsed,
        confirmations: result.confirmations,
      };

      setVerificationState(mapped);

      if (onVerify) {
        onVerify(mapped);
      }
    } catch (err) {
      console.error("Blockchain verification simulation failed", err);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!verificationState && !isVerifying) {
    return (
      <div className="rounded-xl border border-dark-800 bg-dark-950/80 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-primary-400" />
          <span className="text-xs font-semibold text-dark-300">
            Blockchain Verification
          </span>
        </div>
        <p className="text-[11px] text-dark-400 mb-3">
          Verify this document on the blockchain for immutable record keeping.
        </p>
        <button
          onClick={verifyOnBlockchain}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-400 active:scale-95 text-xs font-medium text-dark-950 py-2 transition-all duration-300 shadow-glow-md hover:shadow-glow-lg"
        >
          <Shield className="w-3.5 h-3.5" />
          Verify on Blockchain
        </button>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="rounded-xl border border-primary-500/30 bg-primary-500/5 p-4 shadow-glow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary-400 animate-spin" />
          <span className="text-xs font-semibold text-primary-300">
            Verifying on Blockchain...
          </span>
        </div>
        <div className="space-y-1.5 text-[10px] text-dark-400">
          <div>• Submitting transaction to network</div>
          <div>• Waiting for block confirmation</div>
          <div>• Validating document hash</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-4 shadow-glow-success">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="w-4 h-4 text-accent-400" />
        <span className="text-xs font-semibold text-accent-300">
          Blockchain Verified
        </span>
      </div>
      
      <div className="space-y-2 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-dark-400">Transaction Hash:</span>
          <div className="flex items-center gap-1.5">
            <Hash className="w-3 h-3 text-dark-500" />
            <span className="font-mono text-[10px] text-dark-300">
              {verificationState.hash.slice(0, 20)}...
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-400">Block Number:</span>
          <span className="font-mono text-dark-300">
            #{verificationState.blockNumber.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-400">Confirmations:</span>
          <span className="text-accent-300 font-semibold">
            {verificationState.confirmations}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-400">Gas Used:</span>
          <span className="text-dark-300">
            {verificationState.gasUsed.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-dark-400">Timestamp:</span>
          <span className="text-dark-300 text-[10px]">
            {new Date(verificationState.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-accent-500/20">
        <div className="flex items-center gap-1.5 text-[10px] text-accent-300/80">
          <Shield className="w-3 h-3" />
          <span>Document hash permanently stored on blockchain</span>
        </div>
      </div>
    </div>
  );
}

