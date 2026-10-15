import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, UserPlus, Info } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export default function SignUp() {
  const { loginUser } = useMarketplace();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser(email, name);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
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
            Create your DOT Hub Account
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Join Himachal Pradesh's local community marketplace
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Frontend Demo Mode:</span> No real backend or OTP verification is required. Creates an instant local session in your browser.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikas Pathania"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
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
            <label className="text-xs font-bold text-gray-700 block mb-1">Mobile / WhatsApp Number</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98160 00000"
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-yellow-400"
              />
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
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
                <UserPlus className="w-4 h-4" />
                <span>Create Free Account</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-600 font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
