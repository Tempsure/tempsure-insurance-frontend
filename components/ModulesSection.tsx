'use client';

import { useState, useRef, useEffect } from 'react';
import { Car, Truck, GraduationCap, Check, ArrowRight, Clock, UserCheck } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  description: string;
  duration: string;
  eligibility: string;
  features: string[];
  icon: React.ReactNode;
  delay: number;
}

function ModuleCard({
  title,
  description,
  duration,
  eligibility,
  features,
  icon,
  delay,
}: ModuleCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-gray-200/80 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] hover:-translate-y-1.5 group">
        {/* Icon */}
        <div className="icon-box icon-box-solid mb-4 sm:mb-6 group-hover:shadow-lg">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 leading-relaxed">{description}</p>

        {/* Duration & Eligibility */}
        <div className="mb-5 space-y-2.5 rounded-xl bg-[#f5faff] border border-blue-100/80 p-3.5">
          <div className="flex items-start gap-2.5 text-sm">
            <Clock className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" strokeWidth={2.25} aria-hidden />
            <div>
              <span className="font-semibold text-gray-800">Duration: </span>
              <span className="text-gray-600">{duration}</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5 text-sm">
            <UserCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" strokeWidth={2.25} aria-hidden />
            <div>
              <span className="font-semibold text-gray-800">Eligibility: </span>
              <span className="text-gray-600">{eligibility}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" strokeWidth={2.5} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 group/btn">
          Get Quote
          <ArrowRight className="w-4 h-4 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover/btn:translate-x-1" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export default function ModulesSection() {
  const modules = [
    {
      title: 'Temporary Car Insurance',
      description:
        'Perfect for borrowing a friend\'s car, test-driving, or emergency use. Get coverage from 1 hour to 28 days.',
      duration: '1 Hour to 28 Days',
      eligibility: 'Aged 18-75, Full UK/EU/EEA License',
      features: [
        'NCD Protection - Your primary policy stays safe',
        'SDP + Business Use included',
        'Vehicle value up to £65,000',
        'Valid MOT & Tax required',
      ],
      icon: <Car className="w-7 h-7" strokeWidth={2} aria-hidden />,
    },
    {
      title: 'Temporary Van Insurance',
      description:
        'Ideal for moving house, DIY projects, or business deliveries. Business use fully included for tradesmen and couriers.',
      duration: '1 Hour to 28 Days',
      eligibility: 'Aged 21-75, Full UK/EU/EEA License',
      features: [
        'Business Use automatically included',
        'Covers vans up to 3.5 tonnes (GVW)',
        'Vehicle value up to £65,000',
        'Excludes Hire & Reward & Hazardous materials',
      ],
      icon: <Truck className="w-7 h-7" strokeWidth={2} aria-hidden />,
    },
    {
      title: 'Learner Driver Insurance',
      description:
        'Private practice insurance for learner drivers. Practice in a parent\'s or friend\'s car between official lessons.',
      duration: '1 Day to 24 Weeks (6 Months)',
      eligibility: 'Provisional License, Supervisor 25+ with 3+ years experience',
      features: [
        'Provisional licence validation',
        'Auto-invalidates 3 hours after passing test',
        'Vehicle value up to £50,000',
        'Private cars only (no vans)',
      ],
      icon: <GraduationCap className="w-7 h-7" strokeWidth={2} aria-hidden />,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      {/* Title Section */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
          Our <span className="shiny-text">Insurance</span> Modules
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          Choose the perfect temporary insurance solution for your needs
        </p>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {modules.map((module, index) => (
          <ModuleCard
            key={module.title}
            title={module.title}
            description={module.description}
            duration={module.duration}
            eligibility={module.eligibility}
            features={module.features}
            icon={module.icon}
            delay={index * 150}
          />
        ))}
      </div>
    </div>
  );
}

