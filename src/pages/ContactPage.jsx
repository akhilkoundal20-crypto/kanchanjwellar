import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  Info
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function ContactPage() {
  const { showToast } = useMarketplace();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been recorded! (Demo mode)', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-yellow-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Contact Us</span>
        </div>

        {/* Page Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-600 bg-yellow-50 px-3 py-1 rounded-md border border-yellow-200">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
            We’d Love to Hear From You
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Have questions about listing in Himachal, need assistance, or want to partner with DOT Hub?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B0F17] rounded-3xl p-8 text-white border border-gray-800 flex flex-col justify-between shadow-xl space-y-6">
            <div>
              <span className="font-extrabold text-xl text-white tracking-wider flex items-center gap-2">
                DOT<span className="text-yellow-400">HUB</span>
              </span>
              <p className="text-xs text-gray-400 mt-1">
                Your Local Himachal Marketplace
              </p>

              <div className="mt-8 space-y-6 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Community Outpost</h4>
                    <p className="text-gray-400 mt-0.5">
                      Kotwali Bazaar / Dari, Dharamshala, Kangra District, Himachal Pradesh 176215
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Email Support</h4>
                    <p className="text-gray-400 mt-0.5">support@dothub.local</p>
                    <p className="text-[10px] text-gray-500">(Frontend demo inquiries)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">WhatsApp Helpline</h4>
                    <p className="text-gray-400 mt-0.5">+91 98160 00000</p>
                    <p className="text-[10px] text-gray-500">Mon - Sat: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 text-[11px] text-gray-400 leading-relaxed">
              💡 Need quick answers regarding posting ads, safety guidelines, or pricing? Check our{' '}
              <Link to="/#faq" className="text-yellow-400 hover:underline font-bold">
                FAQ section
              </Link>.
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-200 shadow-subtle-card">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Send us a Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ankit Sharma"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry about promoting my local business"
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400 resize-none"
                  ></textarea>
                </div>

                <div className="p-3 bg-yellow-50 rounded-xl text-[11px] text-yellow-900 flex items-start gap-2 border border-yellow-200">
                  <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <span>
                    Note: Frontend demo environment. Submitted messages are recorded locally.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your message regarding "{subject}" has been successfully submitted in demo mode.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
