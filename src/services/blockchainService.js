/**
 * Blockchain Verification Service
 * 
 * Simulates blockchain transaction history and verification
 */

/**
 * Get blockchain transaction history
 */
export async function getBlockchainHistory(documentId) {
  const now = Date.now();
  const blocks = Array.from({ length: 5 }).map((_, i) => ({
    blockHeight: 150000 - i,
    blockHash: generateHash(),
    previousHash: i === 0 ? 'genesis' : generateHash(),
    timestamp: new Date(now - i * 3600000).toISOString(),
    transactions: Array.from({ length: Math.random() * 3 + 1 }).map(() => ({
      txHash: generateHash(),
      from: generateNodeId(),
      to: generateNodeId(),
      documentHash: `0x${Math.random().toString(16).slice(2)}`,
      gasUsed: Math.floor(Math.random() * 50000) + 10000,
      status: Math.random() > 0.1 ? 'confirmed' : 'pending',
    })),
    validators: Array.from({ length: 3 }).map(() => generateNodeId()),
    confirmations: Math.floor(Math.random() * 100) + 50,
    merkleRoot: generateHash(),
  }));

  return {
    documentId,
    totalBlocks: blocks.length,
    totalTransactions: blocks.reduce((sum, b) => sum + b.transactions.length, 0),
    blockchainStatus: 'verified',
    lastVerified: new Date().toISOString(),
    blocks,
  };
}

/**
 * Get validation nodes
 */
export async function getValidationNodes() {
  const regions = ['IN-MH-001', 'IN-DL-002', 'IN-KA-003', 'IN-TN-004', 'IN-GJ-005'];

  return regions.map(nodeId => ({
    nodeId,
    region: nodeId.split('-').slice(1, 3).join('-'),
    status: Math.random() > 0.1 ? 'active' : 'syncing',
    transactionsProcessed: Math.floor(Math.random() * 10000) + 1000,
    latency: Math.floor(Math.random() * 100) + 20,
    blocksSynced: 150000 + Math.floor(Math.random() * 10),
  }));
}

/**
 * Get smart contract details
 */
export async function getSmartContractDetails(documentId) {
  return {
    contractAddress: `0x${Math.random().toString(16).slice(2, 42)}`,
    contractName: 'DocumentVerification',
    version: '2.1.0',
    deployedAt: '2025-01-15T10:30:00Z',
    functions: [
      {
        name: 'verifyDocument',
        inputs: ['documentHash', 'studentId', 'institutionId'],
        outputs: ['verified', 'confidence'],
        gasEstimate: 45000,
      },
      {
        name: 'recordTransaction',
        inputs: ['documentHash', 'timestamp', 'verifier'],
        outputs: ['transactionHash'],
        gasEstimate: 35000,
      },
      {
        name: 'queryHistory',
        inputs: ['documentHash'],
        outputs: ['history[]'],
        gasEstimate: 15000,
      },
    ],
    totalValueLocked: Math.floor(Math.random() * 1000000) + 500000,
  };
}

/**
 * Get immutable audit trail
 */
export async function getImmutableAuditTrail(documentId) {
  const entries = Array.from({ length: 10 }).map((_, i) => ({
    id: `audit-${i}`,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    action: [
      'Document Uploaded',
      'AI Analysis Started',
      'Verification Completed',
      'Biometric Match',
      'Certificate Issued',
      'QR Generated',
      'Shared with Institution',
      'Final Approval',
      'Archived',
      'Verified',
    ][i],
    actor: generateNodeId(),
    details: `Action ${i + 1}: Immutable record on blockchain`,
    blockHeight: 150000 - i,
    transactionHash: generateHash(),
    status: 'confirmed',
  }));

  return {
    documentId,
    entries,
    totalEntries: entries.length,
    tamperProof: true,
    lastModified: entries[0].timestamp,
  };
}

/**
 * Generate QR for mobile verification
 */
export async function generateQRForMobileVerification(documentId) {
  return {
    documentId,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=DOC${documentId}`,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    verificationUrl: `https://verify.sih.gov.in/doc/${documentId}`,
    shareableLink: `https://sih.gov.in/share/${Math.random().toString(36).slice(2, 8)}`,
  };
}

// Helper functions
function generateHash() {
  return `0x${Math.random().toString(16).slice(2)}${Math.random().toString(16).slice(2)}`;
}

function generateNodeId() {
  const regions = ['MH', 'DL', 'KA', 'TN', 'GJ'];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  return `Node-IN-${region}-${String(number).padStart(3, '0')}`;
}
