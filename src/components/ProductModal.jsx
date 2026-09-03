import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, ShieldCheck, Sparkles, Scale, RefreshCw, Phone } from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function ProductModal({ product, isOpen, onClose, isWishlisted, onToggleWishlist }) {
  if (!product) return null;

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Kanchan Jewellers, I am interested in "${product.name}" (${product.purity}) listed on your website. Please share further details, availability, and best price for your Dari showroom.`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-3xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gold-500/30 overflow-hidden z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-gold-300 hover:text-white flex items-center justify-center transition-colors border border-gold-500/30 shadow-md"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Product Image */}
              <div className="relative bg-emerald-950 aspect-square md:aspect-auto md:h-full overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Purity Badge */}
                <div className="absolute top-4 left-4 bg-emerald-950/90 text-gold-300 text-xs font-semibold px-3 py-1 rounded-full border border-gold-500/40 backdrop-blur-sm">
                  {product.purity}
                </div>

                {/* Wishlist Button on image */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-lg transition-transform active:scale-90"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              {/* Right: Product Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-ivory-50">
                <div className="space-y-3">
                  {/* Category & Hallmark */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-gold-700 bg-gold-100 px-2.5 py-0.5 rounded-full border border-gold-300/50">
                      {product.category}
                    </span>
                    <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                      Hallmark Verified
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-emerald-950 leading-snug">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-1 border-b border-gold-500/20 pb-3">
                    <span className="text-2xl font-serif font-bold text-emerald-900">
                      {product.price}
                    </span>
                    {product.isPriceOnRequest && (
                      <span className="text-xs text-gray-500 font-sans">
                        (Contact us for current gold/diamond rate quote)
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 font-sans leading-relaxed font-light">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="bg-white p-3.5 rounded-xl border border-gold-500/20 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-950">
                        <Scale className="w-3.5 h-3.5 text-gold-600" />
                        Weight Estimation:
                      </span>
                      <span className="font-semibold text-gray-800">{product.weight}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-950">
                        <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                        Metal / Gem Purity:
                      </span>
                      <span className="font-semibold text-gray-800">{product.purity}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-950">
                        <RefreshCw className="w-3.5 h-3.5 text-gold-600" />
                        Guarantee:
                      </span>
                      <span className="font-semibold text-gray-800">100% Genuine Certified</span>
                    </div>
                  </div>

                  {/* Key Highlights list */}
                  {product.features && (
                    <div className="pt-1">
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-1.5">
                        Features & Craftsmanship:
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 text-xs text-gray-700">
                        {product.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"></span>
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-gold-500/20 space-y-2.5">
                  <button
                    onClick={handleWhatsAppEnquiry}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/40 py-3 px-5 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-gold-400" />
                    <span>Inquire This on WhatsApp</span>
                  </button>

                  <div className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1">
                    <span>Available at Kanchan Jewellers showroom, Dari, Dharamshala</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
