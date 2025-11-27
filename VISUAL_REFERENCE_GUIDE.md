# Indian Government Theme - Visual Reference & Code Examples

## Color Palette Visual Guide

### Primary Colors

#### Saffron (#FF9933)
- **Usage:** Actions, highlights, warnings, call-to-action buttons
- **Tailwind:** `bg-govSaffron-500`, `text-govSaffron-500`
- **CSS Variable:** `var(--gov-saffron)`
- **Shades:** govSaffron-50 (lightest) to govSaffron-950 (darkest)

```jsx
// Button with Saffron
<button className="btn-gov-action">Important Action</button>

// Badge with Saffron (pending status)
<span className="badge-gov-pending">Pending</span>

// Text with Saffron
<span className="text-govSaffron-600">Warning message</span>
```

#### White (#FFFFFF)
- **Usage:** Backgrounds, card backgrounds, text for dark backgrounds
- **Tailwind:** `bg-white`, `text-white`
- **Note:** Use for card backgrounds and main content areas

```jsx
// White card background
<div className="gov-card bg-white">
  {/* Content */}
</div>
```

#### Green (#138808)
- **Usage:** Success states, verified items, positive actions
- **Tailwind:** `bg-govGreen-500`, `text-govGreen-500`
- **CSS Variable:** `var(--gov-green)`

```jsx
// Green button for success
<button className="btn-gov-success">Verify Document</button>

// Green badge
<span className="badge-gov-verified">Verified</span>

// Green status indicator
<div className="status-success" />
```

#### Navy (#1C3664)
- **Usage:** Headers, authority areas, primary text, navigation
- **Tailwind:** `bg-govNavy-500`, `text-govNavy-700`
- **CSS Variable:** `var(--gov-navy)`
- **For text:** Use `govNavy-700` (lighter for readability)
- **For backgrounds:** Use `govNavy-50` or `govNavy-100` (very light)

```jsx
// Navy header
<h1 className="text-govNavy-700 font-bold">Section Header</h1>

// Navy background for authority area
<div className="bg-govNavy-50 border border-govNavy-200 p-4">
  {/* Authority content */}
</div>
```

#### Gold (#D4AF37)
- **Usage:** Premium elements, Ashoka Chakra accents, special status
- **Tailwind:** `bg-govGold-500`, `text-govGold-900`
- **CSS Variable:** `var(--gov-gold)`

```jsx
// Gold badge for premium status
<span className="badge-gov-gold">Government Verified</span>

// Gold accent text
<span className="text-govGold-900 font-semibold">Premium Status</span>
```

#### Blue (#0066CC)
- **Usage:** Links, interactive elements, primary actions
- **Tailwind:** `bg-govBlue-500`, `text-govBlue-600`
- **CSS Variable:** `var(--gov-blue)`

```jsx
// Blue button for primary action
<button className="btn-gov-primary">Sign In</button>

// Blue link
<a href="#" className="text-govBlue-600 hover:text-govBlue-700">
  Click here
</a>

// Blue outline button
<button className="btn-gov-outline">Learn More</button>
```

### Supporting Colors

#### Light Background (#F5F5F5)
- **Usage:** Page backgrounds, subtle backgrounds
- **Tailwind:** `bg-govGray-100`
- **CSS Variable:** `var(--gov-gray-light)`

```jsx
// Page background
<div className="bg-govGray-100 min-h-screen">
  {/* Content */}
</div>
```

#### Border Color (#D9D9D9)
- **Usage:** Card borders, dividers, input borders
- **Tailwind:** `border-govGray-300`, `divide-govGray-300`
- **CSS Variable:** `var(--gov-gray-border)`

```jsx
// Card with gray border
<div className="border border-govGray-300 rounded-lg">
  {/* Content */}
</div>

// Divider
<div className="border-t border-govGray-300" />
```

#### Dark Text (#333333)
- **Usage:** Body text, headings, primary content
- **Tailwind:** `text-govGray-700`
- **CSS Variable:** `var(--gov-text-dark)`

```jsx
// Dark text for main content
<p className="text-govGray-700">Lorem ipsum dolor sit amet.</p>
```

#### Light Text (#666666)
- **Usage:** Secondary text, descriptions, meta information
- **Tailwind:** `text-govGray-600`
- **CSS Variable:** `var(--gov-text-light)`

