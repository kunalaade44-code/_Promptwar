import React from 'react';

export default function ProcessStep({ stepNumber, title, description, icon: Icon, isLast = false }) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      
      {/* Step Icon & Number Badge */}
      <div className="relative z-10 flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#0c162e] border-2 border-blue-500/40 shadow-lg shadow-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 group-hover:border-blue-500 transition-all duration-300">
          <Icon className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
        </div>
        
        {/* Step Badge Indicator */}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md border-2 border-[#070c18]">
          {stepNumber}
        </span>
      </div>

      {/* Step Content */}
      <div className="max-w-xs px-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Subtle mobile connection line between vertical steps */}
      {!isLast && (
        <div className="lg:hidden w-0.5 h-8 bg-blue-900/60 mt-6 -mb-6" aria-hidden="true" />
      )}

    </div>
  );
}
