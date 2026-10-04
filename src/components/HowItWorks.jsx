import React from 'react';
import { PenLine, Cpu, ScanEye, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import ProcessStep from './ProcessStep';

export default function HowItWorks({ onStartAnalysis }) {
  const steps = [
    {
      number: '01',
      icon: PenLine,
      title: 'Share Your Decision',
      description: "Describe the decision you're facing, your reasoning, priorities, and concerns."
    },
    {
      number: '02',
      icon: Cpu,
      title: 'AI Examines Your Thinking',
      description: 'Our AI analyzes your reasoning to identify possible assumptions, missing factors, and conflicting priorities.'
    },
    {
      number: '03',
      icon: ScanEye,
      title: 'Discover Your Blind Spots',
      description: 'Explore potential risks, alternative perspectives, and important questions you may not have considered.'
    },
    {
      number: '04',
      icon: CheckCircle2,
      title: 'Reflect and Decide',
      description: 'Use these insights to examine your options and make your own informed decision.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-[#070c18] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d172e] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Process & Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A Smarter Way to Think Through Decisions.
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
            Turn uncertainty into clarity through a simple, guided thinking process.
          </p>
        </div>

        {/* 4 Connected Steps Grid */}
        <div className="mt-16 lg:mt-24 relative">
          
          {/* Horizontal Connecting Line on Desktop (hidden on mobile) */}
          <div
            className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-900/60 via-indigo-800/80 to-blue-900/60 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <ProcessStep
                key={step.number}
                stepNumber={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
                isLast={idx === steps.length - 1}
              />
            ))}
          </div>

        </div>

        {/* Prominent Bottom Call To Action */}
        <div className="mt-16 lg:mt-20 pt-8 flex flex-col items-center justify-center text-center">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0e172e] via-[#091024] to-[#070c18] text-white max-w-3xl w-full shadow-2xl shadow-black/80 border border-slate-800 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Ready to reveal what you might be missing?
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Gain clarity and discover critical perspectives on your most important decision today.
            </p>

            <button
              type="button"
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-100 transition-all duration-200 cursor-pointer"
            >
              <span>Start Your Analysis</span>
              <ArrowRight className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
