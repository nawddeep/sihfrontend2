/**
 * Real-Time Live Monitoring Service
 * 
 * Provides mock data for live monitoring dashboard
 * Simulates WebSocket-like real-time data streaming
 */

/**
 * Get live exam statistics
 * Simulates real-time data updates
 */
export async function getLiveExamStats() {
  return {
    activeExams: Math.floor(Math.random() * 1000) + 500,
    totalStudents: Math.floor(Math.random() * 50000) + 25000,
    verifiedToday: Math.floor(Math.random() * 10000) + 5000,
    fraudsDetected: Math.floor(Math.random() * 100) + 20,
    averageVerificationTime: Math.floor(Math.random() * 45) + 15, // seconds
    systemHealth: 95 + Math.random() * 5, // 95-100%
    uptimePercentage: 99.9 + Math.random() * 0.09,
  };
}

/**
 * Get real-time alert feed
 */
export async function getRealTimeAlerts() {
  const alertTypes = [
    'Potential Fraud Detected',
    'Document Verification Failed',
    'Biometric Mismatch',
    'System Performance Alert',
    'Unusual Activity Pattern',
    'Failed Login Attempt',
  ];

  const severities = ['critical', 'high', 'medium', 'low'];
  const states = ['IN-MH', 'DL', 'KA', 'TN', 'GJ', 'WB', 'UP', 'AP'];

  return Array.from({ length: Math.floor(Math.random() * 8) + 3 }).map((_, i) => ({
    id: `alert-${Date.now()}-${i}`,
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    state: states[Math.floor(Math.random() * states.length)],
    centre: `Centre-${Math.floor(Math.random() * 999) + 100}`,
    timestamp: new Date(Date.now() - Math.random() * 600000).toISOString(),
    description: `Alert generated at ${new Date().toLocaleTimeString()}`,
    studentCount: Math.floor(Math.random() * 500) + 50,
  }));
}

/**
 * Get geographic distribution data
 */
export async function getGeographicDistribution() {
  const states = {
    'Andhra Pradesh': { lat: 15.9129, lng: 79.7400 },
    'Arunachal Pradesh': { lat: 28.2180, lng: 94.7278 },
    'Assam': { lat: 26.2006, lng: 92.9376 },
    'Bihar': { lat: 25.0961, lng: 85.3131 },
    'Chhattisgarh': { lat: 21.2787, lng: 81.8661 },
    'Goa': { lat: 15.2993, lng: 73.8243 },
    'Gujarat': { lat: 22.2587, lng: 71.1924 },
    'Haryana': { lat: 29.0588, lng: 77.0745 },
    'Himachal Pradesh': { lat: 31.7433, lng: 77.1205 },
    'Jharkhand': { lat: 23.6102, lng: 85.2799 },
    'Karnataka': { lat: 15.3173, lng: 75.7139 },
    'Kerala': { lat: 10.8505, lng: 76.2711 },
    'Madhya Pradesh': { lat: 22.9375, lng: 78.6553 },
    'Maharashtra': { lat: 19.7515, lng: 75.7139 },
    'Manipur': { lat: 24.6637, lng: 93.9063 },
    'Meghalaya': { lat: 25.4670, lng: 91.3662 },
    'Mizoram': { lat: 23.1815, lng: 92.9789 },
    'Nagaland': { lat: 26.1584, lng: 94.5624 },
    'Odisha': { lat: 20.9517, lng: 85.0985 },
    'Punjab': { lat: 31.1471, lng: 75.3412 },
    'Rajasthan': { lat: 27.0238, lng: 74.2179 },
    'Sikkim': { lat: 27.5330, lng: 88.5122 },
    'Tamil Nadu': { lat: 11.1271, lng: 78.6569 },
    'Telangana': { lat: 18.1124, lng: 79.0193 },
    'Tripura': { lat: 23.9408, lng: 91.9882 },
    'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
    'Uttarakhand': { lat: 30.0668, lng: 79.0193 },
    'West Bengal': { lat: 24.4272, lng: 88.3953 },
  };

  return Object.entries(states).map(([state, coords]) => ({
    state,
    ...coords,
    examCentres: Math.floor(Math.random() * 500) + 50,
    activeStudents: Math.floor(Math.random() * 100000) + 10000,
    fraudRate: Math.random() * 15, // 0-15%
    verificationRate: 85 + Math.random() * 15, // 85-100%
    avgProcessingTime: Math.floor(Math.random() * 60) + 10,
  }));
}

