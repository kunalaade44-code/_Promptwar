import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Brain, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Sparkles,
  Home
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onLogout, onBackToLanding, isOpenMobile, onCloseMobile }) {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-analysis', label: 'New Analysis', icon: PlusCircle, badge: 'Active' },
    { id: 'my-decisions', label: 'My Decisions', icon: Brain },
    { id: 'settings', label: 'Profile & Settings', icon: Settings },
  ];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 z-50 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top: Logo & Main Navigation */}
        <div className="flex flex-col">
          {/* Logo Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-900 dark:text-white">
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="44" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.4" />
                  <path d="M18 50C28 34 72 34 82 50C72 66 28 66 18 50Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="14" fill="#2563EB" />
                  <circle cx="50" cy="50" r="6" fill="#F8FAFC" />
                  <circle cx="54" cy="46" r="2.5" fill="#60A5FA" />
                  <path d="M50 20V26M50 74V80M20 50H26M74 50H80" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                  GuruDev
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  AI Thinking Companion
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-5">
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (activeTab === 'analysis-result' && item.id === 'my-decisions');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Socratic Prompt Widget */}
            <div className="mt-8 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Dialectic Status</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Perception filter calibrated. Zero-bias mode active.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Support, Theme, User Chip */}
        <div className="px-4 pb-6 space-y-3">
          {/* Help & Exit Links */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onBackToLanding()}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Back to Landing Page</span>
            </button>
            <button
              onClick={() => alert('GuruDev Help & Support: Our dialectic assistant is available 24/7.')}
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help & Support</span>
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                AM
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">Alex Mercer</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">alex@institution.org</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
