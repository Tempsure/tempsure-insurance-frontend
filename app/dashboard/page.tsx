'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api-config';

interface PolicySummary {
  policy_number: string;
  status: string;
  amount_paid: string;
  cover_start: string;
  cover_end: string;
  created_at: string;
  vehicle: {
    registrationNumber: string;
    make: string;
    model: string;
    year: number | null;
  };
  cover: {
    durationValue: string;
    reasonForCover: string;
  };
}

function fmt(dt: string): string {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtCurrency(amount: string | number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(amount));
}

function isActive(coverEnd: string): boolean {
  return new Date(coverEnd) > new Date();
}

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [policies, setPolicies] = useState<PolicySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const meRes = await apiFetch('/api/auth/me/');
      if (!meRes.ok) {
        router.push('/login');
        return;
      }
      const meData = await meRes.json();
      setEmail(meData.email);

      const policiesRes = await apiFetch('/api/auth/policies/');
      if (policiesRes.ok) {
        const data = await policiesRes.json();
        setPolicies(data);
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await apiFetch('/api/auth/logout/', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-600">Loading your account...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 pt-24 sm:pt-32" style={{ backgroundColor: '#f5faff' }}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-6 sm:px-10 py-6 sm:py-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Account</h1>
                <p className="text-blue-100 text-sm sm:text-base">{email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/')}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
                >
                  New Quote
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 py-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">{policies.length} {policies.length === 1 ? 'policy' : 'policies'} found</p>
          </div>
        </div>

        {/* Policies */}
        {policies.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">No policies found for this account.</p>
            <button onClick={() => router.push('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all cursor-pointer">
              Get a Quote
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {policies.map((policy) => {
              const active = isActive(policy.cover_end);
              return (
                <div key={policy.policy_number} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                      {/* Left: policy info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-bold font-mono text-gray-900 text-lg">
                              {policy.vehicle.registrationNumber.toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                              {active ? 'Active' : 'Expired'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {policy.vehicle.make} {policy.vehicle.model} {policy.vehicle.year ? `(${policy.vehicle.year})` : ''}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Policy: <span className="font-mono">{policy.policy_number}</span>
                          </p>
                        </div>
                      </div>

                      {/* Middle: cover details */}
                      <div className="hidden md:block text-center px-6 border-l border-r border-gray-100">
                        <div className="text-xs text-gray-400 mb-1">Cover period</div>
                        <div className="text-sm font-semibold text-gray-700">{fmt(policy.cover_start)}</div>
                        <div className="text-xs text-gray-400 my-0.5">to</div>
                        <div className="text-sm font-semibold text-gray-700">{fmt(policy.cover_end)}</div>
                      </div>

                      {/* Right: price + actions */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="text-xl font-bold text-blue-600">{fmtCurrency(policy.amount_paid)}</div>
                        <div className="text-xs text-gray-400">{policy.cover.durationValue}</div>
                        <Link
                          href={`/policy/${policy.policy_number}`}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-all cursor-pointer flex items-center gap-2"
                        >
                          View & Download
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Mobile cover period */}
                    <div className="mt-3 pt-3 border-t border-gray-100 md:hidden flex justify-between text-xs text-gray-500">
                      <span>From: <span className="font-medium text-gray-700">{fmt(policy.cover_start)}</span></span>
                      <span>To: <span className="font-medium text-gray-700">{fmt(policy.cover_end)}</span></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
