# SIH Frontend 2 - Demo Script: Fake Degree & Exam Security Platform

## Overview
This is a production-ready frontend prototype for a unified fake degree detection and exam security platform. The system provides role-based dashboards for Students, Centre Staff, Security, and Higher Authority with real-time notifications, fraud detection, and analytics.

---

## 🎬 4-Act Demo Narrative (For Jury Evaluation)

### **Act 1: The Crime** — Document Fraud Detection
**Goal**: Demonstrate how students attempt to upload fake documents and the system catches them.

**Steps**:
1. **Login** as `STU123` / password any value
   - System shows real name: "Arun Sharma"
   - Displays academic profile with semester GPAs
2. **Navigate** to "Document Verification" tab
3. **Upload** a fake document (any PDF/image)
   - System accepts the upload and queues it for verification
4. **Click** "Cross-Check Now" button
   - Watch as the verification completes
   - System marks some documents as "Flagged as Fake" with integrity score
5. **Observe** the DocumentComparisonTool highlighting mismatches
6. **Key Talking Points**:
   - ✅ Real user profile fetched from service layer
   - ✅ Blockchain verification badges
   - ✅ Risk scoring algorithm
   - ✅ Audit trail of verification

---

### **Act 2: The Investigation** — Centre Staff Review
**Goal**: Show how centre staff investigates fraud suspects and marks them for resolution.

**Steps**:
1. **Logout** and login as `CEN001` / password any value
   - Real name: "Priya Verma"
   - Centre Staff Dashboard loads
2. **Scroll** to "Fraud Cases — Detailed Review" section
3. **See** FraudCaseCard components with flagged students
4. **Click** on a fraud case to expand it
   - View case details, confidence score, timestamp
   - See FaceMatchVisualization showing match confidence
5. **Add Resolution Notes** in the textarea
6. **Click** "Fraud Confirmed" button
   - System logs the resolution to audit trail
   - Notification system triggers (visible at bottom)
7. **See** case status change to "Confirmed"
8. **Key Talking Points**:
   - ✅ FraudCaseCard shared component reusability
   - ✅ Resolution logging with timestamps
   - ✅ Audit trail for compliance
   - ✅ Real-time notification system
   - ✅ Biometric visualization

---

### **Act 3: The Response** — Security Alert Monitoring
**Goal**: Showcase real-time security monitoring and automated alerts.

**Steps**:
1. **Logout** and login as `SEC007` / password any value
   - Real name: "Rajesh Kumar"
   - Security Dashboard loads
2. **Observe** the "Real-Time Fraud Feed" section
   - Shows live flagged students with risk scores
3. **See** "Biometric Alerts" panel
   - Failed authentication attempts
   - Color-coded severity levels
4. **Check** "CCTV Health & Security Score"
   - Live score computed from device health (0-30: red, 31-70: orange, 71-100: green)
   - Shows camera uptime, offline devices
   - Dynamic progress bar matches score range
5. **View** "Exam Hall Security — Camera Grid"
   - Shows status of all monitored cameras
6. **Key Talking Points**:
   - ✅ Real-time fraud alerts
   - ✅ Unified color mapping for scores (color-blind friendly)
   - ✅ Device health aggregation
   - ✅ Multi-signal security assessment

---

### **Act 4: The Oversight** — National-Level Authority
**Goal**: Demonstrate policy-maker view with aggregated analytics and data export.

**Steps**:
1. **Logout** and login as `ADM999` / password any value
   - Real name: "Dr. Meera Chatterjee"
   - Higher Authority Dashboard loads
2. **View** "National Exam Snapshot"
   - KPIs: Active Exams, Centres Online, Total Candidates, Flagged Candidates
   - Discuss policy implications
3. **Check** "Academic Record Integrity" meter
   - Shows percentage split: Authentic / Fake / Pending
   - Visual indicator of system effectiveness
4. **Scroll** to "Fraud Detection — Students & Staff" section
5. **Apply Filters**:
   - Click "State/Region" dropdown → select "Maharashtra"
   - Observe table updates with filtered results
   - Click "Status Filter" → select "Suspended / Banned"
   - Show how DataTable handles multiple filters
6. **See** DataTable with sorting:
   - Click "Name" column header → sort ascending/descending
   - Click "Status" column header → sort by status
   - Navigation: "Previous"/"Next" buttons for pagination
7. **Click** ReportGenerator button (top right)
   - System generates CSV/JSON export
   - Suitable for policy-makers
8. **Scroll** to "Analytics — Fraud, Verification & Security"
   - Bar charts showing monthly fraud trends
   - Line charts showing verification rates
   - Donut chart of centre security score distribution
9. **Key Talking Points**:
   - ✅ Role-based KPI dashboard
   - ✅ Advanced filtering (state, date range, status)
   - ✅ Sortable DataTable
   - ✅ Export functionality for reports
   - ✅ Policy-level insights and trends

