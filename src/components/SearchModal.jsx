import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const searchResults = searchTerm.trim() === ''
    ? []
    : PRODUCTS.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.purity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-emerald-950/75 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gold-500/30 overflow-hidden z-10"
        >
          {/* Search Header Input */}
          <div className="p-4 sm:p-5 border-b border-gold-500/20 bg-ivory-50 flex items-center gap-3">
            <Search className="w-5 h-5 text-gold-600 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 916 gold, silver, diamond rings, bridal sets..."
              className="w-full bg-transparent border-none text-base sm:text-lg text-emerald-950 placeholder-gray-400 focus:outline-none focus:ring-0 font-sans"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 bg-emerald-950 text-gold-300 hover:text-white rounded-full transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="px-5 py-2.5 bg-ivory-100/60 border-b border-gold-500/10 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-gray-400 text-[11px] uppercase tracking-wider font-semibold">Popular:</span>
            {['916 Gold', 'Silver Bracelet', 'Diamond Ring', 'Bridal Choker', 'Jhumkas'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="bg-white hover:bg-gold-100/80 text-emerald-900 px-2.5 py-1 rounded-full border border-gray-200 transition-colors whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4 sm:p-5 space-y-3">
            {searchTerm.trim() === '' ? (
              <div className="py-8 text-center text-gray-400 space-y-2">
                <Sparkles className="w-8 h-8 mx-auto text-gold-400/60" />
                <p className="text-sm font-sans">Type a keyword above to find jewellery pieces in Dharamshala</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                <p className="text-sm font-sans">No jewellery found matching "{searchTerm}".</p>
                <p className="text-xs text-gray-400 mt-1">Try searching for "Gold", "Silver", or "Diamond".</p>
              </div>
            ) : (
              searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectProduct(item);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-ivory-100/80 cursor-pointer border border-transparent hover:border-gold-500/30 transition-all group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover bg-emerald-950 flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-semibold text-gold-700 uppercase tracking-wider">
                      {item.category} • {item.purity}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-emerald-950 truncate group-hover:text-gold-700 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-900 mt-0.5">
                      {item.price}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold-600 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
