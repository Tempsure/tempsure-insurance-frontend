'use client';

import { useEffect, useRef } from 'react';

export default function CookiePolicy() {
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
      content: `This Cookie Policy explains how TempSure Insurance uses cookies and similar tracking technologies on our website. By using our website, you consent to the use of cookies in accordance with this policy.`,
    },
    {
      title: 'What Are Cookies',
      content: `Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies can be "persistent" (remain on your device until deleted) or "session" cookies (deleted when you close your browser).`,
    },
    {
      title: 'Types of Cookies We Use',
      content: `We use the following types of cookies:

**Essential Cookies**: These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.

**Analytics Cookies**: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.

**Functional Cookies**: These cookies allow the website to remember choices you make and provide enhanced, personalized features.

**Marketing Cookies**: These cookies are used to track visitors across websites to display relevant advertisements.`,
    },
    {
      title: 'How We Use Cookies',
      content: `We use cookies for the following purposes:
- To remember your preferences and settings
- To analyze website traffic and user behavior
- To improve website functionality and user experience
- To provide personalized content and advertisements
- To ensure website security and prevent fraud
- To enable social media features and content sharing`,
    },
    {
      title: 'Third-Party Cookies',
      content: `In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and provide enhanced functionality. These third parties may include:
- Google Analytics for website analytics
- Social media platforms for sharing functionality
- Advertising networks for targeted advertising
- Payment processors for secure transactions`,
    },
    {
      title: 'Managing Cookies',
      content: `You can control and manage cookies in various ways:

**Browser Settings**: Most browsers allow you to refuse or accept cookies. You can also delete cookies that have already been set. However, blocking or deleting cookies may impact your ability to use certain features of our website.

**Opt-Out Tools**: You can opt out of certain third-party cookies by visiting the relevant third-party's opt-out page or using industry opt-out tools.

**Do Not Track**: Some browsers offer a "Do Not Track" feature. We respect this signal and will not track you if you have enabled this feature.`,
    },
    {
      title: 'Cookie Consent',
      content: `When you first visit our website, we will ask for your consent to use non-essential cookies. You can withdraw your consent at any time by adjusting your cookie preferences in your browser settings or by contacting us directly.`,
    },
    {
      title: 'Updates to This Policy',
      content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.`,
    },
    {
      title: 'Contact Us',
      content: `If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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
            <span className="text-gray-900">Cookie</span>{' '}
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
              By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. 
              If you do not agree with our use of cookies, please adjust your browser settings or discontinue using our website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

