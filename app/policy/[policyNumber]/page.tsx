'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import { apiFetch } from '@/lib/api-config';

interface PolicyData {
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
    fuelType: string;
    colour: string;
    engineSize: number | null;
    value: string;
  };
  driver: {
    fullName: string;
    title: string;
    dateOfBirth: string;
    occupation: string;
    address: string;
    licenceType: string;
    licenceLength: string;
    mobileNumber: string;
    email: string;
  };
  cover: {
    durationType: string;
    durationValue: string;
    reasonForCover: string;
    vehicleValue: string;
  };
}

function fmt(dt: string): string {
  return new Date(dt).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}

function fmtCurrency(amount: string | number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(amount));
}

export default function PolicyPage() {
  const { policyNumber } = useParams<{ policyNumber: string }>();
  const router = useRouter();
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiFetch(`/api/policies/${policyNumber}/`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Policy not found.');
        setPolicy(data);
      } catch (err) {
        setToastMessage(err instanceof Error ? err.message : 'Failed to load policy.');
        setToastType('error');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [policyNumber]);

  const downloadCertificate = async () => {
    try {
      setDownloading(true);
      const res = await apiFetch(`/api/policies/${policyNumber}/certificate/`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || 'Failed to generate certificate.');
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `policy-${policyNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setToastMessage('Certificate downloaded successfully.');
      setToastType('success');
      setShowToast(true);
    } catch (err) {
      setToastMessage(err instanceof Error ? err.message : 'Download failed.');
      setToastType('error');
      setShowToast(true);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 flex items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-600">Loading your policy...</span>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md">
          <p className="text-gray-600 mb-4">Policy not found or you do not have access to view it.</p>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24" style={{ backgroundColor: '#f5faff' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Banner */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-green-800">Payment successful — your policy is active!</h2>
            <p className="text-sm text-green-700 mt-1">
              Your policy documents will be emailed to {policy.driver.email}. You can also download your certificate below.
            </p>
          </div>
        </div>

        {/* Policy Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-600 to-blue-700 px-4 sm:px-8 py-6 sm:py-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-blue-200 text-sm font-medium mb-1">Policy Number</p>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider">{policy.policy_number}</h1>
                <p className="text-blue-100 text-sm mt-1">Issued {fmtDate(policy.created_at)}</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-400 text-green-900 rounded-xl font-bold text-sm">
                  <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                  Active
                </span>
                <div className="text-right">
                  <div className="text-blue-200 text-xs">Amount paid</div>
                  <div className="text-white font-bold text-lg">{fmtCurrency(policy.amount_paid)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            {/* Cover Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div>
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Cover Start</div>
                <div className="text-base sm:text-lg font-bold text-gray-900">{fmt(policy.cover_start)}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Cover End</div>
                <div className="text-base sm:text-lg font-bold text-gray-900">{fmt(policy.cover_end)}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Duration</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{policy.cover.durationValue}</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-gray-500 mb-1">Reason for Cover</div>
                <div className="text-base sm:text-lg font-semibold text-gray-900">{policy.cover.reasonForCover}</div>
              </div>
            </div>

            {/* Vehicle */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Vehicle</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Registration</div>
                  <div className="font-bold font-mono text-gray-900 text-base sm:text-lg">
                    {policy.vehicle.registrationNumber.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Make & Model</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {policy.vehicle.make} {policy.vehicle.model}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Year</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.vehicle.year ?? '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Fuel Type</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.vehicle.fuelType || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Colour</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.vehicle.colour || '—'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Engine Size</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {policy.vehicle.engineSize ? `${policy.vehicle.engineSize}cc` : '—'}
                  </div>
                </div>
              </div>
            </div>

            {/* Driver */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Driver</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Full Name</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.driver.fullName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Date of Birth</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{fmtDate(policy.driver.dateOfBirth)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Occupation</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.driver.occupation}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Licence Type</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.driver.licenceType}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Licence Held</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.driver.licenceLength}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Address</div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{policy.driver.address}</div>
                </div>
              </div>
            </div>

            {/* Download */}
            <div className="pt-4 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-3">
              <button onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all cursor-pointer">
                ← Back
              </button>
              <button onClick={downloadCertificate} disabled={downloading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-3 disabled:opacity-60">
                {downloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Certificate (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
