'use client';

import { useEffect, useMemo, useState } from 'react';

const getRandomAmount = () => {
  const min = 5;
  const max = 75;
  return Number((Math.random() * (max - min) + min).toFixed(2));
};

export default function StripeTestPage() {
  // Keep first render deterministic to avoid server/client hydration mismatch.
  const [amount, setAmount] = useState<number>(25);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentStatus(params.get('payment'));
  }, []);

  const formattedAmount = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      }).format(amount),
    [amount],
  );

  const startCheckout = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency: 'gbp',
          description: `Stripe test payment (${formattedAmount})`,
          metadata: {
            source: 'stripe-test-page',
            generatedAmount: amount,
            testRunAt: new Date().toISOString(),
          },
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Failed to create checkout session.');
      }

      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Unexpected error starting checkout.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Stripe Test Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">
          Temporary testing page. It creates a Stripe Checkout Session and redirects you.
        </p>

        {paymentStatus === 'success' && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-800">
            Payment completed successfully.
          </div>
        )}
        {paymentStatus === 'cancelled' && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800">
            Checkout was cancelled.
          </div>
        )}

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-800">Test Amount (GBP)</label>
          <input
            type="number"
            min={0.5}
            step={0.01}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg focus:border-blue-500 focus:outline-none"
          />
          <p className="text-sm text-slate-600">
            Current amount: <span className="font-semibold text-slate-900">{formattedAmount}</span>
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAmount(getRandomAmount())}
              className="rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-300"
            >
              Randomize Amount
            </button>
            <button
              type="button"
              onClick={startCheckout}
              disabled={loading || !Number.isFinite(amount) || amount <= 0}
              className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Starting Checkout...' : 'Start Stripe Checkout'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-700">
            {error}
          </div>
        )}

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold">Stripe test card:</p>
          <p>4242 4242 4242 4242, any future expiry, any CVC, any ZIP.</p>
        </div>
      </div>
    </main>
  );
}
