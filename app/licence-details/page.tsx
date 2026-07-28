'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/Toast';
import StepProgressBar from '@/components/StepProgressBar';
import { apiFetch } from '@/lib/api-config';

interface FormData {
  issuingCountry: 'UK' | 'NI' | 'EU/EEA' | '';
  euEeaCountry: string;
  licenceType: 'Full' | 'Provisional' | '';
  enterLicenceNumber: 'Yes' | 'No' | '';
  licenceNumber: { part1: string; part2: string; part3: string };
  euEeaLicenceNumber: string;
  licenceLength: string;
  mobileNumber: string;
  email: string;
  confirmEmail: string;
}

interface FormErrors {
  issuingCountry?: string;
  euEeaCountry?: string;
  licenceType?: string;
  enterLicenceNumber?: string;
  licenceNumber?: string;
  euEeaLicenceNumber?: string;
  licenceLength?: string;
  mobileNumber?: string;
  email?: string;
  confirmEmail?: string;
}

const LICENCE_LENGTHS = [
  'Less than 1 year', '1-2 years', '2-5 years', '5-10 years', 'Over 10 years',
];

const EU_EEA_COUNTRIES = [
  'Austria','Belgium','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark',
  'Estonia','Finland','France','Germany','Greece','Hungary','Iceland','Ireland',
  'Italy','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Netherlands',
  'Norway','Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden',
];

