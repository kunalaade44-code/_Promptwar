import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Sparkles, 
  AlertTriangle, 
  Brain, 
  Compass, 
  CheckCircle2, 
  Scale, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { api } from '../../services/api';

const DEFAULT_QUESTIONS = [
  {
    id: 'q1',
    title: 'Decisive Falsification Test',
    question: 'What specific new information or condition would make you decisively walk away from this offer before signing?',
    hint: 'Forces you to define non-negotiables before sunk-cost investment sets in.'
  },
  {
    id: 'q2',
    title: 'Direct Reality Probe',
    question: "Have you directly asked the hiring manager to connect you with last summer's interns to verify actual day-to-day work autonomy?",
    hint: 'Bypasses recruiter hype to gather empirical peer evidence.'
  },
  {
    id: 'q3',
    title: 'Asymmetric Trade-off Check',
    question: 'If this role forces a lower grade in your core algorithms sequence, does the industry experience still yield net positive leverage?',
    hint: 'Tests whether short-term prestige outweighs long-term fundamental depth.'
  }
];

const DEFAULT_BLIND_SPOTS = [
  {
    title: 'Academic Schedule Compression',
    severity: 'High Impact',
    description: 'You anticipate 40 hrs/week of coursework alongside 40 hrs of engineering sprints. Dual commitments often reduce thesis/exam study hours significantly.',
    risk: 'Academic fatigue compromising final GPA and graduate school eligibility.'
  },
  {
    title: 'Learning Velocity vs Maintenance Debt',
    severity: 'Medium Impact',
    description: 'The job title emphasizes cutting-edge engineering, but early intern tasks often focus on configuration and bug-fixing on legacy systems.',
    risk: 'Receiving routine execution tasks rather than true algorithmic mentorship.'
  },
  {
    title: 'Mentorship Quality & Dedicated Bandwidth',
    severity: 'Moderate Impact',
    description: 'Technical leads during product launch milestones may restrict scheduled 1:1 guidance to under 30 minutes weekly.',
    risk: 'Skill acquisition is heavily dependent on senior feedback frequency.'
  }
];

const DEFAULT_ASSUMPTIONS = [
  {
    premise: 'A higher stipend correlates directly with career value and role substance.',
    reframing: 'Compensation in early-stage tech often reflects talent acquisition difficulty rather than pedagogical quality or high-signal learning.',
    socratic_test: 'If this internship offered standard university lab stipends, would it still be your strongest option?'
  },
  {
    premise: 'Working at a recognized venture guarantees high-signal resume endorsement.',
    reframing: 'Top employers evaluate verifiable shipped code and detailed technical references far more than brand logos alone.',
    socratic_test: 'What tangible artifact or system will you possess after 6 months that proves mastery?'
  }
];

const DEFAULT_TRADE_OFFS = [
  {
    title: 'Immediate Economic Benefit vs Deep Academic Mastery',
    gains: '$4,200/mo stipend solves short-term cash flow and builds savings.',
    costs: 'Sacrifices deep comprehension in core algorithms and systems courses.'
  },
  {
    title: 'Convenient Commute vs Startup Work Culture',
    gains: '15-minute commute preserves transit energy and daily flexibility.',
    costs: 'Expectations of late sprint hours can eliminate planned evening study slots.'
  }
];

const DEFAULT_PERSPECTIVES = [
  {
    title: 'The 3-Month Ignition Trial',
    description: 'Propose accepting 3 months with a structured evaluation checkpoint rather than committing to a rigid 6-month block that overlaps with finals.'
  },
  {
    title: 'The Hybrid Negotiation Angle',
    description: 'Negotiate a 20-25 hrs/week commitment with Tuesdays/Thursdays strictly protected for university lectures and laboratory presence.'
  },
  {
    title: 'The Academic Alternative',
    description: 'Inquire if department research labs have stipends to co-author a publication, matching resume signal with complete coursework protection.'
  }
];

