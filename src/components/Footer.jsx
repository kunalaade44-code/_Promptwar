import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function Footer({ onOpenAuth }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-[#0a0f24] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle background ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white">
                <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="44" stroke="#475569" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
                  <path d="M18 50C28 34 72 34 82 50C72 66 28 66 18 50Z" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="50" r="14" fill="#3B82F6" />
                  <circle cx="50" cy="50" r="6" fill="#F8FAFC" />
                  <circle cx="54" cy="46" r="2.5" fill="#93C5FD" />
                  <path d="M50 20V26M50 74V80M20 50H26M74 50H80" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                GuruDev
              </span>
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Helping you see beyond the obvious and think more critically.
            </p>

            <div className="pt-2 text-xs font-medium text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="italic">"Think beyond the obvious."</span>
            </div>
          </div>

          {/* Col 2: Explore Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection('overview')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Account Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Back to top & Mission (lg:col-span-2) */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 GuruDev. All rights reserved.
          </div>
          <div className="text-slate-400 font-medium">
            Think beyond the obvious.
          </div>
        </div>

      </div>
    </footer>
  );
}
