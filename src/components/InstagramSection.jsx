import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, ExternalLink } from 'lucide-react';
import { INSTAGRAM_POSTS, STORE_DETAILS } from '../data/productsData';

export default function InstagramSection() {
  return (
    <section className="py-16 sm:py-20 bg-ivory-50 border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300/40">
            <Instagram className="w-3.5 h-3.5 text-gold-600" />
            <span>Social Diary</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Follow Kanchan Jewellers
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>

          <p className="text-sm text-gray-600 font-sans font-light">
            Stay connected for the latest jewellery arrivals, styling inspiration, and showroom moments in Dharamshala.
          </p>
        </div>

        {/* 6-image Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.a
              key={post.id}
              href={STORE_DETAILS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-emerald-950 border border-gold-500/20 shadow-sm block"
            >
              <img
                src={post.image}
                alt="Kanchan Jewellers Instagram"
                className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-6 h-6 text-gold-400 mb-1.5 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="flex items-center gap-1 text-xs text-gold-200 font-semibold mb-1">
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span>{post.likes}</span>
                </div>
                <p className="text-[10px] text-ivory-200/90 font-sans line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow us CTA Button */}
        <div className="mt-8 text-center">
          <a
            href={STORE_DETAILS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-900 to-emerald-950 hover:from-emerald-850 hover:to-emerald-900 text-gold-200 border border-gold-500/40 hover:border-gold-400 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-gold-subtle"
          >
            <Instagram className="w-4 h-4 text-gold-400" />
            <span>Follow us on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-gold-400/80 ml-0.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
