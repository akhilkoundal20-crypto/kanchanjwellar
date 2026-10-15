import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  LayoutDashboard,
  Package,
  Heart,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Edit3,
  Trash2,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import ListingCard from '../components/common/ListingCard';

export default function Dashboard() {
  const {
    user,
    listings,
    customListings,
    wishlist,
    deleteListing,
    updateProfile,
    logoutUser,
    showToast,
    inquiries
  } = useMarketplace();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings'); // listings, saved, inquiries, notifications, profile, settings

  // Profile Edit form states
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editLocation, setEditLocation] = useState(user.location);
  const [editBio, setEditBio] = useState(user.bio || '');

  // Notification preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  // Filter listings created by user (plus sample ones owned by user)
  const myListings = listings.filter(
    (item) => item.isUserCreated || item.seller?.name === user.name
  );

  const savedItems = listings.filter((item) => wishlist.includes(item.id));

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      location: editLocation,
      bio: editBio
    });
  };

  const handleSaveSettings = () => {
    showToast('Preferences updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-yellow-400 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                  {user.name}
                </h1>
                {user.verified && (
                  <ShieldCheck className="w-5 h-5 text-blue-500" title="Verified Member" />
                )}
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-900">
                  Verified Local Member
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                <span>{user.email}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-yellow-500" /> {user.location}
                </span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Member on DOT Hub since {user.memberSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/post-ad"
              className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-extrabold shadow flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Ad</span>
            </Link>
            <button
              onClick={() => {
                logoutUser();
                navigate('/');
              }}
              className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-rose-50 hover:text-rose-600 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-subtle-card space-y-1 sticky top-28">
              {[
                { id: 'listings', label: 'My Listings', icon: Package, count: myListings.length },
                { id: 'saved', label: 'Saved Wishlist', icon: Heart, count: savedItems.length },
                { id: 'inquiries', label: 'Inquiries & Messages', icon: MessageCircle, count: inquiries.length },
                { id: 'notifications', label: 'Notification Center', icon: Bell, count: 2 },
                { id: 'profile', label: 'Edit Profile', icon: User },
                { id: 'settings', label: 'Account Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-colors ${
                      isActive
                        ? 'bg-yellow-400 text-black shadow'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                          isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* TAB: MY LISTINGS */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-subtle-card flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Your Active Ads</h2>
                    <p className="text-xs text-gray-500">
                      You have {myListings.length} published {myListings.length === 1 ? 'listing' : 'listings'}
                    </p>
                  </div>
                  <Link
                    to="/post-ad"
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold rounded-xl shadow flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Create New</span>
                  </Link>
                </div>

                {myListings.length > 0 ? (
                  <div className="space-y-4">
                    {myListings.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-gray-200 p-4 shadow-subtle-card hover:border-yellow-400 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-200"
                          />
                          <div className="truncate">
                            <span className="text-[10px] font-bold uppercase text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-200">
                              {item.category}
                            </span>
                            <h3 className="text-sm font-bold text-gray-900 mt-1 truncate max-w-sm">
                              {item.title}
                            </h3>
                            <p className="text-xs font-extrabold text-gray-900 mt-0.5">
                              ₹{item.price.toLocaleString('en-IN')}
                            </p>
                            <span className="text-[11px] text-gray-400 block">
                              Posted on {item.postedDate} • {item.location}
                            </span>
                          </div>
                        </div>

                        {/* Actions: View, Delete */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <Link
                            to={`/listing/${item.id}`}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 transition-colors"
                          >
                            View
                          </Link>
                          {item.isUserCreated && (
                            <button
                              onClick={() => deleteListing(item.id)}
                              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Delete listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-10 text-center">
                    <Package className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      You haven't posted any listings yet
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Sell pre-owned electronics, vehicles, furniture, or offer local Himachal services.
                    </p>
                    <Link
                      to="/post-ad"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-bold shadow"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Post an Ad Now</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB: SAVED WISHLIST */}
            {activeTab === 'saved' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-subtle-card">
                  <h2 className="text-base font-bold text-gray-900">Saved Wishlist</h2>
                  <p className="text-xs text-gray-500">
                    {savedItems.length} {savedItems.length === 1 ? 'item' : 'items'} saved in your local favorites
                  </p>
                </div>

                {savedItems.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {savedItems.map((item) => (
                      <ListingCard key={item.id} listing={item} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-10 text-center">
                    <Heart className="w-12 h-12 text-rose-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-gray-500 mb-4">
                      Tap the heart icon on any listing to save it here for later reference.
                    </p>
                    <Link
                      to="/explore"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-bold shadow"
                    >
                      <span>Explore Listings</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB: INQUIRIES & MESSAGES */}
            {activeTab === 'inquiries' && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-subtle-card space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-gray-900">Inquiries Received</h2>
                  <p className="text-xs text-gray-500">
                    Direct inquiries from potential buyers on DOT Hub
                  </p>
                </div>

                {inquiries.length > 0 ? (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-900">{inq.senderName}</span>
                          <span className="text-gray-400">{inq.date}</span>
                        </div>
                        <p className="text-xs font-semibold text-yellow-600">
                          Re: {inq.listingTitle}
                        </p>
                        <p className="text-xs text-gray-600 italic">
                          "{inq.message}"
                        </p>
                        <div className="pt-2 flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {inq.senderPhone}
                          </span>
                          <a
                            href={`https://wa.me/${inq.senderPhone.replace(/[^0-9]/g, '')}?text=Hello ${encodeURIComponent(inq.senderName)}, regarding your inquiry on DOT Hub...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                          >
                            <MessageCircle className="w-3.5 h-3.5" /> Reply on WhatsApp
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-gray-400">
                    No buyer inquiries received yet.
                  </div>
                )}
              </div>
            )}

            {/* TAB: NOTIFICATION CENTER */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-subtle-card space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-gray-900">Notification Center</h2>
                  <p className="text-xs text-gray-500">
                    Latest activity on your account and watched categories
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-yellow-50/60 border border-yellow-200 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">New Trending Ads in Dharamshala</h4>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        Several new Royal Enfield Himalayan bikes and cameras were listed near Kotwali Bazaar today.
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">2 hours ago</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Profile Verified</h4>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        Your account has earned the "Verified Local Member" community badge.
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">Yesterday</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EDIT PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card">
                <div className="border-b border-gray-100 pb-3 mb-6">
                  <h2 className="text-base font-bold text-gray-900">Edit Your Public Profile</h2>
                  <p className="text-xs text-gray-500">
                    Update information visible to other local marketplace members
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Himachal Location</label>
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">About / Bio</label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-base font-bold text-gray-900">Account Preferences</h2>
                  <p className="text-xs text-gray-500">
                    Manage notifications, privacy, and local demo storage
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-800">Email Alerts</h4>
                      <p className="text-[11px] text-gray-500">Receive inquiry summaries via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-yellow-400"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <div>
                      <h4 className="font-bold text-gray-800">WhatsApp Instant Chat</h4>
                      <p className="text-[11px] text-gray-500">Allow buyers to click through to your WhatsApp</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-yellow-400"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleSaveSettings}
                      className="px-6 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-bold shadow"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
