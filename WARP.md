# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repo contains the frontend prototypes for a multi-role Fake Degree & Exam Security platform built for Smart India Hackathon. It is a Vite-powered React SPA with TailwindCSS, plus a separate TypeScript/Vite app in `signature-main/frontend` for the signature verification subsystem.

The primary experience is a single-page, role-aware dashboard shell that routes users into four portals:
- Student
- Centre / Institute Staff
- Security Staff
- Higher Authority / Admin

All data is mocked and simulated in the browser; there is no live backend.

## Key Commands

### Root SIH frontend (this directory)

Install dependencies:
- `npm install`

Run dev server:
- `npm run dev`
  - Vite dev server (port is typically 5173 unless already in use).

Build and preview:
- `npm run build` — production build via Vite.
- `npm run preview` — preview the built bundle.

Testing & linting:
- There are **no** `test` or `lint` scripts configured in `package.json` yet.
  - Before adding tests or linting steps, introduce the relevant tooling (e.g. Vitest/Jest, ESLint) and wire them into `package.json` scripts.

### Signature verification UI (`signature-main/frontend`)

This is a separate Vite + React + TypeScript app focused solely on the signature verification flow and analytics dashboard.

From the repo root:
- `cd signature-main/frontend`
- `npm install`
- `npm run dev` — dev server for the signature UI.
- `npm run build` — runs `tsc` then `vite build`.
- `npm run preview` — preview production build.

There are no test or lint scripts configured here either.

## High-Level Architecture (Root App)

### Tooling & Styling

- **Bundler/runtime**: Vite (`vite.config.mjs` with `@vitejs/plugin-react-swc`).
- **UI framework**: React 18 (`src/main.jsx` is the entrypoint).
- **Styling**: TailwindCSS with a custom palette and cyber-grid background (`tailwind.config.js`, `src/index.css`).
  - Custom color families: `primary` (navy), `accent` (gold), `dark`, `danger`, `warning`.
  - Custom background `bg-cyber-grid` and glow shadows (`shadow-glow-*`) support the “professional glassmorphism” aesthetic.
  - `src/index.css` defines the neon gradient body background, `glass-card` helper, notification animations, and camera status dot animations for the Security portal.

### Application Shell & Auth

- Entry: `src/main.jsx` renders `<MainApp />` into `#root`.
- `src/MainApp.jsx` is the core shell and defines `AuthContext`:
  - `AuthContext` value: `{ user, login, logout }`.
  - `MainApp` renders either:
    - `<LoginPage onLogin={login} />` when `user` is null, or
    - `<AppShell />` (authenticated frame) when `user` is set.
- Role detection:
  - `detectRoleFromId(id)` in `MainApp.jsx` infers role from User ID prefix:
    - `STU` → `student`
    - `CEN` → `centre_staff`
    - `SEC` → `security`
    - `ADM` → `admin`
  - Login form supports an explicit role override dropdown but defaults to auto-detection.
- `LoginPage` and `AppShell` both use `CyberLayout` for the full-screen glassmorphic background and glow.
- `AppShell` composes the persistent chrome:
  - Left sidebar (desktop): product branding, current role card, explanatory context tiles, and footer user+logout section.
  - Top header: role-specific description, with logout CTA.
  - Main content: role-routed dashboard component.

### Role-Based Dashboards

All dashboards live under `src/dashboards/` and are wired into `MainApp.jsx`:

- `StudentDashboard.jsx`
  - Primary focus: student academic profile, document upload, and verification status.
  - Key elements:
    - Student profile card (name, programme, institution, ID, semester SGPA chips).
    - **Upload panel** with drag-and-drop file input; files go into an `uploadQueue` in local state.
    - **Cross-check CTA** that simulates verification of queued documents and appends them to the timeline.
    - **Verification timeline table** for all student documents with status chip (Verified/Pending/Flagged as Fake), integrity scores, and last-checked timestamps.
    - Quick actions to select a document for downstream flows.
    - Composed sections:
      - `BlockchainVerification` — simulated on-chain verification card.
      - `SecureQRCredential` — QR code credential generator for a given student/document.
      - `DocumentComparisonTool` — side-by-side comparison and analysis component.

- `CentreStaffDashboard.jsx` and `CentreStaffDashboardAnimated.jsx`
  - Same conceptual responsibilities; the `*Animated` variant layers framer-motion animations and signature verification tooling.
  - Responsibilities:
    - Live **biometric verification table** (thumb, face, status) for students at a centre.
    - **Bulk document verification** card with CSV/ZIP upload and a simple queue view.
    - **Fraud suspects** list with manual review, photo comparison placeholders, and resolution actions (clear/mark fraud).
    - Integration points:
      - `FaceMatchVisualization` for confidence overlays.
      - `DocumentComparisonTool` for forensic checks.
      - `SignatureVerificationSection` (in the animated variant) for a richer, multi-step signature workflow.

