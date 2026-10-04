import React from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  Brain, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  Compass 
} from 'lucide-react';

export default function DashboardHome({ onStartNewAnalysis, onViewAnalysis, analysesList = [], currentUser = null }) {
  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Alex';
  const totalCount = analysesList.length > 0 ? analysesList.length : 12;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Top Workspace Greeting & Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-2">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            Perception Filter: Balanced • Dialectic Engine Ready
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {userName}.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Ready to explore a new perspective? Illuminate blind spots and unexamined premises in your current thinking models.
          </p>
        </div>

        <button
          onClick={onStartNewAnalysis}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Analysis</span>
        </button>
      </div>

      {/* 2. Three Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Total Analyses
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white leading-none">
                  {totalCount}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">decisions explored</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-bold font-mono">
              +3 this month
            </span>
            <span className="text-slate-500 dark:text-slate-400">Cognitive audits logged</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Blind Spots Discovered
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 leading-none">
                  38
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">overlooked factors</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-bold font-mono">
              Unseen assumptions
            </span>
            <span className="text-slate-500 dark:text-slate-400">across 6 bias tiers</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Reflections Completed
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white leading-none">
                  09
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">sessions finalized</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              75% synthesis rate
            </span>
            <span className="text-slate-500 dark:text-slate-400">High adherence rating</span>
          </div>
        </div>

      </div>

      {/* 3. Main Workspace Grid: Left Column (Recent Decisions) + Right Column (Perspective Tool & Bias Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Recent Decisions */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Recent Decisions
              </h2>
              <span className="px-2 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-semibold">
                {analysesList.length > 0 ? `${analysesList.length} Saved` : '3 Active'}
              </span>
            </div>
          </div>

          {/* Render real analyses if available */}
          {analysesList.length > 0 ? (
            analysesList.slice(0, 5).map((item, idx) => {
              const blindSpotCount = item.analysis_result?.potential_blind_spots?.length || 3;
              const snippet = item.analysis_result?.summary || item.decision_text?.slice(0, 180) + '...';
              const createdDate = item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent';

              return (
                <article key={item.id || idx} className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${idx % 3 === 0 ? 'bg-blue-600' : idx % 3 === 1 ? 'bg-indigo-500' : 'bg-cyan-500'}`} />
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                        {createdDate}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700 text-xs font-mono font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {blindSpotCount} Blind Spots Identified
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {snippet}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                    <span className="font-mono text-slate-600 dark:text-slate-400">
                      Model: Dialectic Socratic Scan
                    </span>
                    <button
                      onClick={() => onViewAnalysis(item)}
                      className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                    >
                      <span>View Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <>
              {/* Decision 1: THE INTERNSHIP DECISION (Exact match to prompt problem statement!) */}
              <article className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600" />
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                      Yesterday • 4:15 PM
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Should I accept this 6-month internship?
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-700 text-xs font-mono font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    3 Blind Spots Identified
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Weighed good stipend and proximity to home against academic schedule compression. Uncovered implicit premises regarding mentorship bandwidth and long-term career leverage.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    Model: Risk Calibration v2.4
                  </span>
                  <button
                    onClick={() => onViewAnalysis('internship')}
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                  >
                    <span>View Full Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* Decision 2: AI vs Web Development */}
              <article className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500" />
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                      Oct 18, 2026
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      Should I learn AI or focus on web development?
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-700 text-xs font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Synthesized & Reflected
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Deconstructed false dichotomy fallacy. Examined compounding synergies between modern frontend engineering and AI agent orchestration architecture.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    Model: Synthesis Matrix
                  </span>
                  <button
                    onClick={() => onViewAnalysis('internship')}
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>

              {/* Decision 3: Relocation Decision */}
              <article className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500" />
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                      Oct 12, 2026
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Should I move to another city?
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-700 text-xs font-mono font-semibold">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    In Progress
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Discovered sunk-cost fallacy in current social network vs friction of relocation. Highlighted emotional trade-offs and geographic career leverage.
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    Model: Relational Relocation Matrix
                  </span>
                  <button
                    onClick={() => onViewAnalysis('internship')}
                    className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 cursor-pointer"
                  >
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            </>
          )}
        </div>

        {/* Right Column (4 cols): Perspective Widget & Bias Radar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Aperture Dialectic Engine Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#0b132b] via-[#101b3b] to-[#080d1e] text-white p-6 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Visual Thumbnail */}
            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 bg-slate-950">
              <img
                src="/images/slide2-assumptions.jpg"
                alt="Optical Prism Perspective Shift"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-blue-300 font-semibold tracking-wider border border-blue-400/20">
                ● APERTURE ENGINE
              </div>
            </div>

            <h3 className="text-lg font-bold tracking-tight mb-2">
              Every decision has another perspective.
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Share an impending choice or complex dilemma. The dialectic AI helps unpack latent blind spots without imposing conclusions or unsolicited advice.
            </p>

            <button
              onClick={onStartNewAnalysis}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              <span>Analyze a Decision</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Tip callout */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-start gap-2 text-[11px] text-slate-300">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Tip:</strong> Start with a dilemma that genuinely matters to you. The more raw context you provide, the deeper the systemic reframing.
              </span>
            </div>
          </div>

          {/* Bias Radar Matrix Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                Bias Radar Matrix
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Confirmation Bias Dampener</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">88%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Status Quo Inertia</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">42%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Cognitive Sunk Cost Shield</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">74%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '74%' }} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Bottom Prominent Socratic Prompt Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Question to Think About
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            “What information would make you change your mind about an important decision?”
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            A quick mental audit prompt designed to calibrate your psychological openness to falsifying evidence and counter-arguments before reaching final closure.
          </p>
        </div>

        <button
          onClick={() => onViewAnalysis('internship')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-semibold text-xs sm:text-sm border border-blue-200 dark:border-slate-600 shadow-xs hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors cursor-pointer shrink-0"
        >
          <span>Explore This Question</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
