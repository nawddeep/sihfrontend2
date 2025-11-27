# Indian Government Theme - Developer Quick Reference Card

## 🎨 One-Page Theme Cheat Sheet

### Color Palette at a Glance

```
PRIMARY COLORS (Main Use):
┌─────────────────────────────────────────────────────────┐
│ 🟠 SAFFRON (#FF9933)     → Actions, highlights, warnings│
│ ⚪ WHITE (#FFFFFF)        → Backgrounds, cards          │
│ 🟢 GREEN (#138808)       → Success, verified, positive  │
│ 🔵 NAVY (#1C3664)        → Headers, text, authority     │
│ 🟡 GOLD (#D4AF37)        → Accents, premium, special    │
│ 🔷 BLUE (#0066CC)        → Links, interactive, primary  │
│ ⬜ GRAY (#D9D9D9)        → Borders, dividers            │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Pre-Built CSS Classes

### Buttons
```jsx
<button className="btn-gov-primary">Blue - Primary CTA</button>
<button className="btn-gov-secondary">Navy - Secondary</button>
<button className="btn-gov-success">Green - Success/Verify</button>
<button className="btn-gov-action">Saffron - Important Action</button>
<button className="btn-gov-outline">Blue Outline - Soft</button>
<button className="btn-gov-danger">Red - Danger/Delete</button>
```

### Cards
```jsx
<div className="gov-card">
  {/* Standard: White bg + subtle shadow + border */}
</div>

<div className="gov-card-premium">
  {/* Premium: White bg + saffron left border accent */}
</div>
```

### Badges/Status
```jsx
<span className="badge-gov-verified">✓ Verified</span>    {/* Green */}
<span className="badge-gov-pending">⏳ Pending</span>     {/* Saffron */}
<span className="badge-gov-alert">⚠ Alert</span>       {/* Red */}
<span className="badge-gov-info">ⓘ Info</span>         {/* Blue */}
<span className="badge-gov-gold">★ Premium</span>      {/* Gold */}

<div className="status-success" />    {/* Animated green dot */}
<div className="status-pending" />    {/* Animated saffron dot */}
<div className="status-alert" />      {/* Animated red dot */}
```

### Forms
```jsx
<label className="label-gov">Field Label</label>
<input className="input-gov" type="text" />
<textarea className="input-gov" rows="4"></textarea>
```

### Tables
```jsx
<table className="table-gov">
  <thead><tr><th>Header</th></tr></thead>
  <tbody><tr><td>Data</td></tr></tbody>
</table>
```

### Headers
```jsx
<h2 className="section-header">Main Section</h2>
<h3 className="section-subheader">Subsection</h3>
```

### Accents
```jsx
<div className="tricolor-top">
  {/* 4px tricolor top border (saffron-white-green) */}
</div>

<div className="tricolor-border">
  {/* Full tricolor diagonal border */}
</div>
```

---

## 🔄 Color Utilities (Tailwind)

### Text Colors
```
text-govNavy-700       → Dark Navy (headers)
text-govGray-700       → Dark Gray (body text)
text-govGray-600       → Medium Gray (secondary)
text-govBlue-600       → Blue (links)
text-govGreen-600      → Green (success)
text-govSaffron-600    → Saffron (action)
text-govGold-900       → Gold (premium)
text-danger-700        → Red (error)
```

### Background Colors
```
bg-white               → Card/Content areas
bg-govGray-50          → Light section backgrounds
bg-govGray-100         → Page background
bg-govNavy-50          → Very light Navy
bg-govBlue-50          → Very light Blue
bg-govGreen-50         → Very light Green
bg-govSaffron-50       → Very light Saffron
```

### Border Colors
```
border-govGray-300     → Default borders
border-govGray-200     → Subtle borders
border-govBlue-500     → Focus state
border-govSaffron-500  → Accent border
border-l-govSaffron-500 → Left accent border
```

---

## ✏️ Before → After Cheat Sheet

| Element | Before | After |
|---------|--------|-------|
| Dark Button | `bg-primary-500` | `btn-gov-primary` |
| Navy Button | `bg-dark-800` | `btn-gov-secondary` |
| Verify Button | `bg-green-600` | `btn-gov-success` |
| Action Button | `bg-accent-500` | `btn-gov-action` |
| Dark Card | `bg-dark-900 border-dark-800` | `gov-card` |
| Main Text | `text-dark-200` | `text-govGray-700` |
| Secondary Text | `text-dark-400` | `text-govGray-600` |
| Header | `text-primary-400` | `text-govNavy-700` |
| Link | `text-primary-400 hover:primary-500` | `text-govBlue-600 hover:govBlue-700` |
| Input | `border-dark-700 bg-dark-800` | `input-gov` |
| Label | `text-dark-300 font-semibold` | `label-gov` |
| Badge/Verified | `bg-green-900` | `badge-gov-verified` |
| Badge/Pending | `bg-yellow-900` | `badge-gov-pending` |
| Table | Custom styling | `table-gov` |
| Border | `border-dark-700` | `border-govGray-300` |

---

## 🔍 Find & Replace Quick Commands

```bash
# Find all remaining dark colors
grep -r "dark-" src/ --include="*.jsx"

# Find all remaining primary colors
grep -r "primary-" src/ --include="*.jsx"

# Find all remaining accent colors
grep -r "accent-" src/ --include="*.jsx"

# Find inline styles (might need attention)
grep -r "style={{" src/ --include="*.jsx"

