import React, { useState, createContext, useContext } from "react";
import {
  Shield,
  LogOut,
  UserCircle2,
  GraduationCap,
  Building2,
  Siren,
  LineChart,
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="mb-6 flex items-center gap-2 justify-center text-xs text-dark-400">
            <div className="inline-flex items-center gap-2 rounded-full bg-dark-900/70 px-3 py-1 border border-primary-500/40 text-primary-300 shadow-glow-sm">
              <Shield className="w-4 h-4" />
              Smart India Hackathon — Prototype
            </div>
          </div>

          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-glow-md p-6 md:p-8 transition-transform duration-200 hover:-translate-y-0.5">
            <div className="mb-6">
              <h1 className="text-xl md:text-2xl font-semibold tracking-wide text-slate-50">
                Unified Verification Login
              </h1>
              <p className="mt-1 text-xs text-slate-300">
                Sign in with a role-aware demo ID like
                <span className="font-mono ml-1">STU123</span>,
                <span className="font-mono ml-1">CEN001</span>,
                <span className="font-mono ml-1">SEC007</span>,
                <span className="font-mono ml-1">ADM999</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                  User ID
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g., STU2025A001 / CEN-MH-23"
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                  />
                </div>
                {strengthLabel && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Password strength</span>
                      <span
                        className={
                          strengthLabel === "Strong"
                            ? "text-emerald-300"
                            : strengthLabel === "Medium"
                            ? "text-amber-300"
                            : "text-rose-300"
                        }
                      >
                        {strengthLabel}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1.5 rounded-full bg-slate-800 ${
                            i <= strengthLevel
                              ? strengthLabel === "Strong"
                                ? "bg-emerald-400"
                                : strengthLabel === "Medium"
                                ? "bg-amber-400"
                                : "bg-rose-400"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex justify-between">
                  <span>Role (optional override)</span>
                  <span className="text-[10px] text-slate-500">
                    Auto-detected from ID prefix when set to Auto
                  </span>
                </label>
                <select
                  value={manualRole}
                  onChange={(e) => setManualRole(e.target.value)}
                  className="w-full rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                >
                  <option value="auto">Auto detect from User ID</option>
                  <option value="student">Student</option>
                  <option value="centre_staff">Centre / Institute Staff</option>
                  <option value="security">Security Staff</option>
                  <option value="admin">Higher Authority</option>
                </select>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500"
                  />
                  <span>Remember me on this device</span>
                </label>
                <button
                  type="button"
                  className="text-sky-400 hover:text-sky-300 transition-colors"
                  onClick={() => {
                    // Placeholder for future password reset flow
                    setError("Password reset is not wired for this demo.");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {error && (
                <div className="text-xs text-rose-300 bg-rose-950/40 border border-rose-500/40 rounded-lg px-3 py-2 shadow-glow-danger">
                  {error}
                </div>
              )}

              <CyberButton
                type="submit"
                className="w-full mt-1"
                leftIcon={UserCircle2}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in to Dashboard"}
              </CyberButton>
            </form>

            <p className="mt-4 text-[11px] text-slate-400">
              This is a frontend-only prototype using mock data. Actions like
              Suspend, Verify, etc. update local state only to demonstrate flows.
            </p>
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
