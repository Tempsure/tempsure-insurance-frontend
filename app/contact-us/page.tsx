'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactUs() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      title: 'Phone',
      description: 'Speak with our team directly',
      value: '+92 345 8629255',
      icon: <Phone className="w-7 h-7" strokeWidth={2} aria-hidden />,
      link: 'tel:+923458629255',
    },
    {
      title: 'Email',
      description: 'Send us an email anytime',
      value: 'info@tempsureinsurance.com',
      icon: <Mail className="w-7 h-7" strokeWidth={2} aria-hidden />,
      link: 'mailto:info@tempsureinsurance.com',
    },
    {
      title: 'Address',
      description: 'Visit our office',
      value: '5 Brayford Square, London, E1 0SG',
      icon: <MapPin className="w-7 h-7" strokeWidth={2} aria-hidden />,
      link: '#',
    },
    {
      title: 'Business Hours',
      description: 'When we\'re available',
      value: 'Monday - Friday: 9am - 5pm',
      icon: <Clock className="w-7 h-7" strokeWidth={2} aria-hidden />,
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5faff' }}>
      {/* Header Section */}
      <section
        className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32"
        style={{ backgroundColor: '#f5faff' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in-up leading-tight px-2">
            <span className="text-gray-900">Contact</span>{' '}
            <span className="shiny-text">Us</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 animate-fade-in-up animation-delay-200 px-2">
            Get in touch with our friendly team - we're here to help
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionsRef.current[index] = el as HTMLElement | null;
                }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] hover:shadow-2xl hover:-translate-y-1 border-l-4 border-blue-600 text-center group"
              >
                <div className="icon-box icon-box-blue mx-auto mb-3 sm:mb-4 group-hover:shadow-md">
                  {method.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{method.description}</p>
                {method.link !== '#' ? (
                  <a
                    href={method.link}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 cursor-pointer"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gray-700 font-semibold">{method.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="form-card p-6 sm:p-8 md:p-12 border-l-4 border-blue-600 animate-form-enter">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
              Send Us a Message
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Fill out the form below and we'll get back to you as soon as possible. We typically respond within 24 hours.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <p className="text-green-800 font-semibold">
                  ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select a subject</option>
                    <option value="quote">Get a Quote</option>
                    <option value="existing-policy">Existing Policy</option>
                    <option value="claim">Claim Inquiry</option>
                    <option value="complaint">Complaint</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="form-input resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 sm:py-4 text-base sm:text-lg disabled:hover:scale-100 disabled:transform-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-900">
              Need Immediate Assistance?
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
              For urgent matters, claims, or emergency assistance, please call us directly at{' '}
              <a href="tel:+923458629255" className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                +92 345 8629255
              </a>
              . Our team is available Monday to Friday, 9am to 5pm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/help-center"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                Visit Help Center
              </Link>
              <Link
                href="/complaints"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                File a Complaint
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

