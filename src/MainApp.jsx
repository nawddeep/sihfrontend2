import React, { useState, createContext, useContext } from "react";
import {
  Shield,
  LogOut,
  UserCircle2,
  GraduationCap,
  Building2,
  Siren,
  LineChart,
  Sparkles,
  Fingerprint,
  Globe,
  BadgeCheck,
} from "lucide-react";
import StudentDashboard from "./dashboards/StudentDashboard.jsx";
import CentreStaffDashboard from "./dashboards/CentreStaffDashboard.jsx";
import SecurityDashboard from "./dashboards/SecurityDashboard.jsx";
import AuthorityDashboard from "./dashboards/AuthorityDashboard.jsx";
import CyberLayout from "./components/CyberLayout.jsx";
import CyberButton from "./components/CyberButton.jsx";

export const AuthContext = createContext(null);

const roleLabels = {
  student: "Student",
  centre_staff: "Centre / Institute Staff",
  security: "Security Staff",
  admin: "Higher Authority",
};

const detectRoleFromId = (id) => {
  const upper = id.toUpperCase();
  if (upper.startsWith("STU")) return "student";
  if (upper.startsWith("CEN")) return "centre_staff";
  if (upper.startsWith("SEC")) return "security";
  if (upper.startsWith("ADM")) return "admin";
  return null;
};

