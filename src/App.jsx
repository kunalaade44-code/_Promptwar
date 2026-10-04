import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Overview from './components/Overview';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AuthPage from './components/AuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'signup' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('dashboard');
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'analysis'
  });

  // Synchronize view and active tab with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'login' || hash === 'signup') {
        setCurrentView(hash);
      } else if (hash === 'dashboard') {
        setCurrentView('dashboard');
        setDashboardTab('dashboard');
      } else if (hash === 'new-analysis') {
        setCurrentView('dashboard');
        setDashboardTab('new-analysis');
      } else if (hash === 'my-decisions' || hash === 'analysis' || hash === 'analysis-result') {
        setCurrentView('dashboard');
        setDashboardTab('analysis-result');
      } else if (hash === 'settings') {
        setCurrentView('dashboard');
        setDashboardTab('settings');
      } else {
        setCurrentView('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToAuth = (mode) => {
    window.location.hash = mode;
    setCurrentView(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = (tab = 'dashboard') => {
    window.location.hash = tab;
    setDashboardTab(tab);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    window.location.hash = '';
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = () => {
    // Navigate straight to the interactive analysis studio
    navigateToDashboard('new-analysis');
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ThemeProvider>
      {/* 1. Dashboard View (Post-Login Experience with Light & Dark Theme) */}
      {currentView === 'dashboard' ? (
        <DashboardLayout
          initialTab={dashboardTab}
          onLogout={() => navigateToLanding()}
          onBackToLanding={navigateToLanding}
        />
      ) : currentView === 'login' || currentView === 'signup' ? (
        /* 2. Authentication View (Dedicated Split-Card Stitch Design) */
        <AuthPage
          mode={currentView}
          onSwitchMode={(newMode) => navigateToAuth(newMode)}
          onBackToOverview={navigateToLanding}
          onAuthSuccess={() => navigateToDashboard('dashboard')}
        />
      ) : (
        /* 3. Public Landing Page */
        <div className="min-h-screen bg-[#070c18] text-slate-100 font-sans flex flex-col selection:bg-blue-600 selection:text-white transition-colors duration-200">
          {/* Header Navbar */}
          <Navbar 
            onOpenAuth={navigateToAuth}
            onOpenDashboard={() => navigateToDashboard('dashboard')}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Hero section with three-slide image carousel */}
            <Hero onStartAnalysis={handleStartAnalysis} />

            {/* Overview section */}
            <Overview />

            {/* How It Works section */}
            <HowItWorks onStartAnalysis={handleStartAnalysis} />
          </main>

          {/* Footer */}
          <Footer onOpenAuth={navigateToAuth} />

          {/* Accessible Interactive Modal */}
          <AuthModal
            isOpen={modalState.isOpen}
            onClose={handleCloseModal}
            initialMode={modalState.mode}
          />
        </div>
      )}
    </ThemeProvider>
  );
}
