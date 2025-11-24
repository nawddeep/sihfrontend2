// Feature catalog for the SIH prototype
// Helps keep the core demo focused while documenting phase-2/optional capabilities.

export const NECESSARY_FEATURES = [
  {
    id: "auth.role-routing",
    label: "Role-based login & dashboard routing",
    portals: ["student", "centre_staff", "security", "admin"],
  },
  {
    id: "student.documents.core",
    label: "Student document upload & verification timeline",
    portals: ["student"],
  },
  {
    id: "centre.biometric.table",
    label: "Centre biometric verification table",
    portals: ["centre_staff"],
  },
  {
    id: "centre.fraud.cases",
    label: "Centre fraud case cards & resolution flow",
    portals: ["centre_staff"],
  },
  {
    id: "security.realtime.dashboard",
    label: "Security real-time fraud feed & camera grid",
    portals: ["security"],
  },
  {
    id: "admin.heatmap.core",
    label: "Higher Authority India fraud heatmap",
    portals: ["admin"],
  },
  {
    id: "admin.analytics.core",
    label: "Higher Authority fraud analytics charts (line, bar, pie, scatter)",
    portals: ["admin"],
  },
  {
    id: "notifications.toasts",
    label: "Global toast notifications via NotificationContext",
    portals: ["student", "centre_staff", "security", "admin"],
  },
];

export const OPTIONAL_FEATURES = [
  {
    id: "student.blockchain-verification",
    label: "Per-document blockchain verification card",
    portals: ["student"],
  },
  {
    id: "student.secure-qr",
    label: "Downloadable secure QR credentials",
    portals: ["student"],
  },
  {
    id: "centre.signature-advanced",
    label: "Multi-step signature verification workflow",
    portals: ["centre_staff"],
  },
  {
    id: "centre.slideout.case-panel",
    label: "Slide-out case review panel with forensic comparison",
    portals: ["centre_staff"],
  },
  {
    id: "admin.advanced-analytics-panel",
    label: "Advanced AI analytics & predictive insights",
    portals: ["admin"],
  },
  {
    id: "logging.detailed-access-log",
    label: "Detailed access log viewer for audit trails",
    portals: ["security", "admin"],
  },
];

export function isFeatureEnabled(id) {
  // For now all features are enabled; this is a hook for future flagging.
  return (
    NECESSARY_FEATURES.some((f) => f.id === id) ||
    OPTIONAL_FEATURES.some((f) => f.id === id)
  );
}