- `SecurityDashboard.jsx` and `SecurityPortal.jsx`
  - `SecurityDashboard` implements the multi-panel overview used in the main shell:
    - **Real-time fraud feed** list from `securityFraudList` with links to camera view and invigilator alerts.
    - **Biometric alerts** list grouped by severity.
    - **CCTV health & security score** tile computing an aggregate `securityScore` from camera statuses.
    - **Camera grid** of tiles summarising per-hall camera health.
    - **Frequency devices** list to visualize RF jammers.
    - **Access logs** list (data security & audit trail) from `accessLogs`.
  - `SecurityPortal.jsx` is an alternate layout emphasising:
    - Scrollable gate-entry timeline feed.
    - Manual gate controls (open/close per gate).
    - Emergency lockdown widget.
    - Incident reporting modal.

- `AuthorityDashboard.jsx` and `AuthorityPortal.jsx`
  - `AuthorityDashboard` is the main “Higher Authority” view used from `MainApp.jsx`:
    - **National snapshot** tiles using `authorityOverview` (active exams, centres online, candidate counts, flagged candidates).
    - **Academic record integrity** section with donut-style percentages.
    - Placeholder “Country / Region Map” (to be replaced by the interactive India heat map).
    - **Fraud case management** list with actions like `Suspend Student` / `Ban Staff` and a `ReportGenerator` export button.
    - **Analytics panel** with Recharts charts (`fraudTrend`, `verificationRates`, `securityScoreDist`).
    - `AdvancedAnalytics` component for deeper AI-derived metrics.
  - `AuthorityPortal.jsx` is a more experimental layout mixing system health and staff performance views.

### Data & Simulation Layer

- All data driving the dashboards is centrally defined and mocked in `src/mockData.js`:
  - Student record, centre summary, biometric lists, fraud suspects.
  - Security fraud list, biometric alerts, camera feeds, frequency devices, access logs.
  - Authority overview, fraud cases, analytics series.
  - `stateWiseFraudData`: state-level fraud metrics for the India heat map (density, counts, verification rate, risk level).
- `src/services/simulationService.js` provides a service-style abstraction for all mock “backend” behaviour:
  - `getUserProfile(userId)` — maps known demo IDs (`STU123`, `CEN001`, `SEC007`, `ADM999`) to rich fake profiles.
  - `verifyDocument(uploadedFile, studentId)` — simulates per-document verification outcome (Verified / Pending / Flagged as Fake) with integrity score, blockchain hash, and flags.
  - `fetchBlockchainVerification(docHash)` — mock on-chain lookup.
  - `simulateSignatureVerification(...)` and `analyzeSignature(...)` — power the signature verification flows by returning decisions and confidence/score.
  - `simulateDocumentComparison(original, submitted)` — deterministic field-wise comparison results used by `DocumentComparisonTool`.
  - `generateSecureQRPayload(studentId, documentId, documentName)` — payload builder for QR credentials.
  - `generateAnalytics(timeRange, examId)` — builds time series and distribution data for charts.
  - `logResolution`, `generateReport`, `fetchLiveSystemStatus`, `fetchFilteredData`, `generateNotificationEvent` — additional high-level services to keep dashboards thin.

### Hooks & Notifications

- `src/hooks/useDocumentVerification.js` encapsulates multi-document verification logic:
  - Uses `verifyDocument` and `generateNotificationEvent` from `simulationService`.
  - Uses `NotificationContext` (`useNotification`) to push success/warning/error toasts.
  - Exposes `verifySingleDocument`, `verifyDocuments`, `reset`, plus state (`isVerifying`, `verificationResults`, `error`).
- `src/context/NotificationContext.jsx` holds the global notification state:
  - Simple in-memory list with `addNotification`, `removeNotification`, `clearAll` and a `MAX_NOTIFICATIONS` cap.
  - This is designed to back a shared notification UI across dashboards.
- `src/components/NotificationSystem.jsx` is a separate, self-contained toast renderer that **auto-generates** notifications periodically:
  - Used at the top of several dashboards today (Student, Centre, Security, Authority).
  - Draws a fixed, animated stack of contextual toasts with Lucide icons.

When implementing new flows, prefer using `NotificationContext` + explicit events (via `simulationService` helpers) instead of adding new auto-random notifications.

### Layout & Shared Components

- `src/components/CyberLayout.jsx`
  - Full-screen wrapper applying the dark cyber-grid background (`bg-cyber-grid`), radial glow overlays, and typography.
  - All top-level pages (login and authenticated shell) are wrapped in this for consistency.

