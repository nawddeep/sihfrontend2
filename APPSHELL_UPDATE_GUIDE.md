# Step-by-Step: Update AppShell Component (MainApp.jsx)

## 🎯 Overview

The AppShell in `src/MainApp.jsx` is the main dashboard wrapper used by all 4 user roles. It's the **highest priority** update because it affects every page in the application.

**Current State:** Uses dark theme colors  
**Target State:** Indian Government theme colors  
**Estimated Time:** 20-30 minutes  
**Impact:** CRITICAL - affects 100% of logged-in users

---

## 📍 File Location & Line Numbers

**File:** `/src/MainApp.jsx`  
**Component:** `AppShell` function (lines ~265-360)  
**Contains:** Sidebar, Header, Main content area

---

## 🔍 What to Look For

The AppShell has 3 main sections to update:

### Section 1: Sidebar (Lines ~280-320)
Currently uses:
```jsx
className="w-60 flex-col border-r border-dark-800 bg-gradient-to-b from-dark-950/95 to-dark-900/90"
```

### Section 2: Header (Lines ~320-350)
Currently uses:
```jsx
className="flex items-center justify-between px-4 md:px-6 py-3 border-b bg-dark-950/90"
```

### Section 3: Main Content (Line ~353)
Currently uses:
```jsx
className="flex-1 overflow-auto bg-gradient-to-b from-dark-950 to-dark-900"
```

---

## 📋 Step-by-Step Update Guide

### STEP 1: Update Sidebar Background

**Location:** Line ~285 (first `aside` tag)

**FIND THIS:**
```jsx
<aside className="hidden md:flex w-60 flex-col border-r border-dark-800 bg-gradient-to-b from-dark-950/95 to-dark-900/90 backdrop-blur-sm">
```

**REPLACE WITH:**
```jsx
<aside className="hidden md:flex w-60 flex-col border-r border-govGray-300 bg-white shadow-gov-md">
```

**Explanation:**
- `border-dark-800` → `border-govGray-300` (light gray border)
- `bg-gradient-to-b from-dark-950/95 to-dark-900/90` → `bg-white` (clean white background)
- Remove `backdrop-blur-sm` (not needed for government design)

---

### STEP 2: Update Sidebar Header/Logo Area

**Location:** Line ~290-295

**FIND THIS:**
```jsx
<div className="flex items-center gap-2 px-5 py-4 border-b border-dark-800/80">
  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center border border-primary-500/40 shadow-glow-sm">
    <Shield className="w-5 h-5 text-primary-400" />
  </div>
  <div>
    <div className="text-xs tracking-wide text-primary-300">
      SIH Prototype
    </div>
    <div className="text-sm font-semibold leading-tight">
      Degree & Exam Security
    </div>
  </div>
</div>
```

**REPLACE WITH:**
```jsx
<div className="flex items-center gap-2 px-5 py-4 border-b border-govGray-300">
  <div className="w-9 h-9 rounded-lg bg-govBlue-100 flex items-center justify-center border border-govBlue-300">
    <Shield className="w-5 h-5 text-govBlue-600" />
  </div>
  <div>
    <div className="text-xs tracking-wide text-govGray-600">
      SIH Platform
    </div>
    <div className="text-sm font-semibold leading-tight text-govNavy-700">
      Exam Security
    </div>
  </div>
</div>
```

**Changes:**
- Border color: `dark-800/80` → `govGray-300`
- Icon background: `primary-500/10` → `govBlue-100`
- Icon border: `primary-500/40` → `govBlue-300`
- Icon color: `primary-400` → `govBlue-600`
- Text color: `primary-300` → `govGray-600`
- Subtext: add `text-govNavy-700` for color

---

### STEP 3: Update Sidebar Navigation Section

**Location:** Line ~300-315 (nav element)

