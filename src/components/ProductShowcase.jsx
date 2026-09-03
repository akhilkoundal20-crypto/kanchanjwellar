import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Eye, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, STORE_DETAILS } from '../data/productsData';

export default function ProductShowcase({ 
  selectedCategory, 
  onCategoryChange, 
  onViewProduct, 
  wishlist, 
  onToggleWishlist 
}) {
  const categories = ['All', 'Gold', 'Silver', 'Diamond', 'Bridal'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleWhatsAppProduct = (e, product) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Kanchan Jewellers, I would like to inquire about "${product.name}" (${product.purity}) listed on your website. Price: ${product.price}.`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="showcase" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3 py-1 rounded-full border border-gold-300/40">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Exquisite Catalogue</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Our Jewellery Showcase
          </h2>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>
          
          <p className="text-sm sm:text-base text-gray-600 font-sans font-light">
            Browse our handpicked creations in 916 Hallmark Gold, 92.5 Italian Silver, and Certified Diamonds.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-900 text-gold-300 shadow-md border border-gold-500/50 scale-105'
                    : 'bg-ivory-100 text-gray-700 hover:bg-gold-100/80 hover:text-emerald-950 border border-gray-200/80'
                }`}
              >
                {cat === 'All' ? 'All Collections' : `${cat} Jewellery`}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 2 Columns on Mobile, 3 on Tablet, 4 on Desktop */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some((item) => item.id === product.id);

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-ivory-50 rounded-xl sm:rounded-2xl border border-gold-500/20 shadow-sm hover:shadow-gold-card transition-all duration-300 overflow-hidden flex flex-col justify-between relative"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-emerald-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"></div>

                    {/* Purity Tag */}
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-emerald-950/85 text-gold-300 text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 rounded border border-gold-500/40 backdrop-blur-sm shadow-sm">
                      {product.purity}
                    </span>

                    {/* Wishlist Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-transform active:scale-90"
                      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      aria-label="Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                          isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'
                        }`}
                      />
                    </button>

                    {/* Desktop Quick View Overlay Button */}
                    <button
                      onClick={() => onViewProduct(product)}
                      className="hidden sm:flex absolute inset-x-4 bottom-4 items-center justify-center gap-1.5 bg-white/95 hover:bg-white text-emerald-950 font-semibold text-xs py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg transform translate-y-2 group-hover:translate-y-0"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-600" />
                      <span>View Details</span>
                    </button>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between space-y-2.5">
                    <div>
                      <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gold-700">
                        {product.category}
                      </div>
                      
                      <h3 
                        onClick={() => onViewProduct(product)}
                        className="text-xs sm:text-sm md:text-base font-serif font-bold text-emerald-950 line-clamp-2 hover:text-gold-700 cursor-pointer transition-colors leading-snug mt-0.5"
                      >
                        {product.name}
                      </h3>

                      <p className="text-[11px] text-gray-500 font-sans truncate mt-0.5 hidden sm:block font-light">
                        {product.weight}
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-gold-500/15">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-xs sm:text-sm font-serif font-bold text-emerald-900">
                          {product.price}
                        </span>
                        {product.isPriceOnRequest && (
                          <span className="text-[9px] sm:text-[10px] text-gold-700 font-medium hidden sm:inline">
                            Live Quote
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: View Details & WhatsApp Enquiry */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                        {/* Mobile View Details Button (small) */}
                        <button
                          onClick={() => onViewProduct(product)}
                          className="sm:hidden w-full inline-flex items-center justify-center gap-1 bg-white hover:bg-ivory-100 text-emerald-950 border border-gold-500/40 py-1.5 px-2 rounded-lg text-[10px] font-semibold"
                        >
                          <Eye className="w-3 h-3 text-gold-600" />
                          <span>Details</span>
                        </button>

                        {/* WhatsApp Enquiry Button */}
                        <button
                          onClick={(e) => handleWhatsAppProduct(e, product)}
                          className="w-full sm:col-span-2 inline-flex items-center justify-center gap-1 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/30 py-1.5 sm:py-2 px-2.5 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-gold-400" />
                          <span>WhatsApp Enquiry</span>
                        </button>
                      </div>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Assurance */}
        <div className="mt-12 text-center text-xs text-gray-500 font-sans font-light">
          <span>All gold pieces are 100% BIS Hallmarked (916/22K). Custom designs available upon request at our Dari showroom.</span>
        </div>

      </div>
    </section>
  );
}
