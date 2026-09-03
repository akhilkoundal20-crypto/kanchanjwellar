import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function FloatingWhatsApp() {
  const handleChat = () => {
    const text = encodeURIComponent(
      "Hello Kanchan Jewellers! I am browsing your website and would like assistance with jewellery designs and prices at your Dari, Dharamshala showroom."
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Floating Tooltip / Label on desktop */}
      <span className="hidden md:inline-block mr-3 bg-emerald-950 text-gold-300 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gold-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Showroom
      </span>

      {/* Button */}
      <button
        onClick={handleChat}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 hover:scale-105 border-2 border-white/80"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp with Kanchan Jewellers"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 fill-white relative z-10" />
      </button>
    </div>
  );
}
