import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Heart,
  MessageCircle,
  Phone,
  Share2,
  Flag,
  ShieldCheck,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import ListingCard from '../components/common/ListingCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    listings,
    isWishlisted,
    toggleWishlist,
    showToast,
    submitInquiry
  } = useMarketplace();

  // Find listing by id or slug
  const listing = listings.find((l) => l.id === id || l.slug === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Inquiry form state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('Is this listing still available? I would like to inspect it.');

  // Report form state
  const [reportReason, setReportReason] = useState('Misleading information');
  const [reportDetails, setReportDetails] = useState('');

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md text-center border border-gray-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-xs text-gray-500 mb-6">
            The listing you are trying to view might have been sold or removed.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 text-black text-xs font-bold shadow"
          >
            <span>Browse All Listings</span>
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(listing.id);

  // Clean WhatsApp number
  const cleanPhone = (listing.seller?.whatsapp || listing.seller?.phone || '9816000000').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    `Hello ${listing.seller?.name || 'Seller'}, I am interested in your DOT Hub listing: "${listing.title}" for ₹${listing.price.toLocaleString('en-IN')}. Is this still available?`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodedMsg}`;

  // Copy share link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Listing link copied to clipboard! 📋', 'success');
    setShareModalOpen(false);
  };

  // Submit inquiry
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    submitInquiry({
      listingId: listing.id,
      listingTitle: listing.title,
      senderName: inquiryName || 'Guest User',
      senderPhone: inquiryPhone || '+91 98160 00000',
      message: inquiryMsg
    });
    setInquiryModalOpen(false);
  };

  // Submit report
  const handleReportSubmit = (e) => {
    e.preventDefault();
    showToast('Listing reported to DOT Hub Safety team. Thank you.', 'info');
    setReportModalOpen(false);
  };

  // Related listings
  const relatedListings = listings
    .filter((l) => l.id !== listing.id && (l.category === listing.category || l.location === listing.location))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-yellow-600">Explore</Link>
          <span>/</span>
          <Link to={`/category/${listing.category}`} className="hover:text-yellow-600 capitalize">
            {listing.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold truncate max-w-xs">{listing.title}</span>
        </div>

        {/* Main Grid: Gallery + Pricing and Seller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* LEFT: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Big Image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-900 border border-gray-200 shadow-md">
              <img
                src={listing.images[activeImageIndex] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />

              {listing.featured && (
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-black uppercase px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Featured Listing
                </span>
              )}

              {/* Wishlist Button floating */}
              <button
                onClick={() => toggleWishlist(listing.id)}
                className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md shadow-xl transition-all ${
                  wishlisted
                    ? 'bg-white text-rose-500 fill-rose-500 scale-105'
                    : 'bg-black/50 text-white hover:bg-white hover:text-rose-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500' : ''}`} />
              </button>

              {/* Condition Badge */}
              {listing.condition && (
                <span className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg">
                  Condition: {listing.condition}
                </span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {listing.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-yellow-400 ring-2 ring-yellow-400/40 scale-95'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Product Description */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card">
              <h2 className="text-lg font-extrabold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Detailed Description
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>

              {/* Specifications / Attributes Table */}
              {listing.attributes && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">
                    Listing Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {Object.entries(listing.attributes).map(([key, val]) => (
                      <div key={key} className="flex justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-500 font-medium">{key}</span>
                        <span className="text-gray-900 font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Safety notice disclaimer */}
              <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">DOT Hub Safe Trading Advice</h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Inspect the item in person in a safe public spot (e.g. Kotwali Bazaar, Mall Road). Never transfer advance booking deposits to unverified contacts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Price, Contact, & Seller Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Price & Title Box */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-5">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="uppercase font-bold tracking-wider text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-200">
                  {listing.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Posted {listing.postedDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                {listing.title}
              </h1>

              {/* Location Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
                <span className="font-semibold">{listing.location}</span>
                {listing.area && <span className="text-gray-400">({listing.area})</span>}
              </div>

              {/* Pricing row */}
              <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-gray-900">
                    ₹{listing.price.toLocaleString('en-IN')}
                  </span>
                  {listing.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">
                      ₹{listing.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                {listing.isNegotiable && (
                  <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
                    Price Negotiable
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-3">
                {/* WhatsApp Direct Action (Prompt requirement: valid WhatsApp link with prefilled text) */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>

                {/* Call Seller */}
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full py-3 rounded-2xl bg-gray-900 hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span>Call Seller ({listing.seller.phone})</span>
                </a>

                {/* Contact Seller Inquiry Form */}
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow"
                >
                  <span>Send In-App Inquiry</span>
                </button>
              </div>

              {/* Share & Report Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-yellow-500" />
                  <span>Share Listing</span>
                </button>

                <button
                  onClick={() => setReportModalOpen(true)}
                  className="flex items-center gap-1.5 hover:text-rose-600 transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Ad</span>
                </button>
              </div>
            </div>

            {/* SELLER PROFILE CARD */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-subtle-card space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Seller Information
              </span>

              <div className="flex items-start gap-4">
                <img
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-yellow-400 shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-base text-gray-900">
                      {listing.seller.name}
                    </h3>
                    {listing.seller.verified && (
                      <ShieldCheck className="w-4 h-4 text-blue-500" title="Verified Member" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Member on DOT Hub since {listing.seller.memberSince}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-900">
                    {listing.seller.badge || 'Community Member'}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                <span className="text-gray-500">Seller Community Score</span>
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {listing.rating || 4.9} / 5.0
                  <span className="text-gray-400 font-normal">({listing.reviewsCount || 12} reviews)</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED & SIMILAR LISTINGS */}
        {relatedListings.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md border border-yellow-200">
                  Similar Discoveries
                </span>
                <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
                  Related Listings in Himachal
                </h2>
              </div>
              <Link
                to={`/category/${listing.category}`}
                className="text-xs font-bold text-gray-900 hover:text-yellow-600 flex items-center gap-1"
              >
                <span>View More</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedListings.map((rel) => (
                <ListingCard key={rel.id} listing={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: IN-APP INQUIRY */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setInquiryModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Contact {listing.seller.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Regarding: "{listing.title}"
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  placeholder="e.g. Vikas Sharma"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  placeholder="+91 98160 00000"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Your Message</label>
                <textarea
                  rows={3}
                  required
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setInquiryModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SHARE */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShareModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1">Share this Listing</h3>
            <p className="text-xs text-gray-500 mb-4">
              Share with friends in Himachal looking for this item.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Listing Link</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Check out this listing on DOT Hub: ${listing.title} for ₹${listing.price} - ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REPORT */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-gray-900 mb-1 flex items-center gap-1.5 text-rose-600">
              <Flag className="w-4 h-4" />
              Report Listing
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Help us keep DOT Hub safe and clean for Himachal residents.
            </p>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
                >
                  <option value="Misleading information">Misleading information or price</option>
                  <option value="Item already sold">Item already sold</option>
                  <option value="Prohibited or illegal item">Prohibited or illegal item</option>
                  <option value="Suspected fraud or scam">Suspected fraud or scam</option>
                  <option value="Duplicate listing">Duplicate listing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Additional Details (Optional)</label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Tell us what seems wrong..."
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
