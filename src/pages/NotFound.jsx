import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-gray-200 text-center shadow-xl space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-yellow-400 text-black flex items-center justify-center font-black text-2xl mx-auto shadow-lg">
          404
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Page Not Found
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed">
          The trail you are looking for doesn't exist or has moved. Let's get you back to the main marketplace!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold shadow"
        >
          <Compass className="w-4 h-4" />
          <span>Back to DOT Hub Home</span>
        </Link>
      </div>
    </div>
  );
}