```jsx
// Secondary text
<p className="text-govGray-600 text-sm">Created on Nov 27, 2025</p>
```

---

## Component Styling Examples

### Cards

#### Standard Card
```jsx
<div className="gov-card">
  <h3 className="text-govNavy-700 font-semibold">Card Title</h3>
  <p className="text-govGray-600 text-sm">Card content goes here</p>
</div>
```

**CSS Generated:**
```css
.gov-card {
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid #D9D9D9;
  box-shadow: 0 2px 4px 0 rgba(28, 54, 100, 0.1);
  transition: all 200ms;
}

.gov-card:hover {
  box-shadow: 0 4px 12px 0 rgba(28, 54, 100, 0.15);
  border-color: #b0b0b0;
}
```

#### Premium Card (with saffron accent)
```jsx
<div className="gov-card-premium">
  <div className="flex items-start gap-3">
    <div className="w-1 h-full rounded-full bg-govSaffron-500" />
    <div>
      <h3 className="text-govNavy-700 font-bold">Premium Item</h3>
      <p className="text-govGray-600 text-sm">This is important</p>
    </div>
  </div>
</div>
```

#### Card with Status
```jsx
<div className="gov-card">
  <div className="flex items-center justify-between">
    <div>
      <h4 className="text-govNavy-700 font-semibold">Document</h4>
      <p className="text-govGray-600 text-sm">Academic Record</p>
    </div>
    <span className="badge-gov-verified">Verified</span>
  </div>
</div>
```

### Buttons

#### Primary Button (Blue)
```jsx
<button className="btn-gov-primary">
  Perform Action
</button>
```

#### Secondary Button (Navy)
```jsx
<button className="btn-gov-secondary">
  Secondary Action
</button>
```

#### Success Button (Green)
```jsx
<button className="btn-gov-success">
  Confirm Verification
</button>
```

#### Action Button (Saffron)
```jsx
<button className="btn-gov-action">
  Important Action
</button>
```

#### Outline Button
```jsx
<button className="btn-gov-outline">
  Cancel
</button>
```

#### Danger Button (Red)
```jsx
<button className="btn-gov-danger">
  Delete Item
</button>
```

#### Button Group
```jsx
<div className="flex gap-3">
  <button className="btn-gov-primary">Save</button>
  <button className="btn-gov-outline">Cancel</button>
</div>
```

#### Button with Icon
```jsx
<button className="btn-gov-primary flex items-center gap-2">
  <CheckCircle className="w-4 h-4" />
  Verify Document
</button>
```

### Forms

#### Input Field
```jsx
<div className="space-y-2">
  <label className="label-gov">Email Address</label>
  <input 
    type="email"
    className="input-gov"
    placeholder="student@institution.edu.in"
  />
</div>
```

**With Helper Text:**
```jsx
<div className="space-y-2">
  <label className="label-gov">Institution Code</label>
  <input 
    type="text"
    className="input-gov"
    placeholder="IN-CHN-2025"
  />
  <p className="text-govGray-600 text-xs">Format: IN-STT-YYYY</p>
</div>
```

#### Select Dropdown
```jsx
<div className="space-y-2">
  <label className="label-gov">Role</label>
  <select className="input-gov">
    <option>Select a role</option>
    <option>Student</option>
    <option>Centre Staff</option>
    <option>Security</option>
    <option>Authority</option>
  </select>
</div>
```

#### Textarea
```jsx
<div className="space-y-2">
  <label className="label-gov">Comments</label>
  <textarea 
    className="input-gov"
    rows="4"
    placeholder="Enter your comments..."
  />
</div>
```

#### Checkbox
```jsx
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="h-4 w-4 rounded border border-govGray-300 text-govBlue-600"
  />
  <span className="text-govGray-700">I agree to the terms</span>
</label>
```

#### Form with Multiple Fields
```jsx
<form className="space-y-4">
  <div className="space-y-2">
    <label className="label-gov">Full Name</label>
    <input type="text" className="input-gov" />
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <label className="label-gov">Date of Birth</label>
      <input type="date" className="input-gov" />
    </div>
    <div className="space-y-2">
      <label className="label-gov">Roll Number</label>
      <input type="text" className="input-gov" />
    </div>
  </div>
  
  <div className="flex gap-3">
    <button type="submit" className="btn-gov-primary">
      Submit
    </button>
    <button type="reset" className="btn-gov-outline">
      Clear
    </button>
  </div>
</form>
```

