import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Star,
  CheckCircle2,
  Car,
  Briefcase,
  Store,
  Layers,
  Clock,
  PlusCircle,
  PhoneCall
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES, POPULAR_LOCATIONS } from '../data/categoriesData';
import { TESTIMONIALS, FAQS } from '../data/demoData';
import ListingCard from '../components/common/ListingCard';
import CategoryIcon from '../components/common/CategoryIcon';

export default function Home() {
  const {
    listings,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery
  } = useMarketplace();
  const navigate = useNavigate();

  const [activeFaq, setActiveFaq] = useState(0);
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [heroCategory, setHeroCategory] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    let queryParams = [];
    if (heroSearchInput.trim()) queryParams.push(`q=${encodeURIComponent(heroSearchInput.trim())}`);
    if (heroCategory) queryParams.push(`category=${encodeURIComponent(heroCategory)}`);
    if (selectedLocation && selectedLocation !== 'All Himachal') {
      queryParams.push(`location=${encodeURIComponent(selectedLocation)}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    navigate(`/explore${queryString}`);
  };

  // Filter listings for sections
  const featuredListings = listings.filter((l) => l.featured).slice(0, 4);
  const trendingListings = listings.filter((l) => l.trending).slice(0, 4);
  const recentListings = [...listings].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)).slice(0, 4);
  const serviceListings = listings.filter((l) => l.listingType === 'service' || l.category === 'services').slice(0, 3);
  const rideListings = listings.filter((l) => l.listingType === 'ride' || l.category === 'rides-travel').slice(0, 3);
  const businessListings = listings.filter((l) => l.listingType === 'business' || l.category === 'food-restaurants').slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-[#0B0F17] text-white overflow-hidden py-16 sm:py-24 lg:py-28 border-b border-gray-800">
        {/* Background Image with Cinematic Dark Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
            alt="Himachal Mountains"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/90 via-[#0B0F17]/80 to-[#0B0F17]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/90 via-transparent to-[#0B0F17]/90"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-yellow-400/15 blur-[140px] rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-tight">
            Your Local Marketplace.{' '}
            <span className="text-yellow-400">Everything in One DOT.</span>
          </h1>

          {/* Clean Supporting text */}
          <p className="text-sm sm:text-lg text-gray-300 max-w-xl mx-auto mt-3.5 leading-relaxed font-normal">
            Buy, Sell, Discover and Connect with your local community.
          </p>

          {/* Clean Search Box with Location & Category Filters */}
          <div className="mt-8 max-w-3xl mx-auto bg-gray-900/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-gray-700/80 shadow-2xl">
            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              {/* Location Select */}
              <div className="sm:col-span-3 relative">
                <div className="flex items-center bg-[#0B0F17] rounded-xl px-3 py-2.5 border border-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0 mr-1.5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer truncate"
                  >
                    {POPULAR_LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="bg-gray-900 text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Select */}
              <div className="sm:col-span-3 relative">
                <div className="flex items-center bg-[#0B0F17] rounded-xl px-3 py-2.5 border border-gray-700">
                  <Layers className="w-3.5 h-3.5 text-yellow-400 shrink-0 mr-1.5" />
                  <select
                    value={heroCategory}
                    onChange={(e) => setHeroCategory(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer truncate"
                  >
                    <option value="" className="bg-gray-900 text-white">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.slug} className="bg-gray-900 text-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Keywords */}
              <div className="sm:col-span-4 relative">
                <div className="flex items-center bg-[#0B0F17] rounded-xl px-3 py-2.5 border border-gray-700">
                  <Search className="w-3.5 h-3.5 text-gray-400 shrink-0 mr-1.5" />
                  <input
                    type="text"
                    value={heroSearchInput}
                    onChange={(e) => setHeroSearchInput(e.target.value)}
                    placeholder="Search anything..."
                    className="w-full bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[40px] bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold rounded-xl transition-colors shadow flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-3.5 mt-6">
            <Link
              to="/explore"
              className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-extrabold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/post-ad"
              className="px-5 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 hover:text-yellow-400 border border-gray-700 text-xs sm:text-sm font-bold shadow transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-yellow-400" />
              <span>Start Selling</span>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES (Icon Cards) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-200">
              Explore By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Browse Popular Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-yellow-600 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl p-4 border border-gray-200 hover:border-yellow-400 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${cat.color} group-hover:scale-110 transition-transform`}
              >
                <CategoryIcon name={cat.iconName} className="w-6 h-6" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-yellow-600 transition-colors line-clamp-1">
                {cat.shortName}
              </h3>
              <span className="text-[11px] text-gray-400 mt-0.5">
                {cat.count} listings
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS & LISTINGS */}
      <section className="py-12 bg-white border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-200 flex items-center gap-1 w-fit">
                <Sparkles className="w-3 h-3 text-yellow-500" /> Handpicked
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                Featured Listings in {selectedLocation}
              </h2>
            </div>
            <Link
              to="/explore?filter=featured"
              className="text-xs sm:text-sm font-bold text-gray-900 hover:text-yellow-600 flex items-center gap-1 group"
            >
              <span>See More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      </section>

      {/* NEARBY LOCAL SERVICES SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
              Verified Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Nearby Services & Technicians
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Plumbers, electricians, photographers, and home care experts ready to assist you.
            </p>
          </div>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-cyan-700 flex items-center gap-1 group"
          >
            <span>All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceListings.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-yellow-400 p-5 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={service.images[0]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                    Verified Pro
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-cyan-700">{service.subcategory}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {service.rating}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {service.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{service.location} ({service.area})</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Starting from</span>
                  <span className="text-lg font-extrabold text-gray-900">
                    ₹{service.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${service.seller.whatsapp}?text=Hello, I need service assistance for ${encodeURIComponent(service.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors"
                    title="WhatsApp Inquiry"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <Link
                    to={`/listing/${service.id}`}
                    className="px-3.5 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RIDES AND TRAVEL LISTINGS */}
      <section className="py-16 bg-gray-900 text-white border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md border border-yellow-400/30">
                Himachal Mountain Transit
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Rides, Airport Cabs & Vehicle Rentals
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Direct taxi contacts, Gaggal airport drops, shared mountain cabs, and Royal Enfield rentals.
              </p>
            </div>
            <Link
              to="/rides"
              className="text-xs sm:text-sm font-bold text-yellow-400 hover:underline flex items-center gap-1 group"
            >
              <span>Explore All Rides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rideListings.map((ride) => (
              <div
                key={ride.id}
                className="bg-[#0B0F17] rounded-2xl border border-gray-800 hover:border-yellow-400/70 p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-gray-800">
                    <img
                      src={ride.images[0]}
                      alt={ride.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded">
                      {ride.condition}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="font-semibold text-yellow-400">{ride.subcategory}</span>
                    <span className="flex items-center gap-1 text-yellow-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-yellow-400" /> {ride.rating}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-yellow-400 transition-colors">
                    {ride.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {ride.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{ride.location} ({ride.area})</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Rate / Fare</span>
                    <span className="text-lg font-extrabold text-yellow-400">
                      ₹{ride.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${ride.seller.whatsapp}?text=Hello, I want to book ride: ${encodeURIComponent(ride.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                    <Link
                      to={`/listing/${ride.id}`}
                      className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING LISTINGS SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200 flex items-center gap-1 w-fit">
              <TrendingUp className="w-3 h-3 text-rose-500" /> High Demand
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Trending Right Now
            </h2>
          </div>
          <Link
            to="/explore?sort=popular"
            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-yellow-600 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingListings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </section>

      {/* RECENTLY ADDED LISTINGS */}
      <section className="py-16 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 flex items-center gap-1 w-fit">
                <Clock className="w-3 h-3 text-blue-500" /> Fresh On DOT Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                Recently Added Listings
              </h2>
            </div>
            <Link
              to="/explore?sort=newest"
              className="text-xs sm:text-sm font-bold text-gray-900 hover:text-yellow-600 flex items-center gap-1 group"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentListings.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL BUSINESSES SPOTLIGHT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1 w-fit">
              <Store className="w-3 h-3 text-emerald-600" /> Support Local
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Local Businesses & Cafes
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Discover artisan roasteries, mountain trekking camps, and local tea estates.
            </p>
          </div>
          <Link
            to="/businesses"
            className="text-xs sm:text-sm font-bold text-gray-900 hover:text-emerald-700 flex items-center gap-1 group"
          >
            <span>Browse All Businesses</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessListings.map((biz) => (
            <div
              key={biz.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-yellow-400 p-5 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img
                    src={biz.images[0]}
                    alt={biz.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                    Local Partner
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span className="font-semibold text-emerald-700">{biz.subcategory}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {biz.rating}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                  {biz.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                  {biz.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{biz.location} ({biz.area})</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Typical Cost</span>
                  <span className="text-lg font-extrabold text-gray-900">
                    ₹{biz.price}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${biz.seller.whatsapp}?text=Hello, I found your business on DOT Hub: ${encodeURIComponent(biz.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <Link
                    to={`/listing/${biz.id}`}
                    className="px-3.5 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    View Place
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW DOT HUB WORKS SECTION */}
      <section className="py-20 bg-gray-900 text-white border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-md border border-yellow-400/30">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            How DOT Hub Works
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
            No middleman, no unnecessary delays. Connect directly with people in your neighborhood.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            <div className="bg-[#0B0F17] rounded-2xl p-6 border border-gray-800 relative">
              <span className="text-4xl font-black text-yellow-400/25 absolute top-4 right-4">01</span>
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center text-yellow-400 mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Discover or Post</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Filter by your specific town in Himachal (Kangra, Dharamshala, Palampur, etc.) to discover pre-loved items, book local services, or post your own ad in under 2 minutes.
              </p>
            </div>

            <div className="bg-[#0B0F17] rounded-2xl p-6 border border-gray-800 relative">
              <span className="text-4xl font-black text-yellow-400/25 absolute top-4 right-4">02</span>
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center text-yellow-400 mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Connect via WhatsApp</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Skip complicated checkout forms. Click the instant WhatsApp or Call button to chat directly with the seller or technician with pre-filled listing information.
              </p>
            </div>

            <div className="bg-[#0B0F17] rounded-2xl p-6 border border-gray-800 relative">
              <span className="text-4xl font-black text-yellow-400/25 absolute top-4 right-4">03</span>
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/40 flex items-center justify-center text-yellow-400 mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Meet & Complete Deal</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Inspect items in person at a convenient local public place, confirm service work, or enjoy your ride. 100% transparent and zero transaction fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS OF USING DOT HUB */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
            Built Specifically For Himachal Communities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-yellow-400 transition-all shadow-subtle-card">
            <div className="w-11 h-11 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">0% Commission Fees</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              We never take a cut of your sale. Every rupee you earn stays completely with you.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-yellow-400 transition-all shadow-subtle-card">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Hyper-Local Discovery</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Find items in your immediate neighborhood instead of dealing with distant interstate couriers.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-yellow-400 transition-all shadow-subtle-card">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Verified Member Badges</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Detailed seller profiles, badges, and feedback for safe, trusted neighbor-to-neighbor trades.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-yellow-400 transition-all shadow-subtle-card">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm mb-1">Instant WhatsApp Inquiries</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pre-configured chat links let you begin friendly bargaining or coordination immediately.
            </p>
          </div>
        </div>
      </section>

      {/* SELLER AND BUSINESS PROMOTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B0F17] via-gray-900 to-[#1E293B] p-8 sm:p-12 border border-yellow-400/40 text-white overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-yellow-400/10 blur-[90px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mb-3 border border-yellow-400/40">
              <Sparkles className="w-3.5 h-3.5" /> For Local Sellers & Businesses
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Ready to sell or grow your business across Himachal?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
              List products, promote your electrician or plumbing services, or register your mountain cafe. Reach thousands of local residents and travelers with zero listing fee.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <Link
                to="/post-ad"
                className="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-extrabold shadow-lg transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Your Free Ad Now</span>
              </Link>
              <Link
                to="/businesses"
                className="px-5 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm font-bold border border-gray-600 transition-colors"
              >
                Register Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Identified Demo Content) */}
      <section className="py-16 bg-white border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
              Community Voices
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Loved by Himachal Locals
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              (Sample demo reviews from Dharamshala, Palampur, and Kangra residents)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-200">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-yellow-400"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                    <p className="text-[11px] text-gray-500">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-subtle-card transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-yellow-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-yellow-500 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-yellow-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
