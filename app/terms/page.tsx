'use client';

import { useEffect, useRef } from 'react';

export default function TermsAndConditions() {
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
      title: 'Agreement to Terms',
      content: `By accessing and using the TempSure Insurance website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      title: 'Use License',
      content: `Permission is granted to temporarily access the materials on TempSure Insurance's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
- Modify or copy the materials
- Use the materials for any commercial purpose or for any public display
- Attempt to reverse engineer any software contained on the website
- Remove any copyright or other proprietary notations from the materials`,
    },
    {
      title: 'Insurance Services',
      content: `TempSure Insurance provides temporary car insurance, temporary van insurance, and learner driver insurance services. All quotes provided are estimates and subject to:
- Accurate information provided by you
- Underwriter approval
- Payment of premiums
- Compliance with policy terms and conditions
- We reserve the right to refuse service, cancel policies, or deny claims at our discretion.`,
    },
    {
      title: 'Eligibility Requirements',
      content: `To use our services, you must:
- Be at least 18 years of age (21 for van insurance)
- Hold a valid UK, EU, or EEA driving license
- Provide accurate and truthful information
- Have the legal right to insure the vehicle
- Comply with all applicable laws and regulations
- We may verify your information through third-party services and government databases.`,
    },
    {
      title: 'Payment Terms',
      content: `All insurance premiums must be paid in full before coverage begins. We accept various payment methods including credit cards, debit cards, and bank transfers. By providing payment information, you authorize us to charge the applicable fees. Refunds are subject to our cancellation policy and may be prorated based on the unused portion of the policy.`,
    },
    {
      title: 'Policy Coverage and Limitations',
      content: `Insurance coverage is subject to the specific terms and conditions of your policy document. Coverage limitations include:
- Maximum vehicle value limits
- Duration restrictions (1 hour to 28 days for temporary policies)
- Geographic limitations
- Excluded uses (e.g., hire and reward, racing, commercial use without proper coverage)
- Age and license restrictions
- Please review your policy documents carefully for complete coverage details.`,
    },
    {
      title: 'Claims Process',
      content: `In the event of a claim:
- You must notify us immediately or as soon as reasonably practicable
- Provide all requested documentation and information
- Cooperate fully with our investigation
- Not admit liability or make any payments without our written consent
- Claims are subject to policy terms, deductibles, and coverage limits
- We reserve the right to investigate all claims and may deny claims that are fraudulent or not covered under the policy.`,
    },
    {
      title: 'Cancellation and Refunds',
      content: `You may cancel your policy at any time by contacting us. Refunds will be calculated based on:
- The unused portion of your policy
- Any applicable cancellation fees
- Whether a claim has been made
- The type of policy and duration remaining
- Cancellation requests must be submitted in writing or through our online portal.`,
    },
    {
      title: 'Prohibited Uses',
      content: `You agree not to use our services:
- For any unlawful purpose or to solicit others to perform unlawful acts
- To violate any international, federal, provincial, or state regulations, rules, or laws
- To infringe upon or violate our intellectual property rights or the intellectual property rights of others
- To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
- To submit false or misleading information
- To upload or transmit viruses or any other type of malicious code
- To collect or track the personal information of others
- To spam, phish, pharm, pretext, spider, crawl, or scrape`,
    },
    {
      title: 'Intellectual Property',
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of TempSure Insurance and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`,
    },
    {
      title: 'Disclaimer',
      content: `The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, TempSure Insurance:
- Excludes all representations, warranties, and conditions relating to our website and the use of this website
- Excludes all liability for damages arising out of or in connection with your use of this website
- This includes, without limitation, direct loss, loss of business or profits, and indirect, consequential, or incidental damages.`,
    },
    {
      title: 'Limitation of Liability',
      content: `In no event shall TempSure Insurance, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.`,
    },
    {
      title: 'Indemnification',
      content: `You agree to defend, indemnify, and hold harmless TempSure Insurance and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of your use and access of the Service, or a breach of these Terms.`,
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.`,
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be interpreted and governed by the laws of England and Wales. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of England and Wales.`,
    },
    {
      title: 'Changes to Terms',
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      title: 'Contact Information',
      content: `If you have any questions about these Terms and Conditions, please contact us at:
- Email: legal@tempsureinsurance.com
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
            <span className="text-gray-900">Terms &</span>{' '}
            <span className="shiny-text">Conditions</span>
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
              By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, please do not use our services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

