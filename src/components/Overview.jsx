import React from 'react';
import { Search, Brain, Compass, Sparkles } from 'lucide-react';
import FeatureCard from './FeatureCard';

export default function Overview() {
  const features = [
    {
      id: 'uncover',
      icon: Search,
      title: 'Uncover Blind Spots',
      description: 'Identify potentially overlooked factors, missing information, and hidden considerations in your reasoning.',
      stepNumber: 'FEATURE 01',
      accentColor: 'blue'
    },
    {
      id: 'challenge',
      icon: Brain,
      title: 'Challenge Assumptions',
      description: 'Examine beliefs and assumptions that may influence your decisions without sufficient evidence.',
      stepNumber: 'FEATURE 02',
      accentColor: 'indigo'
    },
    {
      id: 'perspectives',
      icon: Compass,
      title: 'Explore New Perspectives',
      description: 'Discover alternative viewpoints, possible risks, and thoughtful questions that encourage deeper reflection.',
      stepNumber: 'FEATURE 03',
      accentColor: 'cyan'
    }
  ];

  return (
    <section id="overview" className="py-20 lg:py-28 bg-[#080e1e] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0d172e] border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your Decisions Deserve a Second Perspective.
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">
            We often make decisions based on what stands out first. But what about the factors we overlook?
          </p>
        </div>

        {/* Feature Cards Grid (1 column on mobile, 3 columns on tablet/desktop) */}
        <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item) => (
            <FeatureCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              stepNumber={item.stepNumber}
              accentColor={item.accentColor}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
