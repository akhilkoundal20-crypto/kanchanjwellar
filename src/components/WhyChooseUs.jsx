import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Gem, Coins, Check } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/productsData';

export default function WhyChooseUs() {
  const iconMap = {
    Sparkles: Sparkles,
    ShieldCheck: ShieldCheck,
    Gem: Gem,
    Coins: Coins,
  };

  return (
    <section className="py-16 sm:py-24 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 luxury-pattern-dark opacity-35 pointer-events-none"></div>

      {/* Soft Ambient Radiance */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300 bg-emerald-900/90 px-3.5 py-1 rounded-full border border-gold-500/40">
            <Check className="w-3.5 h-3.5 text-gold-400" />
            <span>The Kanchan Promise</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Why Choose Us
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>

          <p className="text-sm sm:text-base text-ivory-200/80 font-sans font-light">
            Rooted in trust, transparent pricing, and fine craftsmanship in Dari, Dharamshala.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative bg-emerald-900/60 hover:bg-emerald-900/90 border border-gold-500/25 hover:border-gold-500/60 p-6 sm:p-7 rounded-2xl transition-all duration-300 shadow-emerald-deep flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-gold-400/50 flex items-center justify-center text-gold-400 shadow-sm mb-5 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold-400 text-sm">✓</span>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-gold-200 group-hover:text-gold-100 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-ivory-200/80 font-sans leading-relaxed font-light">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gold-500/15 flex items-center justify-between text-[11px] text-gold-400/80 font-mono tracking-wider uppercase">
                  <span>Guaranteed</span>
                  <span>✦</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
