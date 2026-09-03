import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export default function Hero({ onExploreClick, onStoreClick }) {
  return (
    <section id="home" className="relative bg-emerald-950 text-white overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background subtle luxury motif overlay */}
      <div className="absolute inset-0 luxury-pattern-dark opacity-30 pointer-events-none"></div>

      {/* Decorative Gold Radial Light Ambient Glows (subtle, classy) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Subtle Gold Filigree Border Corners */}
      <div className="hidden lg:block absolute top-6 left-8 w-16 h-16 border-t-2 border-l-2 border-gold-500/30 pointer-events-none"></div>
      <div className="hidden lg:block absolute top-6 right-8 w-16 h-16 border-t-2 border-r-2 border-gold-500/30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs (7 cols) */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tagline / Location Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 border border-gold-500/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-gold-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>QUALITY JEWELLERY & UNMATCHED PRICES!</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Timeless Jewellery.{' '}
              <span className="block text-gold-gradient font-serif italic mt-1">
                Unmatched Elegance.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-ivory-200/90 font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Discover beautifully crafted <span className="text-gold-300 font-normal">916 Gold</span>,{' '}
              <span className="text-gold-300 font-normal">92.5 Italian Silver</span> &{' '}
              <span className="text-gold-300 font-normal">Diamond Jewellery</span> at Kanchan Jewellers, Dari, Dharamshala.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#collections"
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-gold-subtle hover:shadow-gold-hover transition-all duration-300 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={onStoreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900/60 hover:bg-emerald-850 text-gold-200 border border-gold-500/50 hover:border-gold-400 font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base tracking-wide transition-all duration-300"
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Visit Our Store</span>
              </a>
            </div>

            {/* Hallmark & Showroom micro assurance */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gold-300/80 border-t border-emerald-900/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>100% BIS Hallmarked 916 Gold</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Certified Natural Diamonds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                <span>Dari, Dharamshala Showroom</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Artwork (5 cols) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {/* Outer Frame with Gold Border */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative behind glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-600/40 via-gold-400/20 to-emerald-700/40 rounded-2xl blur-md"></div>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl bg-emerald-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group">
                <img
                  src="/images/hero-jewellery.jpg"
                  alt="Kanchan Jewellers 916 Gold and Diamond Luxury Bridal Set"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle dark gradient overlay at bottom for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>

                {/* Floating Showcase Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-emerald-950/90 backdrop-blur-sm border border-gold-500/40 rounded-xl p-3 flex items-center justify-between shadow-lg">
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest text-gold-400 uppercase font-semibold">
                      Featured Masterpiece
                    </span>
                    <h2 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
                      Royal Emerald & 916 Gold Set
                    </h2>
                  </div>
                  <a
                    href="#showcase"
                    className="text-xs font-semibold text-gold-300 hover:text-gold-100 flex items-center gap-1 group/btn"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* Floating Pill Badge: Purity Guaranteed */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-emerald-900/95 border border-gold-400/80 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-[11px] font-medium text-gold-200">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping"></span>
                <span>Authentic 916 Hallmarked</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
