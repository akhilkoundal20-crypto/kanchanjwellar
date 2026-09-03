import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, MessageCircle, Menu, X, Phone, MapPin } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { STORE_DETAILS } from '../data/productsData';

export default function Navbar({ onOpenSearch, onOpenWishlist, wishlistCount = 0, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Gold', href: '#showcase', category: 'Gold' },
    { name: 'Silver', href: '#showcase', category: 'Silver' },
    { name: 'Diamond', href: '#showcase', category: 'Diamond' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.category && onSelectCategory) {
      onSelectCategory(link.category);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello Kanchan Jewellers, I would like to inquire about your jewellery collections at your Dari, Dharamshala showroom.");
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Top micro-announcement banner */}
      <div className="bg-emerald-950 text-gold-200 text-xs py-1.5 px-4 border-b border-gold-500/20 text-center font-sans tracking-wide flex items-center justify-between sm:justify-center">
        <span className="flex items-center gap-1.5 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse"></span>
          <span>Authentic 916 Hallmark Gold & 92.5 Italian Silver Showroom • Dari, Dharamshala</span>
        </span>
        <a 
          href={`tel:${STORE_DETAILS.phone}`} 
          className="hidden md:flex items-center gap-1 text-gold-300 hover:text-white transition-colors ml-4 text-[11px]"
        >
          <Phone className="w-3 h-3 text-gold-400" />
          <span>{STORE_DETAILS.phone}</span>
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-50/95 backdrop-blur-md shadow-md py-2.5 border-b border-gold-500/20'
            : 'bg-ivory-50 py-3.5 border-b border-gold-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a href="#home" className="focus:outline-none focus:ring-1 focus:ring-gold-500 rounded">
            <BrandLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className="text-sm font-medium text-gray-800 hover:text-emerald-900 transition-colors relative py-1 group tracking-wide"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-emerald-950 hover:bg-gold-100/50 rounded-full transition-colors relative focus:outline-none"
              title="Search jewellery"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-800" />
            </button>

            {/* Wishlist Icon with Counter Badge */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-gray-700 hover:text-emerald-950 hover:bg-gold-100/50 rounded-full transition-colors relative focus:outline-none"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-800 hover:text-red-600 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-emerald-900 text-gold-300 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-gold-400">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* WhatsApp Contact Button */}
            <button
              onClick={openWhatsApp}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/40 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-gold-subtle active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-gold-400 fill-emerald-950" />
              <span>WhatsApp</span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-emerald-950 hover:bg-gold-100/60 rounded-md focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-ivory-50 z-50 shadow-2xl flex flex-col justify-between border-l border-gold-500/30 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="p-5 flex items-center justify-between border-b border-gold-500/20 bg-emerald-950 text-white">
                  <BrandLogo light={true} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full text-gold-300 hover:text-white hover:bg-emerald-900 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="py-4 px-5 space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => handleNavClick(link)}
                      className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-800 hover:bg-gold-100/70 hover:text-emerald-900 font-medium text-base transition-colors"
                    >
                      <span>{link.name}</span>
                      <span className="text-gold-500 text-xs">✦</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Contact & Actions */}
              <div className="p-5 border-t border-gold-500/20 bg-ivory-100/80 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-900 text-gold-200 border border-gold-500/40 py-2.5 rounded-lg text-sm font-semibold tracking-wide shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-gold-400" />
                  <span>Chat on WhatsApp</span>
                </button>

                <a
                  href={`tel:${STORE_DETAILS.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-white text-emerald-900 border border-gray-200 py-2.5 rounded-lg text-sm font-semibold hover:border-gold-500 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <span>Call {STORE_DETAILS.phone}</span>
                </a>

                <div className="pt-2 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>Dari, Dharamshala, Himachal Pradesh</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
