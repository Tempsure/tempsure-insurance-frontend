'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function FAQs() {
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

  const faqCategories = [
    {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I get a quote?',
          answer: 'Simply enter your vehicle registration number in the search box on our homepage and click "Get a Quote". You\'ll receive an instant quote within 2 minutes. You can also browse our insurance modules (Temporary Car Insurance, Temporary Van Insurance, or Learner Driver Insurance) for more specific options.',
        },
        {
          question: 'What information do I need to get a quote?',
          answer: 'To get a quote, you\'ll need your vehicle registration number. For the full application, you\'ll need your driving license details, personal information (name, address, date of birth), and payment information. The exact requirements may vary depending on the type of insurance you\'re applying for.',
        },
        {
          question: 'How long does it take to get a quote?',
          answer: 'Our instant quote system provides you with a quote within 2 minutes of entering your registration number. Once you complete the full application and make payment, your policy can be active immediately.',
        },
        {
          question: 'Can I get a quote without a registration number?',
          answer: 'While we recommend having your registration number for the most accurate quote, you can still browse our insurance options and get an estimate. However, you\'ll need the registration number to complete the purchase.',
        },
      ],
    },
    {
      title: 'Policy & Coverage',
      faqs: [
        {
          question: 'How long does temporary insurance last?',
          answer: 'Temporary car and van insurance can last from 1 hour to 28 days. Learner driver insurance can last from 1 day to 24 weeks (6 months). You can choose the duration that best suits your needs when getting a quote.',
        },
        {
          question: 'What types of vehicles can I insure?',
          answer: 'We provide insurance for cars, vans (up to 3.5 tonnes GVW and value up to £65,000), and vehicles for learner drivers (private cars up to £50,000). The vehicle must be registered in the UK and meet our eligibility criteria.',
        },
        {
          question: 'Is my No Claims Discount (NCD) protected?',
          answer: 'Yes! Temporary car insurance is a standalone policy, so if you have an accident while using temporary insurance, it will not affect your primary policy\'s No Claims Discount. The claim goes through the temporary policy, not your annual one.',
        },
        {
          question: 'What coverage is included in my policy?',
          answer: 'Coverage varies by policy type, but typically includes third-party liability, fire and theft, and comprehensive coverage options. Please review your specific policy documents for complete coverage details. Social, Domestic, and Pleasure (SDP) use is standard, with business use available for van insurance.',
        },
      ],
    },
    {
      title: 'Eligibility & Requirements',
      faqs: [
        {
          question: 'Can I get insurance if I\'m under 25?',
          answer: 'Yes, but there are age restrictions. For temporary car insurance, you must be at least 18 years old. For van insurance, you must be at least 21 years old. Learner driver insurance is available for those with a valid provisional license, regardless of age.',
        },
        {
          question: 'What license do I need?',
          answer: 'You must hold a valid UK, EU, or EEA driving license. For learner driver insurance, you need a valid provisional license. The system will validate your license details during the application process.',
        },
        {
          question: 'Can I insure a vehicle I don\'t own?',
          answer: 'Yes, temporary insurance is designed for situations where you\'re borrowing or using someone else\'s vehicle. However, you must have the owner\'s permission and the legal right to drive the vehicle.',
        },
        {
          question: 'Do you offer business use insurance?',
          answer: 'Yes, our Temporary Van Insurance module specifically includes business use for tradesmen, couriers, and other business purposes. However, certain uses like "Hire and Reward" (taxi services) or carrying hazardous materials are excluded. Please check the policy details for specific coverage.',
        },
      ],
    },
    {
      title: 'Claims & Cancellations',
      faqs: [
        {
          question: 'How do I make a claim?',
          answer: 'If you need to make a claim, contact us immediately at +92 345 8629255 or email claims@tempsureinsurance.com. Have your policy number ready and provide as much detail as possible about the incident. Our claims team will guide you through the process.',
        },
        {
          question: 'Can I cancel my policy?',
          answer: 'Yes, you can cancel your policy at any time. Refunds will be calculated based on the unused portion of your policy, minus any applicable cancellation fees. If you\'ve made a claim, cancellation may affect your refund. Please contact us to discuss your specific situation.',
        },
        {
          question: 'What happens if I need to extend my policy?',
          answer: 'You can extend your temporary policy by purchasing a new policy for the additional period. Unfortunately, we cannot extend existing policies, but you can purchase a new policy to cover the extended period.',
        },
        {
          question: 'What documents do I need for a claim?',
          answer: 'You\'ll need your policy number, driving license, vehicle registration documents, photos of the damage (if applicable), and any relevant incident reports or police reports. Our claims team will provide you with a complete list of required documents based on your specific claim.',
        },
      ],
    },
    {
      title: 'Payment & Billing',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express). Payment must be made in full before your coverage begins. All payments are processed securely using 256-bit SSL encryption.',
        },
        {
          question: 'When will I be charged?',
          answer: 'You\'ll be charged immediately upon completing your purchase. Your policy will be active as soon as payment is confirmed, which typically happens within seconds.',
        },
        {
          question: 'Can I pay in installments?',
          answer: 'No, temporary insurance policies require full payment upfront. This is because temporary policies are short-term and the premium is calculated for the entire duration you select.',
        },
        {
          question: 'Will I receive a receipt?',
          answer: 'Yes, you\'ll receive an email confirmation with your policy details and receipt immediately after purchase. You can also download your policy documents and receipts from your account dashboard.',
        },
      ],
    },
    {
      title: 'Technical & Account',
      faqs: [
        {
          question: 'How do I access my policy documents?',
          answer: 'After purchasing your policy, you\'ll receive an email with a link to download your policy documents. You can also access them by logging into your account on our website or by contacting our customer service team.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on "Sign In" and then select "Forgot Password". Enter your email address and we\'ll send you a link to reset your password. If you need further assistance, contact our support team.',
        },
        {
          question: 'Can I make changes to my policy after purchase?',
          answer: 'Most changes to temporary policies are not possible after purchase due to their short-term nature. However, you can cancel your policy and purchase a new one with the correct details. For specific situations, please contact our customer service team.',
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes, we take data security seriously. All information is encrypted using 256-bit SSL encryption, and we comply with GDPR and UK data protection regulations. Please see our Privacy Policy for more details.',
        },
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
            <span className="text-gray-900">Frequently Asked</span>{' '}
            <span className="shiny-text">Questions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 animate-fade-in-up animation-delay-200">
            Find quick answers to the most common questions
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      {faqCategories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className="py-16 px-4"
          style={{ backgroundColor: '#f5faff' }}
        >
          <div className="max-w-4xl mx-auto">
            <div
              ref={(el) => {
                sectionsRef.current[categoryIndex] = el as HTMLElement | null;
              }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-blue-600"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 10 + faqIndex;
                  return (
                    <div
                      key={faqIndex}
                      className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === globalIndex ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                      >
                        <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                            openFaq === globalIndex ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq === globalIndex && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Contact Support Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Can't find what you're looking for? Our support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer inline-block text-center"
              >
                Contact Us
              </Link>
              <Link
                href="/help-center"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer inline-block text-center"
              >
                Visit Help Center
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-gray-700 mb-2">
                Or call us directly at{' '}
                <a href="tel:+923458629255" className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                  +92 345 8629255
                </a>
              </p>
              <p className="text-sm text-gray-600">Monday - Friday, 9am - 5pm</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

