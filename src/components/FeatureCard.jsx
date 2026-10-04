import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, stepNumber, accentColor = 'blue' }) {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-950/60 text-blue-400 border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white',
      badge: 'bg-blue-950/40 text-blue-400 border-blue-800/50',
      glow: 'group-hover:border-blue-500/50'
    },
    indigo: {
      iconBg: 'bg-indigo-950/60 text-indigo-400 border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white',
      badge: 'bg-indigo-950/40 text-indigo-400 border-indigo-800/50',
      glow: 'group-hover:border-indigo-500/50'
    },
    cyan: {
      iconBg: 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30 group-hover:bg-cyan-600 group-hover:text-white',
      badge: 'bg-cyan-950/40 text-cyan-400 border-cyan-800/50',
      glow: 'group-hover:border-cyan-500/50'
    }
  };

  const currentTheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div className={`group relative bg-[#0a1124] rounded-2xl p-8 border border-slate-800/90 shadow-xl shadow-black/40 hover:shadow-2xl hover:bg-[#0c152e] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left ${currentTheme.glow}`}>
      
      {/* Top row: Icon and Index */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className={`w-13 h-13 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-xs ${currentTheme.iconBg}`}>
            <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md text-slate-400 bg-slate-900 border border-slate-800 group-hover:text-slate-200 transition-colors">
            {stepNumber}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Card bottom subtle accent bar */}
      <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors">
        <span>Explore perspective</span>
        <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>

    </div>
  );
}
