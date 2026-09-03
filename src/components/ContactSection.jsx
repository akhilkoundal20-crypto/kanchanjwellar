import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, MessageCircle, Instagram, Facebook, 
  Compass, Clock, Sparkles, Send, CheckCircle2 
} from 'lucide-react';
import { STORE_DETAILS } from '../data/productsData';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    jewelleryType: '916 Gold',
    message: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Kanchan Jewellers, I would like to inquire about jewellery:\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested in: ${formData.jewelleryType}\nRequirements: ${formData.message}`
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
    setFormSubmitted(true);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Kanchan Jewellers, I have special jewellery requirements and would like to speak with your design team in Dari, Dharamshala."
    );
    window.open(`https://wa.me/${STORE_DETAILS.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold-700 bg-gold-100/80 px-3.5 py-1 rounded-full border border-gold-300/40">
            <MapPin className="w-3.5 h-3.5 text-gold-600" />
            <span>Showroom Location</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight">
            Visit Kanchan Jewellers
          </h2>

          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-2"></div>

          <p className="text-sm sm:text-base text-gray-600 font-sans font-light">
            We look forward to welcoming you to our showroom in Dari, Dharamshala.
          </p>
        </div>

        {/* Top CTA Banner: "Looking for something special?" */}
        <div className="mb-12 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-gold-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-gold-300 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Custom Jewellery & Bridal Orders</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white">
              Looking for something special?
            </h3>
            <p className="text-xs sm:text-sm text-ivory-200/80 font-sans font-light max-w-xl">
              Talk to us about your jewellery requirements. We specialize in custom weights, designs, and matching sets.
            </p>
          </div>

          <button
            onClick={handleDirectWhatsApp}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-emerald-950 font-bold px-8 py-3.5 rounded-full text-sm sm:text-base tracking-wide shadow-gold-subtle hover:shadow-gold-hover transition-all duration-300 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 text-emerald-950 fill-emerald-950" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        {/* Main Grid: Details + Map + Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Hours Card */}
            <div className="bg-ivory-50 rounded-2xl p-6 sm:p-7 border border-gold-500/25 space-y-5 shadow-sm">
              <div>
                <h4 className="font-serif font-bold text-lg text-emerald-950 mb-1">
                  Kanchan Jewellers
                </h4>
                <div className="flex items-start gap-2.5 text-sm text-gray-700 mt-2">
                  <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-emerald-950 font-semibold font-sans">
                      Dari, Dharamshala, Himachal Pradesh
                    </strong>
                    <span className="text-xs text-gray-500">Pin Code: 176057 • Near Main Bazaar Dari</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gold-500/20 flex items-start gap-2.5 text-sm text-gray-700">
                <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 font-semibold font-sans">
                    Showroom Timings
                  </strong>
                  <span className="text-xs text-gray-600">Monday - Sunday: 10:00 AM - 7:30 PM</span>
                  <span className="block text-[11px] text-gold-700 font-medium mt-0.5">Open all 7 days for your convenience</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
              {/* Phone Button */}
              <a
                href={`tel:${STORE_DETAILS.phone}`}
                className="flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-gold-200 border border-gold-500/30 p-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>Call Us</span>
              </a>

              {/* WhatsApp Button */}
              <button
                onClick={handleDirectWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075E54] text-white p-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              {/* Instagram Button */}
              <a
                href={STORE_DETAILS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-ivory-100 text-gray-800 border border-gold-500/30 p-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram</span>
              </a>

              {/* Facebook Button */}
              <a
                href={STORE_DETAILS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white hover:bg-ivory-100 text-gray-800 border border-gold-500/30 p-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </a>

              {/* Google Maps Button */}
              <a
                href={STORE_DETAILS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 sm:col-span-1 lg:col-span-2 flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-emerald-950 p-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm"
              >
                <Compass className="w-4 h-4 text-emerald-950" />
                <span>Get Directions (Google Maps)</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Map & Consultation Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Google Map Area */}
            <div className="rounded-2xl overflow-hidden border border-gold-500/30 shadow-md bg-emerald-950 aspect-[16/9] relative">
              <iframe
                title="Kanchan Jewellers Dari Dharamshala Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26986.305917872017!2d76.31502444648777!3d32.21903429392288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391b50de00570b55%3A0xe54c46f6f9479b18!2sDari%2C%20Dharamshala%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-[105%]"
              ></iframe>

              {/* Map Floating Card */}
              <div className="absolute top-3 left-3 bg-emerald-950/95 text-gold-200 p-2.5 rounded-lg border border-gold-500/40 text-xs shadow-lg backdrop-blur-sm flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-ping"></div>
                <span>Dari, Dharamshala Showroom</span>
              </div>
            </div>

            {/* Quick Requirements Form */}
            <div className="bg-ivory-50 rounded-2xl p-6 sm:p-7 border border-gold-500/25 shadow-sm">
              <h4 className="font-serif font-bold text-lg text-emerald-950 mb-1">
                Jewellery Enquiry & Custom Orders
              </h4>
              <p className="text-xs text-gray-500 mb-5 font-sans">
                Fill in your details and we will connect with you immediately via WhatsApp.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Jewellery Category
                  </label>
                  <select
                    value={formData.jewelleryType}
                    onChange={(e) => setFormData({ ...formData, jewelleryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 font-sans"
                  >
                    <option value="916 Gold Jewellery">916 Hallmark Gold Jewellery</option>
                    <option value="92.5 Italian Silver">92.5 Italian Silver Jewellery</option>
                    <option value="Diamond Jewellery">Certified Diamond Jewellery</option>
                    <option value="Bridal Jewellery Set">Bridal Jewellery Collection</option>
                    <option value="Custom Order">Custom Design / Old Gold Exchange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Your Requirements / Message
                  </label>
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for (weight range, occasion, design preferences)..."
                    className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 font-sans"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-gold-200 border border-gold-500/40 py-3 rounded-xl text-sm font-semibold tracking-wide shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Send Requirements on WhatsApp</span>
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
