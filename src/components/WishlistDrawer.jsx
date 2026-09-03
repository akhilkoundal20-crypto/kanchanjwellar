import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function WishlistDrawer({ isOpen, onClose, wishlist, onRemoveFromWishlist, onViewProduct }) {
  const handleInquireAllWhatsApp = () => {
    if (wishlist.length === 0) return;
    const itemsList = wishlist
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.purity}) - ${item.price}`)
      .join('\n');

    const text = encodeURIComponent(
      `Hello Kanchan Jewellers, I have shortlisted the following items from your website:\n\n${itemsList}\n\nPlease let me know their current availability and best price at your Dari showroom.`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[88%] max-w-md bg-ivory-50 z-50 shadow-2xl flex flex-col justify-between border-l border-gold-500/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-gold-500/20 bg-emerald-950 text-white">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
                <h3 className="font-serif font-bold text-lg tracking-wide text-gold-200">
                  Your Wishlist ({wishlist.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-gold-300 hover:text-white hover:bg-emerald-900 transition-colors"
                aria-label="Close wishlist"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
              {wishlist.length === 0 ? (
                <div className="py-16 text-center text-gray-400 space-y-3">
                  <Heart className="w-12 h-12 mx-auto text-gold-400/40" />
                  <h4 className="font-serif text-lg text-emerald-950 font-bold">Your Wishlist is Empty</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto font-sans">
                    Tap the heart icon on any gold, silver, or diamond jewellery to save your favorites here.
                  </p>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gold-500/20 shadow-sm relative group"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-emerald-950 flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        onViewProduct(item);
                        onClose();
                      }}
                    />

                    <div className="flex-grow min-w-0 pr-6">
                      <span className="text-[9px] font-semibold text-gold-700 uppercase tracking-wider block">
                        {item.purity}
                      </span>
                      <h4
                        onClick={() => {
                          onViewProduct(item);
                          onClose();
                        }}
                        className="text-xs sm:text-sm font-serif font-bold text-emerald-950 truncate hover:text-gold-700 cursor-pointer"
                      >
                        {item.name}
                      </h4>
                      <div className="text-xs font-serif font-bold text-emerald-900 mt-1">
                        {item.price}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors"
                      title="Remove"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {wishlist.length > 0 && (
              <div className="p-5 border-t border-gold-500/20 bg-ivory-100/90 space-y-3">
                <button
                  onClick={handleInquireAllWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/40 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md active:scale-95 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-gold-400" />
                  <span>Inquire All on WhatsApp</span>
                </button>
                <p className="text-center text-[10px] text-gray-500">
                  Send your curated wishlist directly to our team in Dharamshala for fast availability checks.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
