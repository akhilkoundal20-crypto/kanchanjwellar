import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, AlertCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Privacy Policy</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-subtle-card space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-bold uppercase text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded border border-yellow-200">
              Legal Document
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Privacy Policy for DOT Hub
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: October 2026 • Effective across Himachal Pradesh
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              When you use DOT Hub to buy, sell, or discover local services, we collect basic listing information you voluntarily provide, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Listing titles, descriptions, and uploaded photographs</li>
              <li>Your chosen display name, contact phone number, and WhatsApp number</li>
              <li>Geographic town or locality (e.g. Kangra, Dharamshala, Palampur, Shimla)</li>
              <li>Saved favorites and custom preferences stored in your browser's local cache</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>
              Your contact details are used solely to allow local community members to connect with you regarding your listings via telephone or direct WhatsApp links. We do not sell your personal data or phone numbers to third-party telemarketers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">3. LocalStorage & Browser Data</h2>
            <p>
              This website uses client-side LocalStorage to persist your custom listings, demo login sessions, and wishlist items. You may clear your browser data or use your browser’s privacy settings at any time to delete these items.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">4. Contact & Inquiries</h2>
            <p>
              If you have any questions or requests regarding your data, please email us at <strong>support@dothub.local</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
