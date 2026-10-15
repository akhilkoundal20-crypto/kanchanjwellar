import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Navigation,
  MapPin,
  Calendar,
  Users,
  Search,
  MessageCircle,
  Phone,
  Sparkles,
  Info,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function RidesPage() {
  const { listings } = useMarketplace();

  // Search parameters
  const [fromTown, setFromTown] = useState('Dharamshala');
  const [toTown, setToTown] = useState('Gaggal Airport');
  const [rideTypeFilter, setRideTypeFilter] = useState('All'); // All, Airport Transfers, Shared Cabs, Bike Rentals

  const rides = useMemo(() => {
    return listings.filter((item) => {
      const isRide = item.listingType === 'ride' || item.category === 'rides-travel';
      if (!isRide) return false;

      if (rideTypeFilter !== 'All' && item.subcategory !== rideTypeFilter) {
        return false;
      }
      return true;
    });
  }, [listings, rideTypeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Himachal Rides & Cabs</span>
        </div>

        {/* Hero Banner with Route Finder Form */}
        <div className="bg-[#0B0F17] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden mb-10 shadow-xl">
          <div className="absolute right-0 top-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[110px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mb-3 border border-yellow-400/30">
              <Car className="w-3.5 h-3.5" /> Mountain Taxis & Direct Transfers
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Himachal Travel, Cabs & Bike Rentals
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Book verified local mountain drivers for Gaggal Airport (DHM) pickups, daily Chandigarh shuttles, and Royal Enfield rentals across Dharamshala, Kangra, Palampur, and Manali.
            </p>

            {/* Simulated Route Search Card */}
            <div className="mt-8 bg-gray-900/90 backdrop-blur-md p-4 rounded-2xl border border-gray-700 shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">From</label>
                  <div className="flex items-center bg-[#0B0F17] rounded-xl px-3 py-2 border border-gray-700">
                    <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0 mr-2" />
                    <input
                      type="text"
                      value={fromTown}
                      onChange={(e) => setFromTown(e.target.value)}
                      className="bg-transparent text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">To / Destination</label>
                  <div className="flex items-center bg-[#0B0F17] rounded-xl px-3 py-2 border border-gray-700">
                    <Navigation className="w-3.5 h-3.5 text-yellow-400 shrink-0 mr-2" />
                    <input
                      type="text"
                      value={toTown}
                      onChange={(e) => setToTown(e.target.value)}
                      className="bg-transparent text-white focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">Ride Type</label>
                  <select
                    value={rideTypeFilter}
                    onChange={(e) => setRideTypeFilter(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-gray-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="All">All Types</option>
                    <option value="Airport Transfers">Airport Transfers</option>
                    <option value="Shared Cabs">Shared Cabs</option>
                    <option value="Bike & Scooter Rentals">Bike Rentals</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Find Available Cabs</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Disclaimer notice (Requirement: do not claim live GPS driver tracking) */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold">Community Transport Notice</h4>
            <p className="text-[11px] text-amber-800 mt-0.5">
              These are verified local taxi union drivers and vehicle owners in Himachal. Contact them directly via WhatsApp or phone to confirm exact pickup timings and negotiate group fares. Live GPS driver tracking is not included in frontend demo.
            </p>
          </div>
        </div>

        {/* Rides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => {
            const cleanPhone = (ride.seller.whatsapp || ride.seller.phone || '9816000000').replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=Hello, I want to book ride: "${encodeURIComponent(ride.title)}" listed on DOT Hub. Please let me know availability.`;

            return (
              <div
                key={ride.id}
                className="bg-white rounded-3xl border border-gray-200 hover:border-yellow-400 p-6 shadow-subtle-card hover:shadow-hover-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                    <img
                      src={ride.images[0]}
                      alt={ride.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                      {ride.condition}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span className="font-bold text-yellow-700 bg-yellow-50 px-2.5 py-0.5 rounded border border-yellow-200">
                      {ride.subcategory}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {ride.rating}
                      <span className="text-gray-400 font-normal">({ride.reviewsCount})</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 group-hover:text-yellow-600 line-clamp-1 transition-colors mt-2">
                    {ride.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {ride.description}
                  </p>

                  <div className="mt-4 p-3 bg-gray-50 rounded-xl space-y-1 text-xs">
                    <p className="flex items-center gap-2 text-gray-700 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                      <span>Stand: {ride.location} ({ride.area})</span>
                    </p>
                    <p className="flex items-center gap-2 text-gray-500 text-[11px]">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>Operator: {ride.seller.name}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Fare / Rate</span>
                    <span className="text-lg font-black text-gray-900">
                      ₹{ride.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    <Link
                      to={`/listing/${ride.id}`}
                      className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