**FIND THIS:**
```jsx
<nav className="flex-1 px-3 py-4 text-xs space-y-1">
  <div className="px-2 text-dark-500 uppercase tracking-wide mb-1">
    Current Role
  </div>
  <button className="w-full flex items-center gap-2 rounded-lg bg-primary-500/10 border border-primary-500/40 px-3 py-2 text-[13px] text-primary-100 shadow-glow-sm">
    <Icon className="w-4 h-4" />
    <span>{dashboardTitle}</span>
  </button>
  <div className="mt-4 px-2 text-dark-500 uppercase tracking-wide mb-1">
    Quick Context
  </div>
  <div className="space-y-1">
    <div className="rounded-lg bg-dark-900 border border-dark-800 px-3 py-2 text-[11px] text-dark-300">
      <span className="font-semibold text-primary-300">Live Mock Mode</span>
      <br />
      Data, fraud alerts and verifications are simulated.
    </div>
    <div className="rounded-lg bg-dark-900 border border-dark-800 px-3 py-2 text-[11px] text-dark-300">
      <span className="font-semibold text-accent-300">Role Routing</span>
      <br />
      Single SPA with conditional dashboards.
    </div>
  </div>
</nav>
```

**REPLACE WITH:**
```jsx
<nav className="flex-1 px-3 py-4 text-xs space-y-1">
  <div className="px-2 text-govGray-600 uppercase tracking-wide mb-1">
    Current Role
  </div>
  <button className="w-full flex items-center gap-2 rounded-lg bg-govBlue-50 border border-govBlue-300 px-3 py-2 text-[13px] text-govBlue-700 gov-card">
    <Icon className="w-4 h-4" />
    <span>{dashboardTitle}</span>
  </button>
  <div className="mt-4 px-2 text-govGray-600 uppercase tracking-wide mb-1">
    Quick Context
  </div>
  <div className="space-y-1">
    <div className="gov-card px-3 py-2 text-[11px]">
      <span className="font-semibold text-govBlue-700">Live Mock Mode</span>
      <br />
      <span className="text-govGray-600">Data, fraud alerts and verifications are simulated.</span>
    </div>
    <div className="gov-card px-3 py-2 text-[11px]">
      <span className="font-semibold text-govSaffron-700">Role Routing</span>
      <br />
      <span className="text-govGray-600">Single SPA with conditional dashboards.</span>
    </div>
  </div>
</nav>
```

**Changes:**
- All text: `dark-500` → `govGray-600`
- Active button background: `primary-500/10` → `govBlue-50`
- Active button border: `primary-500/40` → `govBlue-300`
- Active button text: `primary-100` → `govBlue-700`
- Remove `shadow-glow-sm`
- Context boxes: `bg-dark-900 border-dark-800` → `gov-card` class
- Context box text: `dark-300` → `govGray-700` (via gov-card default)
- Primary section title: `text-primary-300` → `text-govBlue-700`
- Secondary section title: `text-accent-300` → `text-govSaffron-700`
- Content text: use `text-govGray-600` for consistency

---

### STEP 4: Update Sidebar Footer (User Profile)

**Location:** Line ~316-325

**FIND THIS:**
```jsx
<div className="border-t border-dark-800 px-4 py-3 text-xs flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-full bg-dark-800/80 flex items-center justify-center">
      <UserCircle2 className="w-4 h-4 text-dark-200" />
    </div>
    <div>
      <div className="font-medium truncate max-w-[110px]">
        {user.id}
      </div>
      <div className="text-[10px] text-dark-400">
        {roleLabels[user.role]}
      </div>
    </div>
  </div>
  <CyberButton
    variant="ghost"
    size="sm"
    onClick={logout}
    leftIcon={LogOut}
    className="!px-2 !py-1 text-[11px] text-dark-400 hover:text-danger-300"
  >
    Logout
  </CyberButton>
</div>
```

**REPLACE WITH:**
```jsx
<div className="border-t border-govGray-300 px-4 py-3 text-xs flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-full bg-govGray-200 flex items-center justify-center">
      <UserCircle2 className="w-4 h-4 text-govGray-600" />
    </div>
    <div>
      <div className="font-medium truncate max-w-[110px] text-govGray-700">
        {user.id}
      </div>
      <div className="text-[10px] text-govGray-600">
        {roleLabels[user.role]}
      </div>
    </div>
  </div>
  <button
    onClick={logout}
    className="inline-flex items-center gap-2 px-2 py-1 text-[11px] text-govGray-600 hover:text-danger-600 transition-colors"
  >
    <LogOut className="w-3 h-3" />
    Logout
  </button>
</div>
```

