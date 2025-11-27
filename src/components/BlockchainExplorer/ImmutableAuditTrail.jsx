import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, User, CheckCircle, FileText, Download } from 'lucide-react';

export default function ImmutableAuditTrail({ documentId = 'DOC-2024-001' }) {
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Mock audit trail data
  const auditTrail = [
    {
      step: 1,
      action: 'Document Submitted',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      actor: 'Student User',
      blockHash: '0xab12cd34ef56...7890',
      txHash: '0x1234567890abcdef...fedcba',
      status: 'completed',
      details: {
        documentType: 'Degree Certificate',
        fileSize: '2.4 MB',
        sha256: '0x' + Math.random().toString(16).slice(2),
      },
    },
    {
      step: 2,
      action: 'Document Verified',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      actor: 'AI Verification System',
      blockHash: '0xba98dcfe5432...0123',
      txHash: '0xfedcba0987654321...123456',
      status: 'completed',
      details: {
        verificationMethod: 'OCR + AI Analysis',
        confidence: '99.8%',
        processTime: '45.2s',
      },
    },
    {
      step: 3,
      action: 'Biometric Match',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      actor: 'Biometric System',
      blockHash: '0x9876543210...dcba',
      txHash: '0x0fedcba987654...234567',
      status: 'completed',
      details: {
        faceMatch: '96.2%',
        irisMatch: '99.1%',
        fingerprintMatch: '98.5%',
      },
    },
    {
      step: 4,
      action: 'Live Proof Check',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      actor: 'Liveness Detection',
      blockHash: '0x5432109876...abcd',
      txHash: '0x567890fedcba...345678',
      status: 'completed',
      details: {
        blinkDetected: 'Yes',
        livenessScore: '95%',
        spoofingRisk: 'None',
      },
    },
    {
      step: 5,
      action: 'Blockchain Committed',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      actor: 'Blockchain Network',
      blockHash: '0x3210987654...bcde',
      txHash: '0x876543210fedcba...456789',
      status: 'completed',
      details: {
        blockHeight: 149999,
        confirmations: 12,
        gasUsed: '125,000',
      },
    },
  ];

  const currentEntry = auditTrail[selectedEntry];

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-saffron mb-1 flex items-center gap-2">
              <Lock size={20} />
              Immutable Audit Trail
            </h4>
            <p className="text-sm text-gray-400">Document ID: {documentId}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-saffron to-orange-600 rounded-lg hover:shadow-lg hover:shadow-saffron/50 transition text-sm font-semibold"
          >
            <Download size={16} />
            Export
          </motion.button>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h5 className="text-sm font-bold text-saffron mb-4">Verification Timeline</h5>

        {/* Vertical Timeline */}
        <div className="space-y-2">
          {auditTrail.map((entry, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedEntry(idx)}
              className={`w-full p-3 rounded-lg border transition text-left ${
                selectedEntry === idx
                  ? 'border-saffron bg-saffron/10'
                  : 'border-gray-600 bg-gray-700/50 hover:border-saffron'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Step Number */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-saffron to-orange-600 flex items-center justify-center font-bold text-gray-900"
                  animate={{ scale: selectedEntry === idx ? 1.1 : 1 }}
                >
                  {entry.step}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-gray-300">{entry.action}</p>
                    <div className="flex items-center gap-1">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="text-xs text-green-400">Verified</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {entry.timestamp.toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <User size={12} />
                    {entry.actor}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Timeline Connector */}
        <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-saffron to-orange-600 opacity-20 pointer-events-none" />
      </motion.div>

      {/* Entry Details */}
      {currentEntry && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-4 rounded-lg border border-green-700 bg-green-900/10"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h5 className="text-sm font-bold text-saffron mb-1">
                Step {currentEntry.step}: {currentEntry.action}
              </h5>
              <p className="text-xs text-gray-400">Timestamp: {currentEntry.timestamp.toLocaleString()}</p>
            </div>
            <span className="px-2 py-1 bg-green-600/30 text-green-400 text-xs font-bold rounded">
              ✓ IMMUTABLE
            </span>
          </div>

          {/* Blockchain Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50">
            <div>
              <p className="text-xs text-gray-500 mb-1">Block Hash</p>
              <code className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded font-mono break-all">
                {currentEntry.blockHash}
              </code>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
              <code className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded font-mono break-all">
                {currentEntry.txHash}
              </code>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(currentEntry.details).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 bg-gray-700/50 rounded-lg border border-gray-600/50"
              >
                <p className="text-xs text-gray-500 capitalize mb-1">{key.replace(/_/g, ' ')}</p>
                <p className="text-sm font-semibold text-saffron break-all">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cryptographic Verification */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h5 className="text-sm font-bold text-saffron mb-3 flex items-center gap-2">
          <Lock size={16} />
          Cryptographic Verification
        </h5>

        <div className="space-y-2">
          {[
            {
              method: 'SHA-256 Hash',
              value: '0x' + Math.random().toString(16).slice(2),
              verified: true,
            },
            {
              method: 'Digital Signature',
              value: 'ED25519',
              verified: true,
            },
            {
              method: 'Merkle Root',
              value: '0x' + Math.random().toString(16).slice(2),
              verified: true,
            },
            {
              method: 'Timestamp Proof',
              value: 'RFC 3161',
              verified: true,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg border border-gray-600/50"
            >
              <div>
                <p className="text-sm text-gray-300">{item.method}</p>
                <code className="text-xs text-gray-500 font-mono">{item.value}</code>
              </div>
              {item.verified && <CheckCircle size={18} className="text-green-500 flex-shrink-0" />}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tamper Detection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-green-700 bg-green-900/20"
      >
        <h5 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
          <CheckCircle size={16} />
          Tamper Detection Status
        </h5>

        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>All blockchain entries are immutable and cannot be modified</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Cryptographic signatures prevent unauthorized changes</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Merkle tree structure ensures chain integrity</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>No tampering detected in audit trail</span>
          </li>
          <li className="flex gap-2">
            <span className="text-green-400">✓</span>
            <span>Document integrity verified across {auditTrail.length} checkpoints</span>
          </li>
        </ul>
      </motion.div>

      {/* Export Option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <h5 className="text-sm font-bold text-saffron mb-3 flex items-center gap-2">
          <FileText size={16} />
          Export Audit Trail
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {['PDF', 'JSON', 'CSV'].map(format => (
            <motion.button
              key={format}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:border-saffron transition font-semibold text-sm"
            >
              <Download size={14} className="inline mr-2" />
              Export {format}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
