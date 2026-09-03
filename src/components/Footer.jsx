import React from 'react';
import { Instagram, Facebook, MessageCircle, MapPin, Phone, Mail, Sparkles, ArrowUp } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { STORE_DETAILS } from '../data/productsData';

export default function Footer({ onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Gold', href: '#showcase', category: 'Gold' },
    { name: 'Silver', href: '#showcase', category: 'Silver' },
    { name: 'Diamond', href: '#showcase', category: 'Diamond' },
    { name: 'Bridal', href: '#showcase', category: 'Bridal' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const jewelleryLinks = [
    { name: '916 Gold', category: 'Gold' },
    { name: '92.5 Italian Silver', category: 'Silver' },
    { name: 'Diamond Jewellery', category: 'Diamond' },
    { name: 'Bridal Jewellery', category: 'Bridal' },
  ];

  const handleCategoryLink = (cat) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const showcase = document.getElementById('showcase');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-emerald-950 text-white relative border-t-2 border-gold-500/40">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 luxury-pattern-dark opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-gold-500/20">
          
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo light={true} />

            <div className="pt-2">
              <p className="font-serif italic text-gold-300 text-sm tracking-wide font-medium">
                “{STORE_DETAILS.tagline}”
              </p>
              <p className="text-xs text-ivory-200/80 font-sans leading-relaxed mt-2 font-light max-w-sm">
                Dari, Dharamshala’s premier showroom for authentic 916 Hallmark Gold, 92.5 Italian Silver, and Certified Diamond Jewellery. Handcrafted elegance backed by generational trust.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={STORE_DETAILS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:bg-gold-600 transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={STORE_DETAILS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:bg-gold-600 transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${STORE_DETAILS.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-900 border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:bg-gold-600 transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-gold-300 border-b border-gold-500/30 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-ivory-200/80 font-sans">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => link.category && handleCategoryLink(link.category)}
                    className="hover:text-gold-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-gold-500 text-[10px] transition-transform group-hover:translate-x-1">✦</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Jewellery Categories (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-gold-300 border-b border-gold-500/30 pb-2">
              Jewellery
            </h4>
            <ul className="space-y-2 text-xs text-ivory-200/80 font-sans">
              {jewelleryLinks.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleCategoryLink(item.category)}
                    className="hover:text-gold-300 transition-colors text-left flex items-center gap-1.5 group"
                  >
                    <span className="text-gold-500 text-[10px] transition-transform group-hover:translate-x-1">✦</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Showroom (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm uppercase tracking-widest text-gold-300 border-b border-gold-500/30 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs text-ivory-200/80 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{STORE_DETAILS.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href={`tel:${STORE_DETAILS.phone}`} className="hover:text-gold-300 transition-colors">
                  {STORE_DETAILS.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{STORE_DETAILS.email}</span>
              </div>

              <div className="pt-2 text-[11px] text-gold-400 font-mono">
                <span>Timings: 10:00 AM - 7:30 PM (All 7 Days)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-200/60 font-sans gap-4">
          <p>© 2026 Kanchan Jewellers. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-gold-400/80">Dari, Dharamshala, Himachal Pradesh</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-emerald-900 hover:bg-emerald-850 text-gold-300 hover:text-white transition-colors border border-gold-500/30"
              title="Scroll to top"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