**Changes:**
- Border: `dark-800` → `govGray-300`
- Avatar background: `dark-800/80` → `govGray-200`
- Avatar icon: `dark-200` → `govGray-600`
- User ID text: add `text-govGray-700`
- Role text: `dark-400` → `govGray-600`
- Replace CyberButton with simple button for consistency
- Button text color: `dark-400` → `govGray-600`
- Hover color: `danger-300` → `danger-600` (darker for better contrast)

---

### STEP 5: Update Header Component

**Location:** Line ~336-352 (header element)

**FIND THIS:**
```jsx
<header className={`flex items-center justify-between px-4 md:px-6 py-3 border-b bg-dark-950/90 backdrop-blur sticky top-0 z-10 ${
  user.role === "student" || user.role === "admin" 
    ? "border-dark-800" 
    : "border-primary-500/20 shadow-glow-sm"
}`}>
  <div className="flex items-center gap-2">
    <Icon className="w-5 h-5 text-primary-400 md:hidden" />
    <div>
      <div className="text-xs text-dark-500 uppercase tracking-wide">
        {roleLabels[user.role]}
      </div>
      <div className="text-sm md:text-base font-semibold">
        {user.role === "student"
          ? "Academic Record & Document Verification"
          : user.role === "centre_staff"
          ? "Exam Centre Operations & Bulk Checks"
          : user.role === "security"
          ? "Live Floor Security & Biometric Alerts"
          : "National-Level Fraud & Analytics Overview"}
      </div>
    </div>
  </div>
  <CyberButton
    variant="outline"
    size="sm"
    onClick={logout}
    leftIcon={LogOut}
    className="hidden md:inline-flex"
  >
    Logout
  </CyberButton>
</header>
```

**REPLACE WITH:**
```jsx
<header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-govGray-300 bg-govGray-50 sticky top-0 z-10">
  <div className="flex items-center gap-2">
    <Icon className="w-5 h-5 text-govBlue-600 md:hidden" />
    <div>
      <div className="text-xs text-govGray-600 uppercase tracking-wide">
        {roleLabels[user.role]}
      </div>
      <div className="text-sm md:text-base font-semibold text-govNavy-700">
        {user.role === "student"
          ? "Academic Record & Document Verification"
          : user.role === "centre_staff"
          ? "Exam Centre Operations & Bulk Checks"
          : user.role === "security"
          ? "Live Floor Security & Biometric Alerts"
          : "National-Level Fraud & Analytics Overview"}
      </div>
    </div>
  </div>
  <button
    onClick={logout}
    className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold btn-gov-outline"
  >
    <LogOut className="w-4 h-4" />
    Logout
  </button>
</header>
```

**Changes:**
- Remove conditional border styling
- Border: `dark-800` → `govGray-300`
- Background: `dark-950/90` → `govGray-50`
- Remove `backdrop-blur` and `shadow-glow-sm`
- Icon color: `primary-400` → `govBlue-600`
- Label text: `dark-500` → `govGray-600`
- Title: add `text-govNavy-700` for color
- Replace CyberButton with button using `btn-gov-outline` class
- Add `text-sm font-semibold` to button for consistency

---

### STEP 6: Update Main Content Area

**Location:** Line ~354 (main tag)

**FIND THIS:**
```jsx
<div className="flex-1 overflow-auto bg-gradient-to-b from-dark-950 to-dark-900">
  {dashboard}
</div>
```

**REPLACE WITH:**
```jsx
<div className="flex-1 overflow-auto bg-govGray-100">
  {dashboard}
</div>
```

**Changes:**
- Remove dark gradient
- Background: `from-dark-950 to-dark-900` → `govGray-100`

---

## ✅ Verification Checklist

After making all changes, verify:

```
Visual Checks:
☐ Sidebar is WHITE, not dark
☐ Sidebar has light gray border
☐ Logo icon is blue (not red)
☐ Active role button is light blue
☐ Context boxes are white cards
☐ Sidebar footer is white
☐ Header is light gray
☐ Header text is dark navy
☐ Main content area is light gray
☐ No dark colors visible anywhere

Color Checks:
☐ All text is readable (dark on light)
☐ Icon colors match new palette
☐ Borders are subtle gray
☐ Active states use blue
☐ Hover states show gentle color change

Functional Checks:
☐ Sidebar still shows user role
☐ All buttons are clickable
☐ Logout buttons still work
☐ Header info displays correctly
☐ No console errors

Responsive Checks:
☐ Sidebar hidden on mobile
☐ Header visible on all sizes
☐ Content area responsive
☐ No layout breaks
```

