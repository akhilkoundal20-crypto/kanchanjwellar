import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, Crown, Calendar } from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function BridalSection({ onExploreBridal }) {
  const handleConsultation = () => {
    const text = encodeURIComponent(
      "Hello Kanchan Jewellers, I would like to book a Bridal Jewellery consultation at your showroom in Dari, Dharamshala."
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-ivory-100 relative overflow-hidden">
      {/* Decorative Gold Filigree Backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Column: Image Artwork (7 cols on lg) */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[550px] overflow-hidden group">
              <img
                src="/images/bridal-jewellery.jpg"
                alt="Kanchan Jewellers Royal Indian Bridal Jewellery"
                className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Subtle Dark Gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-emerald-950/90"></div>

              {/* Bridal Badge */}
              <div className="absolute top-5 left-5 bg-emerald-950/90 text-gold-300 border border-gold-500/50 px-3.5 py-1.5 rounded-full text-xs font-serif font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                <Crown className="w-3.5 h-3.5 text-gold-400" />
                <span>The Kanchan Bride</span>
              </div>
            </div>

            {/* Right Column: Editorial Details (6 cols on lg) */}
            <div className="lg:col-span-6 p-7 sm:p-10 lg:p-14 text-white space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-300 bg-emerald-900/80 px-3.5 py-1.5 rounded-full border border-gold-500/40">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Bridal Haute Joaillerie</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
                Made for Your{' '}
                <span className="text-gold-gradient block mt-1 font-serif italic">
                  Most Beautiful Moments
                </span>
              </h2>

              <p className="text-sm sm:text-base text-ivory-200/90 font-sans leading-relaxed font-light">
                Explore elegant bridal jewellery designed to make every celebration unforgettable. From grand 916 gold chokers to delicate polki and diamond heritage pieces, each ornament is handcrafted to turn your wedding into a royal affair.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gold-500/20">
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300">
                    Bespoke Trousseau
                  </h4>
                  <p className="text-xs text-ivory-200/70 font-sans mt-0.5">
                    Custom necklaces, bangles & maang tikkas crafted to match your bridal lehenga.
                  </p>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-gold-300">
                    Purity Guaranteed
                  </h4>
                  <p className="text-xs text-ivory-200/70 font-sans mt-0.5">
                    100% BIS 916 Hallmarked gold with complete transparency in pricing.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <button
                  onClick={onExploreBridal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-gold-subtle hover:shadow-gold-hover transition-all duration-300 group"
                >
                  <span>Explore Bridal Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={handleConsultation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-900/60 hover:bg-emerald-850 text-gold-200 border border-gold-500/40 font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base tracking-wide transition-all"
                >
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Book Consultation</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
