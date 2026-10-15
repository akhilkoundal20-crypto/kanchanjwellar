import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, AlertTriangle, Eye, Phone, MapPin } from 'lucide-react';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Community & Safety Guidelines</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 shadow-subtle-card space-y-8 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="border-b border-gray-100 pb-6">
            <span className="text-xs font-bold uppercase text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded border border-yellow-200 flex items-center gap-1.5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-500" /> Community Trust
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Community & Safety Guidelines
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Practical tips for safe buying, selling, and service hiring in Himachal Pradesh
            </p>
          </div>

          {/* Quick Safety Rule Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h3 className="font-bold text-emerald-900 text-sm mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Meet in Busy Public Places
              </h3>
              <p className="text-xs text-emerald-800">
                Always meet buyers or sellers in well-lit public spots like Kotwali Bazaar, Dharamshala bus stand, Mall Road Palampur, or Kangra main square.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <h3 className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Never Pay Advance Deposits
              </h3>
              <p className="text-xs text-amber-800">
                Beware of strangers asking for advance booking fees or courier fees via UPI QR codes before you have physically inspected the item.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <h3 className="font-bold text-blue-900 text-sm mb-1 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                Inspect & Test Before Paying
              </h3>
              <p className="text-xs text-blue-800">
                Test iPhones, cameras, and audio gear thoroughly. For motorcycles and 4x4s, verify registration books (RC) and insurance papers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
              <h3 className="font-bold text-purple-900 text-sm mb-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-600" />
                Clear Local Communication
              </h3>
              <p className="text-xs text-purple-800">
                Keep conversations polite and clear on WhatsApp. Agree upon final price and pickup timings before making a long trip across mountain roads.
              </p>
            </div>
          </div>

          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-base font-bold text-gray-900">How to Report Suspicious Activity</h2>
            <p>
              If you encounter a suspicious listing, counterfeit item, or someone behaving deceptively, click the <strong>"Report Ad"</strong> button on the listing page or contact our local community helpline at <strong>support@dothub.local</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
