import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  X, 
  CheckCircle2, 
  LockKeyhole, 
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api';

export default function AuthPage({ mode = 'signup', onSwitchMode, onBackToOverview, onAuthSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: mode === 'login' ? 'alex.mercer@institution.org' : '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
    rememberMe: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [uiState, setUiState] = useState('normal'); // 'normal' | 'focus' | 'show-password' | 'error' | 'loading'
  const [errorMessage, setErrorMessage] = useState('Invalid organizational credentials or unrecognized security key.');
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute password strength
  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (pwd.length >= 12) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uiState === 'loading') return;

    setUiState('loading');
    setErrorMessage('');

    try {
      if (mode === 'signup') {
        await api.auth.register({
          name: formData.fullName || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password
        });
      } else {
        await api.auth.login({
          email: formData.email,
          password: formData.password
        });
      }

      setUiState('normal');
      setIsSuccess(true);
      if (onAuthSuccess) {
        setTimeout(() => {
          onAuthSuccess();
        }, 500);
      }
    } catch (err) {
      setUiState('error');
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleStateInspector = (state) => {
    setUiState(state);
    if (state === 'show-password') {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
        <div className="h-16 max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={onBackToOverview}
            className="flex items-center gap-3 focus:outline-none group cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center text-slate-900 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="44" stroke="#1E293B" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.4" />
                <path d="M18 50C28 34 72 34 82 50C72 66 28 66 18 50Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="14" fill="#2563EB" />
                <circle cx="50" cy="50" r="6" fill="#F8FAFC" />
                <circle cx="54" cy="46" r="2.5" fill="#60A5FA" />
                <path d="M50 20V26M50 74V80M20 50H26M74 50H80" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">
              GuruDev
            </span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <button
              onClick={onBackToOverview}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium cursor-pointer"
            >
              Back to Overview
            </button>
            <button
              onClick={() => onSwitchMode(mode === 'login' ? 'signup' : 'login')}
              className="text-slate-600 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold text-xs shadow-xs">
              <User className="w-4 h-4 text-slate-200" />
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Split-Card Shell */}
        <div className="w-full max-w-[1240px] bg-white rounded-3xl shadow-xl shadow-slate-900/5 border border-slate-200/90 flex flex-col lg:flex-row overflow-hidden">
          
          {/* ================= LEFT COLUMN: BRAND & COGNITIVE GATEWAY ================= */}
          <div className="lg:w-[48%] bg-gradient-to-br from-[#06102b] via-[#1c2541] to-[#0b132b] p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative text-white">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
              {/* Top Status Badges */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 font-mono text-xs uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Critical Thinking Companion
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 text-slate-300 font-mono text-xs tracking-wider">
                  {mode === 'login' ? 'SESSION GATEWAY • V4.2' : 'NODE V4.2'}
                </span>
              </div>

              {/* Brand Entity */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl p-1 bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" stroke="#475569" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.6" />
                    <path d="M18 50C28 34 72 34 82 50C72 66 28 66 18 50Z" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="50" cy="50" r="14" fill="#3B82F6" />
                    <circle cx="50" cy="50" r="6" fill="#F8FAFC" />
                    <circle cx="54" cy="46" r="2.5" fill="#93C5FD" />
                    <path d="M50 20V26M50 74V80M20 50H26M74 50H80" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-bold text-xl tracking-tight text-white leading-none">GuruDev</h2>
                  <p className="text-xs text-blue-200/80 mt-1">Cognitive Bias & Assumption Illumination</p>
                </div>
              </div>

              {/* Main Narrative Heading */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {mode === 'login' ? (
                    <>
                      Welcome Back to a{' '}
                      <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                        Clearer Perspective.
                      </span>
                    </>
                  ) : (
                    <>
                      Start Seeing Beyond{' '}
                      <span className="bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                        the Obvious.
                      </span>
                    </>
                  )}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
                  {mode === 'login'
                    ? 'Continue exploring your high-stakes decisions, systematically challenging implicit premises, and unearthing what intuition quietly conceals.'
                    : 'Create your secure account to dismantle blind spots, expose latent heuristics, and reconstruct high-stakes decisions with analytical rigor.'}
                </p>
              </div>

              {/* Embedded Visual Perception Filter Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl p-3 sm:p-4 group">
                <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={mode === 'login' ? '/images/auth-login-visual.jpg' : '/images/auth-signup-visual.jpg'}
                    alt="Cognitive perspective visual"
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06102b] via-[#06102b]/40 to-transparent flex flex-col justify-between p-3.5">
                    <span className="self-start px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-300 font-mono text-[11px] font-semibold tracking-wider">
                      PERCEPTION FILTER: ACTIVE
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-xs sm:text-sm font-semibold text-white italic">
                        {mode === 'login'
                          ? '“Think beyond the obvious.” — Socratic dialectic engine ready.'
                          : '“Better questions lead to better understanding.”'}
                      </p>
                      {mode === 'signup' && (
                        <p className="text-[11px] text-slate-300">
                          Systemic cognitive deconstruction, premise interrogation & bias surfacing.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance & Compliance Row */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-2 py-3 bg-white/5 rounded-xl px-2 backdrop-blur-md text-center">
                <div>
                  <div className="font-bold text-lg sm:text-xl text-cyan-300">48+</div>
                  <div className="text-[11px] text-slate-300 font-mono mt-0.5">Biases Mapped</div>
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-xl text-indigo-200">100%</div>
                  <div className="text-[11px] text-slate-300 font-mono mt-0.5">Logic Traced</div>
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-xl text-white">0-Logs</div>
                  <div className="text-[11px] text-slate-300 font-mono mt-0.5">Encrypted Core</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-slate-300 font-mono text-[11px] mt-3 px-1 gap-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  SOC 2 Type II
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  Zero-Retention Mode
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  Human Autonomy
                </span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE AUTHENTICATION ================= */}
          <div className="lg:w-[52%] bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="w-full max-w-md mx-auto">
              
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600 font-mono text-xs font-semibold tracking-wider uppercase">
                  {mode === 'login' ? 'AUTHENTICATION PORTAL' : 'REGISTRATION PORTAL'}
                </span>
                <span className="text-slate-500 font-mono text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Node Gateway 01
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {mode === 'login' ? 'Welcome Back' : 'Create your account'}
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  {mode === 'login'
                    ? 'Log in to continue your thinking journey.'
                    : 'Join GuruDev and challenge your unspoken analytical assumptions.'}
                </p>
              </div>

              {/* Error Alert Box (Toggleable via state) */}
              {uiState === 'error' && (
                <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1 text-xs">
                    <p className="font-semibold text-red-800">Authentication Failed</p>
                    <p className="text-red-700/90 mt-0.5">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUiState('normal')}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Success Notification */}
              {isSuccess && (
                <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold">Credential Handshake Successful!</p>
                    <p className="text-emerald-700 mt-0.5">
                      Session verified. Ready to connect to your production backend.
                    </p>
                  </div>
                </div>
              )}

              {/* Google SSO Button */}
              <button
                type="button"
                onClick={() => alert('Google Single Sign-On initialized.')}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-sm font-medium transition-all shadow-xs active:scale-[0.99] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="w-full h-px bg-slate-200" />
                <span className="absolute px-3 bg-white text-slate-600 font-mono text-[11px] uppercase tracking-wider">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name (Sign Up only) */}
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Dr. Julian Vance"
                        required
                        className={`w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:bg-white ${
                          uiState === 'focus' ? 'border-blue-600 ring-2 ring-blue-600/20' : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-700">
                      {mode === 'signup' ? 'Create Master Password' : 'Password'}
                    </label>
                    {mode === 'signup' && (
                      <span className="text-[11px] font-mono text-blue-600 font-medium">
                        {strengthScore >= 3 ? 'Strong Security' : strengthScore >= 2 ? 'Adequate Security' : 'Basic Security'}
                      </span>
                    )}
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Password recovery link sent.')}
                        className="text-xs text-blue-600 hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Checklist (Sign Up) */}
                  {mode === 'signup' && (
                    <div className="pt-1.5 space-y-1.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        <div className={`h-1 rounded-full ${strengthScore >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                        <div className={`h-1 rounded-full ${strengthScore >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                        <div className={`h-1 rounded-full ${strengthScore >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                        <div className={`h-1 rounded-full ${strengthScore >= 4 ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 pt-0.5">
                        <span className={`flex items-center gap-1 ${formData.password.length >= 8 ? 'text-emerald-600 font-medium' : ''}`}>
                          <Check className="w-3 h-3" /> 8+ chars
                        </span>
                        <span className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) && /[0-9]/.test(formData.password) ? 'text-emerald-600 font-medium' : ''}`}>
                          <Check className="w-3 h-3" /> 1 uppercase & numeral
                        </span>
                        <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-emerald-600 font-medium' : ''}`}>
                          <Check className="w-3 h-3" /> 1 symbol (#, $, !)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password (Sign Up) */}
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockKeyhole className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••••••••••••••"
                        required
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                      />
                      {formData.confirmPassword && formData.confirmPassword === formData.password && (
                        <Check className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                )}

                {/* Checkbox Rows */}
                {mode === 'signup' ? (
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600 cursor-pointer"
                      required
                    />
                    <label htmlFor="agreeTerms" className="text-xs text-slate-600 leading-snug">
                      I agree to the <a href="#" className="text-blue-600 underline">Terms of Analytical Service</a>, the <a href="#" className="text-blue-600 underline">Data Sovereignty Charter</a>, and consent to end-to-end cognitive telemetry encryption.
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-600 cursor-pointer"
                      />
                      <span>Remember Me</span>
                    </label>
                    <span className="font-mono text-slate-600">TLS 1.3 Active</span>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={uiState === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                >
                  {uiState === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Cryptographic Tokens...</span>
                    </span>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Log In' : 'Initialize Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Switch link */}
                <div className="text-center pt-2">
                  {mode === 'login' ? (
                    <button
                      type="button"
                      onClick={() => onSwitchMode('signup')}
                      className="text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer"
                    >
                      Don't have an account? <span className="text-blue-600 font-semibold underline">Sign Up →</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSwitchMode('login')}
                      className="text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer"
                    >
                      Already equipped with credentials? <span className="text-blue-600 font-semibold underline">Log In →</span>
                    </button>
                  )}
                </div>

              </form>

              {/* Status bar */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  SSL 256-Bit Channel
                </span>
                <span>Latency 12ms</span>
              </div>

              {/* UI State Inspector (from Stitch Prototype) */}
              <div className="mt-6 pt-4 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-2">
                  <span>UI STATE INSPECTOR</span>
                  <span className="text-blue-600">Interactive Prototype</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Normal', key: 'normal' },
                    { label: 'Active Focus', key: 'focus' },
                    { label: 'Show Password', key: 'show-password' },
                    { label: 'Error Alert', key: 'error' },
                    { label: 'Loading State', key: 'loading' }
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      type="button"
                      onClick={() => handleStateInspector(btn.key)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                        uiState === btn.key
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 3. Footer Bar */}
      <footer className="py-4 border-t border-slate-200 text-xs text-slate-600 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © 2026 GuruDev. Rigorous cognitive illumination.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