/**
 * Get system health metrics
 */
export async function getSystemHealth() {
  return {
    cpu: 35 + Math.random() * 40, // 35-75%
    memory: 45 + Math.random() * 35, // 45-80%
    diskSpace: 60 + Math.random() * 30, // 60-90%
    networkLatency: Math.floor(Math.random() * 100) + 20, // 20-120ms
    databaseConnections: Math.floor(Math.random() * 800) + 100,
    activeSessions: Math.floor(Math.random() * 5000) + 1000,
    requestsPerSecond: Math.floor(Math.random() * 1000) + 200,
    errorRate: Math.random() * 0.5, // 0-0.5%
    cacheHitRate: 75 + Math.random() * 20, // 75-95%
  };
}

/**
 * Get active sessions tracker
 */
export async function getActiveSessions() {
  const sessionTypes = ['Exam in Progress', 'Waiting for Verification', 'Completed', 'Failed'];

  return {
    total: Math.floor(Math.random() * 10000) + 5000,
    byState: Object.fromEntries(
      ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'].map(state => [
        state,
        Math.floor(Math.random() * 2000) + 500,
      ])
    ),
    byStatus: {
      'Exam in Progress': Math.floor(Math.random() * 3000) + 1000,
      'Waiting for Verification': Math.floor(Math.random() * 2000) + 500,
      'Completed': Math.floor(Math.random() * 5000) + 2000,
      'Failed': Math.floor(Math.random() * 500) + 100,
    },
    peakTime: '10:30 AM - 11:45 AM',
    averageDuration: '45 minutes',
  };
}

/**
 * Stream live updates
 * Simulates continuous data streaming
 */
export function subscribeLiveUpdates(callback, interval = 2000) {
  const updateInterval = setInterval(async () => {
    const stats = await getLiveExamStats();
    const alerts = await getRealTimeAlerts();
    const health = await getSystemHealth();

    callback({
      stats,
      alerts,
      health,
      timestamp: new Date().toISOString(),
    });
  }, interval);

  return () => clearInterval(updateInterval);
}

/**
 * Get fraud trend analysis
 */
export async function getFraudTrends() {
  const hours = Array.from({ length: 24 }).map((_, i) => {
    const hour = i < 10 ? `0${i}:00` : `${i}:00`;
    return {
      time: hour,
      fraudCount: Math.floor(Math.random() * 50) + 10,
      totalVerifications: Math.floor(Math.random() * 5000) + 1000,
      fraudRate: Math.random() * 10, // 0-10%
    };
  });

  return {
    hourly: hours,
    dailyComparison: {
      today: Math.floor(Math.random() * 500) + 100,
      yesterday: Math.floor(Math.random() * 400) + 100,
      weekAverage: Math.floor(Math.random() * 450) + 150,
      trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
    },
    topFraudStates: [
      { state: 'Maharashtra', count: Math.floor(Math.random() * 100) + 50 },
      { state: 'Delhi', count: Math.floor(Math.random() * 80) + 40 },
      { state: 'Karnataka', count: Math.floor(Math.random() * 60) + 30 },
    ],
  };
}

/**
 * Export live data to CSV
 */
export async function exportLiveDataToCSV(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const csv = generateCSVContent(data);
      resolve({
        filename: `live-data-${new Date().toISOString()}.csv`,
        content: csv,
        size: csv.length,
      });
    }, 500);
  });
}

function generateCSVContent(data) {
  const headers = ['Timestamp', 'Active Exams', 'Total Students', 'Verified', 'Frauds Detected'];
  const rows = [headers.join(',')];
  // Add mock data rows
  rows.push(`${data.timestamp},${data.stats.activeExams},${data.stats.totalStudents},${data.stats.verifiedToday},${data.stats.fraudsDetected}`);
  return rows.join('\n');
}