function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [manualRole, setManualRole] = useState("auto");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statTiles = [
    {
      label: "Institutions piloting",
      value: "120+",
      delta: "+32 this quarter",
    },
    {
      label: "Verifications / day",
      value: "48K",
      delta: "Peak load tested",
    },
    {
      label: "Fraud prevented",
      value: "82 Cr",
      delta: "Simulated risk savings",
    },
  ];

  const highlights = [
    "Role-aware routing across 4 authority levels",
    "Zero-paper compliance logs & tamper alerts",
    "AI boosted cross-check for biometrics + docs",
    "1-click escalations for national audit cells",
  ];

  const roleInfo = [
    { label: "Learners", detail: "Access verified marksheets", icon: GraduationCap },
    { label: "Centres", detail: "Bulk admit-card unlocks", icon: Building2 },
    { label: "Security", detail: "Live biometric watch", icon: Siren },
    { label: "National Cell", detail: "Macro fraud analytics", icon: LineChart },
  ];

  const getPasswordStrength = () => {
    if (!password) return { label: "", level: 0 };
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { label: "Weak", level: 1 };
    if (score === 2) return { label: "Medium", level: 2 };
    return { label: "Strong", level: 3 };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    let role = detectRoleFromId(userId.trim());
    if (!role && manualRole !== "auto") {
      role = manualRole;
    }

    if (!userId.trim() || !password) {
      setError("Please enter both User ID and Password.");
      return;
    }
    if (!role) {
      setError(
        "Could not infer role. Use ID prefixes STU / CEN / SEC / ADM or select a role manually."
      );
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate an async authentication flow
    setTimeout(() => {
      onLogin({
        id: userId.trim(),
        name: "Demo User",
        role,
        rememberMe,
      });
      setIsSubmitting(false);
    }, 600);
  };

  const { label: strengthLabel, level: strengthLevel } = getPasswordStrength();

  return (
    <CyberLayout>
      <div className="relative min-h-screen overflow-hidden bg-govGray-100 text-govGray-700">
        {/* Subtle Indian flag tricolor overlay */}
        <div className="absolute top-0 left-0 right-0 h-1" style={{background: 'linear-gradient(to right, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)'}} />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-wrap items-center gap-3 text-xs text-govGray-600 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-govSaffron-50 px-3 py-1 border border-govSaffron-200">
              <Sparkles className="w-4 h-4 text-govSaffron-600" />
              SIH Exam Security Platform · Government of India
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-govGreen-50 px-3 py-1 border border-govGreen-200 text-govGreen-700">
              <BadgeCheck className="w-4 h-4" />
              Trusted by 30+ pilot universities
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <section className="space-y-6">
              <div className="rounded-lg border-2 border-govGray-300 bg-white p-6 md:p-8 shadow-gov-md tricolor-top">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-govNavy-700 mb-3">
                  <Shield className="w-4 h-4" />
                  Unified Trust Portal
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-govNavy-700 leading-tight">
                  Zero-compromise verification for results, centres & live security ops.
                </h1>
                <p className="mt-3 text-sm text-govGray-600 max-w-2xl">
                  Log in once, route everywhere. The new login orchestrates dashboards for students, institutes,
                  security cells and the national command centre—while retaining audit-grade traceability.
                </p>

                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {statTiles.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border-l-4 border-l-govGreen-500 border border-govGray-200 bg-white p-4 shadow-gov-sm hover:shadow-gov-md transition-shadow"
                    >
                      <div className="text-2xl font-bold text-govNavy-700">{stat.value}</div>
                      <div className="text-[11px] uppercase tracking-wider text-govGray-600">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-[11px] text-govGreen-700 font-semibold">{stat.delta}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-govGray-300 bg-white shadow-gov-md overflow-hidden">
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-govGray-200">
                  <div className="p-6 space-y-4">
                    {roleInfo.map(({ label, detail, icon: Icon }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-lg border border-govGray-200 bg-govGray-50 p-3 hover:bg-govBlue-50 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-lg bg-govBlue-100 border border-govBlue-300 flex items-center justify-center text-govBlue-600">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-govNavy-700">{label}</div>
                          <div className="text-[12px] text-govGray-600">{detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.3em] text-govGray-600">
                      <Fingerprint className="w-4 h-4" />
                      Why it feels different
                    </div>
                    {highlights.map((item) => (
                      <div key={item} className="flex gap-3 text-sm text-govGray-700">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-govGreen-500" />
                        <p>{item}</p>
                      </div>
                    ))}
                    <div className="mt-4 flex items-center gap-2 text-xs text-govGray-600">
                      <Globe className="w-4 h-4" />
                      Multi-lingual support shipping in next phase
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-govSaffron-500/20 to-govGreen-500/20 blur-lg opacity-50" />
              <div className="relative rounded-lg border-2 border-govNavy-300 bg-white shadow-gov-lg p-6 md:p-8 space-y-6 tricolor-top">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] uppercase tracking-[0.3em] text-govGray-600">
                      Access the portal
                    </p>
                    <h2 className="text-xl font-bold text-govNavy-700">Unified Login Console</h2>
                    <p className="text-xs text-govGray-600 mt-1">
                      Use IDs like <span className="font-mono text-govBlue-600 font-semibold">STU123</span> or override role manually.
                    </p>
                  </div>
                  <div className="hidden sm:flex w-12 h-12 rounded-lg border-2 border-govNavy-300 bg-govNavy-50 text-govNavy-600 items-center justify-center">
                    <UserCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="label-gov">User ID</label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="e.g., STU2025A001 / CEN-MH-23"
                      className="input-gov"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="space-y-1.5">
                      <label className="label-gov">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="input-gov"
                      />
                    </div>
                    {strengthLabel && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-govGray-600">
                          <span>Password strength</span>
                          <span
                            className={
                              strengthLabel === "Strong"
                                ? "text-govGreen-600 font-semibold"
                                : strengthLabel === "Medium"
                                ? "text-govSaffron-600 font-semibold"
                                : "text-danger-600 font-semibold"
                            }
                          >
                            {strengthLabel}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`flex-1 h-1.5 rounded-full transition-colors ${
                                i <= strengthLevel
                                  ? strengthLabel === "Strong"
                                    ? "bg-govGreen-500"
                                    : strengthLabel === "Medium"
                                    ? "bg-govSaffron-500"
                                    : "bg-danger-500"
                                  : "bg-govGray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="label-gov flex justify-between">
                      <span>Role (optional override)</span>
                      <span className="text-[10px] text-govGray-600">
                        Auto-detected from ID prefix when set to Auto
                      </span>
                    </label>
                    <select
                      value={manualRole}
                      onChange={(e) => setManualRole(e.target.value)}
                      className="input-gov"
                    >
                      <option value="auto">Auto detect from User ID</option>
                      <option value="student">Student</option>
                      <option value="centre_staff">Centre / Institute Staff</option>
                      <option value="security">Security Staff</option>
                      <option value="admin">Higher Authority</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-govGray-600">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-3.5 w-3.5 rounded border border-govGray-300 bg-white text-govBlue-600 focus:ring-govBlue-300"
                      />
                      <span>Remember me on this device</span>
                    </label>
                    <button
                      type="button"
                      className="text-govBlue-600 hover:text-govBlue-700 transition-colors"
                      onClick={() => {
                        setError("Password reset is not wired for this demo.");
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {error && (
                    <div className="text-xs text-danger-700 bg-danger-50 border border-danger-200 rounded-lg px-3 py-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gov-primary w-full mt-1 flex items-center justify-center gap-2"
                  >
                    <UserCircle2 className="w-4 h-4" />
                    {isSubmitting ? "Signing in..." : "Sign in to Dashboard"}
                  </button>
                </form>

                <div className="pt-4 border-t border-govGray-200 text-[11px] text-govGray-600 flex flex-col gap-2">
                  <p>
                    Frontend-only prototype. Actions like suspend/verify update local state to illustrate end-to-end flows.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.4em] text-govGray-600">
                    <span className="badge-gov-info">Audit Trail Ready</span>
                    <span className="badge-gov-verified">Biometric Pilot</span>
                    <span className="badge-gov-gold">Government Ready</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </CyberLayout>
  );
}

function AppShell() {
  const { user, logout } = useContext(AuthContext);

  let dashboardTitle = roleLabels[user.role] || "Dashboard";
  let Icon = GraduationCap;
  if (user.role === "centre_staff") Icon = Building2;
  if (user.role === "security") Icon = Siren;
  if (user.role === "admin") Icon = LineChart;

  let dashboard = null;
  switch (user.role) {
    case "student":
      dashboard = <StudentDashboard />;
      break;
    case "centre_staff":
      dashboard = <CentreStaffDashboard />;
      break;
    case "security":
      dashboard = <SecurityDashboard />;
      break;
    case "admin":
      dashboard = <AuthorityDashboard />;
      break;
    default:
      dashboard = <div className="p-8">Unknown role</div>;
  }

  return (
    <CyberLayout>
      <div className="flex flex-1">
        <aside className="hidden md:flex w-60 flex-col border-r border-dark-800 bg-gradient-to-b from-dark-950/95 to-dark-900/90 backdrop-blur-sm">
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
        </aside>

        <main className="flex-1 flex flex-col">
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
          <div className="flex-1 overflow-auto bg-gradient-to-b from-dark-950 to-dark-900">
            {dashboard}
          </div>
        </main>
      </div>
    </CyberLayout>
  );
}

export default function MainApp() {
  const [user, setUser] = useState(null);

  const login = (userInfo) => setUser(userInfo);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {user ? <AppShell /> : <LoginPage onLogin={login} />}
    </AuthContext.Provider>
  );
}
