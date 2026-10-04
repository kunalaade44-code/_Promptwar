import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ShieldCheck, Mail, Lock, User } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'analysis' }) {
  const [internalMode, setInternalMode] = useState(null);
  const [decisionText, setDecisionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentMode = internalMode || initialMode;

  const handleSwitchMode = (newMode) => {
    setInternalMode(newMode);
    setIsSubmitted(false);
  };

  const handleClose = () => {
    setInternalMode(null);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0b1224] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden transform animate-in zoom-in-95 duration-200 text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors z-20 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-[#080d1d] border-b border-slate-800/80">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base text-white">
              GuruDev
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {currentMode === 'analysis' && 'Start Your Decision Analysis'}
            {currentMode === 'login' && 'Welcome Back'}
            {currentMode === 'signup' && 'Create Your Account'}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {currentMode === 'analysis' && 'Submit a dilemma or question to explore overlooked angles.'}
            {currentMode === 'login' && 'Log in to access your saved decision journals and insights.'}
            {currentMode === 'signup' && 'Join GuruDev to elevate your critical thinking today.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {currentMode === 'analysis' ? (
            <div>
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Decision Reasoning Captured!</h4>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Your dilemma is saved and analyzed with zero-retention privacy principles.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (decisionText.trim()) {
                      setIsSubmitted(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="decision-input" className="block text-sm font-semibold text-slate-300 mb-1.5">
                      What decision are you currently weighing?
                    </label>
                    <textarea
                      id="decision-input"
                      rows={4}
                      value={decisionText}
                      onChange={(e) => setDecisionText(e.target.value)}
                      placeholder="e.g. Should I accept this 6-month internship offer or focus on academics? What blind spots could I be missing?"
                      className="w-full px-3.5 py-2.5 text-sm text-white bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/30 transition-colors cursor-pointer"
                  >
                    <span>Analyze Blind Spots</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-xs text-slate-500 pt-1">
                    Free instant preview • Zero data retention
                  </p>
                </form>
              )}
            </div>
          ) : (
            <div>
              {/* Login / Signup form placeholders */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`${currentMode === 'login' ? 'Log In' : 'Sign Up'} initialized.`);
                  handleClose();
                }}
                className="space-y-3.5"
              >
                {currentMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Alex Mercer"
                        required
                        className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="email"
                      placeholder="alex@institution.org"
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  {currentMode === 'login' ? 'Sign In' : 'Create Free Account'}
                </button>

                <div className="text-center pt-2">
                  {currentMode === 'login' ? (
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('signup')}
                      className="text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Don't have an account? Sign up
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('login')}
                      className="text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Already have an account? Log in
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
