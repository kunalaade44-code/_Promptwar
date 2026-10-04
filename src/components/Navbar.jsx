import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenAuth, onOpenDashboard }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070c18]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-slate-800/80 py-3.5'
          : 'bg-[#070c18]/80 backdrop-blur-md border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo + Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
              <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
                <path d="M18 50C28 34 72 34 82 50C72 66 28 66 18 50Z" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="14" fill="#2563EB" />
                <circle cx="50" cy="50" r="6" fill="#FFFFFF" />
                <circle cx="54" cy="46" r="2.5" fill="#60A5FA" />
                <path d="M50 20V26M50 74V80M20 50H26M74 50H80" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                GuruDev
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('overview')}
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
            >
              Log In
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 transition-all duration-200 cursor-pointer"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#070c18]/95 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            <button
              onClick={() => scrollToSection('overview')}
              className="text-left px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
            >
              How It Works
            </button>
            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDashboard) onOpenDashboard();
                  else onOpenAuth('dashboard');
                }}
                className="w-full text-center py-2.5 text-sm font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/60 hover:bg-blue-900/50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch App / Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="w-full text-center py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 rounded-xl transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xs transition-colors"
              >
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
