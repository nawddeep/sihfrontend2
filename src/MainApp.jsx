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
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let role = detectRoleFromId(userId);
    if (!role && manualRole !== "auto") {
      role = manualRole;
    }

    if (!userId || !password) {
      setError("Please enter both User ID and Password.");
      return;
    }
    if (!role) {
      setError(
        "Could not infer role. Use ID prefixes STU / CEN / SEC / ADM or select a role manually."
      );
      return;
    }

    onLogin({
      id: userId,
      name: "Demo User",
      role,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 border border-slate-700/60 text-xs font-medium text-sky-300">
            <Shield className="w-4 h-4" />
            Smart India Hackathon — Prototype
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
            Fake Degree & Exam Security
            <span className="block text-sky-400">
              Unified Verification Platform
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-md">
            One login, multiple roles. Seamlessly switch between Student,
            Centre, Security, and Higher Authority dashboards with live mock
            analytics and fraud monitoring.
          </p>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-3">
              <div className="flex items-center gap-2 text-sky-300 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>Academic</span>
              </div>
              <p className="text-slate-400">
                Instant cross-check of uploaded degrees & certificates.
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-3">
              <div className="flex items-center gap-2 text-emerald-300 mb-1">
                <Building2 className="w-4 h-4" />
                <span>Centres</span>
              </div>
              <p className="text-slate-400">
                Biometric logs, attendance and fraud heatmaps.
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-3">
              <div className="flex items-center gap-2 text-rose-300 mb-1">
                <Siren className="w-4 h-4" />
                <span>Security</span>
              </div>
              <p className="text-slate-400">
                Camera feeds, device health and fraud alerts in one view.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl shadow-xl shadow-sky-900/20 p-6 md:p-8 backdrop-blur">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/40">
              <Shield className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Unified SIH Verification Login
              </h2>
              <p className="text-xs text-slate-400">
                Use demo IDs like STU123, CEN001, SEC007, ADM999
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g., STU2025A001 / CEN-MH-23"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 flex justify-between">
                <span>Role (Optional Override)</span>
                <span className="text-[10px] text-slate-500">
                  Auto-detected from prefix if set to Auto
                </span>
              </label>
              <select
                value={manualRole}
                onChange={(e) => setManualRole(e.target.value)}
                className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                <option value="auto">Auto detect from User ID</option>
                <option value="student">Student</option>
                <option value="centre_staff">Centre / Institute Staff</option>
                <option value="security">Security Staff</option>
                <option value="admin">Higher Authority</option>
              </select>
            </div>

            {error && (
              <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/40 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-sm font-medium text-slate-950 py-2.5 mt-1 transition-colors"
            >
              <UserCircle2 className="w-4 h-4" />
              Sign in to Dashboard
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            This is a frontend-only prototype using mock data. Actions like
            Suspend, Verify etc. update local state to demonstrate flows.
          </p>
        </div>
      </div>
    </div>
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
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      <aside className="hidden md:flex w-60 flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/90">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/40">
            <Shield className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-xs tracking-wide text-sky-300">
              SIH Prototype
            </div>
            <div className="text-sm font-semibold leading-tight">
              Degree & Exam Security
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 text-xs space-y-1">
          <div className="px-2 text-slate-500 uppercase tracking-wide mb-1">
            Current Role
          </div>
          <button className="w-full flex items-center gap-2 rounded-lg bg-sky-500/10 border border-sky-500/40 px-3 py-2 text-[13px] text-sky-100">
            <Icon className="w-4 h-4" />
            <span>{dashboardTitle}</span>
          </button>
          <div className="mt-4 px-2 text-slate-500 uppercase tracking-wide mb-1">
            Quick Context
          </div>
          <div className="space-y-1">
            <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-[11px] text-slate-300">
              <span className="font-semibold text-sky-300">Live Mock Mode</span>
              <br />
              Data, fraud alerts and verifications are simulated.
            </div>
            <div className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-[11px] text-slate-300">
              <span className="font-semibold text-emerald-300">Role Routing</span>
              <br />
              Single SPA with conditional dashboards.
            </div>
          </div>
        </nav>
        <div className="border-t border-slate-800 px-4 py-3 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-800/80 flex items-center justify-center">
              <UserCircle2 className="w-4 h-4 text-slate-200" />
            </div>
            <div>
              <div className="font-medium truncate max-w-[110px]">
                {user.id}
              </div>
              <div className="text-[10px] text-slate-400">
                {roleLabels[user.role]}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-sky-400 md:hidden" />
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">
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
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] md:text-xs text-slate-200 hover:border-rose-500/70 hover:text-rose-300"
          >
            <LogOut className="w-3 h-3" />
            <span>Logout</span>
          </button>
        </header>
        <div className="flex-1 overflow-auto bg-gradient-to-b from-slate-950 to-slate-900">
          {dashboard}
        </div>
      </main>
    </div>
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
