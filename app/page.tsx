import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import WhatsCoveredSection from '@/components/WhatsCoveredSection';
import ProcessSection from '@/components/ProcessSection';
import ModulesSection from '@/components/ModulesSection';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Temporary Car, Van & Learner Insurance UK',
  description:
    'Instant temporary car, van and learner driver insurance from 1 hour to 28 days. Get an online quote with your registration and receive your certificate straight away.',
  path: '/',
  keywords: [
    'temporary car insurance UK',
    'short term car insurance',
    'temporary van insurance',
    'learner driver insurance',
  ],
});

export default function Home() {
  return (
    <>
      {/* Hero Section - First background color */}
      <section 
        id="home"
        className="relative"
        style={{ backgroundColor: '#f5faff' }}
      >
        <HeroSection />
      </section>

      {/* What's Covered Section - Second background color */}
      <section 
        id="about"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20"
        style={{ backgroundColor: '#002244' }}
      >
        <WhatsCoveredSection />
      </section>

      {/* Modules Section - First background color again */}
      <section 
        id="services"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6"
        style={{ backgroundColor: '#f5faff' }}
      >
        <ModulesSection />
      </section>

      {/* Process Section - Second background color again */}
      <section 
        id="process"
        className="min-h-screen"
        style={{ backgroundColor: '#002244' }}
      >
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <ProcessSection />
        </div>
      </section>
    </>
  );
}
