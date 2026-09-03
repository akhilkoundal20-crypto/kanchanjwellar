import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import Collections from './components/Collections';
import ProductShowcase from './components/ProductShowcase';
import ProductModal from './components/ProductModal';
import SearchModal from './components/SearchModal';
import WishlistDrawer from './components/WishlistDrawer';
import WhyChooseUs from './components/WhyChooseUs';
import BridalSection from './components/BridalSection';
import AboutSection from './components/AboutSection';
import InstagramSection from './components/InstagramSection';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kanchan_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kanchan_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const showcase = document.getElementById('showcase');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBridalExplore = () => {
    setSelectedCategory('Bridal');
    const showcase = document.getElementById('showcase');
    if (showcase) {
      showcase.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-gray-900 selection:bg-gold-500 selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={handleCategorySelect}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => handleCategorySelect('All')}
          onStoreClick={() => {
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Featured Collections */}
        <Collections onSelectCollection={handleCategorySelect} />

        {/* 4. Product Showcase */}
        <ProductShowcase
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onViewProduct={(prod) => setSelectedProduct(prod)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Bridal Section */}
        <BridalSection onExploreBridal={handleBridalExplore} />

        {/* 7. About Kanchan Jewellers */}
        <AboutSection
          onVisitStoreClick={() => {
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Instagram Section */}
        <InstagramSection />

        {/* 9. Customer Reviews */}
        <Testimonials />

        {/* 10. Store Location & Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={handleCategorySelect} />

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Modals and Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        isWishlisted={selectedProduct ? wishlist.some((item) => item.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onViewProduct={(prod) => setSelectedProduct(prod)}
      />
    </div>
  );
}
