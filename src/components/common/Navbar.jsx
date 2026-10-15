import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  MapPin,
  Heart,
  PlusCircle,
  User,
  Menu,
  X,
  ChevronDown,
  Layers,
  Sparkles,
  LogOut,
  LayoutDashboard,
  Bell,
  Compass,
  Home as HomeIcon,
  Plus
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { POPULAR_LOCATIONS, CATEGORIES } from '../../data/categoriesData';

export default function Navbar() {
  const {
    wishlist,
    user,
    selectedLocation,
    setSelectedLocation,
    searchQuery,
    setSearchQuery,
    logoutUser,
    listings
  } = useMarketplace();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchContainerRef = useRef(null);

  // Sticky transparent-to-solid scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setLocationDropdownOpen(false);
    setSuggestionsOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSuggestionsOpen(false);
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  // Autocomplete matching items for suggestions
  const searchSuggestions = searchQuery.trim()
    ? listings
        .filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <>
      {/* Top Main Navbar (Sticky with backdrop-blur) */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0F17]/95 backdrop-blur-md border-b border-gray-800 shadow-xl'
            : 'bg-[#0B0F17]/90 backdrop-blur-sm border-b border-gray-800/50'
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-1 sm:gap-3 md:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="DOT Hub Home">
              <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl overflow-hidden ring-2 ring-yellow-400 p-0.5 bg-black flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/logo.jpg"
                  alt="DOT Hub Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl md:text-2xl tracking-wider text-white">
                  DOT<span className="text-yellow-400">HUB</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
              </div>
            </Link>

            {/* Location Selector (Desktop & Mobile) */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-xl bg-gray-900/90 hover:bg-gray-800 border border-gray-700/80 text-xs font-semibold text-gray-200 transition-colors"
                aria-label={`Select location, currently ${selectedLocation}`}
              >
                <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="hidden sm:inline max-w-[90px] sm:max-w-[130px] truncate">{selectedLocation}</span>
                <ChevronDown className="hidden sm:block w-3 h-3 text-gray-400 shrink-0" />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-[#0F172A] border border-gray-700 rounded-2xl shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1 font-semibold text-gray-400 uppercase text-[10px] tracking-wider">
                    Select Town / Area
                  </div>
                  {POPULAR_LOCATIONS.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-gray-800/80 transition-colors ${
                        selectedLocation === loc ? 'text-yellow-400 font-semibold bg-gray-800/40' : 'text-gray-300'
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && (
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Search Bar with Autocomplete Suggestions */}
            <div ref={searchContainerRef} className="relative flex-1 max-w-lg hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSuggestionsOpen(true);
                  }}
                  onFocus={() => setSuggestionsOpen(true)}
                  placeholder={`Search in ${selectedLocation}...`}
                  className="w-full pl-9 pr-20 py-2 rounded-xl bg-gray-900/90 text-xs text-white placeholder-gray-400 border border-gray-700 focus:border-yellow-400 focus:outline-none transition-all shadow-inner"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold rounded-lg transition-colors shadow"
                >
                  Search
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {suggestionsOpen && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0F172A] border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50">
                  {searchSuggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSuggestionsOpen(false);
                        navigate(`/listing/${item.id}`);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 flex items-center justify-between border-b border-gray-800/40 last:border-b-0 text-xs text-white transition-colors"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <span className="truncate">{item.title}</span>
                      </div>
                      <span className="text-yellow-400 font-bold ml-2 shrink-0">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/explore" className="text-xs font-semibold text-gray-300 hover:text-yellow-400 transition-colors">
                Explore
              </Link>
              <Link to="/services" className="text-xs font-semibold text-gray-300 hover:text-yellow-400 transition-colors">
                Services
              </Link>
              <Link to="/rides" className="text-xs font-semibold text-gray-300 hover:text-yellow-400 transition-colors">
                Rides
              </Link>
              <Link to="/businesses" className="text-xs font-semibold text-gray-300 hover:text-yellow-400 transition-colors">
                Businesses
              </Link>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-yellow-400 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              {user.isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-yellow-400"
                    />
                    <ChevronDown className="w-3 h-3 text-gray-400 mr-1" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#0F172A] border border-gray-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                      <div className="px-3 py-1.5 border-b border-gray-800 font-bold text-white truncate">
                        {user.name}
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logoutUser}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-xs font-semibold text-gray-200 hover:text-yellow-400 border border-gray-700 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Primary Action Button: Start Selling */}
              <Link
                to="/post-ad"
                className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-extrabold shadow-md transition-transform transform hover:-translate-y-0.5 flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Start Selling</span>
              </Link>
            </div>

            {/* Mobile Header Right Icons (Search toggle & Menu) */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                to="/explore"
                className="p-2 rounded-xl bg-gray-900 text-gray-300 hover:text-yellow-400 border border-gray-800"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer when hamburger clicked */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-[#0B0F17]/98 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link to="/explore" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-yellow-400" /> Explore
              </Link>
              <Link to="/categories" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-yellow-400" /> Categories
              </Link>
              <Link to="/services" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" /> Services
              </Link>
              <Link to="/rides" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" /> Rides & Cabs
              </Link>
              <Link to="/businesses" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-yellow-400" /> Businesses
              </Link>
              <Link to="/dashboard" className="p-2.5 rounded-xl bg-gray-900 text-gray-200 flex items-center gap-2">
                <User className="w-4 h-4 text-yellow-400" /> Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (Sticky at bottom on mobile as requested by user) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0B0F17]/95 backdrop-blur-md border-t border-gray-800 shadow-2xl px-2 py-1.5 flex items-center justify-around text-gray-400">
        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            location.pathname === '/' ? 'text-yellow-400 font-bold' : 'hover:text-gray-200'
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        {/* 2. Explore */}
        <Link
          to="/explore"
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            location.pathname === '/explore' ? 'text-yellow-400 font-bold' : 'hover:text-gray-200'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Explore</span>
        </Link>

        {/* 3. Post Ad (Elevated Center Yellow Button) */}
        <Link
          to="/post-ad"
          className="flex flex-col items-center justify-center -mt-5 group"
          title="Post Ad"
        >
          <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg shadow-yellow-400/40 ring-4 ring-[#0B0F17] group-active:scale-95 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-extrabold text-yellow-400 mt-1">Sell</span>
        </Link>

        {/* 4. Wishlist */}
        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center justify-center p-1.5 transition-colors ${
            location.pathname === '/wishlist' ? 'text-yellow-400 font-bold' : 'hover:text-gray-200'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-2 bg-yellow-400 text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] mt-0.5">Saved</span>
        </Link>

        {/* 5. Dashboard / Account */}
        <Link
          to={user.isLoggedIn ? '/dashboard' : '/login'}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            location.pathname === '/dashboard' || location.pathname === '/login'
              ? 'text-yellow-400 font-bold'
              : 'hover:text-gray-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">{user.isLoggedIn ? 'Account' : 'Sign In'}</span>
        </Link>
      </nav>
    </>
  );
}
