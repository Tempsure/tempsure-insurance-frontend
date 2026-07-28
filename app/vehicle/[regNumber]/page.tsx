'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import StepProgressBar from '@/components/StepProgressBar';
import { apiFetch, getApiUrl } from '@/lib/api-config';

interface VehicleDetails {
  registrationNumber: string;
  make: string;
  model: string;
  yearOfManufacture: number | null;
  fuelType: string;
  colour: string;
  engineSize?: number | null;
  firstRegistrationDate?: string | null;
}

interface FormData {
  vehicleValue: string;
  reasonForCover: string;
  coverDurationType: 'hours' | 'days' | 'weeks' | '';
  coverDurationValue: string;
  coverStart: 'immediate' | 'date' | '';
  coverStartDate: string;
  coverStartTime: string;
}

interface FormErrors {
  vehicleValue?: string;
  reasonForCover?: string;
  coverDurationType?: string;
  coverDurationValue?: string;
  coverStart?: string;
  coverStartDate?: string;
  coverStartTime?: string;
}

const DURATION_OPTIONS: Record<string, string[]> = {
  hours: ['1 Hour', '2 Hours', '3 Hours', '6 Hours', '12 Hours'],
  days: ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days', '14 Days', '21 Days', '28 Days'],
  weeks: ['1 Week', '2 Weeks', '3 Weeks', '4 Weeks'],
};

const VEHICLE_VALUE_OPTIONS = [
  'Under £1,000', '£1,000 - £5,000', '£5,000 - £10,000',
  '£10,000 - £15,000', '£15,000 - £20,000', '£20,000 - £25,000',
  '£25,000 - £30,000', '£30,000 - £40,000', '£40,000 - £50,000',
  '£50,000 - £65,000', 'Over £65,000',
];