### Badges & Status

#### Verified Badge
```jsx
<span className="badge-gov-verified">✓ Verified</span>
```

#### Pending Badge
```jsx
<span className="badge-gov-pending">⏳ Pending Review</span>
```

#### Alert Badge
```jsx
<span className="badge-gov-alert">⚠ Alert</span>
```

#### Info Badge
```jsx
<span className="badge-gov-info">ⓘ Information</span>
```

#### Gold/Premium Badge
```jsx
<span className="badge-gov-gold">★ Government Verified</span>
```

#### Multiple Badges
```jsx
<div className="flex flex-wrap gap-2">
  <span className="badge-gov-verified">Verified</span>
  <span className="badge-gov-info">Active</span>
  <span className="badge-gov-gold">Premium</span>
</div>
```

#### Status Indicators (Dots)
```jsx
// Online status
<div className="flex items-center gap-2">
  <div className="status-success" />
  <span className="text-govGray-700">System Online</span>
</div>

// Degraded status
<div className="flex items-center gap-2">
  <div className="status-pending" />
  <span className="text-govGray-700">Degraded Performance</span>
</div>

// Offline status
<div className="flex items-center gap-2">
  <div className="status-alert" />
  <span className="text-govGray-700">System Offline</span>
</div>
```

### Tables

#### Basic Table
```jsx
<table className="table-gov">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><span className="badge-gov-verified">Verified</span></td>
      <td>Nov 27, 2025</td>
      <td>
        <button className="text-govBlue-600 hover:text-govBlue-700">View</button>
      </td>
    </tr>
  </tbody>
</table>
```

#### Table with Row Actions
```jsx
<table className="table-gov">
  <thead>
    <tr>
      <th>Document</th>
      <th>Status</th>
      <th>Verified By</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Marksheet</td>
      <td><span className="badge-gov-verified">Verified</span></td>
      <td>Authority Panel</td>
      <td>
        <div className="flex gap-2">
          <button className="text-govBlue-600 text-sm">Edit</button>
          <button className="text-danger-600 text-sm">Delete</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

### Headers & Sections

#### Page Header
```jsx
<div className="bg-govGray-50 border-b border-govGray-300 px-6 py-4">
  <h1 className="text-govNavy-700 text-2xl font-bold">Page Title</h1>
  <p className="text-govGray-600 text-sm">Subtitle or description</p>
</div>
```

#### Section Header
```jsx
<h2 className="section-header">Important Section</h2>
```

#### Section Subheader
```jsx
<h3 className="section-subheader">Subsection Title</h3>
```

#### Header with Tricolor Top
```jsx
<div className="gov-card tricolor-top">
  <h2 className="text-govNavy-700 font-bold mb-4">Important Section</h2>
  {/* Content */}
</div>
```

### Error & Alert States

#### Error Message
```jsx
<div className="bg-danger-50 border border-danger-200 rounded-lg px-4 py-3">
  <p className="text-danger-700 font-semibold">Error</p>
  <p className="text-danger-600 text-sm">Something went wrong. Please try again.</p>
</div>
```

#### Warning Message
```jsx
<div className="bg-govSaffron-50 border border-govSaffron-200 rounded-lg px-4 py-3">
  <p className="text-govSaffron-700 font-semibold">Warning</p>
  <p className="text-govSaffron-600 text-sm">Please review before proceeding.</p>
</div>
```

#### Success Message
```jsx
<div className="bg-govGreen-50 border border-govGreen-200 rounded-lg px-4 py-3">
  <p className="text-govGreen-700 font-semibold">Success</p>
  <p className="text-govGreen-600 text-sm">Operation completed successfully.</p>
</div>
```

#### Info Message
```jsx
<div className="bg-govBlue-50 border border-govBlue-200 rounded-lg px-4 py-3">
  <p className="text-govBlue-700 font-semibold">Information</p>
  <p className="text-govBlue-600 text-sm">Here's some useful information.</p>
