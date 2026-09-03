import React from 'react';

export default function BrandLogo({ className = 'h-11', light = false }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Royal Jewel Crest Monogram */}
      <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center">
        <div className="absolute inset-0 rounded-lg bg-emerald-950 border border-gold-500/60 rotate-45 shadow-sm"></div>
        <div className="absolute inset-[3px] rounded-md border border-gold-400/30 rotate-45"></div>
        <div className="relative z-10 flex items-center justify-center font-serif text-gold-400 font-bold text-base tracking-tighter">
          <span className="text-gold-300">K</span>
          <span className="text-gold-500 -ml-0.5">J</span>
        </div>
        {/* Crown accent dot */}
        <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-gold-300 shadow-[0_0_6px_#C5A059] z-20"></div>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span className={`font-serif tracking-[0.2em] font-bold text-base sm:text-lg leading-tight ${light ? 'text-white' : 'text-emerald-950'}`}>
          KANCHAN
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-serif tracking-[0.32em] text-[9px] sm:text-[10px] font-medium text-gold-600 uppercase">
            JEWELLERS
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gold-500/60"></span>
          <span className="hidden sm:inline-block text-[8px] font-sans tracking-widest text-emerald-800/70 font-semibold uppercase">
            DARI • DHARAMSHALA
          </span>
        </div>
      </div>
    </div>
  );
}
