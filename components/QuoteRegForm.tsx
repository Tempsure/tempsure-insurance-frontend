'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface QuoteRegFormProps {
  className?: string;
}

export default function QuoteRegForm({ className = '' }: QuoteRegFormProps) {
  const router = useRouter();
  const [regNumber, setRegNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGetQuote = () => {
    if (!regNumber.trim()) {
      setErrorMessage('Please enter your registration number');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setErrorMessage('');
    const encodedReg = encodeURIComponent(regNumber.trim().toUpperCase());
    router.push(`/vehicle/${encodedReg}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleGetQuote();
  };

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="hero-quote-panel flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 p-3 sm:p-4">
        <div
          className={`relative flex-1 flex items-center rounded-xl sm:rounded-2xl overflow-hidden border-[3px] transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] ${
            isFocused
              ? 'border-blue-600 shadow-xl shadow-blue-500/25'
              : errorMessage
                ? 'border-red-400'
                : 'border-gray-800/80 shadow-lg'
          }`}
        >
          <div className="shrink-0 w-10 sm:w-12 self-stretch bg-linear-to-b from-blue-700 via-blue-600 to-blue-800 flex flex-col items-center justify-center gap-0.5">
            <span className="text-[9px] sm:text-[10px] font-bold text-yellow-300 leading-none">GB</span>
            <span className="block w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-yellow-300/80" aria-hidden />
          </div>
          <input
            type="text"
            value={regNumber}
            onChange={(e) => {
              setRegNumber(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, '').slice(0, 8));
              if (errorMessage) setErrorMessage('');
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="ENTER REG"
            aria-label="Vehicle registration number"
            maxLength={8}
            className="flex-1 min-w-0 bg-[#F7CE45] px-3 sm:px-5 py-4 sm:py-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 placeholder:text-gray-700/50 tracking-[0.12em] sm:tracking-[0.18em] text-center uppercase focus:outline-none font-mono"
          />
        </div>

        <button
          type="button"
          onClick={handleGetQuote}
          className="hero-cta shrink-0 inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-9 lg:px-10 py-4 sm:py-5 text-lg sm:text-xl lg:text-2xl font-bold rounded-xl sm:rounded-2xl bg-blue-600 text-white cursor-pointer group"
        >
          <span>Get a Quote</span>
          <ArrowRight
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover:translate-x-1"
            strokeWidth={2.5}
            aria-hidden
          />
        </button>
      </div>

      {errorMessage && (
        <p className="mt-3 text-red-600 font-semibold text-sm sm:text-base" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