---

## 🧪 Testing Steps

### Test 1: Visual Comparison
1. Before: Take a screenshot of current AppShell
2. After: Make changes and take new screenshot
3. Compare side-by-side
4. Verify all colors changed as expected

### Test 2: Login and Navigate
1. Login as each user type (STU, CEN, SEC, ADM)
2. Verify sidebar shows correctly
3. Verify header text updates
4. Verify layout doesn't break

### Test 3: Responsive
1. Resize browser to 375px (mobile)
2. Verify sidebar is hidden
3. Verify header still visible
4. Verify content area responsive
5. Resize to 768px (tablet)
6. Resize to 1440px (desktop)

### Test 4: Interactions
1. Click logout button → should work
2. Hover over sidebar items → should show subtle hover
3. Click role button → should work
4. Verify no console errors

---

## 📸 Before & After Reference

### Sidebar Before (Dark)
```
┌─────────────────────────┐
│ [🔴] SIH Prototype      │ ← Dark background, red icon
│      Degree & Exam...   │
├─────────────────────────┤
│ Current Role            │ ← Light gray text
│ [Button in blue]        │ ← Blue button on dark
├─────────────────────────┤
│ Quick Context           │ ← Light gray text
│ ┌─────────────────────┐ │
│ │ Live Mock Mode      │ │ ← Dark boxes, light text
│ │ Data is simulated   │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### Sidebar After (Government)
```
┌─────────────────────────┐
│ [🔵] SIH Platform       │ ← White background, blue icon
│      Exam Security      │
├─────────────────────────┤
│ Current Role            │ ← Dark gray text
│ [Button light blue]     │ ← Light blue button on white
├─────────────────────────┤
│ Quick Context           │ ← Dark gray text
│ ┌─────────────────────┐ │
│ │ Live Mock Mode      │ │ ← White boxes, dark text
│ │ Data is simulated   │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

---

## 💾 Summary of Changes

**Total Changes:** 6 sections  
**Lines Modified:** ~80 lines  
**Classes Updated:** 30+ color references  
**Time Required:** 20-30 minutes

### Color Replacement Summary
- All `dark-*` → `gov*` equivalents
- All `primary-*` → `govBlue-*` or `govNavy-*`
- All `accent-*` → `govSaffron-*`
- Background: Dark gradients → Light grays/whites
- Text: Light text on dark → Dark text on light

---

## 🚀 Next Steps

Once AppShell is updated:

1. ✅ AppShell - Dashboard wrapper (THIS FILE)
2. ⬜ StudentDashboard - Update component
3. ⬜ CentreStaffDashboard - Update component
4. ⬜ SecurityDashboard - Update component
5. ⬜ AuthorityDashboard - Update component
6. ⬜ Other components - Update colors

Each dashboard follows similar patterns to AppShell.

---

## 🆘 Troubleshooting

**Problem:** Sidebar still looks dark  
**Solution:** Verify you changed `from-dark-950/95 to-dark-900/90` to `bg-white`

**Problem:** Text not readable  
**Solution:** Check you updated all `text-*` classes to `text-gov*`

**Problem:** Border still visible as dark line  
**Solution:** Change `border-dark-800` to `border-govGray-300`

**Problem:** Icon colors wrong  
**Solution:** Update all icon color refs from `text-primary-400` to `text-govBlue-600`

**Problem:** Layout broke  
**Solution:** You likely didn't copy the full class strings. Use Find & Replace carefully.

---

## 📖 Reference

- **Full Guide:** INDIAN_GOVERNMENT_THEME_GUIDE.md
- **Visual Examples:** VISUAL_REFERENCE_GUIDE.md
- **Color Reference:** THEME_IMPLEMENTATION_GUIDE.md
- **All Classes:** src/index.css

---

**Status:** Ready to Update  
**Priority:** CRITICAL  
**Estimated Time:** 20-30 minutes  
**Difficulty:** Medium (straightforward but detailed)
