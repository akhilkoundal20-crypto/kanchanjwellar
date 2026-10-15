import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export default function Toast() {
  const { toasts, removeToast } = useMarketplace();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md transform transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-[#0B0F17]/95 border-yellow-400/60 text-white'
                : isWarning
                ? 'bg-amber-950/95 border-amber-500/60 text-white'
                : 'bg-slate-900/95 border-slate-700 text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
              {!isSuccess && !isWarning && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
              <div>
                <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white shrink-0 p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