# Find remaining hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.jsx"
```

---

## 📋 Component Checklist

When updating ANY component:

```
☐ Remove all dark-* classes
☐ Remove all primary-* classes  
☐ Remove all accent-* classes
☐ Replace buttons with btn-gov-* classes
☐ Replace cards with gov-card classes
☐ Replace badges with badge-gov-* classes
☐ Replace inputs with input-gov class
☐ Replace labels with label-gov class
☐ Replace tables with table-gov class
☐ Use text-gov* classes for colors
☐ Use bg-gov* classes for backgrounds
☐ Use border-gov* classes for borders
☐ Verify no hardcoded hex colors
☐ Test hover/focus states
☐ Screenshot before/after comparison
```

---

## 🎯 Most Common Patterns

### Pattern 1: Action Card
```jsx
<div className="gov-card-premium">
  <h3 className="text-govNavy-700 font-bold">Action Title</h3>
  <p className="text-govGray-600 text-sm">Description</p>
  <button className="btn-gov-primary mt-4">Action</button>
</div>
```

### Pattern 2: Status Row
```jsx
<div className="flex items-center justify-between p-4 border-b border-govGray-300">
  <div>
    <p className="text-govNavy-700 font-semibold">Item Name</p>
    <p className="text-govGray-600 text-sm">Metadata</p>
  </div>
  <span className="badge-gov-verified">Verified</span>
</div>
```

### Pattern 3: Form Field
```jsx
<div className="space-y-2">
  <label className="label-gov">Field Name</label>
  <input className="input-gov" type="text" placeholder="..." />
  <p className="text-govGray-600 text-xs">Help text</p>
</div>
```

### Pattern 4: Alert Message
```jsx
<div className="bg-govGreen-50 border border-govGreen-200 rounded-lg p-4">
  <p className="text-govGreen-700 font-semibold">Success!</p>
  <p className="text-govGreen-600 text-sm">Operation completed</p>
</div>
```

### Pattern 5: Grid of Cards
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="gov-card">...</div>
  <div className="gov-card">...</div>
  <div className="gov-card">...</div>
</div>
```

---

## 🎯 Implementation Priority

**DO FIRST** (Makes biggest impact):
1. MainApp.jsx sidebar & header
2. Dashboard card styling
3. All buttons in app

**DO SECOND** (Completes the look):
4. Forms and inputs
5. Status badges
6. Tables

**DO LAST** (Polish):
7. Animations
8. Hover states
9. Edge cases

---

## 📚 Reference Files

| File | Purpose |
|------|---------|
| `src/index.css` | All CSS classes, variables, utilities |
| `tailwind.config.js` | Color palette, Tailwind config |
| `src/components/CyberLayout.jsx` | Theme wrapper (reference) |
| `src/MainApp.jsx` LoginPage | Fully themed example (copy from here!) |
| `VISUAL_REFERENCE_GUIDE.md` | Detailed examples with code |
| `IMPLEMENTATION_CHECKLIST.md` | File-by-file update guide |
| `INDIAN_GOVERNMENT_THEME_GUIDE.md` | Complete design guide |

---

## 🚀 3-Step Update Process

### Step 1: Replace Classes
Find old class → Replace with new class

Example:
```jsx
// Before
<button className="bg-primary-500 text-white px-4 py-2 rounded">

// After  
<button className="btn-gov-primary">
```

### Step 2: Update Colors
For text/bg not covered by classes:

```jsx
// Before
<div className="text-primary-400 bg-dark-900">

// After
<div className="text-govBlue-600 bg-white">
```

### Step 3: Test & Screenshot
- Take screenshot
- Compare with original
- Verify colors match theme
- Check responsive on mobile

---

## 💡 Pro Tips

✅ **DO:**
- Use pre-built classes (they're optimized)
- Use CSS variables for inline colors
- Keep components consistent
- Test on mobile, tablet, desktop
- Verify color contrast

❌ **DON'T:**
- Use hardcoded hex colors
- Mix old and new theme colors
- Create custom button styles
- Forget focus states
- Skip testing

---

## 🆘 Emergency Help

**"I don't know what color to use":**
→ Look at `src/MainApp.jsx` LoginPage (it's fully themed)

**"What's this color code?":**
→ Check color lookup table above

**"How do I update a button?":**
→ Replace `className="..."` with `className="btn-gov-primary"`

**"Component still looks wrong":**
→ Check VISUAL_REFERENCE_GUIDE.md for examples

**"I broke something":**
→ Undo changes, take smaller steps, test incrementally

---

## ✅ Quality Checklist

After updating a component, verify:

```
Visual:
☐ No dark colors visible
☐ All buttons styled correctly
☐ Cards have proper shadows
☐ Text colors are readable
☐ Badges are styled consistently

Functional:
☐ Buttons are clickable
☐ Forms work properly
☐ Links are navigable
☐ No broken layouts

Responsive:
☐ Looks good on mobile (375px)
☐ Looks good on tablet (768px)
☐ Looks good on desktop (1440px)

Accessibility:
☐ High contrast (use axe tool)
☐ Focus states visible
☐ Keyboard navigable
```

---

## 🎓 Learning Path

1. **Read this file** (5 min) - Overview
2. **Look at examples** (10 min) - VISUAL_REFERENCE_GUIDE.md
3. **Check LoginPage** (10 min) - How it's done
4. **Update one component** (15 min) - Get hands-on
5. **Screenshot & compare** (5 min) - Verify it works
6. **Repeat for other components** - Build confidence

---

## 📞 Questions?

- **Color questions?** → Check color lookup table above
- **Class questions?** → Check component section above
- **Implementation questions?** → Check IMPLEMENTATION_CHECKLIST.md
- **Design questions?** → Check INDIAN_GOVERNMENT_THEME_GUIDE.md
- **Code examples?** → Check VISUAL_REFERENCE_GUIDE.md

---

**Theme Status:** ✅ Complete & Ready to Use  
**Last Updated:** November 27, 2025  
**Effort Estimate:** 7-8 hours total implementation
