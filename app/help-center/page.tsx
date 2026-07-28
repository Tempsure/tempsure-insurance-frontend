'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HelpCenter() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      question: 'How do I get a quote?',
      answer: 'Simply enter your vehicle registration number in the search box on our homepage and click "Get a Quote". You\'ll receive an instant quote within 2 minutes. You can also browse our insurance modules (Temporary Car Insurance, Temporary Van Insurance, or Learner Driver Insurance) for more specific options.',
    },
    {
      question: 'What information do I need to get a quote?',
      answer: 'To get a quote, you\'ll need your vehicle registration number. For the full application, you\'ll need your driving license details, personal information (name, address, date of birth), and payment information. The exact requirements may vary depending on the type of insurance you\'re applying for.',
    },
    {
      question: 'How long does temporary insurance last?',
      answer: 'Temporary car and van insurance can last from 1 hour to 28 days. Learner driver insurance can last from 1 day to 24 weeks (6 months). You can choose the duration that best suits your needs when getting a quote.',
    },
    {
      question: 'Can I get insurance if I\'m under 25?',
      answer: 'Yes, but there are age restrictions. For temporary car insurance, you must be at least 18 years old. For van insurance, you must be at least 21 years old. Learner driver insurance is available for those with a valid provisional license, regardless of age.',
    },
    {
      question: 'What types of vehicles can I insure?',
      answer: 'We provide insurance for cars, vans (up to 3.5 tonnes GVW and value up to £65,000), and vehicles for learner drivers (private cars up to £50,000). The vehicle must be registered in the UK and meet our eligibility criteria.',
    },
    {
      question: 'How do I make a claim?',
      answer: 'If you need to make a claim, contact us immediately at +92 345 8629255 or email claims@tempsureinsurance.com. Have your policy number ready and provide as much detail as possible about the incident. Our claims team will guide you through the process.',
    },
    {
      question: 'Can I cancel my policy?',
      answer: 'Yes, you can cancel your policy at any time. Refunds will be calculated based on the unused portion of your policy, minus any applicable cancellation fees. If you\'ve made a claim, cancellation may affect your refund. Please contact us to discuss your specific situation.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express). Payment must be made in full before your coverage begins. All payments are processed securely using 256-bit SSL encryption.',
    },
    {
      question: 'Is my No Claims Discount (NCD) protected?',
      answer: 'Yes! Temporary car insurance is a standalone policy, so if you have an accident while using temporary insurance, it will not affect your primary policy\'s No Claims Discount. The claim goes through the temporary policy, not your annual one.',
    },
    {
      question: 'Do you offer business use insurance?',
      answer: 'Yes, our Temporary Van Insurance module specifically includes business use for tradesmen, couriers, and other business purposes. However, certain uses like "Hire and Reward" (taxi services) or carrying hazardous materials are excluded. Please check the policy details for specific coverage.',
    },
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: [
        'How to get a quote',
        'What information you need',
        'Choosing the right policy',
        'Payment options',
      ],
    },
    {
      title: 'Policy Management',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        'View your policy',
        'Make changes',
        'Cancel your policy',
        'Download documents',
      ],
    },
    {
      title: 'Claims',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        'How to make a claim',
        'Claim status',
        'Required documents',
        'Claim timeline',
      ],
    },
    {
      title: 'Account & Billing',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      items: [
        'Manage your account',
        'Update payment method',
        'View invoices',
        'Download receipts',
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5faff' }}>
      {/* Header Section */}
      <section
        className="relative py-20 px-4 pt-32"
        style={{ backgroundColor: '#f5faff' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="text-gray-900">Help</span>{' '}
            <span className="shiny-text">Center</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 animate-fade-in-up animation-delay-200">
            Find answers to common questions and get the support you need
          </p>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionsRef.current[index] = el as HTMLElement | null;
                }}
                className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-l-4 border-blue-600"
              >
                <div className="text-blue-600 mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-blue-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our support team is here to assist you. Get in touch with us through any of the following channels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer inline-block text-center"
              >
                Contact Us
              </Link>
              <a
                href="tel:+923458629255"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer inline-block text-center"
              >
                Call Us: +92 345 8629255
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

