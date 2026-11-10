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
          answer:
            'Enter your vehicle registration on the homepage and continue through vehicle, driver, and licence details. You will see your price on the quote page before payment.',
        },
        {
          question: 'What information do I need?',
          answer:
            'You need the vehicle registration, driver personal details, a valid UK/NI/EU/EEA licence, a UK mobile number, and a confirmed email address for policy documents.',
        },
        {
          question: 'How long does the quote take?',
          answer:
            'Most customers finish the quote steps in a few minutes. Cover can start immediately after successful payment, or at the future start time you choose.',
        },
        {
          question: 'Do I need a registration number?',
          answer:
            'Yes. Temporary cover is priced and issued against a specific UK-registered vehicle, so the registration number is required to get an accurate quote and policy.',
        },
      ],
    },
    {
      title: 'Policy & Coverage',
      faqs: [
        {
          question: 'How long does temporary insurance last?',
          answer:
            'Temporary car and van cover can run from 1 hour up to 28 days. Learner driver cover options depend on the product selected at quote time.',
        },
        {
          question: 'What vehicles can I insure?',
          answer:
            'Cars, vans (typically up to 3.5 tonnes GVW), and learner-driver private cars that meet our eligibility rules. The vehicle must be UK-registered.',
        },
        {
          question: 'Is my No Claims Discount protected?',
          answer:
            'Yes. TempSure temporary cover is a standalone policy, so a claim on it does not affect the No Claims Discount on a separate annual policy.',
        },
        {
          question: 'What is covered?',
          answer:
            'Policies typically include comprehensive cover options with third-party liability, fire and theft protection, and social, domestic and pleasure use. Always check your certificate and schedule for your exact terms.',
        },
        {
          question: 'Will my policy be on the MID?',
          answer:
            'Yes. Short-term motor policies are submitted to the Motor Insurance Database (MID). Keep a copy of your certificate with you during the cover period.',
        },
      ],
    },
    {
      title: 'Eligibility & Requirements',
      faqs: [
        {
          question: 'What ages can get cover?',
          answer:
            'Drivers must usually be between 17 and 75. Some product rules may differ for vans or learner cover, and the quote form will stop ages outside our accepted range.',
        },
        {
          question: 'What licence do I need?',
          answer:
            'A valid UK, Northern Ireland, or EU/EEA licence. Learner cover requires a valid provisional licence where that product applies.',
        },
        {
          question: 'Can I insure a car I do not own?',
          answer:
            'Yes, with the owner’s permission and a legal right to drive it. Temporary cover is commonly used when borrowing a vehicle.',
        },
        {
          question: 'Do you offer business use?',
          answer:
            'Business use can be available on selected van products. Hire and reward, taxi use, and hazardous goods are excluded. Check your quote and certificate for permitted use.',
        },
        {
          question: 'Is learner driver cover different?',
          answer:
            'Yes. Learner products are designed for provisional licence holders and may require a qualified supervisor. Follow the learner product page rules shown during quote.',
        },
      ],
    },
    {
      title: 'Certificates & Documents',
      faqs: [
        {
          question: 'When do I get my certificate?',
          answer:
            'After successful payment we email your policy confirmation and certificate PDF to the email address you confirmed in the quote. You can also download it from your policy page.',
        },
        {
          question: 'I did not receive my certificate email. What should I do?',
          answer:
            'Check spam/junk first. Then sign in with your email and date of birth to download the certificate from your account. If it is still missing, contact us on 08008629255 or info@tempsureinsurance.co.uk with your policy number.',
        },
        {
          question: 'Can I change the email after buying?',
          answer:
            'The certificate is issued to the email confirmed before payment. Contact support if you need documents resent to a corrected address for an existing policy.',
        },
        {
          question: 'Do I need to print the certificate?',
          answer:
            'A digital copy is valid evidence of cover. We recommend keeping it available on your phone or printed while driving.',
        },
      ],
    },
    {
      title: 'Claims, Cancellations & Refunds',
      faqs: [
        {
          question: 'How do I make a claim?',
          answer:
            'Call 08008629255 or email info@tempsureinsurance.co.uk as soon as possible. Have your policy number, vehicle registration, and incident details ready.',
        },
        {
          question: 'Can I cancel my policy?',
          answer:
            'Contact us to request cancellation. Refunds, if any, depend on unused cover time, whether cover has started, and whether a claim has been made.',
        },
        {
          question: 'How do refunds work?',
          answer:
            'Eligible unused cover may be refunded after admin review. Stripe card refunds are handled by our team once the policy is marked for refund. Claimed policies usually have no refund.',
        },
        {
          question: 'Can I extend my policy?',
          answer:
            'Existing short-term policies are not extended in place. Buy a new policy for the extra period you need.',
        },
        {
          question: 'What documents are needed for a claim?',
          answer:
            'Policy number, driving licence, registration details, photos of damage where relevant, and any police or incident references. Our team will confirm anything else required.',
        },
      ],
    },
    {
      title: 'Payment & Billing',
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer:
            'Major debit and credit cards via secure Stripe Checkout. Full payment is taken before cover begins.',
        },
        {
          question: 'When am I charged?',
          answer:
            'You are charged when you complete Stripe Checkout. Your policy is created once payment is confirmed.',
        },
        {
          question: 'Can I pay in instalments?',
          answer:
            'No. Temporary policies are short-term and require full payment upfront.',
        },
        {
          question: 'Will I get a receipt?',
          answer:
            'Yes. You receive an email confirmation with policy details after purchase, and you can view the policy in your account.',
        },
        {
          question: 'My card was charged but I cannot see a policy. What now?',
          answer:
            'Sign in with the same email and date of birth used in the quote. If nothing appears, contact support with your Stripe/payment email and registration number so we can recover the policy and resend the certificate.',
        },
      ],
    },
    {
      title: 'Account & Support',
      faqs: [
        {
          question: 'How do I sign in?',
          answer:
            'Use the email address from your quote and your date of birth. There is no password to reset.',
        },
        {
          question: 'How do I access my documents?',
          answer:
            'Open your confirmation email or sign in to your account, open the policy, and download the certificate PDF.',
        },
        {
          question: 'Can I change policy details after purchase?',
          answer:
            'Most temporary policy details cannot be edited after issue. Cancel and buy a new policy if details were wrong, or contact support for advice.',
        },
        {
          question: 'Is my information secure?',
          answer:
            'Yes. Payments run through Stripe and personal data is handled under UK GDPR requirements. See our Privacy Policy for full details.',
        },
        {
          question: 'How can I contact TempSure?',
          answer:
            'Call 08008629255 (Monday–Friday, 9am–5pm), email info@tempsureinsurance.co.uk, or use the Contact Us form. Our office address is 5 Brayford Square, London, E1 0SG.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5faff' }}>
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
            Quotes, certificates, payments, claims, and account help — all in one place
          </p>
        </div>
      </section>

      {faqCategories.map((category, categoryIndex) => (
        <section
          key={category.title}
          id={category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
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
                  const globalIndex = categoryIndex * 20 + faqIndex;
                  return (
                    <div
                      key={faq.question}
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

      <section className="py-16 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our dedicated team can help with quotes, certificates, payments, and claims.
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
                <a href="tel:08008629255" className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                  08008629255
                </a>
              </p>
              <p className="text-sm text-gray-600">Monday - Friday, 9am - 5pm · info@tempsureinsurance.co.uk</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