const REASON_OPTIONS = [
  "Borrowing a friend's car", 'Test drive', 'Temporary use',
  'Moving house', 'Buying a car', 'Selling a car',
  "Driving someone else's car", 'Other',
];

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const regNumber = params?.regNumber as string;

  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    vehicleValue: '',
    reasonForCover: '',
    coverDurationType: '',
    coverDurationValue: '',
    coverStart: '',
    coverStartDate: '',
    coverStartTime: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const getNext10Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const getAvailableHours = (dateStr: string): string[] => {
    const all = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00');
    const today = new Date();
    const sel = new Date(dateStr + 'T00:00:00');
    const isToday = sel.toDateString() === today.toDateString();
    if (!isToday) return all;
    // For today: only show hours that haven't passed yet (next full hour minimum)
    const nextHour = today.getHours() + 1;
    return all.filter((_, i) => i >= nextHour);
  };

  // Create quote session + fetch vehicle in parallel
  useEffect(() => {
    if (!regNumber) {
      setError('Registration number is required');
      setLoading(false);
      return;
    }

    const init = async () => {
      try {
        setLoading(true);

        const [sessionRes, vehicleRes] = await Promise.all([
          apiFetch('/api/quotes/session/', { method: 'POST' }),
          fetch(getApiUrl('/api/vehicles/lookup/'), {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ registrationNumber: decodeURIComponent(regNumber) }),
          }),
        ]);

        if (!sessionRes.ok) {
          throw new Error('Failed to initialise quote session.');
        }

        const vehicleData = await vehicleRes.json();
        if (!vehicleRes.ok) {
          setError(vehicleData.error || 'Failed to fetch vehicle details');
          return;
        }
        if (vehicleData.vehicle) {
          setVehicle(vehicleData.vehicle);
        } else {
          setError('Vehicle details not found');
        }
      } catch {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [regNumber]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => { const e = { ...prev }; delete e[field as keyof FormErrors]; return e; });
    }
    if (field === 'coverDurationType') {
      setFormData(prev => ({ ...prev, coverDurationType: value as 'hours' | 'days' | 'weeks', coverDurationValue: '' }));
    }
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.vehicleValue) errors.vehicleValue = 'Vehicle value is required';
    if (!formData.reasonForCover) errors.reasonForCover = 'Reason for cover is required';
    if (!formData.coverDurationType) errors.coverDurationType = 'Cover duration type is required';
    if (!formData.coverDurationValue) errors.coverDurationValue = 'Cover duration is required';
    if (!formData.coverStart) errors.coverStart = 'Cover start is required';
    if (formData.coverStart === 'date' && !formData.coverStartDate) errors.coverStartDate = 'Please select a start date';
    if (formData.coverStart === 'date' && formData.coverStartDate && !formData.coverStartTime) errors.coverStartTime = 'Please select a start time';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) {
      setError('Please fill in all required fields');
      setShowToast(true);
      return;
    }
    if (!vehicle?.engineSize) {
      setError('Engine size could not be determined for this vehicle. Please contact support.');
      setShowToast(true);
      return;
    }

    let coverStartDatetime: string;
    if (formData.coverStart === 'immediate') {
      // Send current time — backend adds 15 minutes
      coverStartDatetime = new Date().toISOString();
    } else {
      // Construct as local time (no Z) so browser applies UK timezone (BST/GMT) automatically
      coverStartDatetime = new Date(`${formData.coverStartDate}T${formData.coverStartTime}:00`).toISOString();
    }

    try {
      setSubmitting(true);
      const res = await apiFetch('/api/quotes/session/vehicle/', {
        method: 'PATCH',
        body: JSON.stringify({
          registrationNumber: vehicle.registrationNumber,
          vehicleMake: vehicle.make,
          vehicleModel: vehicle.model,
          vehicleYear: vehicle.yearOfManufacture,
          vehicleFuelType: vehicle.fuelType,
          vehicleColour: vehicle.colour,
          vehicleEngineSize: vehicle.engineSize,
          vehicleValue: formData.vehicleValue,
          reasonForCover: formData.reasonForCover,
          coverDurationType: formData.coverDurationType,
          coverDurationValue: formData.coverDurationValue,
          coverStartDatetime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.details ? JSON.stringify(data.details) : data.error || 'Failed to save vehicle details.');
        setShowToast(true);
        return;
      }

      router.push('/personal-details');
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 pt-32" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4" />
          <p className="text-gray-600 text-lg font-semibold">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error && !vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 pt-32" style={{ backgroundColor: '#f5faff' }}>
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-lg">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <button onClick={() => router.push('/')} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 pt-20 sm:pt-24 quote-page-bg">
      <div className="max-w-4xl mx-auto">
        <StepProgressBar currentStep={2} totalSteps={10} />

        <div className="form-card p-6 md:p-10 animate-form-enter">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">About the vehicle you want to insure</h1>
            <p className="text-lg text-gray-600">Check your vehicle, reason for cover, and start time.</p>
          </div>

          {/* Vehicle Card */}
          {vehicle && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div className="mb-4">
                <div className="inline-block bg-yellow-400 px-6 lg:px-8 py-4 rounded-lg shadow-lg border-2 border-gray-800 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-b from-blue-600 via-white to-red-600 flex flex-col items-center justify-center">
                    <div className="text-white text-xs font-bold mb-1">UK</div>
                  </div>
                  <div className="ml-14">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-widest">{vehicle.registrationNumber}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-bold text-gray-900">{vehicle.make} {vehicle.model}</div>
                <div className="text-lg text-gray-600">
                  {vehicle.yearOfManufacture}, {vehicle.fuelType}
                  {vehicle.engineSize && `, ${vehicle.engineSize}cc`}
                </div>
                {!vehicle.engineSize && (
                  <p className="text-sm text-red-500 font-semibold mt-1">
                    ⚠ Engine size not available for this vehicle — pricing may not be possible.
                  </p>
                )}
              </div>
              <button onClick={() => router.push('/')} className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-semibold underline cursor-pointer">
                Wrong vehicle? Change vehicle
              </button>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Vehicle Value */}
            <div>
              <label className="form-label">What is the vehicle value?</label>
              <select
                value={formData.vehicleValue}
                onChange={e => handleChange('vehicleValue', e.target.value)}
                className={`form-select ${formErrors.vehicleValue ? 'form-input-error' : ''}`}
              >
                <option value="">Select vehicle value</option>
                {VEHICLE_VALUE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {formErrors.vehicleValue && <p className="form-error">{formErrors.vehicleValue}</p>}
            </div>

            {/* Reason for Cover */}
            <div>
              <label className="form-label">What is the reason for cover?</label>
              <select
                value={formData.reasonForCover}
                onChange={e => handleChange('reasonForCover', e.target.value)}
                className={`form-select ${formErrors.reasonForCover ? 'form-input-error' : ''}`}
              >
                <option value="">Select reason for cover</option>
                {REASON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {formErrors.reasonForCover && <p className="form-error">{formErrors.reasonForCover}</p>}
            </div>

            {/* Duration Type */}
            <div>
              <label className="form-label">Do you need hours, days or weeks cover?</label>
              <div className="flex flex-wrap gap-3">
                {(['hours', 'days', 'weeks'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('coverDurationType', type)}
                    className={`choice-btn ${formData.coverDurationType === type ? 'choice-btn-active' : ''} ${formErrors.coverDurationType ? 'choice-btn-error' : ''}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              {formErrors.coverDurationType && <p className="form-error">{formErrors.coverDurationType}</p>}
            </div>

            {/* Duration Value */}
            {formData.coverDurationType && (
              <div>
                <label className="form-label">How long do you need cover for?</label>
                <div className="flex flex-wrap gap-3">
                  {DURATION_OPTIONS[formData.coverDurationType].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleChange('coverDurationValue', opt)}
                      className={`choice-btn text-base ${formData.coverDurationValue === opt ? 'choice-btn-active' : ''} ${formErrors.coverDurationValue ? 'choice-btn-error' : ''}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {formErrors.coverDurationValue && <p className="form-error">{formErrors.coverDurationValue}</p>}
              </div>
            )}

            {/* Cover Start */}
            <div className="space-y-3">
              <label className="form-label">When do you want the cover to start?</label>

              {/* Date selector */}
              <select
                value={formData.coverStart === 'immediate' ? 'immediate' : formData.coverStartDate || ''}
                onChange={e => {
                  if (e.target.value === 'immediate') {
                    setFormData(prev => ({ ...prev, coverStart: 'immediate', coverStartDate: '', coverStartTime: '' }));
                  } else {
                    setFormData(prev => ({ ...prev, coverStart: 'date', coverStartDate: e.target.value, coverStartTime: '' }));
                  }
                  if (formErrors.coverStart) setFormErrors(prev => { const e = { ...prev }; delete e.coverStart; return e; });
                }}
                className={`form-select ${formErrors.coverStart || formErrors.coverStartDate ? 'form-input-error' : ''}`}
              >
                <option value="">Select start date</option>
                <option value="immediate">Immediately (cover starts in 15 minutes)</option>
                {getNext10Days().map(date => {
                  const str = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                  const label = date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                  return <option key={str} value={str}>{label}</option>;
                })}
              </select>
              {(formErrors.coverStart || formErrors.coverStartDate) && (
                <p className="form-error">{formErrors.coverStart || formErrors.coverStartDate}</p>
              )}

              {/* Time selector — only shown for a specific date */}
              {formData.coverStart === 'date' && formData.coverStartDate && (
                <div>
                  <label className="block text-base font-semibold text-gray-800 mb-2">What time should cover start?</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {getAvailableHours(formData.coverStartDate).map(hour => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, coverStartTime: hour }));
                          if (formErrors.coverStartTime) setFormErrors(prev => { const e = { ...prev }; delete e.coverStartTime; return e; });
                        }}
                        className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer border-2 ${
                          formData.coverStartTime === hour
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                            : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                        } ${formErrors.coverStartTime ? 'border-red-300' : ''}`}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                  {getAvailableHours(formData.coverStartDate).length === 0 && (
                    <p className="mt-2 text-sm text-amber-600 font-medium">No hours available for today — please select a future date.</p>
                  )}
                  {formErrors.coverStartTime && (
                    <p className="form-error">{formErrors.coverStartTime}</p>
                  )}
                </div>
              )}

              {/* Immediate summary */}
              {formData.coverStart === 'immediate' && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-blue-700 font-medium">
                    Cover will start at <strong>{new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} today</strong> (15 minutes from now, UK time)
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button onClick={() => router.push('/')} className="w-full sm:w-auto btn-secondary">
                Go back
              </button>
              <button
                onClick={handleContinue}
                disabled={submitting}
                className="flex-1 btn-primary"
              >
                {submitting ? 'Saving...' : 'Continue'}
                {!submitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && error && <Toast message={error} type="error" onClose={() => setShowToast(false)} />}
    </div>
  );
}
