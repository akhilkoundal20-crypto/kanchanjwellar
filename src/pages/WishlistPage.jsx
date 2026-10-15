import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import ListingCard from '../components/common/ListingCard';

export default function WishlistPage() {
  const { listings, wishlist, clearWishlist } = useMarketplace();

  const savedListings = listings.filter((item) => wishlist.includes(item.id));

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Saved Wishlist</span>
        </div>

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-xl bg-rose-50 text-rose-500 border border-rose-200">
                <Heart className="w-4 h-4 fill-rose-500" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                My Saved Listings
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              {savedListings.length} {savedListings.length === 1 ? 'item' : 'items'} saved in your local favorites
            </p>
          </div>

          {savedListings.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors w-fit"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        {savedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedListings.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-16 text-center max-w-lg mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Explore gadgets, mountain bikes, services, and local homestays across Kangra and Dharamshala. Save items to view and contact later!
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-extrabold shadow"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
