import React from 'react';
import { Search, Bell, Sun, Moon, Settings, ArrowLeft, Menu } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function TopBar({ onOpenMobileSidebar, onBackToLanding, activeTab, setActiveTab, currentUser = null }) {
  const { theme, toggleTheme } = useTheme();
  const initials = currentUser?.name
    ? currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'AM';

  return (
    <header className="sticky top-0 z-30 h-16 sm:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors flex items-center justify-between px-4 sm:px-8">
      {/* Mobile Hamburger & Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-bold text-base text-slate-900 dark:text-white">GuruDev</span>
      </div>

      {/* Search Input (Desktop) */}
      <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-lg bg-slate-100/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-2xs">
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
        <input
          type="text"
          placeholder="Search analyses, cognitive models, decisions..."
          className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </div>

      {/* Right Controls: Theme Toggle, Notifications, Profile, Back Link */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Back to Landing Page link */}
        <button
          onClick={onBackToLanding}
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Landing</span>
        </button>

        {/* Theme Toggle Button (Light/Dark Mode) */}
        <button
          onClick={toggleTheme}
          type="button"
          className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all cursor-pointer shadow-2xs flex items-center gap-2"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-300" />
              <span className="hidden sm:inline text-xs font-mono font-medium text-slate-200">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-300" />
              <span className="hidden sm:inline text-xs font-mono font-medium text-slate-700">Dark</span>
            </>
          )}
        </button>

        {/* Notification Bell */}
        <button
          type="button"
          onClick={() => alert('No unread notifications. All 38 blind spots verified.')}
          className="relative p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Quick Settings Icon */}
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Avatar Chip */}
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2 pl-1 cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            {initials}
          </div>
        </button>

      </div>
    </header>
  );
}
