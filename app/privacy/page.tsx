'use client';

import { useEffect, useRef } from 'react';

export default function PrivacyPolicy() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

  const sections = [
    {
      title: 'Introduction',
      content: `At TempSure Insurance, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.`,
    },
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
- Personal identification information (name, email address, phone number, date of birth)
- Vehicle information (registration number, make, model, year)
- Driving license details
- Payment information (processed securely through third-party payment processors)
- Information about your insurance history and claims
- Communication preferences`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
- Provide, maintain, and improve our insurance services
- Process your insurance quotes and applications
- Communicate with you about your policy, quotes, and account
- Send you important updates, notifications, and marketing communications (with your consent)
- Detect, prevent, and address technical issues and fraud
- Comply with legal obligations and regulatory requirements
- Analyze usage patterns to improve our website and services`,
    },
    {
      title: 'Information Sharing and Disclosure',
      content: `We may share your information with:
- Insurance underwriters and partners to provide quotes and policies
- Third-party service providers who assist us in operating our business
- Legal and regulatory authorities when required by law
- Business partners in the event of a merger, acquisition, or sale of assets
- We do not sell your personal information to third parties for marketing purposes.`,
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
- Access and receive a copy of your personal data
- Rectify inaccurate or incomplete information
- Request deletion of your personal data
- Object to processing of your personal data
- Request restriction of processing
- Data portability
- Withdraw consent at any time
- To exercise these rights, please contact us using the information provided below.`,
    },
    {
      title: 'Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.`,
    },
    {
      title: 'Third-Party Links',
      content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
    },
    {
      title: 'Children\'s Privacy',
      content: `Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.`,
    },
    {
      title: 'Changes to This Privacy Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
- Email: privacy@tempsureinsurance.com
- Phone: +92 345 8629255
- Address: TempSure Insurance, 5 Brayford Square, London, E1 0SG`,
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
            <span className="text-gray-900">Privacy</span>{' '}
            <span className="shiny-text">Policy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 animate-fade-in-up animation-delay-200">
            Last Updated: {new Date().toLocaleDateString('en-GB', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el as HTMLElement | null;
          }}
          className="py-16 px-4"
          style={{ backgroundColor: '#f5faff' }}
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-3xl border-l-4 border-blue-600"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                {index + 1}. {section.title}
              </h2>
              <div className="text-lg md:text-xl leading-relaxed whitespace-pre-line text-gray-700">
                {section.content}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer Note Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: '#f5faff' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 shadow-xl">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              By using our services, you acknowledge that you have read and understood this Privacy Policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

