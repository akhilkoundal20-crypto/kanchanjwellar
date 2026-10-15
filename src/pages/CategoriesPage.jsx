import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categoriesData';
import CategoryIcon from '../components/common/CategoryIcon';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">All Categories</span>
        </div>

        {/* Page Banner */}
        <div className="bg-[#0B0F17] rounded-3xl p-8 sm:p-12 text-white border border-gray-800 relative overflow-hidden mb-12 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[100px] pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-xs font-bold mb-3 border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5" /> 12 Full Market Sectors
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Explore All Marketplace Categories
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
              Find everything from electronics, vehicles, and mountain homes to certified local electricians, airport cabs, and artisan handicrafts in Himachal Pradesh.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-200 hover:border-yellow-400 overflow-hidden shadow-subtle-card hover:shadow-hover-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Floating Category Icon */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center font-bold shadow-lg">
                      <CategoryIcon name={cat.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-white font-extrabold text-base leading-tight">
                        {cat.name}
                      </h2>
                      <span className="text-[11px] text-yellow-300 font-semibold">
                        {cat.count} listings live
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description & Subcategories */}
                <div className="p-5">
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Popular Subcategories
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.slice(0, 4).map((sub) => (
                        <Link
                          key={sub}
                          to={`/explore?category=${cat.slug}&q=${encodeURIComponent(sub)}`}
                          className="px-2 py-1 bg-gray-50 hover:bg-yellow-50 hover:text-yellow-800 text-[11px] text-gray-600 rounded-lg border border-gray-200 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                <Link
                  to={`/category/${cat.slug}`}
                  className="w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 group-hover:bg-yellow-400 group-hover:text-black transition-colors shadow"
                >
                  <span>Explore {cat.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
