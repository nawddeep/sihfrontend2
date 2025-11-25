/**
 * Simulation Service Layer
 * Decouples all backend simulation logic from UI components.
 * Provides a clean, mockable, reusable service interface.
 */

import {
  studentRecord,
  centreSummary,
  fraudSuspects,
  authorityOverview,
  securityFraudList,
} from '../mockData';

/**
 * User Profile Service
 * Fetches realistic user data based on userId
 */
export async function getUserProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Map user IDs to profile data
      const profiles = {
        'STU123': {
          id: 'STU123',
          name: 'Arun Sharma',
          email: 'arun.sharma@university.edu',
          role: 'Student',
          centreName: 'Delhi Exam Centre - H-204',
          programme: 'B.Tech Computer Science',
          institution: 'Indian Institute of Technology',
          year: '3rd Year',
          semesters: [
            { sem: 'S1', sgpa: 9.2 },
            { sem: 'S2', sgpa: 8.9 },
            { sem: 'S3', sgpa: 9.1 },
            { sem: 'S4', sgpa: 8.8 },
          ],
        },
        'CEN001': {
          id: 'CEN001',
          name: 'Priya Verma',
          email: 'priya.verma@examcentre.gov.in',
          role: 'Centre Staff',
          centreName: 'Delhi Exam Centre - Main Campus',
          designation: 'Senior Invigilator',
          department: 'Exam Administration',
          yearsOfService: 5,
        },
        'SEC007': {
          id: 'SEC007',
          name: 'Rajesh Kumar',
          email: 'rajesh.kumar@security.gov.in',
          role: 'Security',
          centreName: 'National Security Command Center',
          designation: 'Lead Security Officer',
          division: 'Biometric & Fraud Detection',
          clearanceLevel: 'Level 3',
        },
        'ADM999': {
          id: 'ADM999',
          name: 'Dr. Meera Chatterjee',
          email: 'meera.chatterjee@examboard.gov.in',
          role: 'Higher Authority',
          title: 'Director, National Examination Board',
          department: 'Policy & Oversight',
          region: 'All India',
        },
        'DEMO': {
          id: 'DEMO',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'Student',
          centreName: 'Demo Centre',
        },
      };

      resolve(profiles[userId] || profiles['DEMO']);
    }, 300);
  });
}

/**
 * Document Verification Service
 * Simulates document verification and returns realistic results
 */
export async function verifyDocument(uploadedFile, studentId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate verification process
      const random = Math.random();
      let status, integrityScore, flags = [];

      if (random > 0.85) {
        // 15% chance of fraud
        status = 'Flagged as Fake';
        integrityScore = Math.floor(Math.random() * 30); // 0-30
        flags = [
          'Pixel tampering detected in signature region',
          'Inconsistent font weights',
          'Metadata mismatch with institution records',
        ];
      } else if (random > 0.7) {
        // 15% chance of pending review
        status = 'Pending';
        integrityScore = Math.floor(50 + Math.random() * 20); // 50-70
        flags = ['Manual review recommended - ambiguous signatures'];
      } else {
        // 70% chance of verified
        status = 'Verified';
        integrityScore = Math.floor(85 + Math.random() * 15); // 85-100
        flags = [];
      }

      resolve({
        id: `doc-${Date.now()}`,
        fileName: uploadedFile.name || 'document.pdf',
        status,
        integrityScore,
        timestamp: new Date().toLocaleTimeString('en-IN'),
        flags,
        blockchainHash: `0x${Math.random().toString(16).slice(2, 18)}`,
        verifiedBy: 'AI Verification Engine v2.1',
      });
    }, 1200); // Realistic processing time
  });
}

/**
 * Blockchain Verification Service
 * Simulates blockchain query and returns hash info
 */
export async function fetchBlockchainVerification(docHash) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hash: docHash,
        blockNumber: Math.floor(Math.random() * 1000000),
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        confirmations: Math.floor(Math.random() * 100) + 50,
        gasUsed: Math.floor(Math.random() * 50000) + 100000,
        status: 'Confirmed',
        network: 'India-Exam-Chain v1',
      });
    }, 600);
  });
}

/**
 * High-level Signature Verification Simulation
 * Wraps analyzeSignature to match the SignatureVerification UI requirements
 */
export async function simulateSignatureVerification(
  imageFile,
  mode = 'general',
  threshold = 80,
  userFilter = ''
) {
  const isUserSpecific = mode === 'user-specific';
  const base = await analyzeSignature(imageFile, isUserSpecific);

  // Map to SignatureVerification component's expected shape
  const confidenceLabel = base.confidence >= 90
    ? 'High'
    : base.confidence >= 70
    ? 'Medium'
    : 'Low';

  const decision = base.decision === 'Match' ? 'VERIFIED' : 'REJECTED';

  return {
    decision,
    confidence: confidenceLabel,
    best_score: base.bestScore,
    threshold,
    matched_user: userFilter || (isUserSpecific ? 'user_specific_001' : 'candidate_001'),
    reason:
      decision === 'VERIFIED'
        ? 'Signature authenticated successfully against stored reference.'
        : 'Signature did not meet the similarity threshold and has been rejected.',
    matches_analyzed: Math.floor(Math.random() * 5) + 3,
  };
}

/**
 * Document Comparison Simulation
 * Returns a deterministic set of differences between original and submitted docs
 */
