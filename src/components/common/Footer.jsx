import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ArrowRight,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { POPULAR_LOCATIONS, CATEGORIES } from '../../data/categoriesData';

export default function Footer() {
  return (
    <footer className="bg-[#0B0F17] text-gray-300 border-t border-gray-800">
      {/* Top Value Banner */}
      <div className="border-b border-gray-800/80 bg-[#070A10]/90 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 text-yellow-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Hyper-Local to Himachal</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Connecting neighborhood buyers and verified service providers across Kangra, Dharamshala, Shimla, Manali, and beyond.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 text-yellow-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Direct WhatsApp Connect</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Zero commission middleman fees. Chat directly with verified sellers and local drivers with one single click.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center shrink-0 text-yellow-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Safe Community Trading</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Verified member badges, realistic community reviews, and safety guidelines to ensure honest transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-yellow-400 p-0.5 bg-black">
                <img
                  src="/logo.jpg"
                  alt="DOT Hub Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-wider text-white">
                  DOT<span className="text-yellow-400">HUB</span>
                </span>
                <p className="text-xs text-gray-400">Your Local Marketplace. Everything in One DOT.</p>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              DOT Hub is Himachal Pradesh's community-driven classifieds and marketplace platform. Buy and sell used gadgets, discover dependable local plumbers and electricians, book mountain cabs, and support local businesses.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold">
                <span>📍 Built with pride in Dharamshala, HP</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                <span>support@dothub.local (Frontend Demo)</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>+91 98160 00000 (Helpline Demo)</span>
              </p>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/explore" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-yellow-400" />
                  Explore All Listings
                </Link>
              </li>
              <li>
                <Link to="/category/electronics" className="hover:text-yellow-400 transition-colors">
                  Electronics & Mobiles
                </Link>
              </li>
              <li>
                <Link to="/category/vehicles" className="hover:text-yellow-400 transition-colors">
                  Bikes, Cars & 4x4s
                </Link>
              </li>
              <li>
                <Link to="/category/real-estate" className="hover:text-yellow-400 transition-colors">
                  Homestays & Flats
                </Link>
              </li>
              <li>
                <Link to="/category/home-furniture" className="hover:text-yellow-400 transition-colors">
                  Home & Solid Furniture
                </Link>
              </li>
              <li>
                <Link to="/category/fashion" className="hover:text-yellow-400 transition-colors">
                  Himachali Woolens & Shawls
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-yellow-400 hover:underline font-semibold pt-1 inline-block">
                  All 12 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Local Services & Transport */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Services & Travel
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-yellow-400" />
                  Local Technicians
                </Link>
              </li>
              <li>
                <Link to="/rides" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-yellow-400" />
                  Airport Cabs & Shared Rides
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="hover:text-yellow-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-yellow-400" />
                  Local Business Directory
                </Link>
              </li>
              <li>
                <Link to="/post-ad" className="text-yellow-400 font-semibold hover:underline">
                  + Start Selling / Post Ad
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-yellow-400 transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-yellow-400 transition-colors">
                  My Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations & Trust */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">
              Himachal Towns
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.map((loc) => (
                <Link
                  key={loc}
                  to={`/explore?location=${encodeURIComponent(loc)}`}
                  className="px-2 py-1 rounded bg-gray-900 hover:bg-gray-800 hover:text-yellow-400 text-[11px] text-gray-400 border border-gray-800 transition-colors"
                >
                  {loc}
                </Link>
              ))}
            </div>

            <h4 className="text-white font-bold text-sm uppercase tracking-wider mt-6 mb-3 border-b border-gray-800 pb-2">
              Trust & Legal
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition-colors">
                  About DOT Hub
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-yellow-400 transition-colors">
                  Safety & Community Rules
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Demo Disclaimer */}
      <div className="border-t border-gray-800/80 bg-[#06090F] py-6 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} <span className="text-white font-bold">DOT Hub</span>. All rights reserved. Built for Himachal Pradesh.
          </p>
          <p className="text-[11px] text-gray-400 text-center sm:text-right">
            ⚡ Frontend Demonstration Prototype. Sample listings & contact channels are for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
