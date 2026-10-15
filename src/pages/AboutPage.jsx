import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, ShieldCheck, Heart, Users, Target, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">About DOT Hub</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0B0F17] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-yellow-400/10 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mb-3 border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Our Himachal Story
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              About DOT Hub
            </h1>
            <p className="text-sm text-yellow-400 font-semibold mt-1">
              "Your Local Marketplace. Everything in One DOT."
            </p>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
              We started DOT Hub with a simple observation: across the beautiful valleys of Himachal Pradesh—from Kangra and Dharamshala to Palampur, Shimla, and Manali—connecting with local buyers, trusted technicians, and mountain drivers shouldn't depend on noisy social media groups or giant corporate platforms that take huge commission cuts.
            </p>
          </div>
        </div>

        {/* Story & Values Content */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-subtle-card space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-500" />
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              DOT Hub's mission is to empower local residents, independent artisans, and neighborhood service providers throughout Himachal Pradesh. By pairing modern digital classifieds with direct WhatsApp connectivity and zero commission fees, we ensure that neighbors can trade openly and keep wealth inside the local mountain economy.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/20 text-yellow-600 flex items-center justify-center font-bold mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Hyper-Local Focus</h3>
              <p className="text-xs text-gray-500">
                Tailored for Himachal topography and towns: Dharamshala, Palampur, Kangra, Shimla, and Manali.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Zero Commission</h3>
              <p className="text-xs text-gray-500">
                100% free trading. No listing fees, no commission deductions, and no middleman markup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center font-bold mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Community First</h3>
              <p className="text-xs text-gray-500">
                Support local craftsmen, weavers, homestay hosts, and homegrown cafes.
              </p>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-gray-900 mb-3">
              Why the Name "DOT Hub"?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every town, village, and locality in Himachal is like a unique point or "DOT" on the map. DOT Hub brings all these dots together into a single unified community marketplace—giving everyone an equal opportunity to discover and be discovered.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Want to join or list something today?</h4>
              <p className="text-xs text-gray-500">It only takes two minutes to post an ad.</p>
            </div>
            <Link
              to="/post-ad"
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow flex items-center gap-1.5"
            >
              <span>+ Post Free Listing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