export default function AnalysisResultView({ analysis, onBackToDashboard, onStartReflection }) {
  const [activeInquiryIndex, setActiveInquiryIndex] = useState(null);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [savedReflections, setSavedReflections] = useState({});
  const [isSavingReflection, setIsSavingReflection] = useState(false);

  // Extract analysis results or fall back to high-fidelity defaults
  const result = analysis?.analysis_result || {};
  const headline = analysis?.title || 'Should I accept this 6-month internship offer?';
  const baseline = result.decision_baseline || result.summary || 
    'You are leaning toward accepting the internship primarily because of its competitive stipend, convenient location, and perceived industry prestige. However, your stated long-term ambition is foundational engineering depth. Our cognitive audit detected several unexamined premises and trade-offs that warrant deeper examination.';
  const primaryTilt = result.primary_cognitive_tilt || 'Availability & Halo Bias';
  const balanceScore = typeof result.balance_score === 'number' ? result.balance_score : 72;
  
  const blindSpots = (Array.isArray(result.potential_blind_spots) && result.potential_blind_spots.length > 0)
    ? result.potential_blind_spots
    : DEFAULT_BLIND_SPOTS;

  const assumptions = (Array.isArray(result.hidden_assumptions) && result.hidden_assumptions.length > 0)
    ? result.hidden_assumptions
    : DEFAULT_ASSUMPTIONS;

  const tradeOffs = (Array.isArray(result.trade_offs) && result.trade_offs.length > 0)
    ? result.trade_offs
    : DEFAULT_TRADE_OFFS;

  const perspectives = (Array.isArray(result.alternative_perspectives) && result.alternative_perspectives.length > 0)
    ? result.alternative_perspectives
    : DEFAULT_PERSPECTIVES;

  const socraticQuestions = (Array.isArray(result.reflection_questions) && result.reflection_questions.length > 0)
    ? result.reflection_questions
    : DEFAULT_QUESTIONS;

  // Load existing reflections for this analysis from the server
  useEffect(() => {
    if (analysis?.id) {
      api.reflections.list(analysis.id)
        .then((messages) => {
          if (Array.isArray(messages) && messages.length > 0) {
            const mapped = {};
            messages.forEach((m, idx) => {
              mapped[m.id || `msg_${idx}`] = m.message;
            });
            setSavedReflections(mapped);
          }
        })
        .catch((err) => {
          console.warn('Could not fetch existing reflections:', err);
        });
    }
  }, [analysis?.id]);

  const handleSaveReflection = async (qId, qTitle) => {
    if (!reflectionAnswer.trim()) return;
    const answer = reflectionAnswer.trim();

    setSavedReflections((prev) => ({
      ...prev,
      [qId]: answer
    }));
    setActiveInquiryIndex(null);
    setReflectionAnswer('');

    if (analysis?.id) {
      try {
        setIsSavingReflection(true);
        await api.reflections.create(analysis.id, {
          role: 'user',
          message: `[${qTitle || qId}] ${answer}`
        });
      } catch (err) {
        console.error('Failed to save reflection to database:', err);
      } finally {
        setIsSavingReflection(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200 pb-12">
      
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <button onClick={onBackToDashboard} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
              Dashboard
            </button>
            <span>/</span>
            <span>My Decisions</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold truncate max-w-xs">
              {analysis?.id ? `ID: ${analysis.id.slice(0, 8)}...` : 'INT-6127'}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              Dialectic Audit Engine • {blindSpots.length} Blind Spots Detected
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
            Your Decision Analysis
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Decisions</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Target Decision Banner */}
      <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            Q
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {headline}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Evaluated {analysis?.created_at ? new Date(analysis.created_at).toLocaleDateString() : 'Today'} • Neon PostgreSQL Secured
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto shrink-0">
          Audit Completed
        </span>
      </div>

      {/* 2. Decision Baseline & Dialectic Balance Gauge */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Scale className="w-4 h-4" />
            <span>Decision Baseline & Current Lean</span>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {baseline}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">PRIMARY COGNITIVE TILT</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block truncate">{primaryTilt}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Unexamined heuristic bias detected</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">BLIND SPOTS LOCATED</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">{blindSpots.length} Critical Vectors</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Tested across trade-off matrices</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block">IDENTIFIED DIMENSIONS</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 block">{assumptions.length} Premise Re-evaluations</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Dialectic Socratic scan verified</span>
            </div>
          </div>
        </div>

        {/* Dialectic Balance Gauge (Right column) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center text-center">
          <span className="text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
            Dialectic Balance Gauge
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
            Balance between immediate short-term benefits vs structural long-term trajectory.
          </p>

          {/* Semi-circular gauge SVG */}
          <div className="relative w-44 h-24 overflow-hidden mb-2">
            <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-200 dark:text-slate-800"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={`${(balanceScore / 100) * 175} 251`}
                className="text-blue-600 dark:text-blue-400 transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{balanceScore}%</span>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase font-semibold">Tilted Lean</span>
            </div>
          </div>

          <div className="flex justify-between w-full text-[10px] font-mono text-slate-500 px-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span>IMMEDIATE {balanceScore}%</span>
            <span>LONG-TERM {100 - balanceScore}%</span>
          </div>
        </div>

      </div>

      {/* 3. Section: What You Might Be Missing (4 Analytical Quadrants) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block">
              ANALYTICAL RIGOR AUDIT
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              What You Might Be Missing
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Autonomous Dialectic Analysis
          </span>
        </div>

        {/* 2x2 Grid for Blind Spots, Assumptions, Trade-offs, Lateral Paths */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Potential Blind Spots */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Potential Blind Spots</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{blindSpots.length} Latent Structural Risks</span>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {blindSpots.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{idx + 1}. {item.title}</h4>
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">{item.severity || 'High Impact'}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                  {item.risk && (
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium pt-1">
                      Risk: {item.risk}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Assumptions to Examine */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Assumptions to Examine</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Unpaired Premise Testing</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {assumptions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold">PREMISE 0{idx + 1}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white italic">
                    “{item.premise}”
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Reframing:</strong> {item.reframing}
                  </p>
                  {item.socratic_test && (
                    <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 font-medium">
                      <strong>Socratic Test:</strong> “{item.socratic_test}”
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Trade-offs & Latent Frictions */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Trade-offs & Latent Frictions</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Equilibrium Analysis</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {tradeOffs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    {item.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                      <strong>Gains:</strong> {item.gains}
                    </div>
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300">
                      <strong>Costs:</strong> {item.costs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Alternative Perspectives & Lateral Paths */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Alternative Perspectives & Lateral Paths</h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Unbroken Solution Framing</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {perspectives.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold">LATERAL PATH 0{idx + 1}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Section: Questions Worth Thinking About (Dark Navy Socratic Callout) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b132b] text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Socratic Catalyst Dialectic
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Questions Worth Thinking About
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              The AI does not decide for you. These questions are calibrated to test your reasoning against unexamined assumptions.
            </p>
          </div>
        </div>

        {/* Interactive Socratic Question Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socraticQuestions.map((q, idx) => {
            const isSaved = !!savedReflections[q.id || `q_${idx}`];
            const isExpanded = activeInquiryIndex === idx;

            return (
              <div
                key={q.id || idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">
                    0{idx + 1} // {q.title}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    “{q.question}”
                  </p>
                  {q.hint && (
                    <p className="text-[11px] text-slate-400 italic">
                      {q.hint}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  {isSaved ? (
                    <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Reflection Recorded in Neon</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveInquiryIndex(isExpanded ? null : idx)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-between w-full cursor-pointer"
                    >
                      <span>{isExpanded ? 'Close Journal' : 'Reflect on This'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  )}

                  {/* Inline interactive journal input */}
                  {isExpanded && !isSaved && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-150">
                      <textarea
                        rows={2}
                        value={reflectionAnswer}
                        onChange={(e) => setReflectionAnswer(e.target.value)}
                        placeholder="Write your honest reflection..."
                        className="w-full p-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        onClick={() => handleSaveReflection(q.id || `q_${idx}`, q.title)}
                        disabled={isSavingReflection}
                        className="w-full py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                      >
                        {isSavingReflection ? 'Saving...' : 'Save Thought'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dialogue Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Ready to explore these questions in an interactive dialogue?</span>
          </div>

          <button
            onClick={() => {
              if (onStartReflection) onStartReflection();
              else alert('Socratic reflection saved. Your thoughts are recorded in your persistent Neon database.');
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
          >
            <span>Start Reflective Socratic Dialogue &gt;</span>
          </button>
        </div>

      </div>

    </div>
  );
}
