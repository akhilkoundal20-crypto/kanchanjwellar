import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { COLLECTIONS } from '../data/productsData';

export default function Collections({ onSelectCollection }) {
  const handleCollectionClick = (categoryTitle) => {
    let category = 'All';
    if (categoryTitle.includes('Gold')) category = 'Gold';
    else if (categoryTitle.includes('Silver')) category = 'Silver';
    else if (categoryTitle.includes('Diamond')) category = 'Diamond';
    else if (categoryTitle.includes('Bridal')) category = 'Bridal';

    if (onSelectCollection) {
      onSelectCollection(category);
    }

    const showcaseElement = document.getElementById('showcase');
    if (showcaseElement) {
      showcaseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-16 sm:py-20 bg-ivory-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300/40">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Featured Collections
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>
          <p className="text-sm sm:text-base text-gray-600 font-sans font-light">
            Explore our hallmark selections crafted with passion, authenticity, and enduring elegance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {COLLECTIONS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gold-500/20 shadow-gold-card hover:shadow-gold-hover transition-all duration-500 flex flex-col justify-between"
            >
              {/* Card Image with Hover Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-emerald-950/90 text-gold-300 text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-gold-500/40 backdrop-blur-sm">
                  {item.badge}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-emerald-950 group-hover:text-gold-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif italic text-gold-800 font-medium">
                    “{item.tagline}”
                  </p>
                  <p className="text-xs text-gray-500 font-sans line-clamp-2 pt-1 font-light">
                    {item.description}
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleCollectionClick(item.title)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-ivory-100 hover:bg-emerald-900 text-emerald-950 hover:text-gold-200 border border-gold-500/30 hover:border-emerald-900 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 group/btn"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-gold-600 group-hover:text-gold-300 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
