import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle, Info } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function Login() {
  const { loginUser } = useMarketplace();
  const navigate = useNavigate();

  const [email, setEmail] = useState('akhil@dothub.local');
  const [password, setPassword] = useState('dothub2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser(email, email.split('@')[0]);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
        {/* Brand Header */}
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
            Sign in to your account
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage your ads, inquiries, and saved wishlist items
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3.5 rounded-2xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Demo Authentication Flow:</span> Pre-filled with demo credentials. Click "Sign In" to immediately access your seller dashboard.
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Email Address
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-xs text-yellow-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to DOT Hub</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-yellow-600 font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
