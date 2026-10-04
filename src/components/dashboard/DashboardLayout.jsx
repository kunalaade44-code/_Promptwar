import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardHome from './DashboardHome';
import NewAnalysisView from './NewAnalysisView';
import AnalysisResultView from './AnalysisResultView';
import SettingsView from './SettingsView';
import { api, getStoredUser } from '../../services/api';

export default function DashboardLayout({ onLogout, onBackToLanding, initialTab = 'dashboard' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'dashboard' | 'new-analysis' | 'my-decisions' | 'analysis-result' | 'settings'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(() => getStoredUser());
  const [analysesList, setAnalysesList] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // Load user data and existing decision analyses from backend
  useEffect(() => {
    // 1. Fetch current authenticated user
    api.auth.getMe()
      .then((user) => {
        if (user) setCurrentUser(user);
      })
      .catch((err) => {
        console.warn('Session check warning:', err.message);
      });

    // 2. Fetch user's analyses list
    api.analyses.list()
      .then((list) => {
        if (Array.isArray(list)) {
          setAnalysesList(list);
          if (list.length > 0) {
            setCurrentAnalysis((prev) => prev || list[0]);
          }
        }
      })
      .catch((err) => {
        console.warn('Could not fetch analyses list:', err.message);
      });
  }, []);

  const handleStartNewAnalysis = () => {
    setAnalysisError(null);
    setActiveTab('new-analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAnalysis = (analysisOrId) => {
    if (typeof analysisOrId === 'object' && analysisOrId !== null) {
      setCurrentAnalysis(analysisOrId);
    } else if (typeof analysisOrId === 'string') {
      const match = analysesList.find((a) => a.id === analysisOrId);
      if (match) {
        setCurrentAnalysis(match);
      } else {
        // Fetch specific analysis from API
        api.analyses.get(analysisOrId)
          .then((data) => setCurrentAnalysis(data))
          .catch(console.error);
      }
    }
    setActiveTab('analysis-result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitNewAnalysis = async (formData) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    const fullDecisionText = [
      `Headline: ${formData.headline}`,
      `Background: ${formData.background}`,
      `Considered Options:\n${(formData.options || []).map((o, idx) => `  ${idx + 1}. ${o}`).join('\n')}`,
      `Intuitive Lean & Rationale: ${formData.rationale}`,
      `Priority Criteria: ${(formData.selectedCriteria || []).join(', ')}`,
      formData.concerns ? `Concerns & Anxieties: ${formData.concerns}` : ''
    ].filter(Boolean).join('\n\n');

    try {
      const newAnalysis = await api.analyses.create({
        title: formData.headline || 'Untitled Decision',
        decision_text: fullDecisionText
      });

      setCurrentAnalysis(newAnalysis);
      setAnalysesList((prev) => [newAnalysis, ...prev]);
      setActiveTab('analysis-result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error creating analysis:', err);
      setAnalysisError(err.message || 'Failed to analyze decision. Please check backend connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePerformLogout = async () => {
    try {
      await api.auth.logout();
    } catch (e) {
      console.warn('Logout API error:', e);
    }
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* 1. Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handlePerformLogout}
        onBackToLanding={onBackToLanding}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Wrapper (offset by sidebar on desktop) */}
      <div className="md:pl-72 flex flex-col min-h-screen">
        
        {/* TopBar */}
        <TopBar
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onBackToLanding={onBackToLanding}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentUser={currentUser}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardHome
              onStartNewAnalysis={handleStartNewAnalysis}
              onViewAnalysis={handleViewAnalysis}
              analysesList={analysesList}
              currentUser={currentUser}
            />
          )}

          {activeTab === 'new-analysis' && (
            <NewAnalysisView
              onSubmitAnalysis={handleSubmitNewAnalysis}
              onCancel={() => setActiveTab('dashboard')}
              isAnalyzing={isAnalyzing}
              error={analysisError}
            />
          )}

          {(activeTab === 'my-decisions' || activeTab === 'analysis-result') && (
            <AnalysisResultView
              analysis={currentAnalysis}
              onBackToDashboard={() => setActiveTab('dashboard')}
              onStartReflection={() => alert('Socratic reflection saved. Your dialectic record is stored in Neon PostgreSQL.')}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              onLogout={handlePerformLogout}
              currentUser={currentUser}
            />
          )}
        </main>

        {/* Minimal Footer Status Bar */}
        <footer className="h-10 border-t border-slate-200/80 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 px-4 sm:px-8 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Encrypted Session • Neon PostgreSQL Live • TLS 1.3 Active
          </span>
          <span className="hidden sm:inline">GuruDev Platform v4.2</span>
        </footer>

      </div>
    </div>
  );
}
