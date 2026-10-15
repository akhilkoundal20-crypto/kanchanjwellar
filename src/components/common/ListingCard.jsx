import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Heart, MessageCircle, Star, Sparkles, Phone, Eye } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function ListingCard({ listing, viewMode = 'grid' }) {
  const { isWishlisted, toggleWishlist } = useMarketplace();
  const navigate = useNavigate();

  const wishlisted = isWishlisted(listing.id);

  // Generate WhatsApp inquiry link
  const cleanPhone = (listing.seller?.whatsapp || listing.seller?.phone || '9816000000').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello ${listing.seller?.name || 'Seller'}, I am interested in your listing on DOT Hub: "${listing.title}" listed for ₹${listing.price.toLocaleString('en-IN')}. Is this still available?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodedMsg}`;

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-gray-200 hover:border-yellow-400/80 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 p-4 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
        {/* Thumbnail Image */}
        <div
          onClick={() => navigate(`/listing/${listing.id}`)}
          className="relative w-full sm:w-56 h-44 sm:h-36 rounded-xl overflow-hidden shrink-0 bg-gray-100 cursor-pointer"
        >
          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {listing.featured && (
            <span className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
          {listing.condition && (
            <span className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
              {listing.condition}
            </span>
          )}
        </div>

        {/* Content details */}
        <div className="flex-1 w-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200">
                {listing.category}
              </span>
              <span className="text-xs text-gray-400">{listing.postedDate}</span>
            </div>

            <h3
              onClick={() => navigate(`/listing/${listing.id}`)}
              className="text-base font-bold text-gray-900 group-hover:text-yellow-600 cursor-pointer line-clamp-1 transition-colors"
            >
              {listing.title}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2 mt-1">
              {listing.description}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                <span className="font-medium text-gray-700">{listing.location}</span>
                {listing.area && <span className="text-gray-400">({listing.area})</span>}
              </span>
              {listing.rating && (
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {listing.rating}
                  <span className="text-gray-400 font-normal">({listing.reviewsCount})</span>
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Actions */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-gray-900">
                ₹{listing.price.toLocaleString('en-IN')}
              </span>
              {listing.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{listing.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {listing.isNegotiable && (
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                  Negotiable
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(listing.id);
                }}
                className={`p-2 rounded-xl border transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-500'
                    : 'bg-gray-50 border-gray-200 text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <Link
                to={`/listing/${listing.id}`}
                className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="group bg-white rounded-2xl border border-gray-200 hover:border-yellow-400/80 shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      <div>
        {/* Image Box */}
        <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {listing.featured && (
              <span className="bg-yellow-400 text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}
            {listing.condition && (
              <span className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-md">
                {listing.condition}
              </span>
            )}
          </div>

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(listing.id);
            }}
            className={`absolute top-2.5 right-2.5 p-2 rounded-xl backdrop-blur-md shadow-md transition-all ${
              wishlisted
                ? 'bg-white text-rose-500 fill-rose-500'
                : 'bg-black/40 text-white hover:bg-white hover:text-rose-500'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Bottom tag on image */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-yellow-400" />
              {listing.location}
            </span>
            {listing.rating && (
              <span className="bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-yellow-400" />
                {listing.rating}
              </span>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="capitalize font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200/60">
              {listing.category}
            </span>
            <span>{listing.postedDate}</span>
          </div>

          <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 line-clamp-1 text-sm md:text-base transition-colors">
            {listing.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
            {listing.description}
          </p>
        </div>
      </div>

      {/* Pricing & Quick Contact */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-gray-900">
              ₹{listing.price.toLocaleString('en-IN')}
            </span>
            {listing.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                ₹{listing.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          {listing.isNegotiable && (
            <span className="text-[10px] text-emerald-700 font-semibold">
              Negotiable
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/listing/${listing.id}`);
            }}
            className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
