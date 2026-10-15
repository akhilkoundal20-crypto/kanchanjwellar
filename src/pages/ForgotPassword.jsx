import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function ForgotPassword() {
  const { showToast } = useMarketplace();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Demo reset link generated!', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-yellow-400 p-0.5 bg-black">
              <img src="/logo.jpg" alt="DOT Hub" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-2xl text-gray-900 tracking-wider">
              DOT<span className="text-yellow-500">HUB</span>
            </span>
          </Link>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Enter your registered email address to receive password instructions
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Demo Notice:</span> Because this is a frontend prototype without an email server, a simulated recovery state is displayed.
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Your Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm shadow-md transition-all"
            >
              Send Reset Link (Demo)
            </button>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">Demo Reset Request Sent</h4>
            <p className="text-xs text-emerald-800">
              In a live production deployment, a secure reset token would be emailed to <strong>{email}</strong>.
            </p>
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
