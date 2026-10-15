import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Grid,
  List,
  X,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Tag,
  Layers,
  ChevronDown,
  Filter
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES, POPULAR_LOCATIONS } from '../data/categoriesData';
import ListingCard from '../components/common/ListingCard';

export default function Explore() {
  const { listings, selectedLocation, setSelectedLocation } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialLocation = searchParams.get('location') || selectedLocation || 'All Himachal';
  const initialFilter = searchParams.get('filter') || '';
  const initialSort = searchParams.get('sort') || 'newest';

  // Local filter states
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [sortBy, setSortBy] = useState(initialSort);
  const [featuredOnly, setFeaturedOnly] = useState(initialFilter === 'featured');

  // View mode
  const [viewMode, setViewMode] = useState('grid');
  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  // Pagination (load more)
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync with searchParams changes
  useEffect(() => {
    if (searchParams.get('q') !== null) setSearchTerm(searchParams.get('q') || '');
    if (searchParams.get('category') !== null) setCategoryFilter(searchParams.get('category') || '');
    if (searchParams.get('location') !== null) setLocationFilter(searchParams.get('location') || 'All Himachal');
    if (searchParams.get('sort') !== null) setSortBy(searchParams.get('sort') || 'newest');
    if (searchParams.get('filter') === 'featured') setFeaturedOnly(true);
  }, [searchParams]);

  // Available subcategories for selected category
  const selectedCategoryObj = CATEGORIES.find(
    (c) => c.slug === categoryFilter || c.id === categoryFilter
  );
  const subcategoriesList = selectedCategoryObj ? selectedCategoryObj.subcategories : [];

  // Reset filters
  const resetAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setSubcategoryFilter('');
    setLocationFilter('All Himachal');
    setMinPrice('');
    setMaxPrice('');
    setConditionFilter('');
    setSortBy('newest');
    setFeaturedOnly(false);
    setSearchParams({});
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search keyword
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesSubcat = (item.subcategory || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesSubcat) return false;
      }

      // Category
      if (categoryFilter) {
        if (item.category !== categoryFilter) return false;
      }

      // Subcategory
      if (subcategoryFilter) {
        if (item.subcategory !== subcategoryFilter) return false;
      }

      // Location
      if (locationFilter && locationFilter !== 'All Himachal') {
        if (!item.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      }

      // Price range
      if (minPrice && item.price < Number(minPrice)) return false;
      if (maxPrice && item.price > Number(maxPrice)) return false;

      // Condition
      if (conditionFilter && item.condition !== conditionFilter) return false;

      // Featured only
      if (featuredOnly && !item.featured) return false;

      return true;
    });
  }, [
    listings,
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    locationFilter,
    minPrice,
    maxPrice,
    conditionFilter,
    featuredOnly
  ]);

  // Sort listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    if (sortBy === 'newest') {
      return list.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'popular') {
      return list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }
    return list;
  }, [filteredListings, sortBy]);

  const displayedListings = sortedListings.slice(0, visibleCount);

  // Active filters count for chips
  const activeFiltersCount = [
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    locationFilter !== 'All Himachal' ? locationFilter : null,
    minPrice || maxPrice,
    conditionFilter,
    featuredOnly
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link to="/" className="hover:text-yellow-600">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Explore Marketplace</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Explore Listings
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Showing {sortedListings.length} {sortedListings.length === 1 ? 'result' : 'results'} in {locationFilter}
              </p>
            </div>

            {/* Mobile Filter Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold shadow"
              >
                <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-white rounded-xl border border-gray-200">
            <span className="text-xs font-semibold text-gray-500">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Keyword: "{searchTerm}"
                <button onClick={() => setSearchTerm('')}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {categoryFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Category: {categoryFilter}
                <button onClick={() => { setCategoryFilter(''); setSubcategoryFilter(''); }}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {subcategoryFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Subcategory: {subcategoryFilter}
                <button onClick={() => setSubcategoryFilter('')}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {locationFilter !== 'All Himachal' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Location: {locationFilter}
                <button onClick={() => setLocationFilter('All Himachal')}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Price: ₹{minPrice || '0'} - ₹{maxPrice || '∞'}
                <button onClick={() => { setMinPrice(''); setMaxPrice(''); }}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {conditionFilter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Condition: {conditionFilter}
                <button onClick={() => setConditionFilter('')}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}
            {featuredOnly && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-medium border border-yellow-200">
                Featured Only
                <button onClick={() => setFeaturedOnly(false)}><X className="w-3 h-3 hover:text-black" /></button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-rose-600 hover:underline ml-auto flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-subtle-card sticky top-28 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-yellow-500" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-gray-500 hover:text-rose-600 font-medium"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Keyword */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Keyword Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search titles, descriptions..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Himachal Town</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  {POPULAR_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setSubcategoryFilter('');
                  }}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategories if category selected */}
              {subcategoriesList.length > 0 && (
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-2">Subcategory</label>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    <button
                      onClick={() => setSubcategoryFilter('')}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors ${
                        !subcategoryFilter ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All {selectedCategoryObj.shortName}
                    </button>
                    {subcategoriesList.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSubcategoryFilter(sub)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors truncate ${
                          subcategoryFilter === sub ? 'bg-yellow-100 text-yellow-900 font-bold' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Price Range (₹)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min ₹"
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max ₹"
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                  />
                </div>
              </div>

              {/* Condition Filter */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">Item Condition</label>
                <select
                  value={conditionFilter}
                  onChange={(e) => setConditionFilter(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  <option value="">Any Condition</option>
                  <option value="New">Brand New</option>
                  <option value="Like New">Like New / Mint</option>
                  <option value="Good">Good Used</option>
                  <option value="Fair">Fair / Workable</option>
                  <option value="Verified Pro">Verified Pro Service</option>
                </select>
              </div>

              {/* Featured toggle */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-gray-800">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-yellow-400 focus:ring-yellow-400 border-gray-300"
                  />
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                    Featured listings only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* LISTINGS CONTAINER */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting & View Toggle Bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-subtle-card flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 px-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow text-yellow-600' : 'text-gray-500 hover:text-black'
                  }`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow text-yellow-600' : 'text-gray-500 hover:text-black'
                  }`}
                  aria-label="List View"
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Listings Grid or Empty State */}
            {displayedListings.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                    : 'space-y-4'
                }
              >
                {displayedListings.map((item) => (
                  <ListingCard key={item.id} listing={item} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              /* Attractive Empty State */
              <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center max-w-md mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-yellow-50 text-yellow-500 flex items-center justify-center mx-auto mb-4 border border-yellow-200">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No Matching Listings Found</h3>
                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  We couldn't find any listings matching your search filters in {locationFilter}. Try adjusting your keywords, price range, or category.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetAllFilters}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow"
                  >
                    Reset All Filters
                  </button>
                  <Link
                    to="/post-ad"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black"
                  >
                    Post an Ad Here
                  </Link>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < sortedListings.length && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-xl bg-white border border-gray-300 hover:border-yellow-400 text-gray-800 text-xs font-bold shadow-subtle-card hover:shadow-hover-card transition-all"
                >
                  Load More Listings ({sortedListings.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-md bg-white h-full ml-auto p-5 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-bold text-base text-gray-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Search Keywords</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
              >
                {POPULAR_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setSubcategoryFilter('');
                }}
                className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Price Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min ₹"
                  className="p-2 text-xs rounded-xl border border-gray-200"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max ₹"
                  className="p-2 text-xs rounded-xl border border-gray-200"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-yellow-400 text-xs font-bold text-black"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
