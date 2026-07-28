'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api-config';
import { Mail, User, Calendar, MapPin, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    surname: '',
    dob: '',
    postcode: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [generalError, setGeneralError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'postcode' ? value.toUpperCase() : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    } else if (new Date(formData.dob) > new Date()) {
      newErrors.dob = 'Date of birth cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setGeneralError('');
    try {
      const res = await apiFetch('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.email,
          dateOfBirth: formData.dob,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed. Please try again.');
      router.push('/dashboard');
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (hasError?: string) =>
    `form-input !pl-12 !text-gray-900 placeholder:!text-gray-400 caret-blue-600 ${
      hasError ? 'form-input-error' : ''
    }`;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 pt-24 sm:pt-28 lg:pt-32 relative overflow-hidden quote-page-bg"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-16 left-8 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-16 right-8 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
            Login to view your <span className="shiny-text">quotes</span> and{' '}
            <span className="shiny-text">policies</span>
          </h1>
        </div>

        <div className="form-card p-6 sm:p-8 md:p-10 animate-form-enter relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 via-blue-500 to-blue-700" />

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className={inputClass(errors.email)}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="form-error flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Surname */}
            <div>
              <label htmlFor="surname" className="form-label">
                Last Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className={inputClass(errors.surname)}
                  placeholder="e.g. Rehman"
                />
              </div>
              {errors.surname && (
                <p className="form-error flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
                  {errors.surname}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`${inputClass(errors.dob)} [color-scheme:light]`}
                />
              </div>
              {errors.dob && (
                <p className="form-error flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
                  {errors.dob}
                </p>
              )}
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="form-label">
                Postcode <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  autoComplete="postal-code"
                  className={`${inputClass(errors.postcode)} uppercase`}
                  placeholder="Enter your postcode"
                />
              </div>
              {errors.postcode && (
                <p className="form-error flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" aria-hidden />
                  {errors.postcode}
                </p>
              )}
            </div>

            {generalError && (
              <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden />
                <p className="text-sm text-red-700 font-medium">{generalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3.5 sm:py-4 text-base sm:text-lg group disabled:hover:translate-y-0"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight
                    className="w-5 h-5 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover:translate-x-1"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
