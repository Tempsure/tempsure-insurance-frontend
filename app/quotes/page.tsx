'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import StepProgressBar from '@/components/StepProgressBar';
import Toast from '@/components/Toast';
import { apiFetch } from '@/lib/api-config';

interface QuoteSession {
  id: string;
  status: string;
  registration_number: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number | null;
  vehicle_value: string;
  reason_for_cover: string;
  cover_duration_type: string;
  cover_duration_value: string;
  cover_start_datetime: string;
  first_name: string;
  last_name: string;
  licence_type: string;
  licence_length: string;
  calculated_price: string | null;
  policy_number: string | null;
}

const COVERAGE_ITEMS = [
  'Comprehensive cover',
  'Third-party damage & property protection',
  'Fire and theft protection',
  'EU travel cover (where applicable)',
  '24/7 customer support',
];

function fmt(dt: string): string {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtCurrency(amount: string | number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(amount));
}

export default function QuotesPage() {
  const router = useRouter();
  const [session, setSession] = useState<QuoteSession | null>(null);
  const [coverEnd, setCoverEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('error');
  const didConfirm = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    const stripeSessionId = params.get('session_id');

    if (payment === 'success' && stripeSessionId && !didConfirm.current) {
      didConfirm.current = true;
      setConfirming(true);
      confirmPayment(stripeSessionId);
    } else {
      if (payment === 'cancelled') setPaymentCancelled(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const [sessionRes, priceRes] = await Promise.all([
        apiFetch('/api/quotes/session/me/'),
        apiFetch('/api/quotes/session/price/'),
      ]);
      const sessionData = await sessionRes.json();
      const priceData = await priceRes.json();
      if (!sessionRes.ok) throw new Error(sessionData.error || 'Session not found. Please start a new quote.');
      if (!priceRes.ok) throw new Error(priceData.error || 'Failed to calculate price.');
      setSession({ ...sessionData, calculated_price: priceData.price });
      setCoverEnd(priceData.coverEnd);
    } catch (err) {
      setToastMessage(err instanceof Error ? err.message : 'Failed to load quote data.');
      setShowToast(true);
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (stripeSessionId: string) => {
    try {
      // Step 1: verify payment with Stripe via Next.js API route
      const verifyRes = await fetch('/api/stripe/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeSessionId }),
      });
      const verifyData = (await verifyRes.json()) as { paymentIntentId?: string; amountPaid?: number; error?: string };
      if (!verifyRes.ok || !verifyData.paymentIntentId) {
        throw new Error(verifyData.error || 'Payment verification failed.');
      }

      // Step 2: tell Django to create the policy
      const confirmRes = await apiFetch('/api/quotes/confirm-payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: verifyData.paymentIntentId,
          stripeSessionId,
          amountPaid: verifyData.amountPaid ?? 0,
        }),
      });
      const confirmData = (await confirmRes.json()) as { policyNumber?: string; error?: string };
      if (!confirmRes.ok || !confirmData.policyNumber) {
        throw new Error(confirmData.error || 'Policy could not be created. Please contact support.');
      }

      router.push(`/policy/${confirmData.policyNumber}`);
    } catch (err) {
      setConfirming(false);
      setToastMessage(err instanceof Error ? err.message : 'Payment confirmation failed. Please contact support.');
      setShowToast(true);
      setToastType('error');
      loadData();
    }
  };

  const handleBuy = async () => {
    if (!session) return;
    try {
      setBuying(true);
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(session.calculated_price),
          currency: 'gbp',
          description: `TempSure temporary insurance for ${session.registration_number.toUpperCase()}`,
          quoteSessionId: session.id,
          metadata: {
            quoteSessionId: session.id,
            registration: session.registration_number,
            driverName: `${session.first_name} ${session.last_name}`,
          },
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || 'Unable to start payment session.');
      window.location.href = data.url;
    } catch (err) {
      setBuying(false);
      setToastMessage(err instanceof Error ? err.message : 'Payment failed to start.');
      setShowToast(true);
      setToastType('error');
    }
  };

  if (confirming) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md mx-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment received!</h2>
          <p className="text-gray-600">Generating your policy certificate, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24 quote-page-bg">
      <div className="max-w-5xl mx-auto">
        <StepProgressBar currentStep={5} totalSteps={10} />

        {paymentCancelled && (
          <div className="mb-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 animate-form-enter">
            Checkout was cancelled. Your quote is still available below.
          </div>
        )}

        {loading ? (
          <div className="form-card p-10 flex items-center justify-center gap-4 animate-form-enter">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg text-gray-700 font-medium">Loading your quote...</span>
          </div>
        ) : !session ? (
          <div className="form-card p-10 text-center animate-form-enter">
            <p className="text-gray-600 mb-4">Unable to load your quote. Please start a new quote.</p>
            <button onClick={() => router.push('/')} className="btn-primary">
              Start New Quote
            </button>
          </div>
        ) : (
          <div className="form-card overflow-hidden animate-form-enter">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-blue-700 px-4 sm:px-6 md:px-10 py-6 sm:py-8 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Your Insurance Quote</h1>
                  <p className="text-blue-100 text-base sm:text-lg">Review your details before purchasing</p>
                </div>
                <div className="text-left sm:text-right bg-white/10 rounded-xl px-4 py-3">
                  <div className="text-xs sm:text-sm text-blue-200 mb-1">Registration</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono tracking-widest">
                    {session.registration_number.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-6">
              {/* Vehicle */}
              <div className="quote-section-card p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200 animate-stagger-in" style={{ animationDelay: '0.05s' }}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Make & Model</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      {session.vehicle_make} {session.vehicle_model}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Year</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{session.vehicle_year ?? '—'}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Vehicle Value</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{session.vehicle_value}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Reason</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{session.reason_for_cover}</div>
                  </div>
                </div>
              </div>

              {/* Cover Details */}
              <div className="quote-section-card p-4 sm:p-6 bg-gray-50 rounded-xl border-2 border-gray-200 animate-stagger-in" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Cover Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Duration</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{session.cover_duration_value}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Cover Starts</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">{fmt(session.cover_start_datetime)}</div>
                  </div>
                  {coverEnd && (
                    <div>
                      <div className="text-xs sm:text-sm text-gray-500 mb-1">Cover Ends</div>
                      <div className="text-sm sm:text-base font-semibold text-gray-900">{fmt(coverEnd)}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500 mb-1">Driver</div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      {session.first_name} {session.last_name}
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Covered */}
              <div className="quote-section-card p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200 animate-stagger-in" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">What's Covered</h2>
                <ul className="space-y-2">
                  {COVERAGE_ITEMS.map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="quote-section-card p-4 sm:p-6 bg-gray-50 rounded-xl border-2 border-gray-200 animate-stagger-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Price</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Total price (inclusive of all taxes)</div>
                    <div className="text-4xl sm:text-5xl font-bold text-blue-600 mt-1 animate-float-subtle">
                      {session.calculated_price ? fmtCurrency(session.calculated_price) : '—'}
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-blue-600 rounded-2xl text-white">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs mt-1 font-semibold">Covered</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg animate-stagger-in" style={{ animationDelay: '0.25s' }}>
                <p className="text-xs sm:text-sm text-yellow-800 font-semibold mb-1">Important</p>
                <p className="text-xs sm:text-sm text-yellow-700">
                  Your policy will be activated immediately upon purchase. Cover starts at the time shown above.
                  Please review all details carefully before proceeding.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t-2 border-gray-200 animate-stagger-in" style={{ animationDelay: '0.3s' }}>
                <button onClick={() => router.push('/licence-details')}
                  className="w-full sm:w-auto btn-secondary">
                  ← Go back
                </button>
                <button onClick={handleBuy} disabled={buying || !session.calculated_price}
                  className="flex-1 btn-primary text-lg sm:text-xl py-3 sm:py-4 disabled:hover:scale-100 disabled:transform-none">
                  {buying ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Buy Now — {session.calculated_price ? fmtCurrency(session.calculated_price) : '...'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
