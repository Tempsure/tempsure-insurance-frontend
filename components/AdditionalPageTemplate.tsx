'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProcessSection from './ProcessSection';
import CardIcon from './CardIcon';
import QuoteRegForm from './QuoteRegForm';

interface AdditionalPageData {
  title: string;
  subtitle: string;
  description: string;
  mainContent: {
    title: string;
    paragraphs: string[];
    benefits: string[];
  };
  whatIsContent: {
    title: string;
    paragraphs: string[];
    imagePath: string;
  };
  cards: Array<{
    title: string;
    icon: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imagePath?: string;
  heroImagePath?: string;
}

interface AdditionalPageTemplateProps {
  data: AdditionalPageData;
}

export default function AdditionalPageTemplate({ data }: AdditionalPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            if (index % 2 === 0) {
              element.classList.add('animate-fade-in-up');
            } else {
              element.classList.add('animate-scale-in');
            }
            const children = element.querySelectorAll('[data-animate-child]');
            children.forEach((child, childIndex) => {
              (child as HTMLElement).style.animationDelay = `${childIndex * 0.1}s`;
              (child as HTMLElement).classList.add('animate-fade-in-up');
            });
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

  const scrollToQuote = () => {
    document.getElementById('quote-reg-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32 overflow-hidden" style={{ backgroundColor: '#f5faff' }}>
        {/* Background Image */}
        {data.heroImagePath && (
          <div className="absolute inset-0 z-0">
            <Image
              src={data.heroImagePath}
              alt={data.title}
              fill
              priority
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/60" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-blue-50/20" />
            <div 
              className="absolute inset-0" 
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.05) 100%)'
              }}
            />
          </div>
        )}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in-up">
            <span className="text-gray-900">
              {data.title.split(' ').map((word, index, arr) => {
                if (word.toLowerCase().includes('insurance')) {
                  return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                }
                return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
              })}
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 animate-fade-in-up animation-delay-200 font-semibold">
            {data.subtitle}
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-in-up animation-delay-400">
            {data.description}
          </p>

          {/* Registration Input — matches homepage UK plate style */}
          <div id="quote-reg-form" className="animate-fade-in-up animation-delay-600">
            <QuoteRegForm />
          </div>

          <p className="mt-6 text-gray-600 text-md animate-fade-in-up animation-delay-800">
            Don't know the reg? <a href="#" className="text-blue-600 hover:text-blue-700 underline cursor-pointer">Click here</a>.
          </p>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section style={{ backgroundColor: '#002244' }}>
        <div className="pt-20">
          <ProcessSection />
        </div>
      </section>

      {/* Main Content Section - White Background */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[0] = el as HTMLElement | null;
          }}
          className="max-w-[95%] 2xl:max-w-[90%] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
            {/* Column 1 - Title */}
            <div data-animate-child className="opacity-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-500 hover:scale-105">
                {data.mainContent.title.split(' ').map((word, index, arr) => {
                  if (word.toLowerCase().includes('insurance')) {
                    return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                  }
                  return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                })}
              </h2>
            </div>

            {/* Column 2 - Text Content */}
            <div className="space-y-4">
              {data.mainContent.paragraphs.map((paragraph, index) => (
                <p key={index} data-animate-child className="opacity-0 text-base md:text-lg leading-relaxed text-gray-700 transition-all duration-300 hover:translate-x-2">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Column 3 - Benefits List and Button */}
            <div className="space-y-5">
              {/* Benefits List */}
              <div className="space-y-3">
                {data.mainContent.benefits.map((benefit, index) => (
                  <div key={index} data-animate-child className="opacity-0 flex items-start gap-3 transition-all duration-300 hover:translate-x-2 hover:scale-105 group">
                    <svg className="w-5 h-5 text-blue-600 mt-1 shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base md:text-lg text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Get Quote Button */}
              <button
                onClick={scrollToQuote}
                data-animate-child
                className="opacity-0 w-full px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-1">Get a Quote Now</span>
                <svg className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Section - Blue Background with Image */}
      <section className="py-20 px-4" style={{ backgroundColor: '#002244' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[1] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center lg:text-left transition-all duration-500 hover:scale-105">
                What is <span className="shiny-text">{data.whatIsContent.title}</span>?
              </h2>
              <div className="space-y-6">
                {data.whatIsContent.paragraphs.map((paragraph, index) => (
                  <p key={index} data-animate-child className="opacity-0 text-lg md:text-xl leading-relaxed text-gray-200 transition-all duration-300 hover:text-white">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div data-animate-child className="opacity-0 relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 ring-1 ring-white/10 group">
              <Image
                src={data.whatIsContent.imagePath}
                alt={data.whatIsContent.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#002244]/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Image Only Section - White Background */}
      {data.imagePath && (
        <section className="py-20 px-4" style={{ backgroundColor: '#f5faff' }}>
          <div className="max-w-7xl mx-auto">
            <div
              ref={(el) => {
                sectionsRef.current[2] = el as HTMLElement | null;
              }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border border-blue-100 ring-1 ring-blue-50 group"
            >
              <Image
                src={data.imagePath}
                alt={data.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                quality={90}
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* Cards Section - Blue Background */}
      <section className="py-20 px-4" style={{ backgroundColor: '#002244' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[3] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center transition-all duration-500 hover:scale-105">
            Choose Your <span className="shiny-text">Coverage</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.cards.map((card, index) => (
              <div
                key={index}
                data-animate-child
                className="opacity-0 bg-white rounded-xl p-6 shadow-lg transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] hover:-translate-y-2 hover:shadow-2xl cursor-pointer group hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 flex items-center justify-center h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)]">
                  <CardIcon emoji={card.icon} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="mt-12 flex justify-center">
            <button
              onClick={scrollToQuote}
              data-animate-child
              className="opacity-0 px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-2xl hover:shadow-blue-500/50 cursor-pointer flex items-center justify-center gap-3 group"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">Get a Quote</span>
              <svg className="w-6 h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section - White Background */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f5faff' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[4] = el as HTMLElement | null;
          }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-center transition-all duration-500 hover:scale-105">
            {data.title} <span className="shiny-text">FAQs</span>
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div
                key={index}
                data-animate-child
                className="opacity-0 border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:scale-105 bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-blue-50 transition-all duration-300 cursor-pointer group"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4 group-hover:text-blue-600 transition-colors duration-300">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-blue-600 transition-all duration-300 shrink-0 group-hover:scale-125 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 animate-fade-in-up">
                    <p className="text-gray-700 leading-relaxed text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