export async function simulateDocumentComparison(original, submitted) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          field: 'University Seal',
          status: 'mismatch',
          confidence: 95,
          details: 'Seal pattern does not match official template',
        },
        {
          field: 'Signature',
          status: 'suspicious',
          confidence: 78,
          details: 'Signature shows signs of digital manipulation',
        },
        {
          field: 'Dates',
          status: 'match',
          confidence: 100,
          details: 'All dates verified against records',
        },
        {
          field: 'Watermark',
          status: 'missing',
          confidence: 100,
          details: 'Security watermark not detected',
        },
        {
          field: 'Font Consistency',
          status: 'match',
          confidence: 98,
          details: 'Fonts match official standards',
        },
        {
          field: 'Paper Texture',
          status: 'suspicious',
          confidence: 65,
          details: 'Texture analysis suggests digital print',
        },
      ]);
    }, 2000);
  });
}

/**
 * Secure QR Payload Generator
 * Centralizes random hash and timestamp generation for QR credentials
 */
export async function generateSecureQRPayload(studentId, documentId, documentName = 'Document') {
  // Synchronous-style API but still wrapped in a Promise for consistency
  return new Promise((resolve) => {
    resolve({
      id: studentId,
      doc: documentId,
      docName: documentName,
      timestamp: Date.now(),
      hash: `0x${Math.random().toString(16).substr(2, 40)}`,
      version: '1.0',
    });
  });
}

/**
 * Signature Analysis Service
 * Analyzes biometric/signature match for user-specific verification
 */
export async function analyzeSignature(imageFile, isUserSpecific) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const confidence = isUserSpecific
        ? Math.floor(85 + Math.random() * 15) // High confidence if user-specific
        : Math.floor(30 + Math.random() * 50); // Lower confidence if generic

      resolve({
        decision: confidence > 70 ? 'Match' : 'No Match',
        confidence,
        bestScore: confidence,
        comparison: isUserSpecific ? 'Matches primary biometric' : 'Does not match recorded data',
      });
    }, 800);
  });
}

/**
 * Analytics Generation Service
 * Generates realistic analytics data for dashboards
 */
export async function generateAnalytics(timeRange, examId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate time-series data
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const lineData = days.map((day, idx) => ({
        day,
        attempted: Math.floor(Math.random() * 500) + 200,
        fraud: Math.floor(Math.random() * 50) + 5,
      }));

      const verificationRates = days.map((day) => ({
        day,
        verified: Math.floor(Math.random() * 300) + 100,
        pending: Math.floor(Math.random() * 50) + 10,
      }));

      const securityScoreDist = [
        { label: 'Excellent (80-100)', value: Math.floor(Math.random() * 30) + 40 },
        { label: 'Good (50-79)', value: Math.floor(Math.random() * 30) + 30 },
        { label: 'Fair (0-49)', value: Math.floor(Math.random() * 20) + 10 },
      ];

      resolve({
        timeRange,
        examId,
        fraudTrend: lineData,
        verificationRates,
        securityScoreDist,
        generatedAt: new Date().toISOString(),
      });
    }, 500);
  });
}

/**
 * Fraud Case Resolution Service
 * Logs resolution actions for audit trail
 */
export async function logResolution(caseId, resolvedBy, resolution, notes = '') {
  return new Promise((resolve) => {
    setTimeout(() => {
      const resolutionLog = {
        id: `res-${Date.now()}`,
        caseId,
        resolvedBy,
        resolution, // 'Cleared', 'Fraud Confirmed', 'Escalated'
        notes,
        timestamp: new Date().toISOString(),
        status: 'Logged',
      };

      // In a real system, this would be sent to the backend
      if (!mockData.resolutionLogs) {
        mockData.resolutionLogs = [];
      }
      mockData.resolutionLogs.push(resolutionLog);

      resolve(resolutionLog);
    }, 300);
  });
}

/**
 * Report Export Service
 * Generates exportable reports in various formats
 */
export async function generateReport(reportType, filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toISOString();
      const reportData = {
        type: reportType, // 'fraud-summary', 'verification-report', 'security-audit'
        filters,
        timestamp,
        recordCount: Math.floor(Math.random() * 1000) + 100,
        status: 'ready',
        format: 'json', // Can support 'csv', 'pdf' later
        fileSize: Math.floor(Math.random() * 5000) + 500, // KB
      };

      resolve(reportData);
    }, 800);
  });
}

/**
 * Notification Generation Service
 * Triggered from simulation functions to create contextual notifications
 */
export async function generateNotificationEvent(type, severity, message, relatedEntity) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `notif-${Date.now()}`,
        type,
        severity, // 'info', 'warning', 'error', 'success'
        message,
        relatedEntity,
        timestamp: new Date().toLocaleTimeString('en-IN'),
      });
    }, 100);
  });
}

/**
 * Fetch Live System Status
 * Simulates real-time system health
 */
export async function fetchLiveSystemStatus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cameraHealth: Math.floor(Math.random() * 30) + 85,
        rfDeviceHealth: Math.floor(Math.random() * 20) + 90,
        biometricAccuracy: Math.floor(Math.random() * 10) + 96,
        networkLatency: Math.floor(Math.random() * 50) + 10,
        uptime: 99.8 + Math.random() * 0.1,
        lastSync: new Date(Date.now() - Math.random() * 60000).toLocaleTimeString('en-IN'),
      });
    }, 400);
  });
}

/**
 * Fetch Filtered Data
 * Generic function for fetching data with filters
 */
export async function fetchFilteredData(entityType, filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real system, this would query the backend with filters
      const data = {
        entityType,
        filters,
        count: Math.floor(Math.random() * 100) + 10,
        results: [],
        timestamp: new Date().toISOString(),
      };

      resolve(data);
    }, 600);
  });
}

export default {
  getUserProfile,
  verifyDocument,
  fetchBlockchainVerification,
  analyzeSignature,
  simulateSignatureVerification,
  simulateDocumentComparison,
  generateSecureQRPayload,
  generateAnalytics,
  logResolution,
  generateReport,
  generateNotificationEvent,
  fetchLiveSystemStatus,
  fetchFilteredData,
};
