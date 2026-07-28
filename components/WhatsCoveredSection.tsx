'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, ListChecks } from 'lucide-react';
import { GearIcon, LightningIcon, WrenchIcon, ShieldIcon } from './Icons';

interface CoverageCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  delay: number;
}

function CoverageCard({ title, description, icon, iconColor, delay }: CoverageCardProps) {
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
      <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 h-full border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-2xl group">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover:scale-105"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          {icon}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{title}</h3>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function WhatsCoveredSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const coverageCategories = [
    {
      title: 'Engine & Transmission',
      description: 'Protection for engine internals, cylinder head, gearbox, clutch assembly, and drive components.',
      icon: <GearIcon color="#FF6B35" />,
      iconColor: '#FF6B35', // Orange
    },
    {
      title: 'Electrical & Electronics',
      description: 'ECU, sensors, starter motor, alternator, wiring harness, and electronic control modules.',
      icon: <LightningIcon color="#FFD23F" />,
      iconColor: '#FFD23F', // Yellow
    },
    {
      title: 'Steering & Suspension',
      description: 'Power steering pump, steering rack, shock absorbers, struts, and suspension linkages.',
      icon: <WrenchIcon color="#06D6A0" />,
      iconColor: '#06D6A0', // Green
    },
    {
      title: 'Braking Systems',
      description: 'ABS pump, brake servo, master cylinder, calipers, and hydraulic brake components.',
      icon: <ShieldIcon color="#EF476F" />,
      iconColor: '#EF476F', // Red
    },
  ];

  const additionalComponents = [
    'Wear & Tear',
    'Cooling & Heating System',
    'Drive Shafts & CV Joints',
    'Hybrid/EV Components',
    'Turbocharger & Supercharger',
    'Air Conditioning Unit',
    'Wheel Bearings',
    'Fuel Injection System',
    'Differential & Transfer Box',
    'Timing Chain/Belt',
  ];

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      {/* Title Section */}
      <div
        className={`text-center mb-10 sm:mb-12 lg:mb-16 transform transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 px-2">
          What's <span className="shiny-text">Covered</span>
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-2">
          All essential vehicle components protected under one plan
        </p>
      </div>

      {/* Main Coverage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
        {coverageCategories.map((category, index) => (
          <CoverageCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            iconColor={category.iconColor}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Additional Components Section */}
      <div
        className={`transform transition-all duration-[var(--duration-slow)] ease-[var(--ease-smooth)] ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div className="icon-box icon-box-white w-10 h-10 sm:w-11 sm:h-11">
              <ListChecks className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} aria-hidden />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              Additional Components Covered
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {additionalComponents.map((component, index) => (
              <div
                key={component}
                className="flex items-center gap-3 group"
                style={{
                  animationName: isVisible ? 'fade-in-left' : 'none',
                  animationDuration: isVisible ? '0.5s' : '0s',
                  animationTimingFunction: isVisible ? 'ease-out' : 'ease',
                  animationFillMode: isVisible ? 'forwards' : 'none',
                  animationDelay: `${500 + index * 50}ms`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover:scale-110">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} aria-hidden />
                </div>
                <span className="text-gray-200 group-hover:text-white transition-colors duration-[var(--duration-smooth)] ease-[var(--ease-smooth)]">
                  {component}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

