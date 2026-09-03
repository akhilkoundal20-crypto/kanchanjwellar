import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, ShieldCheck, HeartHandshake, ArrowRight, Award } from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function AboutSection({ onVisitStoreClick }) {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Showroom Image & Trust Highlights (6 cols) */}
          <motion.div 
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-500/30 shadow-xl bg-emerald-950 aspect-[16/10] group">
              <img
                src="/images/showroom-store.jpg"
                alt="Kanchan Jewellers Showroom in Dari Dharamshala"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Showroom Location Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-sm border border-gold-500/40 rounded-xl p-3 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold text-gold-200">
                      Showroom at Dari, Dharamshala
                    </h4>
                    <p className="text-[11px] text-ivory-200/80 font-sans font-light">
                      Kangra Valley, Himachal Pradesh
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gold-300 font-semibold bg-emerald-900 px-2 py-0.5 rounded border border-gold-500/30">
                  Open Daily
                </span>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-ivory-50 border border-gold-500/50 p-4 rounded-2xl shadow-xl items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-950 flex items-center justify-center text-gold-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-serif font-bold text-base text-emerald-950 leading-tight">
                  100% Certified
                </span>
                <span className="text-xs text-gold-700 font-medium">
                  Hallmarked Purity
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Text & Values (6 cols) */}
          <motion.div 
            className="lg:col-span-6 space-y-6 text-left"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3.5 py-1 rounded-full border border-gold-300/40">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Heritage & Trust</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight leading-snug">
              Your Trusted Jewellery Destination in Dharamshala
            </h2>

            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-950 via-gold-500 to-transparent"></div>

            <p className="text-base sm:text-lg text-gray-700 font-serif italic text-emerald-900/90 leading-relaxed">
              “Kanchan Jewellers, located in Dari, Dharamshala, offers quality Gold, 92.5 Italian Silver and Diamond jewellery with a focus on elegant designs, quality and customer satisfaction.”
            </p>

            <p className="text-sm text-gray-600 font-sans leading-relaxed font-light">
              Nestled at the foothills of the Dhauladhars in Dari, Dharamshala, Kanchan Jewellers was built on a simple foundation: offering fine jewellery of authentic hallmarked purity at fair, unmatched prices. Whether you are choosing an everyday silver accessory, a certified diamond solitaire, or a royal bridal set, our showroom provides a welcoming, transparent, and luxurious experience.
            </p>

            {/* Showroom Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-sans">Transparent Purity</h4>
                  <p className="text-[11px] text-gray-500">Accurate testing & BIS hallmarking on all gold.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-sans">Unmatched Local Pricing</h4>
                  <p className="text-[11px] text-gray-500">Genuine rates with reasonable making charges.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-sans">Bespoke Design Service</h4>
                  <p className="text-[11px] text-gray-500">Customized ornaments tailored to your desires.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 font-sans">Personalized Hospitality</h4>
                  <p className="text-[11px] text-gray-500">Warm customer-first service in our Dari boutique.</p>
                </div>
              </div>
            </div>

            {/* Visit Store Button */}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={onVisitStoreClick}
                className="inline-flex items-center justify-center gap-2.5 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/40 hover:border-gold-400 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-md transition-all duration-300 group"
              >
                <span>Visit Our Store</span>
                <ArrowRight className="w-4 h-4 text-gold-400 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
