import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LISTINGS } from '../data/demoData';

const MarketplaceContext = createContext();

const STORAGE_KEY_LISTINGS = 'dot_hub_custom_listings';
const STORAGE_KEY_WISHLIST = 'dot_hub_wishlist';
const STORAGE_KEY_USER = 'dot_hub_current_user';
const STORAGE_KEY_INQUIRIES = 'dot_hub_inquiries';

const DEFAULT_USER = {
  id: 'user_demo_101',
  name: 'Akhil',
  email: 'akhil@dothub.local',
  phone: '+91 98160 55890',
  location: 'Dharamshala, Himachal Pradesh',
  bio: 'Local creator and marketplace enthusiast. Buying vintage gear and exploring Dhauladhar trails.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  isLoggedIn: true,
  memberSince: 'October 2024',
  rating: 4.95,
  verified: true
};

export function MarketplaceProvider({ children }) {
  // Custom listings added by user
  const [customListings, setCustomListings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LISTINGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Combined active listings (custom listings appear first)
  const listings = [...customListings, ...INITIAL_LISTINGS];

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : ['dot-prod-101', 'dot-prod-105'];
    } catch {
      return ['dot-prod-101', 'dot-prod-105'];
    }
  });

  // User auth state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.name.includes('Koundal')) {
          parsed.name = 'Akhil';
          parsed.email = 'akhil@dothub.local';
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(parsed));
        }
        return parsed;
      }
      return DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  // Selected Location (Kangra, Dharamshala, Palampur, etc.)
  const [selectedLocation, setSelectedLocation] = useState('All Himachal');

  // Search keyword state across pages
  const [searchQuery, setSearchQuery] = useState('');

  // Toasts notification system
  const [toasts, setToasts] = useState([]);

  // Inquiries stored locally
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      return saved ? JSON.parse(saved) : [
        {
          id: 'inq-1',
          listingTitle: 'Apple iPhone 14 Pro (128GB, Deep Purple)',
          senderName: 'Rohit Jamwal',
          senderPhone: '+91 98055 23114',
          message: 'Is this still available for meetup in Kotwali Bazaar tomorrow?',
          date: 'Yesterday at 4:30 PM',
          read: false
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LISTINGS, JSON.stringify(customListings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customListings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [inquiries]);

  // Toast dispatch
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wishlist actions
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your wishlist! ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isWishlisted = (id) => wishlist.includes(id);

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  // Add listing
  const addListing = (newListingData) => {
    const newListing = {
      id: `dot-custom-${Date.now()}`,
      slug: (newListingData.title || 'listing').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      postedDate: new Date().toISOString().split('T')[0],
      featured: false,
      trending: false,
      rating: 5.0,
      reviewsCount: 1,
      isUserCreated: true,
      seller: {
        name: user.name,
        avatar: user.avatar,
        phone: user.phone || '+91 98160 00000',
        whatsapp: (user.phone || '+919816000000').replace(/[^0-9]/g, ''),
        verified: true,
        memberSince: 'Just now',
        badge: 'Local Member'
      },
      ...newListingData
    };

    setCustomListings((prev) => [newListing, ...prev]);
    showToast('Listing posted successfully! It is now live across DOT Hub.', 'success');
    return newListing;
  };

  // Delete listing
  const deleteListing = (id) => {
    setCustomListings((prev) => prev.filter((l) => l.id !== id));
    showToast('Listing deleted successfully', 'info');
  };

  // Update listing
  const updateListing = (id, updatedFields) => {
    setCustomListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Listing updated successfully', 'success');
  };

  // Auth functions
  const loginUser = (email, name = 'Akhil') => {
    setUser({
      ...DEFAULT_USER,
      email,
      name,
      isLoggedIn: true
    });
    showToast(`Welcome back, ${name}! 👋`, 'success');
  };

  const logoutUser = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false
    }));
    showToast('Logged out of demo session', 'info');
  };

  const updateProfile = (profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData
    }));
    showToast('Profile updated successfully!', 'success');
  };

  // Submit inquiry
  const submitInquiry = (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      date: 'Just now',
      read: false,
      ...inquiryData
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('Demo inquiry sent to seller via DOT Hub!', 'success');
  };

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        customListings,
        wishlist,
        user,
        selectedLocation,
        searchQuery,
        toasts,
        inquiries,
        setSelectedLocation,
        setSearchQuery,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        addListing,
        deleteListing,
        updateListing,
        loginUser,
        logoutUser,
        updateProfile,
        submitInquiry,
        showToast,
        removeToast
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
