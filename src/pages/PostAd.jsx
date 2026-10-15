import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  PlusCircle,
  Upload,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Tag,
  DollarSign,
  Phone,
  Image as ImageIcon,
  Layers,
  Save,
  AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { CATEGORIES, POPULAR_LOCATIONS } from '../data/categoriesData';
import CategoryIcon from '../components/common/CategoryIcon';

const STORAGE_DRAFT_KEY = 'dot_hub_post_ad_draft';

// Quick royalty-free presets for quick testing
const PRESET_SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
];

export default function PostAd() {
  const { user, addListing, showToast } = useMarketplace();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form states
  const [category, setCategory] = useState('electronics');
  const [subcategory, setSubcategory] = useState('Smartphones & Tablets');
  const [listingType, setListingType] = useState('product'); // product, service, ride, business

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Like New');

  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [location, setLocation] = useState('Dharamshala');
  const [area, setArea] = useState('Kotwali Bazaar');

  const [images, setImages] = useState([]);
  const [contactName, setContactName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '+91 98160 55890');
  const [whatsapp, setWhatsapp] = useState(user.phone || '+91 98160 55890');

  // Brand / Attribute fields
  const [brand, setBrand] = useState('');
  const [modelYear, setModelYear] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdListingId, setCreatedListingId] = useState(null);

  // Load draft if available
  useEffect(() => {
    try {
      const draft = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (draft) {
        const d = JSON.parse(draft);
        if (d.title) setTitle(d.title);
        if (d.description) setDescription(d.description);
        if (d.price) setPrice(d.price);
        if (d.category) setCategory(d.category);
        if (d.location) setLocation(d.location);
        if (d.images && d.images.length > 0) setImages(d.images);
      }
    } catch (e) {
      console.warn('Error reading draft', e);
    }
  }, []);

  // Save draft helper
  const handleSaveDraft = () => {
    const draftData = {
      title,
      description,
      price,
      category,
      subcategory,
      location,
      area,
      images,
      condition
    };
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftData));
    showToast('Listing draft saved to LocalStorage! 💾', 'info');
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.slug === category || c.id === category) || CATEGORIES[0];

  // Image Upload handler via FileReader
  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    files.slice(0, 4 - images.length).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPresetImage = (url) => {
    if (images.length < 5) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Step validations
  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!category) errs.category = 'Please choose a category';
    }
    if (step === 2) {
      if (!title.trim() || title.trim().length < 5) {
        errs.title = 'Title must be at least 5 characters long';
      }
      if (!description.trim() || description.trim().length < 15) {
        errs.description = 'Please provide a clear description (min 15 characters)';
      }
    }
    if (step === 3) {
      if (!price || Number(price) <= 0) {
        errs.price = 'Please specify a valid price in ₹';
      }
      if (!location) {
        errs.location = 'Please select a town in Himachal';
      }
    }
    if (step === 4) {
      if (images.length === 0) {
        errs.images = 'Please upload at least 1 image or select a sample photo';
      }
    }
    if (step === 5) {
      if (!contactName.trim()) errs.contactName = 'Name is required';
      if (!phone.trim()) errs.phone = 'Phone number is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps + 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Listing
  const handleSubmitListing = () => {
    const newListingData = {
      title: title.trim(),
      category,
      subcategory: subcategory || selectedCategoryObj.subcategories[0],
      listingType,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      isNegotiable,
      condition,
      location,
      area: area.trim(),
      description: description.trim(),
      images: images.length > 0 ? images : [PRESET_SAMPLE_IMAGES[0]],
      attributes: {
        ...(brand ? { 'Brand / Make': brand } : {}),
        ...(modelYear ? { 'Year / Model': modelYear } : {}),
        'Item Condition': condition,
        'Himachal Area': `${location} (${area})`
      },
      seller: {
        name: contactName,
        phone,
        whatsapp: whatsapp || phone,
        avatar: user.avatar,
        verified: true,
        memberSince: 'Today',
        badge: 'Local Seller'
      }
    };

    const created = addListing(newListingData);
    setCreatedListingId(created.id);
    localStorage.removeItem(STORAGE_DRAFT_KEY);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <Link to="/" className="hover:text-yellow-600">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-semibold">Post an Ad</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Create a New Listing
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-yellow-500" />
            <span>Save Draft</span>
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-8 shadow-subtle-card">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
            <span className="text-yellow-600">Step {Math.min(currentStep, 5)} of 5</span>
            <span>
              {currentStep === 1 && '1. Category & Type'}
              {currentStep === 2 && '2. Details & Description'}
              {currentStep === 3 && '3. Price & Location'}
              {currentStep === 4 && '4. Photos'}
              {currentStep === 5 && '5. Contact & Review'}
              {currentStep > 5 && 'Final Confirmation'}
            </span>
          </div>

          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-yellow-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(Math.min(currentStep, 5) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* STEP 1: CATEGORY & TYPE */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Step 1: Choose Category & Listing Type
            </h2>

            {/* Listing Type Selector */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                What are you posting?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'product', label: 'Item / Product', desc: 'Phone, bike, furniture' },
                  { id: 'service', label: 'Local Service', desc: 'Plumber, electrician' },
                  { id: 'ride', label: 'Ride / Cab', desc: 'Airport cab, shared ride' },
                  { id: 'business', label: 'Local Business', desc: 'Cafe, homestay, shop' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setListingType(t.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      listingType === t.id
                        ? 'border-yellow-400 bg-yellow-50/60 ring-2 ring-yellow-400/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-gray-900 block">{t.label}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5 block">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Select Main Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.slug);
                      setSubcategory(cat.subcategories[0] || '');
                    }}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                      category === cat.slug
                        ? 'border-yellow-400 bg-yellow-50 text-gray-900 font-bold ring-2 ring-yellow-400/20'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <CategoryIcon name={cat.iconName} className="w-4 h-4 text-gray-700" />
                    </div>
                    <span className="text-xs truncate">{cat.shortName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subcategory */}
            {selectedCategoryObj.subcategories.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-2">
                  Select Subcategory
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  {selectedCategoryObj.subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: DETAILS & DESCRIPTION */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Step 2: Listing Information
            </h2>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Listing Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Royal Enfield Classic 350 (Black) - Mint Condition"
                className={`w-full p-3 text-xs rounded-xl border ${
                  errors.title ? 'border-rose-500' : 'border-gray-200'
                } focus:outline-none focus:border-yellow-400`}
              />
              {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Description *
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the condition, usage, features, included accessories, or reason for selling..."
                className={`w-full p-3 text-xs rounded-xl border ${
                  errors.description ? 'border-rose-500' : 'border-gray-200'
                } focus:outline-none focus:border-yellow-400 resize-none`}
              ></textarea>
              {errors.description && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Item Condition
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['New', 'Like New', 'Good', 'Fair'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCondition(c)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      condition === c
                        ? 'border-yellow-400 bg-yellow-50 text-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional category-specific attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Brand / Manufacturer (Optional)
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Apple, Sony, Bajaj"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Year / Model (Optional)
                </label>
                <input
                  type="text"
                  value={modelYear}
                  onChange={(e) => setModelYear(e.target.value)}
                  placeholder="e.g. 2023, BS6"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PRICE & LOCATION */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Step 3: Pricing & Himachal Location
            </h2>

            {/* Price Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Selling Price (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 15000"
                    className={`w-full pl-8 pr-3 py-2.5 text-sm font-bold rounded-xl border ${
                      errors.price ? 'border-rose-500' : 'border-gray-200'
                    } focus:outline-none focus:border-yellow-400`}
                  />
                </div>
                {errors.price && <p className="text-[11px] text-rose-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Original Retail Price (₹, Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g. 25000"
                    className="w-full pl-8 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Price Negotiable Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200">
              <input
                type="checkbox"
                id="negotiableCheck"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
                className="w-4 h-4 rounded text-yellow-400 focus:ring-yellow-400"
              />
              <label htmlFor="negotiableCheck" className="text-xs font-semibold text-gray-800 cursor-pointer">
                Price is negotiable for sincere local buyers
              </label>
            </div>

            {/* Location selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Town / City *
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-none focus:border-yellow-400 bg-gray-50"
                >
                  {POPULAR_LOCATIONS.filter((l) => l !== 'All Himachal').map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Neighborhood / Locality
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Kotwali Bazaar, Mall Road, Dari"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: IMAGES */}
        {currentStep === 4 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Step 4: Upload Photos
            </h2>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-yellow-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
                id="fileUploadInput"
              />
              <label
                htmlFor="fileUploadInput"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  Click to upload photos from device
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  PNG, JPG up to 5MB (Previews stored locally)
                </p>
              </label>
            </div>

            {/* Quick Presets for Demo Testing */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Or click sample photos to attach immediately:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_SAMPLE_IMAGES.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleAddPresetImage(url)}
                    className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 hover:border-yellow-400 transition-colors"
                  >
                    <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] px-1 rounded">
                      + Add
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded Images Preview */}
            {images.length > 0 && (
              <div>
                <span className="text-xs font-bold text-gray-800 block mb-2">
                  Uploaded Photos ({images.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 group">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white shadow transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 bg-yellow-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.images && <p className="text-[11px] text-rose-500">{errors.images}</p>}
          </div>
        )}

        {/* STEP 5: CONTACT & FINAL REVIEW */}
        {currentStep === 5 && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-subtle-card space-y-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
              Step 5: Contact Details & Review
            </h2>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Akhil"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98160 55890"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  WhatsApp Number (for direct chat inquiry button)
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 98160 55890"
                  className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Final Summary Card Preview */}
            <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Listing Preview
              </span>
              <div className="flex items-center gap-3">
                {images.length > 0 && (
                  <img
                    src={images[0]}
                    alt="Cover"
                    className="w-16 h-16 rounded-xl object-cover border border-gray-300 shrink-0"
                  />
                )}
                <div className="truncate flex-1">
                  <h4 className="font-bold text-sm text-gray-900 truncate">{title}</h4>
                  <p className="text-xs text-yellow-600 font-bold">
                    ₹{Number(price).toLocaleString('en-IN')}{' '}
                    {isNegotiable && <span className="text-[10px] text-gray-500 font-normal">(Negotiable)</span>}
                  </p>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-yellow-500" />
                    {location} ({area}) • {selectedCategoryObj.shortName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Prev / Next / Submit) */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-extrabold shadow flex items-center gap-1.5 transition-transform transform hover:-translate-y-0.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitListing}
              className="px-7 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs sm:text-sm font-extrabold shadow-lg flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Listing Live</span>
            </button>
          )}
        </div>
      </div>

      {/* CONFIRMATION / SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              Listing Published Successfully!
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              Your ad is now active across DOT Hub and visible to local buyers in {location} and across Himachal.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => navigate(`/listing/${createdListingId}`)}
                className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-extrabold shadow"
              >
                View Your Published Listing
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold"
              >
                Go to My Listings Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
