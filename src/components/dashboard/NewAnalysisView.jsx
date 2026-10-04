import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  RefreshCw,
  Check
} from 'lucide-react';

export default function NewAnalysisView({ onSubmitAnalysis, onCancel, isAnalyzing = false, error = null }) {
  const [headline, setHeadline] = useState('Should I accept this 6-month internship offer?');
  const [background, setBackground] = useState(
    "I am a college student who received an offer for a 6-month internship. The stipend is very attractive ($4,200/mo), the office is 15 minutes from my house, and it gives me brand-name industry experience. However, this semester includes heavy senior capstone coursework and algorithms labs. I'm torn between financial independence and academic performance."
  );

  const [options, setOptions] = useState([
    'Accept the 6-month full-time internship for immediate stipend and industry resume signal',
    'Decline the offer and dedicate 100% focus to core coursework and university research fellowship',
    'Negotiate a hybrid/part-time schedule (20 hrs/week) or postpone start date by one semester'
  ]);

  const [rationale, setRationale] = useState(
    "I am strongly leaning toward accepting. The compensation gives me peace of mind, the commute is minimal, and having industry experience before graduation seems crucial. However, my intuition tells me I might be underestimating how exhausting 40 hours of engineering work will be alongside a full course load."
  );

  const [concerns, setConcerns] = useState(
    "What if the actual work is menial bug fixing rather than substantive engineering mentorship? What if my grades drop below honours threshold and lock me out of graduate opportunities?"
  );

  const criteriaList = [
    'Career Growth',
    'Financial Stability',
    'Personal Well-being',
    'Time & Autonomy',
    'Learning Velocity',
    'Family & Relationships',
    'Long-term Equity & Goals',
    'Intellectual Challenge'
  ];

  const [selectedCriteria, setSelectedCriteria] = useState([
    'Career Growth',
    'Financial Stability',
    'Learning Velocity',
    'Personal Well-being'
  ]);

  const toggleCriteria = (item) => {
    setSelectedCriteria((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleAddOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const handleUpdateOption = (index, val) => {
    const next = [...options];
    next[index] = val;
    setOptions(next);
  };

  const handleRemoveOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const loadExampleInternship = () => {
    setHeadline('Should I accept this 6-month internship offer?');
    setBackground(
      "I am a college student deciding whether to accept a 6-month internship. I have provided details about stipend, location, working hours, and my college schedule. I am mainly considering it because the stipend is good, the company is close to home, and it will provide industry experience."
    );
    setOptions([
      'Accept the 6-month full-time internship for immediate stipend and industry resume signal',
      'Decline the offer and dedicate 100% focus to core coursework and university research fellowship',
      'Negotiate a hybrid/part-time schedule (20 hrs/week) or postpone start date by one semester'
    ]);
    setRationale(
      "The stipend is generous, the company is 15 minutes away, and it provides industry experience. I feel I should take it because it's a solid company, but I haven't stress-tested the academic or mentorship risks."
    );
    setConcerns(
      "What if the actual learning and mentorship are low? What if the academic schedule is unsustainable?"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnalyzing) return;
    onSubmitAnalysis({
      headline,
      background,
      options: options.filter(o => o.trim().length > 0),
      rationale,
      selectedCriteria,
      concerns
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      
      {/* Error alert if any */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Top Banner & Stepper */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span>NEW COGNITIVE AUDIT • DIALECTIC WORKBENCH</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadExampleInternship}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Load Student Internship Example</span>
            </button>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              ● Auto-saved
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Examine Your Decision.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Share what's on your mind. The more context and raw instincts you articulate, the more accurately our dialectic model can locate hidden biases, anchored assumptions, and structural blind spots.
          </p>
        </div>

        {/* 3 Steps indicator */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 text-blue-900 dark:text-blue-200 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">01</span>
              <span>Decision Context</span>
            </div>
            <span className="text-[10px] text-blue-600 dark:text-blue-300 font-mono pl-7">Active Drafting</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-l-4 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px]">02</span>
              <span>Cognitive Bias Mapping</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono pl-7">Dialectic Socratic Scan</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-l-4 border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px]">03</span>
              <span>Synthesis & Reframe</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono pl-7">Unbiased Action Matrix</span>
          </div>
        </div>

        {/* Catalyst Callout */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-800 border border-indigo-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                SOCRATIC CATALYST
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic mt-0.5">
                “What is the single hidden assumption that, if conclusively proven false tomorrow, would instantly flip your final decision?”
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-4">
            <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block">Context Quality</span>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">85% Readiness</span>
          </div>
        </div>
      </div>

      {/* Main Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Field 1: What decision are you facing? */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What decision are you facing?
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">Primary Anchor</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Decision Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Should I accept this 6-month internship offer?"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Situational Background & Catalyst
            </label>
            <textarea
              rows={4}
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Detail your current circumstances, deadline, constraints, and why this choice has come up now..."
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Field 2: What options are you considering? */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What options are you considering?
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">Solution Space</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            List the viable pathways you've identified so far. We will check whether you are trapped in binary framing ("either-or fallacy").
          </p>

          <div className="space-y-3">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleUpdateOption(idx, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + idx)}...`}
                  required
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(idx)}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddOption}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Option</span>
            </button>
          </div>
        </div>

        {/* Field 3: Why are you leaning toward a particular option? */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Why are you leaning toward a particular option?
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">Intuition & Premises</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Articulating your intuition helps the dialectic engine locate untested premises, sunk-cost baggage, or emotional framing.
          </p>

          <textarea
            rows={3}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Share why you favor one direction and what gut considerations influence you most..."
            required
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Field 4: What matters most to you? */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What matters most to you?
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">Evaluation Weights</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {criteriaList.map((item) => {
              const selected = selectedCriteria.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleCriteria(item)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selected
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 5: What are you worried about? */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                5
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                What are you worried about? <span className="text-xs font-normal text-slate-400">(Optional)</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 uppercase">Downside Landscape</span>
          </div>

          <textarea
            rows={2}
            value={concerns}
            onChange={(e) => setConcerns(e.target.value)}
            placeholder="Any unspoken anxieties, worst-case scenarios, or hidden pressures you're feeling..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Action Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Strictly Private. Query vectors are air-gapped and never used for training.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAnalyzing}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-md transition-all duration-200 ${
                isAnalyzing
                  ? 'bg-blue-400 cursor-not-allowed opacity-80'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg cursor-pointer'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Blind Spots with AI...</span>
                </>
              ) : (
                <>
                  <span>Analyze My Decision</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
