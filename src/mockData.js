export const studentRecord = {
  name: "Aarav Sharma",
  id: "STU2025CS001",
  programme: "B.Tech Computer Science",
  institution: "National Institute of Technology (Demo)",
  year: "Final Year",
  documents: [
    {
      id: 1,
      name: "10th Marksheet.pdf",
      type: "Marks Card",
      status: "Verified",
      lastChecked: "2025-11-01 09:45",
      integrityScore: 98,
    },
    {
      id: 2,
      name: "12th Marksheet.pdf",
      type: "Marks Card",
      status: "Verified",
      lastChecked: "2025-11-01 09:47",
      integrityScore: 96,
    },
    {
      id: 3,
      name: "B.Tech Provisional Degree.pdf",
      type: "Degree Certificate",
      status: "Pending",
      lastChecked: "—",
      integrityScore: 0,
    },
    {
      id: 4,
      name: "Previous University Degree.pdf",
      type: "Degree Certificate",
      status: "Flagged as Fake",
      lastChecked: "2025-11-01 09:50",
      integrityScore: 12,
    },
  ],
  semesters: [
    { sem: "Sem 1", sgpa: 8.2 },
    { sem: "Sem 2", sgpa: 8.5 },
    { sem: "Sem 3", sgpa: 8.7 },
    { sem: "Sem 4", sgpa: 8.9 },
    { sem: "Sem 5", sgpa: 9.0 },
    { sem: "Sem 6", sgpa: 8.8 },
  ],
};

export const centreSummary = {
  centreId: "CEN-MH-23",
  name: "Pune Central Exam Hub (Demo)",
  totalStudents: 480,
  present: 452,
  absent: 28,
  fraudIncidents: 5,
  securityScore: 92,
};

export const centreBiometricList = [
  {
    id: "STU2025CS001",
    name: "Aarav Sharma",
    room: "H-201",
    thumb: "MATCH",
    face: "MATCH",
    status: "Verified",
    time: "09:02",
  },
  {
    id: "STU2025ME014",
    name: "Pragya Nair",
    room: "H-202",
    thumb: "MATCH",
    face: "MISMATCH",
    status: "Manual Review",
    time: "09:05",
  },
  {
    id: "STU2025EE021",
    name: "Aditya Patel",
    room: "H-204",
    thumb: "MISMATCH",
    face: "MATCH",
    status: "Denied",
    time: "09:09",
  },
];

export const fraudSuspects = [
  {
    id: "STU2025ME014",
    name: "Pragya Nair",
    reason: "Photo on admit card differs from live capture",
    severity: "Medium",
  },
  {
    id: "STU2025EE021",
    name: "Aditya Patel",
    reason: "Duplicate biometric used at another centre",
    severity: "High",
  },
];

export const securityFraudList = [
  {
    id: "STU2025EE021",
    name: "Aditya Patel",
    hall: "H-204",
    alert: "Impersonation suspected",
    source: "Face & Thumb mismatch",
    timestamp: "09:12:23",
    riskScore: 92,
  },
  {
    id: "STU2025CV032",
    name: "Ritika Singh",
    hall: "H-105",
    alert: "Suspicious collaboration",
    source: "Camera 05 - Unusual body language",
    timestamp: "09:16:51",
    riskScore: 78,
  },
];

export const biometricAlerts = [
  {
    id: 1,
    type: "Thumb mismatch",
    userId: "STU2025EE021",
    hall: "H-204",
    severity: "High",
    time: "09:10",
  },
  {
    id: 2,
    type: "Face mismatch",
    userId: "STU2025ME014",
    hall: "H-202",
    severity: "Medium",
    time: "09:06",
  },
  {
    id: 3,
    type: "Signature mismatch",
    userId: "STU2025CV032",
    hall: "H-105",
    severity: "Low",
    time: "09:03",
  },
];

export const cameraFeeds = [
  { id: "CAM-01", hall: "H-101", status: "Online" },
  { id: "CAM-02", hall: "H-102", status: "Online" },
  { id: "CAM-03", hall: "H-201", status: "Degraded" },
  { id: "CAM-04", hall: "H-202", status: "Online" },
  { id: "CAM-05", hall: "H-105", status: "Online" },
  { id: "CAM-06", hall: "Corridor 3", status: "Offline" },
];

export const frequencyDevices = [
  { id: "FD-01", location: "H-101", status: "Active" },
  { id: "FD-02", location: "H-201", status: "Active" },
  { id: "FD-03", location: "H-204", status: "Active" },
  { id: "FD-04", location: "Corridor 3", status: "Inactive" },
];

export const accessLogs = [
  {
    id: 1,
    actor: "SEC007",
    role: "Security",
    action: "Viewed live camera feeds",
    status: "Allowed",
    time: "09:01:10",
    ip: "10.12.4.21",
  },
  {
    id: 2,
    actor: "ADM999",
    role: "Higher Authority",
    action: "Exported fraud analytics",
    status: "Allowed",
    time: "08:59:45",
    ip: "10.10.1.9",
  },
  {
    id: 3,
    actor: "CEN001",
    role: "Centre Staff",
    action: "Attempted to alter attendance",
    status: "Blocked",
    time: "08:55:12",
    ip: "10.11.3.5",
  },
];

export const authorityOverview = {
  activeExams: 126,
  centresOnline: 309,
  totalCandidates: 43820,
  flaggedCandidates: 213,
  authenticPercentage: 94,
  fakePercentage: 3,
  pendingPercentage: 3,
};

export const fraudCases = [
  {
    id: 1,
    entityType: "Student",
    refId: "STU2025EE021",
    name: "Aditya Patel",
    centre: "Pune Central",
    issue: "Biometric impersonation",
    status: "Escalated",
  },
  {
    id: 2,
    entityType: "Staff",
    refId: "CEN-MH-23-OPS01",
    name: "Centre Operator 1",
    centre: "Pune Central",
    issue: "Unauthorized attendance modification",
    status: "Under Review",
  },
];

export const analyticsSeries = {
  fraudTrend: [
    { month: "Jun", fraud: 32, attempted: 58 },
    { month: "Jul", fraud: 27, attempted: 49 },
    { month: "Aug", fraud: 18, attempted: 37 },
    { month: "Sep", fraud: 21, attempted: 40 },
    { month: "Oct", fraud: 15, attempted: 35 },
    { month: "Nov", fraud: 9, attempted: 24 },
  ],
  verificationRates: [
    { day: "Mon", verified: 92, pending: 5 },
    { day: "Tue", verified: 94, pending: 4 },
    { day: "Wed", verified: 90, pending: 7 },
    { day: "Thu", verified: 95, pending: 3 },
    { day: "Fri", verified: 93, pending: 4 },
  ],
  securityScoreDist: [
    { label: "High", value: 68 },
    { label: "Medium", value: 24 },
    { label: "Low", value: 8 },
  ],
};