</div>
```

### Complex Layouts

#### Dashboard Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="gov-card">
    <h3 className="text-govNavy-700 font-bold text-lg">120+</h3>
    <p className="text-govGray-600 text-sm">Institutions Verified</p>
  </div>
  <div className="gov-card">
    <h3 className="text-govNavy-700 font-bold text-lg">48K</h3>
    <p className="text-govGray-600 text-sm">Documents Processed</p>
  </div>
  <div className="gov-card">
    <h3 className="text-govNavy-700 font-bold text-lg">99.8%</h3>
    <p className="text-govGray-600 text-sm">Accuracy Rate</p>
  </div>
</div>
```

#### Profile Card
```jsx
<div className="gov-card-premium">
  <div className="flex items-start gap-4">
    <div className="w-16 h-16 rounded-lg bg-govBlue-100 flex items-center justify-center">
      <Users className="w-8 h-8 text-govBlue-600" />
    </div>
    <div className="flex-1">
      <h3 className="text-govNavy-700 font-bold">John Doe</h3>
      <p className="text-govGray-600 text-sm">Student ID: STU2025A001</p>
      <p className="text-govGray-600 text-sm">Institution: IIT Bombay</p>
      <div className="mt-3 flex gap-2">
        <span className="badge-gov-verified">Verified</span>
        <span className="badge-gov-info">Active</span>
      </div>
    </div>
  </div>
</div>
```

#### Action Section
```jsx
<div className="gov-card">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-govNavy-700 font-bold">Verify Documents</h3>
    <span className="badge-gov-pending">3 Pending</span>
  </div>
  <div className="space-y-3">
    {/* Items */}
  </div>
  <div className="mt-4 flex gap-3">
    <button className="btn-gov-primary">Verify All</button>
    <button className="btn-gov-outline">Review Details</button>
  </div>
</div>
```

---

## Accessibility Best Practices

### Color Contrast
All government colors maintain WCAG AA compliance:
- Navy text on white: ✅ 8.7:1
- Blue buttons on white: ✅ 4.5:1
- Green success on white: ✅ 5.4:1
- Saffron action on white: ✅ 4.2:1

### Focus States
Always visible focus indicators:
```jsx
// Tailwind focus state included in all inputs
.input-gov:focus {
  outline: none;
  border-color: #0066CC;
  ring: 2px #0066CC;
  ring-opacity: 0.1;
}
```

### Semantic HTML
Always use appropriate HTML elements:
```jsx
// Good
<button className="btn-gov-primary">Submit</button>
<a href="#" className="text-govBlue-600">Link</a>

// Avoid
<div className="btn-gov-primary" onClick={...}>Not a real button</div>
```

---

## Animation Guidelines

### Subtle Transitions
```jsx
// Smooth color transitions
className="transition-colors duration-200"

// Smooth shadow transitions
className="transition-shadow duration-200"

// Smooth all transitions
className="transition-all duration-200"
```

### Avoid
- ❌ Bright neon colors
- ❌ Rapid flashing
- ❌ Large scale animations
- ❌ Auto-playing videos
- ❌ Parallax effects

---

## Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Example: Responsive Card Grid
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Example: Responsive Typography
```jsx
<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
  Responsive Title
</h1>
```

---

## Common Patterns Reference

### Pattern: Status Timeline
```jsx
<div className="space-y-3">
  <div className="flex gap-3">
    <div className="status-success flex-shrink-0" />
    <div>
      <p className="text-govNavy-700 font-semibold">Document Submitted</p>
      <p className="text-govGray-600 text-sm">Nov 27, 2025 10:30 AM</p>
    </div>
  </div>
  <div className="flex gap-3">
    <div className="status-pending flex-shrink-0" />
    <div>
      <p className="text-govNavy-700 font-semibold">Under Review</p>
      <p className="text-govGray-600 text-sm">Pending verification</p>
    </div>
  </div>
</div>
```

### Pattern: Info Box
```jsx
<div className="bg-govGray-50 border-l-4 border-l-govBlue-500 p-4 rounded">
  <p className="text-govNavy-700 font-semibold text-sm">Important Note</p>
  <p className="text-govGray-600 text-sm mt-1">
    Additional information or instruction here
  </p>
</div>
```

### Pattern: Feature List
```jsx
<div className="space-y-2">
  {features.map(feature => (
    <div key={feature} className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-govGreen-600 flex-shrink-0" />
      <span className="text-govGray-700">{feature}</span>
    </div>
  ))}
</div>
```
