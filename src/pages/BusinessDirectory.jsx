import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  MapPin,
  Clock,
  Star,
  Search,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { POPULAR_LOCATIONS } from '../data/categoriesData';

export default function BusinessDirectory() {
  const { listings } = useMarketplace();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Himachal');

  // Business listings
  const businesses = useMemo(() => {
    return listings.filter((item) => {
      const isBiz =
        item.listingType === 'business' ||
        item.category === 'businesses' ||
        item.category === 'food-restaurants';

      if (!isBiz) return false;

      if (selectedCity !== 'All Himachal' && !item.location.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [listings, selectedCity, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Local Business Directory</span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#0B0F17] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden mb-10 shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/30">
              <Store className="w-3.5 h-3.5" /> Support Local Himachal Economy
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Discover Local Himachal Businesses
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Find handcrafted coffee roasteries, organic tea gardens, homestays, adventure outfitters, and local artisan shops across Kangra Valley and beyond.
            </p>

            <div className="mt-6">
              <Link
                to="/post-ad"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow inline-flex items-center gap-2"
              >
                <span>+ Register Your Local Business</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Search & Location Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-subtle-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cafes, shops, outfitters..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-yellow-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 font-medium">Town:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 bg-gray-50"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <span className="text-xs text-gray-500">
            {businesses.length} verified {businesses.length === 1 ? 'place' : 'places'}
          </span>
        </div>

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz) => {
            const cleanPhone = (biz.seller.whatsapp || biz.seller.phone || '9816000000').replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=Hello ${encodeURIComponent(biz.title)}, I found your listing on DOT Hub!`;

            return (
              <div
                key={biz.id}
                className="bg-white rounded-3xl border border-gray-200 hover:border-yellow-400 p-6 shadow-subtle-card hover:shadow-hover-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={biz.images[0]}
                      alt={biz.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Verified Business
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {biz.subcategory}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {biz.rating}
                      <span className="text-gray-400 font-normal">({biz.reviewsCount})</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 line-clamp-1 transition-colors mt-2">
                    {biz.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {biz.description}
                  </p>

                  <div className="mt-4 p-3 bg-gray-50 rounded-xl space-y-1 text-xs">
                    <p className="flex items-center gap-2 text-gray-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <span>{biz.location} ({biz.area})</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-500 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{biz.attributes?.Timings || '9:00 AM – 8:00 PM (Mon-Sat)'}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                      title="Call Business"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>

                  <Link
                    to={`/listing/${biz.id}`}
                    className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
                  >
                    View Place
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
