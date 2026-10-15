import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Terms & Conditions</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-subtle-card space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-bold uppercase text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded border border-yellow-200">
              User Agreement
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Terms & Conditions
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Effective Date: October 2026 • Governing DOT Hub Marketplace Platform
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or posting advertisements on DOT Hub, you agree to comply with and be bound by these Terms and Conditions and all applicable laws of Himachal Pradesh and India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">2. Marketplace Platform Nature</h2>
            <p>
              DOT Hub acts as a peer-to-peer discovery platform. We are not a broker, auctioneer, or direct seller of any listed goods or services. All contractual agreements, pricing negotiations, and payment settlements are made directly between the buyer and seller.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">3. User Responsibilities & Prohibited Listings</h2>
            <p>
              Users are strictly prohibited from posting illegal goods, counterfeit items, endangered Himalayan wildlife, weapons, misleading real estate, or fraudulent contact information. Violating listings will be removed immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-gray-900">4. Limitation of Liability</h2>
            <p>
              DOT Hub does not inspect physical condition or verify titles of listed items. Users are urged to exercise customary caution, inspect products in safe public meeting areas, and test vehicles or electronics before handing over cash or digital payments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
