import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Sun, 
  Bell, 
  Trash2, 
  Download, 
  LogOut, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsView({ onLogout, currentUser = null }) {
  const { theme, setTheme } = useTheme();

  const [profile, setProfile] = useState({
    fullName: currentUser?.name || 'Alex Mercer',
    email: currentUser?.email || 'alex@institution.org',
    persona: 'Principal AI Systems Architect'
  });

  const [notifications, setNotifications] = useState({
    reflections: true,
    insights: true,
    updates: false
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Header */}
      <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>Dashboard</span>
          <span>/</span>
          <span>Settings</span>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Profile & Account</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Profile & Settings
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Manage your account credentials, personalize your thinking workspace, and configure theme preferences.
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-semibold">
            ● Vault: STAT-742 Hardware Secured
          </span>
        </div>
      </div>

      {/* Main Grid: Left Settings (8 cols) + Right Vault Info (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Appearance & Interface Card (Theme switcher) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Appearance & Interface
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Customize how GuruDev renders models, contrast densities, and visual themes.
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Theme Choice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Light Mode Card */}
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  theme === 'light'
                    ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/40 dark:bg-slate-700/80'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <div className="h-16 rounded-xl bg-slate-100 border border-slate-200/80 p-2 flex flex-col justify-between mb-3 shadow-inner">
                  <div className="w-1/2 h-2 rounded bg-slate-300" />
                  <div className="space-y-1">
                    <div className="w-3/4 h-1.5 rounded bg-slate-300" />
                    <div className="w-1/3 h-1.5 rounded bg-blue-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Light Mode</span>
                  {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Sharp optical daylight palette.
                </p>
              </button>

              {/* Dark Mode Card */}
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  theme === 'dark'
                    ? 'border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/40 dark:bg-slate-700/80'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <div className="h-16 rounded-xl bg-[#0b132b] border border-slate-800 p-2 flex flex-col justify-between mb-3 shadow-inner">
                  <div className="w-1/2 h-2 rounded bg-slate-700" />
                  <div className="space-y-1">
                    <div className="w-3/4 h-1.5 rounded bg-slate-700" />
                    <div className="w-1/3 h-1.5 rounded bg-cyan-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</span>
                  {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  High-contrast obsidian theme.
                </p>
              </button>

              {/* System Default */}
              <button
                type="button"
                onClick={() => {
                  const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  setTheme(sysDark ? 'dark' : 'light');
                }}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-left transition-all cursor-pointer"
              >
                <div className="h-16 rounded-xl bg-gradient-to-r from-slate-100 to-[#0b132b] border border-slate-200 dark:border-slate-700 p-2 flex flex-col justify-between mb-3 shadow-inner">
                  <div className="w-1/2 h-2 rounded bg-slate-400" />
                  <div className="w-1/3 h-1.5 rounded bg-blue-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">System Default</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Syncs with OS preferences.
                </p>
              </button>
            </div>
          </div>

          {/* Personal Profile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Personal Profile
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Update your public display information and organizational contact email.
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
              <div className="flex items-center gap-4 pb-2">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  AM
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => alert('Avatar upload dialog ready.')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    JPG, PNG or SVG under 5MB. Visual markers are rendered in encrypted local cache.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">● Verified</span>
                  </div>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Thinking Persona / Role (Used to calibrate dialectic counter-arguments)
                </label>
                <input
                  type="text"
                  value={profile.persona}
                  onChange={(e) => setProfile({ ...profile, persona: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {isSaved && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Account Security & Credentials */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Account Security & Credentials
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Manage password, hardware tokens, and active zero-trust authentication states.
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                FIPS-140 Active
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Credential Posture: Optimal</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Password changed 12 days ago • 2FA Active (Hardware Key FIDO2)</span>
              </div>
              <button
                type="button"
                onClick={() => alert('Manage hardware security keys dialog.')}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Manage Keys
              </button>
            </div>
          </div>

          {/* Notifications & Socratic Cadence */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Notifications & Socratic Cadence
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Choose how and when GuruDev reaches out with dialectic catalysts.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Reflection Reminders</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Weekly prompt notification to revisit pending decisions and examine cognitive drift over time.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications((prev) => ({ ...prev, reflections: !prev.reflections }))}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifications.reflections ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notifications.reflections ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Dialectic Catalysts & Insights</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Notifications when new blind spot models, contrarian theses, or bias analysis runs are ready.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications((prev) => ({ ...prev, insights: !prev.insights }))}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifications.insights ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notifications.insights ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Product Updates & Changelog</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Periodic architectural notes regarding reasoning engines and expanded mental frameworks.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications((prev) => ({ ...prev, updates: !prev.updates }))}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    notifications.updates ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notifications.updates ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Sign Out Card */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sign Out of Current Session</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Signing out will lock your local encrypted session cache and require re-authentication.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Rail (4 cols): Privacy & Data Vault */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                Privacy & Data Vault
              </span>
              <span className="text-[10px] font-mono text-emerald-600">Air-Gapped</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              GuruDev is engineered on zero-retention principles. Your decisions and reasoning vectors are strictly air-gapped from commercial foundation model training.
            </p>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => alert('Exporting decision vault archive (JSON + PDF).')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-blue-600" />
                  <span>Export Data Vault</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">.JSON / .PDF</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Clear history dialog.')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Clear History...</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">&gt;</span>
              </button>
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 space-y-1">
              <div>KEY FINGERPRINT: <span className="text-blue-600 font-bold">ED25519</span></div>
              <div className="truncate text-slate-400">e0:fc:9a:12:bc:83:d1:01...</div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold block">
              Active Trusted Sessions
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">macOS • Chrome 134.0</span>
                  <span className="text-[10px] text-slate-500 font-mono">Zurich, Switzerland</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-[10px] font-bold">
                  Now
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