- `src/components/CyberButton.jsx` / `EnhancedCyberButton.jsx`
  - Button primitives with support for variants (solid/outline/ghost), icons, and subtle motion/glow states.
  - Used extensively in CTAs for uploads, lockdown controls, fraud actions, and navigation.

- `src/components/IndiaFraudHeatmap.jsx`
  - Tile-based India heat map implementation consuming `stateWiseFraudData`:
    - Computes min/max fraud density and maps each state to a green→red gradient.
    - Exposes `selectedState` and `onStateSelect` for drill-down.
    - Provides an animated tooltip with fraud density, case count, verification rate, and risk level.
    - Includes a simple legend (low vs high fraud density).
  - This is the main hook point for implementing the interactive heat map experience in the Authority portal.

- Other notable shared components (all in `src/components/`):
  - `BlockchainVerification`, `SecureQRCredential`, `DocumentComparisonTool`, `AdvancedAnalytics`, `ReportGenerator` — encapsulate core feature cards and analytics blocks.
  - `FaceMatchVisualization` — visualises biometric or fraud risk scores.
  - `StatusCard`, `DataTable`, `FraudCaseCard`, plus animated wrappers under `components/animations/`.

- `src/featureCatalog.js`
  - Enumerates **NECESSARY_FEATURES** and **OPTIONAL_FEATURES** with IDs and which portals they belong to.
  - `isFeatureEnabled(id)` currently returns `true` for all defined features, but is intended as a future feature-flag toggle.

## Signature Verification Sub-App (`signature-main/frontend`)

This sub-project is a focused, production-style UI for the signature verification system.

- Entry: `src/main.tsx` renders `App` into `#root`.
- `src/App.tsx` manages a simple tabbed experience:
  - `Verification Lab` — upload & verify signatures.
  - `Intel Dashboard` — analytics & metrics.
- Key components (see its `README.md` for full details):
  - `UploadSection` — drag-and-drop upload, image preview, configuration of verification mode and threshold, and call-out to the backend API.
  - `VerificationResults` — decision summary, confidence score, multi-metric analysis, and export hooks.
  - `Dashboard` — verification statistics, time-range filters, and system health.
- The app assumes a backend reachable via `/api` with proxy configuration in its `vite.config.ts` (see that README for the exact proxy snippet and `.env` structure).

Developers working on this sub-app should treat it as logically independent from the main SIH SPA; it has its own build, config, and README.

## UX & Design Constraints (for Future Changes)

These constraints come from the current design direction and should guide any significant refactors or new features:

- **Design philosophy: “Clarity through Subtraction.”**
  - Each screen should emphasise a single primary task.
  - Prefer progressive disclosure (tabs, drill-down panels, modals) over dense, everything-on-one-screen layouts.

- **Visual language: professional glassmorphism on a deep slate gradient.**
  - Primary surfaces resemble the existing cards: `bg-slate-950/80 backdrop-blur-md border border-slate-800/80` or equivalents from the Tailwind theme.
  - Maintain consistent use of the custom `primary`, `accent`, `dark`, `danger`, and `warning` color families.

- **Notifications & alerts:**
  - Long-term goal: **only the Security portal retains an active notification system** with real-time alerts; other dashboards should rely on inline status, timelines, and badges instead of toast spam.
  - When working on notifications, prefer the `NotificationContext` + simulation-service-based events over the randomised `NotificationSystem` generator.

- **Dashboards by role (intent):**
  - **Student**: decluttered, task-oriented hub for document upload, status, and verification history; uploads and status lookup should be reachable in very few interactions.
  - **Centre Staff**: operational views for biometric tables, bulk verification, fraud case review, and (optionally) advanced signature/document comparison flows.
  - **Security**: mission-control layout with live camera grid, fraud feed, biometric and access logs, and gate/lockdown controls; this is the only place where persistent, high-salience alerts are appropriate.
  - **Higher Authority**: high-level, drillable overview of national/state-level fraud patterns with an interactive India fraud heat map and analytics below.

When implementing new UI, mirror the existing glassmorphic cards and Tailwind tokens rather than introducing ad-hoc colors or component styles.

## Gaps & Considerations

- There is currently **no testing or linting setup** in either project. Before depending on `npm test`/`npm run lint` or adding CI steps, introduce the appropriate tooling.
- Some components rely on libraries (e.g. `clsx` in `CyberLayout`) that are not yet declared in the root `package.json`; if you see runtime errors for missing packages, add them explicitly.
- The India heat map is implemented as a tile grid (`IndiaFraudHeatmap.jsx`); if a true SVG/geospatial map is required later, this component is the main abstraction point for swapping in a D3/Recharts-based map while keeping the `stateWiseFraudData` contract stable.
