import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

export default function Hero({ onStartAnalysis }) {
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-[#070c18]">
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-900/15 via-indigo-950/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-7">
            
            {/* Badge: AI-Powered Critical Thinking */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d172e] border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AI-Powered Critical Thinking</span>
            </div>

            {/* Main Heading: See Beyond What You Think. */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              See Beyond{' '}
              <span className="text-blue-500">
                What
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                You Think.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              Every decision has a blind spot. Discover what you might be missing with AI-powered critical thinking.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2">
              <button
                type="button"
                onClick={onStartAnalysis}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>Start Thinking Clearly</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-200 hover:text-white bg-[#0e162a] hover:bg-[#15233e] active:bg-[#1b2b4c] rounded-xl border border-slate-700/80 shadow-xs hover:border-slate-600 transition-all duration-200 cursor-pointer"
              >
                <span>Explore How It Works</span>
              </button>
            </div>

            {/* Micro-trust indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full border border-emerald-400/90 flex items-center justify-center text-emerald-400 shrink-0">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2.5 6.5 4.5 8.5 9.5 3.5" />
                  </svg>
                </div>
                <span>Zero bias, pure objective analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4.5 h-4.5 rounded-full border border-emerald-400/90 flex items-center justify-center text-emerald-400 shrink-0">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2.5 6.5 4.5 8.5 9.5 3.5" />
                  </svg>
                </div>
                <span>Private & confidential reasoning</span>
              </div>
            </div>

          </div>

          {/* Right Column: Three-Slide Image Carousel */}
          <div className="lg:col-span-6 w-full">
            <HeroCarousel />
          </div>

        </div>
      </div>
    </section>
  );
}
