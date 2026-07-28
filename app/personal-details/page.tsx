'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import StepProgressBar from '@/components/StepProgressBar';
import { apiFetch } from '@/lib/api-config';

interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: { day: string; month: string; year: string };
  occupation: string;
  address: string;
  postcode: string;
}

interface FormErrors {
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  occupation?: string;
  address?: string;
  postcode?: string;
}

const OCCUPATIONS = [
  'Accountant','Architect','Artist','Builder','Business Owner','Chef',
  'Civil Servant','Consultant','Dentist','Designer','Doctor','Engineer',
  'Farmer','Firefighter','Hairdresser','IT Professional','Lawyer','Manager',
  'Mechanic','Nurse','Office Worker','Police Officer','Retired',
  'Sales Person','Student','Teacher','Technician','Unemployed','Other',
];

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: { day: '', month: '', year: '' },
    occupation: '',
    address: '',
    postcode: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const clearError = (field: keyof FormErrors) =>
    setFormErrors(prev => { const e = { ...prev }; delete e[field]; return e; });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearError(field as keyof FormErrors);
  };

  const handleDateChange = (part: 'day' | 'month' | 'year', value: string) => {
    setFormData(prev => ({ ...prev, dateOfBirth: { ...prev.dateOfBirth, [part]: value } }));
    clearError('dateOfBirth');
  };

  const validateDOB = (): { valid: boolean; isoDate?: string } => {
    const { day, month, year } = formData.dateOfBirth;
    if (!day || !month || !year) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: 'Date of birth is required' }));
      return { valid: false };
    }
    const d = parseInt(day, 10), m = parseInt(month, 10), y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: 'Please enter a valid date' }));
      return { valid: false };
    }
    const date = new Date(y, m - 1, d);
    if (date.getDate() !== d || date.getMonth() !== m - 1 || date.getFullYear() !== y) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: 'Please enter a valid date' }));
      return { valid: false };
    }
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() < m - 1 || (today.getMonth() === m - 1 && today.getDate() < d)) age--;
    if (age < 17) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: 'Driver must be at least 17 years old' }));
      return { valid: false };
    }
    if (age > 75) {
      setFormErrors(prev => ({ ...prev, dateOfBirth: 'Driver must be 75 years old or younger' }));
      return { valid: false };
    }
    const mm = String(m).padStart(2, '0'), dd = String(d).padStart(2, '0');
    return { valid: true, isoDate: `${y}-${mm}-${dd}` };
  };

  const validate = (): { valid: boolean; isoDate?: string } => {
    const errors: FormErrors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.occupation) errors.occupation = 'Occupation is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.postcode.trim()) errors.postcode = 'Postcode is required';
    setFormErrors(prev => ({ ...prev, ...errors }));
    const dobResult = validateDOB();
    const hasErrors = Object.keys(errors).length > 0 || !dobResult.valid;
    return { valid: !hasErrors, isoDate: dobResult.isoDate };
  };

  const handleContinue = async () => {
    const { valid, isoDate } = validate();
    if (!valid) {
      setToastMessage('Please fill in all required fields');
      setShowToast(true);
      return;
    }

    try {
      setSubmitting(true);
      const res = await apiFetch('/api/quotes/session/personal/', {
        method: 'PATCH',
        body: JSON.stringify({
          title: formData.title,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          dateOfBirth: isoDate,
          occupation: formData.occupation,
          addressLine1: formData.address.trim(),
          postcode: formData.postcode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setToastMessage(data.details ? JSON.stringify(data.details) : data.error || 'Failed to save personal details');
        setShowToast(true);
        return;
      }

      router.push('/licence-details');
    } catch {
      setToastMessage('An unexpected error occurred. Please try again.');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (err?: string) =>
    `form-input ${err ? 'form-input-error' : ''}`;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 pt-20 sm:pt-24 quote-page-bg">
      <div className="max-w-4xl mx-auto">
        <StepProgressBar currentStep={3} totalSteps={10} />

        <div className="form-card p-6 md:p-10 animate-form-enter">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Driver details</h1>
            <p className="text-lg text-gray-600">Enter the details of the driver — make sure they match their driving licence.</p>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.05s' }}>
              <label className="form-label">Title</label>
              <div className="flex flex-wrap gap-3">
                {['Mr', 'Mrs', 'Miss', 'Ms'].map(t => (
                  <button key={t} type="button" onClick={() => handleChange('title', t)}
                    className={`choice-btn ${formData.title === t ? 'choice-btn-active' : ''} ${formErrors.title ? 'choice-btn-error' : ''}`}>
                    {t}
                  </button>
                ))}
              </div>
              {formErrors.title && <p className="form-error">{formErrors.title}</p>}
            </div>

            {/* First Name */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.1s' }}>
              <label className="form-label">First name</label>
              <input type="text" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)}
                placeholder="First name" className={inputClass(formErrors.firstName)} />
              {formErrors.firstName && <p className="form-error">{formErrors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.15s' }}>
              <label className="form-label">Last name</label>
              <input type="text" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)}
                placeholder="Last name" className={inputClass(formErrors.lastName)} />
              {formErrors.lastName && <p className="form-error">{formErrors.lastName}</p>}
            </div>

            {/* Date of Birth */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.2s' }}>
              <label className="form-label">Date of birth</label>
              <div className="flex gap-3">
                {(['day', 'month', 'year'] as const).map(part => (
                  <input key={part} type="text" value={formData.dateOfBirth[part]}
                    onChange={e => handleDateChange(part, e.target.value)}
                    placeholder={part === 'day' ? 'DD' : part === 'month' ? 'MM' : 'YYYY'}
                    maxLength={part === 'year' ? 4 : 2}
                    className={`form-input text-center ${formErrors.dateOfBirth ? 'form-input-error' : ''}`} />
                ))}
              </div>
              {formErrors.dateOfBirth && <p className="form-error">{formErrors.dateOfBirth}</p>}
            </div>

            {/* Occupation */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.25s' }}>
              <label className="form-label">Occupation</label>
              <select value={formData.occupation} onChange={e => handleChange('occupation', e.target.value)} className={`form-select ${formErrors.occupation ? 'form-input-error' : ''}`}>
                <option value="">Select occupation</option>
                {OCCUPATIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {formErrors.occupation && <p className="form-error">{formErrors.occupation}</p>}
            </div>

            {/* Address */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.3s' }}>
              <label className="form-label">Address</label>
              <input type="text" value={formData.address} onChange={e => handleChange('address', e.target.value)}
                placeholder="e.g. 12 High Street, London"
                className={inputClass(formErrors.address)} />
              {formErrors.address && <p className="form-error">{formErrors.address}</p>}
            </div>

            {/* Postcode */}
            <div className="animate-stagger-in" style={{ animationDelay: '0.35s' }}>
              <label className="form-label">Postcode</label>
              <input type="text" value={formData.postcode} onChange={e => handleChange('postcode', e.target.value.toUpperCase())}
                placeholder="e.g. SW1A 1AA"
                className={inputClass(formErrors.postcode)} />
              {formErrors.postcode && <p className="form-error">{formErrors.postcode}</p>}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 animate-stagger-in" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => router.back()} className="w-full sm:w-auto btn-secondary">
                ← Go back
              </button>
              <button onClick={handleContinue} disabled={submitting}
                className="flex-1 btn-primary">
                {submitting ? 'Saving...' : 'Continue'}
                {!submitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToast && <Toast message={toastMessage} type="error" onClose={() => setShowToast(false)} />}
    </div>
  );
}
