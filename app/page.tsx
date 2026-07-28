import HeroSection from '@/components/HeroSection';
import WhatsCoveredSection from '@/components/WhatsCoveredSection';
import ProcessSection from '@/components/ProcessSection';
import ModulesSection from '@/components/ModulesSection';

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

