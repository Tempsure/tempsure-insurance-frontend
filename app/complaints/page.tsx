'use client';

import { useEffect, useRef } from 'react';

export default function Complaints() {
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
      title: 'Our Commitment',
      content: `At TempSure Insurance, we are committed to providing excellent service to all our customers. We take all complaints seriously and aim to resolve them fairly and promptly. This page explains how to make a complaint and how we will handle it.`,
    },
    {
      title: 'How to Make a Complaint',
      content: `You can make a complaint in the following ways:

**Online**: Complete our online complaints form on this page
**Email**: Send your complaint to complaints@tempsureinsurance.com
**Phone**: Call us on +92 345 8629255 (Monday to Friday, 9am to 5pm)
**Post**: Write to us at TempSure Insurance, 5 Brayford Square, London, E1 0SG

Please include:
- Your policy number or reference
- A clear description of your complaint
- What outcome you are seeking
- Any relevant documentation`,
    },
    {
      title: 'What Happens Next',
      content: `Once we receive your complaint:

**Acknowledgment**: We will acknowledge your complaint within 5 working days and provide you with a unique reference number.

**Investigation**: We will investigate your complaint thoroughly, which may involve reviewing your policy, speaking with relevant staff, and examining any documentation.

**Response**: We aim to provide a full response within 8 weeks. If we cannot resolve your complaint within this time, we will keep you informed of our progress.

**Resolution**: We will provide a clear explanation of our findings and any actions we will take to resolve your complaint.`,
    },
    {
      title: 'Our Complaint Handling Process',
      content: `Our complaint handling process follows these steps:

1. **Receipt and Acknowledgment**: We log your complaint and send an acknowledgment with a reference number
2. **Investigation**: Our complaints team investigates your concerns thoroughly
3. **Review**: Senior management reviews complex complaints
4. **Decision**: We make a fair decision based on all available information
5. **Response**: We provide a clear, written response explaining our decision
6. **Follow-up**: We follow up to ensure you are satisfied with the resolution`,
    },
    {
      title: 'If You Are Not Satisfied',
      content: `If you are not satisfied with our response, you have the right to refer your complaint to the Financial Ombudsman Service (FOS). The FOS is a free, independent service that can help resolve disputes between financial services companies and their customers.

**Financial Ombudsman Service**
- Website: www.financial-ombudsman.org.uk
- Phone: 0800 023 4567
- Email: complaint.info@financial-ombudsman.org.uk
- Address: Exchange Tower, London, E14 9SR

You must refer your complaint to the FOS within 6 months of receiving our final response.`,
    },
    {
      title: 'Time Limits',
      content: `There are time limits for making complaints:

- You should make your complaint as soon as possible after the issue arises
- We can consider complaints made up to 6 years after the event (or 3 years from when you became aware of the issue)
- If you wish to refer your complaint to the Financial Ombudsman Service, you must do so within 6 months of our final response`,
    },
    {
      title: 'Complaint Categories',
      content: `We handle complaints relating to:
- Policy administration and service issues
- Claims handling and decisions
- Premium calculations and charges
- Cancellation and refunds
- Communication and customer service
- Data protection and privacy concerns
- Any other aspect of our service`,
    },
    {
      title: 'Our Standards',
      content: `We are committed to:
- Treating all complaints fairly and impartially
- Investigating complaints thoroughly and promptly
- Providing clear, honest, and transparent responses
- Learning from complaints to improve our service
- Complying with all regulatory requirements
- Maintaining confidentiality throughout the process`,
    },
    {
      title: 'Contact Information',
      content: `For complaints or queries about our complaints process:

**Complaints Department**
- Email: complaints@tempsureinsurance.com
- Phone: +92 345 8629255
- Hours: Monday to Friday, 9am to 5pm
- Address: TempSure Insurance, 5 Brayford Square, London, E1 0SG

**General Enquiries**
- Email: info@tempsureinsurance.com
- Phone: +92 345 8629255`,
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
            <span className="text-gray-900">Complaints</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 animate-fade-in-up animation-delay-200">
            We're here to help resolve any concerns you may have
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

      {/* Contact Form Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: '#f5faff' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-l-4 border-blue-600">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Submit a Complaint
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Please fill out the form below to submit your complaint. We will acknowledge receipt within 5 working days.
            </p>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Policy Number / Reference
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Enter your policy number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Description of Complaint
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="Please provide a clear description of your complaint..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Desired Outcome
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                  placeholder="What outcome are you seeking?"
                />
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

