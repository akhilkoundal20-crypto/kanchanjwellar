import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Gem, Sparkles, HeartHandshake } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: '916 GOLD',
      subtitle: 'Authentic Gold Jewellery',
      badge: 'BIS 22K',
    },
    {
      icon: Sparkles,
      title: '92.5 ITALIAN SILVER',
      subtitle: 'Premium Silver Collection',
      badge: 'ITALY STAMPED',
    },
    {
      icon: Gem,
      title: 'DIAMOND',
      subtitle: 'Elegant Diamond Jewellery',
      badge: 'CERTIFIED',
    },
    {
      icon: HeartHandshake,
      title: 'TRUSTED SERVICE',
      subtitle: 'Quality You Can Trust',
      badge: 'DHARAMSHALA',
    },
  ];

  return (
    <div className="bg-emerald-900 border-y border-gold-500/30 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3.5 p-2 rounded-lg hover:bg-emerald-850/50 transition-colors"
              >
                {/* Icon wrapper with gold circle */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-950 border border-gold-400/50 flex items-center justify-center flex-shrink-0 text-gold-400 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-serif font-bold text-xs sm:text-sm tracking-wider text-gold-200 uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-ivory-200/80 font-sans truncate font-light">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
