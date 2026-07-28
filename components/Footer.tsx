'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      href: '#',
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      href: '#',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/#home', internal: true },
    { name: 'What\'s Covered', href: '/#about', internal: true },
    { name: 'Our Modules', href: '/#services', internal: true },
    { name: 'How It Works', href: '/#process', internal: true },
  ];

  const insuranceTypes = [
    { name: 'Temporary Car Insurance', href: '/#services', internal: true },
    { name: 'Temporary Van Insurance', href: '/#services', internal: true },
    { name: 'Learner Driver Insurance', href: '/#services', internal: true },
  ];

  const supportLinks = [
    { name: 'Help Centre', href: '/help-center', internal: true },
    { name: 'Contact Us', href: '/contact-us', internal: true },
    { name: 'FAQs', href: '/faqs', internal: true },
    { name: 'Claims', href: '#', internal: false },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy', internal: true },
    { name: 'Terms & Conditions', href: '/terms', internal: true },
    { name: 'Cookie Policy', href: '/cookie-policy', internal: true },
    { name: 'Complaints', href: '/complaints', internal: true },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10 lg:py-12 xl:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-8 xl:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Company Info */}
          <div
            className={`lg:col-span-2 transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">T</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">TempSure</span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed max-w-md">
              Your trusted partner for comprehensive temporary car insurance. Get instant quotes
              and flexible coverage from 1 hour to 28 days.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-white border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 hover:scale-110 hover:rotate-6 transform ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${300 + index * 50}ms`,
                  }}
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">{social.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transform transition-all duration-500 ease-out ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 50}ms` }}
                >
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Insurance Types */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Insurance Types</h3>
            <ul className="space-y-3">
              {insuranceTypes.map((link, index) => (
                <li
                  key={link.name}
                  className={`transform transition-all duration-500 ease-out ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${250 + index * 50}ms` }}
                >
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transform transition-all duration-500 ease-out ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'
                  }`}
                  style={{ transitionDelay: `${350 + index * 50}ms` }}
                >
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`border-t border-gray-200 pt-6 sm:pt-8 mb-6 sm:mb-8 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {/* Trustpilot */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                T
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-500">Trustpilot</p>
              </div>
            </div>

            {/* FCA Regulated */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform duration-300">
                FCA
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">FCA Regulated</p>
                <p className="text-xs text-gray-500">Authorised & Regulated</p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Secure Payments</p>
                <p className="text-xs text-gray-500">256-bit SSL Encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t border-gray-200 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 transform transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            {legalLinks.map((link, index) => (
              link.internal ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${550 + index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-gray-600 hover:text-blue-600 transition-colors duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ transitionDelay: `${550 + index * 50}ms` }}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} TempSure Insurance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