export default function LicenceDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    issuingCountry: '',
    euEeaCountry: '',
    licenceType: '',
    enterLicenceNumber: '',
    licenceNumber: { part1: '', part2: '', part3: '' },
    euEeaLicenceNumber: '',
    licenceLength: '',
    mobileNumber: '',
    email: '',
    confirmEmail: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormErrors(prev => { const e = { ...prev }; delete e[field as keyof FormErrors]; return e; });

    if (field === 'issuingCountry') {
      setFormData(prev => ({
        ...prev,
        issuingCountry: value as FormData['issuingCountry'],
        euEeaCountry: '',
        licenceType: '',
        enterLicenceNumber: '',
        licenceNumber: { part1: '', part2: '', part3: '' },
        euEeaLicenceNumber: '',
      }));
    }

    if (field === 'enterLicenceNumber' && value === 'No') {
      setFormData(prev => ({
        ...prev,
        licenceNumber: { part1: '', part2: '', part3: '' },
        euEeaLicenceNumber: '',
      }));
    }
  };

  const handleLicencePartChange = (part: 'part1' | 'part2' | 'part3', value: string) => {
    let v = value.toUpperCase();
    if (part === 'part1') v = v.replace(/[^A-Z]/g, '').slice(0, 5);
    else if (part === 'part2') v = v.replace(/[^0-9]/g, '').slice(0, 6);
    else v = v.replace(/[^A-Z0-9]/g, '').slice(0, 5);
    setFormData(prev => ({ ...prev, licenceNumber: { ...prev.licenceNumber, [part]: v } }));
    setFormErrors(prev => { const e = { ...prev }; delete e.licenceNumber; return e; });
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.issuingCountry) errors.issuingCountry = "Please select the driver's licence issuing country";
    if (formData.issuingCountry === 'EU/EEA' && !formData.euEeaCountry) errors.euEeaCountry = 'Please select the EU/EEA country';
    if (!formData.licenceType) errors.licenceType = 'Licence type is required';
    if (formData.issuingCountry && !formData.enterLicenceNumber) errors.enterLicenceNumber = 'Please select an option';

    if (formData.enterLicenceNumber === 'Yes') {
      if (formData.issuingCountry === 'UK' || formData.issuingCountry === 'NI') {
        const { part1, part2, part3 } = formData.licenceNumber;
        if (!part1 || part1.length !== 5) errors.licenceNumber = 'First part must be exactly 5 letters';
        else if (!part2 || part2.length !== 6) errors.licenceNumber = 'Second part must be exactly 6 digits';
        else if (!part3 || part3.length !== 5) errors.licenceNumber = 'Third part must be exactly 5 characters';
      } else if (formData.issuingCountry === 'EU/EEA') {
        const num = formData.euEeaLicenceNumber.trim().toUpperCase();
        if (!num) errors.euEeaLicenceNumber = 'EU/EEA licence number is required';
        else if (num.length < 8 || num.length > 15) errors.euEeaLicenceNumber = 'Must be 8–15 characters';
        else if (!/^[A-Z]{2}/.test(num)) errors.euEeaLicenceNumber = 'Should start with 2-letter country code';
      }
    }

    if (!formData.licenceLength) errors.licenceLength = 'Licence length is required';

    const mobile = formData.mobileNumber.trim().replace(/\s/g, '');
    if (!mobile) errors.mobileNumber = 'Mobile number is required';
    else if (!/^07\d{9}$/.test(mobile)) errors.mobileNumber = 'Enter a valid UK mobile number (07XXXXXXXXX)';

    const email = formData.email.trim();
    if (!email) errors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address';
    else if (!formData.confirmEmail.trim()) errors.confirmEmail = 'Please confirm your email address';
    else if (email !== formData.confirmEmail.trim()) errors.confirmEmail = 'Email addresses do not match';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) {
      setToastMessage('Please fill in all required fields correctly');
      setShowToast(true);
      return;
    }

    let licenceNumber = '';
    if (formData.enterLicenceNumber === 'Yes') {
      if (formData.issuingCountry === 'EU/EEA') {
        licenceNumber = formData.euEeaLicenceNumber.trim().toUpperCase();
      } else {
        const { part1, part2, part3 } = formData.licenceNumber;
        licenceNumber = `${part1}${part2}${part3}`;
      }
    }

    try {
      setSubmitting(true);
      const res = await apiFetch('/api/quotes/session/licence/', {
        method: 'PATCH',
        body: JSON.stringify({
          issuingCountry: formData.issuingCountry,
          euEeaCountry: formData.euEeaCountry,
          licenceType: formData.licenceType,
          licenceNumber,
          licenceLength: formData.licenceLength,
          mobileNumber: formData.mobileNumber.trim().replace(/\s/g, ''),
          email: formData.email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setToastMessage(data.details ? JSON.stringify(data.details) : data.error || 'Failed to save licence details');
        setShowToast(true);
        return;
      }
      router.push('/quotes');
    } catch {
      setToastMessage('An unexpected error occurred. Please try again.');
      setShowToast(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (err?: string) =>
    `form-input ${err ? 'form-input-error' : ''}`;

  const choiceClass = (active: boolean, err?: string) =>
    `choice-btn text-sm sm:text-base ${active ? 'choice-btn-active' : ''} ${err ? 'choice-btn-error' : ''}`;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-8 pt-20 sm:pt-24 quote-page-bg">
      <div className="max-w-4xl mx-auto">
        <StepProgressBar currentStep={4} totalSteps={10} />

        <div className="form-card p-4 sm:p-6 md:p-8 lg:p-10 animate-form-enter">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Driver licence details</h1>
            <p className="text-base sm:text-lg text-gray-600">Enter the licence details of the driver to be insured.</p>
          </div>

          <div className="space-y-6">
            {/* Issuing Country */}
            <div>
              <label className="form-label">
                What is the driver's licence issuing country?
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { value: 'UK', label: 'UK' },
                  { value: 'NI', label: 'NI (Northern Ireland)' },
                  { value: 'EU/EEA', label: 'EU/EEA' },
                ].map(opt => (
                  <button key={opt.value} type="button" onClick={() => handleInputChange('issuingCountry', opt.value)}
                    className={choiceClass(formData.issuingCountry === opt.value, formErrors.issuingCountry)}>
                    {opt.label}
                  </button>
                ))}
              </div>
              {formErrors.issuingCountry && <p className="form-error">{formErrors.issuingCountry}</p>}
            </div>

            {/* EU/EEA Country */}
            {formData.issuingCountry === 'EU/EEA' && (
              <div>
                <label className="form-label">Please select the EU/EEA country</label>
                <select value={formData.euEeaCountry} onChange={e => handleInputChange('euEeaCountry', e.target.value)} className={`form-select ${formErrors.euEeaCountry ? 'form-input-error' : ''}`}>
                  <option value="">Select EU/EEA country</option>
                  {EU_EEA_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {formErrors.euEeaCountry && <p className="form-error">{formErrors.euEeaCountry}</p>}
              </div>
            )}

            {/* Licence Type */}
            {formData.issuingCountry && (
              <div>
                <label className="form-label">What is the driver's licence type?</label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(formData.issuingCountry === 'EU/EEA' ? ['Full'] : ['Full', 'Provisional']).map(type => (
                    <button key={type} type="button" onClick={() => handleInputChange('licenceType', type)}
                      className={choiceClass(formData.licenceType === type, formErrors.licenceType)}>
                      {type}
                    </button>
                  ))}
                </div>
                {formErrors.licenceType && <p className="form-error">{formErrors.licenceType}</p>}
                {formData.issuingCountry === 'EU/EEA' && (
                  <p className="mt-2 text-sm text-gray-600">Provisional licences are not accepted for EU/EEA drivers.</p>
                )}
              </div>
            )}

            {/* Enter Licence Number? */}
            {formData.issuingCountry && (
              <div>
                <label className="form-label">
                  Do you want to enter the driver's licence number now?
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['Yes', 'No'].map(opt => (
                    <button key={opt} type="button" onClick={() => handleInputChange('enterLicenceNumber', opt)}
                      className={choiceClass(formData.enterLicenceNumber === opt, formErrors.enterLicenceNumber)}>
                      {opt}
                    </button>
                  ))}
                </div>
                {formErrors.enterLicenceNumber && <p className="form-error">{formErrors.enterLicenceNumber}</p>}
              </div>
            )}

            {/* UK/NI Licence Number */}
            {formData.enterLicenceNumber === 'Yes' && (formData.issuingCountry === 'UK' || formData.issuingCountry === 'NI') && (
              <div>
                <label className="form-label">
                  What is the driver's {formData.issuingCountry === 'NI' ? 'Northern Ireland' : 'UK'} driving licence number?
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  We may share your Driving Licence Number with authorised third-party data providers to validate your licence status. By providing it you consent to our{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>.
                </p>
                <div className="flex gap-2 sm:gap-3">
                  {(['part1', 'part2', 'part3'] as const).map((part, i) => (
                    <div key={part} className="flex-1">
                      <input type="text" value={formData.licenceNumber[part]}
                        onChange={e => handleLicencePartChange(part, e.target.value)}
                        placeholder={i === 0 ? 'ABCDE' : i === 1 ? '123456' : 'AB1CD'}
                        maxLength={i === 1 ? 6 : 5}
                        className={`form-input text-center font-mono text-sm sm:text-base ${formErrors.licenceNumber ? 'form-input-error' : ''}`} />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-500">Format: 5 letters – 6 digits – 5 alphanumeric</p>
                {formErrors.licenceNumber && <p className="form-error">{formErrors.licenceNumber}</p>}
              </div>
            )}

            {/* EU/EEA Licence Number */}
            {formData.enterLicenceNumber === 'Yes' && formData.issuingCountry === 'EU/EEA' && (
              <div>
                <label className="form-label">What is the driver's EU/EEA driving licence number?</label>
                <input type="text" value={formData.euEeaLicenceNumber}
                  onChange={e => {
                    const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
                    setFormData(prev => ({ ...prev, euEeaLicenceNumber: v }));
                    setFormErrors(prev => { const er = { ...prev }; delete er.euEeaLicenceNumber; return er; });
                  }}
                  placeholder={formData.euEeaCountry ? `${formData.euEeaCountry} licence number` : 'e.g. DE123AB45678'}
                  maxLength={15}
                  className={`form-input font-mono uppercase ${formErrors.euEeaLicenceNumber ? 'form-input-error' : ''}`} />
                <p className="mt-2 text-xs sm:text-sm text-gray-500">2-letter country code followed by alphanumeric characters (8–15 characters)</p>
                {formErrors.euEeaLicenceNumber && <p className="form-error">{formErrors.euEeaLicenceNumber}</p>}
              </div>
            )}

            {/* Licence Length */}
            <div>
              <label className="form-label">How long has the driver held their licence?</label>
              <select value={formData.licenceLength} onChange={e => handleInputChange('licenceLength', e.target.value)} className={`form-select ${formErrors.licenceLength ? 'form-input-error' : ''}`}>
                <option value="">Please select a licence length</option>
                {LICENCE_LENGTHS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {formErrors.licenceLength && <p className="form-error">{formErrors.licenceLength}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="form-label">What is the driver's mobile number?</label>
              <input type="tel" value={formData.mobileNumber}
                onChange={e => handleInputChange('mobileNumber', e.target.value.replace(/[^0-9\s]/g, ''))}
                placeholder="07XXXXXXXXX" maxLength={13}
                className={inputClass(formErrors.mobileNumber)} />
              {formErrors.mobileNumber && <p className="form-error">{formErrors.mobileNumber}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="form-label">What is the driver's email address?</label>
              <p className="text-sm text-gray-600 mb-3">This is the email address we will use when we send the policy documents.</p>
              <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)}
                placeholder="example@example.com" className={inputClass(formErrors.email)} />
              {formErrors.email && <p className="form-error">{formErrors.email}</p>}
            </div>

            {/* Confirm Email */}
            <div>
              <label className="form-label">Please confirm the driver's email address</label>
              <input type="email" value={formData.confirmEmail} onChange={e => handleInputChange('confirmEmail', e.target.value)}
                placeholder="example@example.com" className={inputClass(formErrors.confirmEmail)} />
              {formErrors.confirmEmail && <p className="form-error">{formErrors.confirmEmail}</p>}
            </div>

            {/* Agreement */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-6">
                By clicking get quotes you agree to the{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">terms and conditions</Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">privacy policy</Link>.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={() => router.push('/personal-details')}
                className="w-full sm:w-auto btn-secondary">
                ← Go back
              </button>
              <button onClick={handleContinue} disabled={submitting}
                className="flex-1 btn-primary">
                {submitting ? 'Saving...' : (
                  <>
                    <span>Get quotes</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast message={toastMessage} type="error" onClose={() => { setShowToast(false); setToastMessage(''); }} />
      )}
    </div>
  );
}
