import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES, POPULAR_LOCATIONS } from '../data/categoriesData';
import ListingCard from '../components/common/ListingCard';
import CategoryIcon from '../components/common/CategoryIcon';

export default function CategoryDetail() {
  const { slug } = useParams();
  const { listings, selectedLocation } = useMarketplace();

  const category = CATEGORIES.find((c) => c.slug === slug || c.id === slug) || CATEGORIES[0];

  const [activeSubcategory, setActiveSubcategory] = useState('');
  const [selectedTown, setSelectedTown] = useState('All');
  const [searchWord, setSearchWord] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Filter listings matching this category
  const categoryListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory =
        item.category === category.slug ||
        item.category === category.id ||
        (category.slug === 'services' && item.listingType === 'service') ||
        (category.slug === 'rides-travel' && item.listingType === 'ride') ||
        (category.slug === 'food-restaurants' && item.listingType === 'business');

      if (!matchesCategory) return false;

      if (activeSubcategory && item.subcategory !== activeSubcategory) return false;

      if (selectedTown !== 'All' && !item.location.toLowerCase().includes(selectedTown.toLowerCase())) {
        return false;
      }

      if (searchWord.trim()) {
        const q = searchWord.toLowerCase();
        if (
          !item.title.toLowerCase().includes(q) &&
          !item.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [listings, category, activeSubcategory, selectedTown, searchWord]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-yellow-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{category.name}</span>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0B0F17] text-white border border-gray-800 p-8 sm:p-12 mb-8 shadow-xl">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/90 to-transparent"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-lg">
                <CategoryIcon name={category.iconName} className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-400/20 px-3 py-1 rounded-full border border-yellow-400/40">
                {categoryListings.length} Active Listings
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              {category.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/post-ad"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow transition-transform transform hover:-translate-y-0.5"
              >
                + Post in {category.shortName}
              </Link>
              <Link
                to="/categories"
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium border border-gray-700 transition-colors"
              >
                ← Back to All Categories
              </Link>
            </div>
          </div>
        </div>

        {/* Subcategories Filter Pills */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-subtle-card">
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs font-bold text-gray-700">Subcategories:</span>
            {activeSubcategory && (
              <button
                onClick={() => setActiveSubcategory('')}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Reset Subcategory
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubcategory('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                !activeSubcategory
                  ? 'bg-yellow-400 text-black shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All {category.shortName}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSubcategory === sub
                    ? 'bg-yellow-400 text-black shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Filtering & View Toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-subtle-card flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search within category */}
            <div className="relative w-64">
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder={`Search in ${category.shortName}...`}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-yellow-400"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Location selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">Location:</span>
              <select
                value={selectedTown}
                onChange={(e) => setSelectedTown(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 bg-gray-50 focus:outline-none focus:border-yellow-400"
              >
                <option value="All">All Locations</option>
                {POPULAR_LOCATIONS.filter((l) => l !== 'All Himachal').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow text-yellow-600' : 'text-gray-500'}`}
              title="Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white shadow text-yellow-600' : 'text-gray-500'}`}
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Listings Display */}
        {categoryListings.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {categoryListings.map((item) => (
              <ListingCard key={item.id} listing={item} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center mx-auto mb-4 border border-yellow-200">
              <CategoryIcon name={category.iconName} className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No Listings in {category.shortName} Yet
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Be the first neighbor to list in this category in Himachal!
            </p>
            <Link
              to="/post-ad"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow"
            >
              <span>+ Post Listing in {category.shortName}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