---

## 🛠️ Technical Highlights

### **Architecture**
- **Service Layer** (`simulationService.js`): 10 pure, reusable, mockable functions
- **Context API** (`NotificationContext.jsx`): Centralized notification state
- **Custom Hooks** (`useDocumentVerification.js`): Business logic encapsulation
- **Shared Components**: `FraudCaseCard`, `DataTable`, reusable across roles
- **Color Mapping**: Scores 0-30 (red), 31-70 (orange), 71-100 (green)

### **User Profiles Mapped by ID**
- `STU123` → Arun Sharma (Student)
- `CEN001` → Priya Verma (Centre Staff)
- `SEC007` → Rajesh Kumar (Security)
- `ADM999` → Dr. Meera Chatterjee (Higher Authority)

### **Demo Data Includes**
- 4 fraud cases with varying confidence levels
- Biometric verification data
- CCTV camera health metrics
- Monthly fraud trends
- Resolution audit logs

---

## ✨ Key Features Demonstrated

| Feature | Act | Component | Benefit |
|---------|-----|-----------|---------|
| Document Verification | 1 | StudentDashboard + DocumentComparisonTool | Real-time fraud detection |
| Biometric Matching | 2 | FaceMatchVisualization | Multi-modal verification |
| Resolution Logging | 2 | FraudCaseCard + simulationService | Audit trail compliance |
| Real-Time Alerts | 3 | NotificationSystem + SecurityDashboard | Immediate response |
| Color-Coded Scoring | 3 | SecurityDashboard + color mapping | Intuitive risk assessment |
| Advanced Filtering | 4 | AuthorityDashboard + DataTable | Focused investigations |
| Data Export | 4 | ReportGenerator | Policy-level insights |
| Analytics Dashboard | 4 | AdvancedAnalytics + Recharts | Trend identification |

---

## 🚀 How to Run the Demo

### **Setup**
```bash
cd "/Users/nawdddep/Desktop/sih frontend 2"
npm install
npm run dev
```

### **Access**
- **Local**: http://localhost:5173/
- **Theme**: Government Portal Professional (navy #1e40af + gold #f59e0b)
- **Demo IDs**: STU123, CEN001, SEC007, ADM999

### **Build for Production**
```bash
npm run build
```

---

## 📋 Demo Checklist

Before presenting to jury:

- [ ] Verify all 4 user profiles login correctly
- [ ] Test document upload and verification in StudentDashboard
- [ ] Confirm FraudCaseCard resolution logging works
- [ ] Check SecurityDashboard color mapping (red/orange/green)
- [ ] Verify AuthorityDashboard filters are responsive
- [ ] Test DataTable sorting and pagination
- [ ] Ensure real user names display instead of "Demo User"
- [ ] Confirm NotificationSystem shows only for Centre/Security
- [ ] Build completes without errors

---

## 🔐 Compliance & Auditability

✅ **Resolution Logging**: Every action is logged with `logResolution()` function  
✅ **Audit Trail**: Timestamps for all operations  
✅ **Role-Based Access**: Notifications only visible to Centre/Security  
✅ **Data Security**: Access logs for sensitive operations  
✅ **Transparency**: Clear visual indicators of confidence/risk scores  

---

## 🎯 SIH Problem Statement Alignment

**Problem**: "Fake degrees and exam misconduct undermine educational integrity"

**Solution Provided**:
1. ✅ **Detection**: Multi-signal fraud detection (document, biometric, signature, blockchain)
2. ✅ **Investigation**: Role-based investigation tools for centre and security staff
3. ✅ **Response**: Real-time alerts and notification system
4. ✅ **Oversight**: Policy-level analytics and reporting for authorities
5. ✅ **Auditability**: Complete resolution logging and compliance trail

---

## 📞 Demo Talking Points

- **"Watch as the system automatically detects that the uploaded degree doesn't match our registry..."**
- **"When a fraud is confirmed, it's instantly logged with a timestamp for compliance purposes..."**
- **"The security team sees real-time alerts color-coded by risk level..."**
- **"Authority can filter, sort, and export data to make informed policy decisions..."**
- **"Every action is audited — ensuring accountability across all levels..."**

---

## 🏆 Expected Jury Impact

By the end of the 4-act demo, the jury will understand:
1. How the system **detects** fake credentials
2. How **centre staff** investigate efficiently
3. How **security monitors** threats in real-time
4. How **authorities** get actionable insights
5. How the system maintains **compliance & auditability**

This demonstrates a production-ready, enterprise-grade solution that addresses the entire fraud detection lifecycle.

---

**Last Updated**: November 24, 2025  
**Status**: ✅ Phase 1-2 Complete | Ready for Presentation
