import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Search,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { POPULAR_LOCATIONS } from '../data/categoriesData';

const SERVICE_CATEGORIES = [
  'All Services',
  'Electricians',
  'Plumbing & Sanitary',
  'Mechanics & Towing',
  'Home Cleaning',
  'Photography & Video',
  'Event Planning',
  'Beauty & Salon'
];

export default function ServicesPage() {
  const { listings } = useMarketplace();
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [selectedTown, setSelectedTown] = useState('All Himachal');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Get service listings
  const services = useMemo(() => {
    return listings.filter((item) => {
      const isService = item.listingType === 'service' || item.category === 'services';
      if (!isService) return false;

      if (activeCategory !== 'All Services' && item.subcategory !== activeCategory) {
        return false;
      }

      if (selectedTown !== 'All Himachal' && !item.location.toLowerCase().includes(selectedTown.toLowerCase())) {
        return false;
      }

      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [listings, activeCategory, selectedTown, searchKeyword]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Local Services</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#0B0F17] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden mb-10 shadow-xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold mb-3 border border-cyan-500/30">
              <Wrench className="w-3.5 h-3.5" /> Verified Local Technicians & Pros
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Himachal Local Services & Maintenance
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Find emergency electricians, certified plumbers, mountain car mechanics, wedding photographers, and deep cleaners in Dharamshala, Kangra, Palampur, and Shimla.
            </p>

            <div className="mt-6">
              <Link
                to="/post-ad"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow inline-flex items-center gap-2"
              >
                <span>+ List Your Local Service</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-subtle-card space-y-4">
          {/* Subcategory Pills */}
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white shadow'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Location Bar */}
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search electricians, plumbers..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-yellow-400"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500 font-medium">Town:</span>
                <select
                  value={selectedTown}
                  onChange={(e) => setSelectedTown(e.target.value)}
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
              Showing {services.length} {services.length === 1 ? 'provider' : 'providers'}
            </span>
          </div>
        </div>

        {/* Services Cards Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => {
              const cleanPhone = (srv.seller.whatsapp || srv.seller.phone || '9816000000').replace(/[^0-9]/g, '');
              const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=Hello ${encodeURIComponent(srv.seller.name)}, I found your service "${encodeURIComponent(srv.title)}" on DOT Hub. When are you available?`;

              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl border border-gray-200 hover:border-yellow-400 p-6 shadow-subtle-card hover:shadow-hover-card transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image with provider badge */}
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                      <img
                        src={srv.images[0]}
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                        Verified Pro
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                        {srv.subcategory}
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {srv.rating}
                        <span className="text-gray-400 font-normal">({srv.reviewsCount})</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 line-clamp-1 transition-colors mt-2">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                      {srv.description}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                      <span>{srv.location} ({srv.area})</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Service Charge</span>
                      <span className="text-lg font-black text-gray-900">
                        ₹{srv.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <Link
                        to={`/listing/${srv.id}`}
                        className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto my-8">
            <Wrench className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900 mb-1">
              No service providers found
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Try selecting "All Services" or changing your town filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Services');
                setSelectedTown('All Himachal');
                setSearchKeyword('');
              }}
              className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
