import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/productsData';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-ivory-100/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300/40">
            <MessageSquare className="w-3.5 h-3.5 text-gold-600" />
            <span>Showroom Experiences</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Words of Appreciation
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>

          <p className="text-sm sm:text-base text-gray-600 font-sans font-light">
            Real stories of trust, purity, and celebrations from our patrons in Dharamshala and Kangra Valley.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-gold-500/20 shadow-gold-card hover:shadow-gold-hover transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Star Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-gold-400/40" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-gray-700 font-serif italic leading-relaxed mb-6">
                  “{review.review}”
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-emerald-950">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gold-700 font-medium">
                    {review.location}
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>{review.date}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
