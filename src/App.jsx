import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MarketplaceProvider } from './context/MarketplaceContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import BackToTop from './components/common/BackToTop';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import PostAd from './pages/PostAd';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import WishlistPage from './pages/WishlistPage';
import ServicesPage from './pages/ServicesPage';
import RidesPage from './pages/RidesPage';
import BusinessDirectory from './pages/BusinessDirectory';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import GuidelinesPage from './pages/GuidelinesPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <MarketplaceProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-yellow-400 selection:text-black">
          {/* Sticky Transparent/Blur Navbar */}
          <Navbar />

          {/* Main Routing View */}
          <main className="flex-grow pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:slug" element={<CategoryDetail />} />
              <Route path="/listing/:id" element={<ProductDetail />} />
              <Route path="/post-ad" element={<PostAd />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/rides" element={<RidesPage />} />
              <Route path="/businesses" element={<BusinessDirectory />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/guidelines" element={<GuidelinesPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Comprehensive Dark High-Contrast Footer */}
          <Footer />

          {/* Global Floating Elements */}
          <Toast />
          <BackToTop />
        </div>
      </Router>
    </MarketplaceProvider>
  );
}
