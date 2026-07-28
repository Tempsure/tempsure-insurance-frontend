'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProcessSection from './ProcessSection';

interface InsurancePageData {
  title: string;
  subtitle: string;
  description: string;
  mainContent: string;
  whatIsContent: string;
  whatsCovered: {
    title: string;
    items: string[];
  };
  pricing: {
    title: string;
    table: Array<{
      duration: string;
      price: string;
    }>;
  };
  eligibility: {
    title: string;
    content: string;
    vehicles: string[];
    drivers: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  imagePath?: string;
  heroImagePath?: string;
}

interface InsurancePageTemplateProps {
  data: InsurancePageData;
}

export default function InsurancePageTemplate({ data }: InsurancePageTemplateProps) {
  const router = useRouter();
  const [regNumber, setRegNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            // Add different animation classes based on section index
            if (index % 2 === 0) {
              element.classList.add('animate-fade-in-up');
            } else {
              element.classList.add('animate-scale-in');
            }
            // Add staggered delay for child elements
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

  const handleGetQuote = () => {
    if (!regNumber.trim()) {
      setErrorMessage('Please enter your registration number');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    setErrorMessage('');
    // Redirect to vehicle details page
    const encodedReg = encodeURIComponent(regNumber.trim().toUpperCase());
    router.push(`/vehicle/${encodedReg}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 lg:py-20 pt-24 sm:pt-28 lg:pt-32 overflow-hidden" style={{ backgroundColor: '#f5faff' }}>
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
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/50 to-white/60" />
            {/* Additional subtle blue tint overlay for brand consistency */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-transparent to-blue-50/20" />
            {/* Subtle vignette effect */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.05) 100%)'
              }}
            />
          </div>
        )}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-2 sm:px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-3 sm:mb-4 animate-fade-in-up leading-tight">
            <span className="text-gray-900">
              {data.title.split(' ').map((word, index, arr) => {
                if (word.toLowerCase().includes('insurance')) {
                  return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                }
                return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
              })}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 animate-fade-in-up animation-delay-200 font-semibold px-2">
            {data.subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up animation-delay-400 px-2">
            {data.description}
          </p>

          {/* Registration Input */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="flex-1 relative">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter Reg"
                className={`w-full pl-10 sm:pl-12 lg:pl-14 pr-6 sm:pr-8 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-300 ${
                  isFocused
                    ? 'border-blue-600 shadow-2xl shadow-blue-300 scale-[1.02]'
                    : 'border-gray-300 shadow-xl'
                } focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-300`}
                style={{ backgroundColor: '#ffffff' }}
              />
              {isFocused && (
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-r from-blue-400/20 to-blue-600/20 pointer-events-none animate-pulse" />
              )}
            </div>
            <button
              onClick={handleGetQuote}
              className="w-full md:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl whitespace-nowrap bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500 cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {errorMessage && (
            <p className="mt-4 text-red-600 text-lg font-semibold animate-fade-in-up">{errorMessage}</p>
          )}

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
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[0] = el as HTMLElement | null;
          }}
          className="max-w-[95%] 2xl:max-w-[90%] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-start">
            {/* Column 1 - Title */}
            <div data-animate-child className="opacity-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight transition-all duration-500 hover:scale-105">
                {data.title.split(' ').map((word, index, arr) => {
                  if (word.toLowerCase().includes('insurance')) {
                    return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                  }
                  return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
                })}
              </h2>
            </div>

            {/* Column 2 - Text Content */}
            <div className="space-y-4">
              {data.mainContent.split('\n\n').filter(para => para.trim() && !para.includes('Comprehensive cover') && !para.includes('Flexible') && !para.includes('Low Excess') && !para.includes('Drivers aged') && !para.includes('Maximum car') && !para.includes('Protect the')).slice(0, 3).map((paragraph, index) => (
                <p key={index} data-animate-child className="opacity-0 text-base md:text-lg leading-relaxed text-gray-700 transition-all duration-300 hover:translate-x-2">
                  {paragraph.trim().split(/(temporary car insurance|temporary van insurance|temporary insurance|No Claims Discount)/i).map((part, i) => {
                    if (/temporary (car|van) insurance|temporary insurance|No Claims Discount/i.test(part)) {
                      return (
                        <a key={i} href="#" className="text-blue-600 hover:text-blue-700 underline font-semibold transition-colors duration-200">
                          {part}
                        </a>
                      );
                    }
                    return part;
                  })}
                </p>
              ))}
            </div>

            {/* Column 3 - Benefits List and Button */}
            <div className="space-y-5">
              {/* Benefits List */}
              <div className="space-y-3">
                {data.mainContent.split('\n').filter(line => 
                  line.includes('Comprehensive cover') || 
                  line.includes('Flexible') || 
                  line.includes('Low Excess') || 
                  line.includes('Drivers aged') || 
                  line.includes('Maximum car') || 
                  line.includes('Protect the')
                ).map((benefit, index) => (
                  <div key={index} data-animate-child className="opacity-0 flex items-start gap-3 transition-all duration-300 hover:translate-x-2 hover:scale-105 group">
                    <svg className="w-5 h-5 text-blue-600 mt-1 shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-base md:text-lg text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{benefit.trim()}</span>
                  </div>
                ))}
              </div>

              {/* Get Quote Button */}
              <button
                onClick={handleGetQuote}
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

      {/* What Is Section - Blue Background */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#002244' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[1] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white text-center transition-all duration-500 hover:scale-105 px-2">
            What is <span className="shiny-text">{data.title}</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {data.whatIsContent.split('\n\n').filter(para => para.trim()).slice(0, 3).map((paragraph, index) => (
              <div key={index} data-animate-child className="opacity-0 flex items-start gap-4 transition-all duration-300 hover:translate-x-2 hover:scale-105 group">
                <span className="w-2 h-2 rounded-full bg-white mt-2 shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-300" />
                <p className="text-lg md:text-xl leading-relaxed text-gray-200 group-hover:text-white transition-colors duration-300">
                  {paragraph.trim()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Covered Section - White Background */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[2] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-center transition-all duration-500 hover:scale-105">
            {data.whatsCovered.title.split(' ').map((word, index, arr) => {
              if (word.toLowerCase() === 'covered' || word.toLowerCase() === 'by') {
                return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
              }
              return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
            })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.whatsCovered.items.map((item, index) => {
              const totalItems = data.whatsCovered.items.length;
              const isLastRow = index >= 6;
              
              // Center the last row if there are 7 or 8 items
              let colStart = '';
              let wrapperClass = '';
              
              if (totalItems === 7 && index === 6) {
                // Single item in last row - center it in the middle column
                colStart = 'md:col-start-2';
              } else if (totalItems === 8 && isLastRow) {
                // Two items in last row - wrap them in a centered flex container
                if (index === 6) {
                  wrapperClass = 'md:col-span-3 flex md:justify-center md:gap-6';
                }
              }
              
              // For 8 items, wrap the last 2 items in a flex container
              if (totalItems === 8 && index === 6) {
                return (
                  <div key={index} className="md:col-span-3 flex flex-col md:flex-row md:justify-center gap-6">
                    {data.whatsCovered.items.slice(6).map((lastItem, lastIndex) => (
                      <div 
                        key={lastIndex} 
                        data-animate-child
                        className="opacity-0 flex items-start gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-blue-200 md:w-[calc(33.333%-1rem)] shadow-md hover:shadow-xl group"
                        style={{ animationDelay: `${lastIndex * 0.1}s` }}
                      >
                        <span className="w-3 h-3 rounded-full bg-blue-600 mt-2 shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-700" />
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed group-hover:text-blue-700 transition-colors duration-300">{lastItem}</p>
                      </div>
                    ))}
                  </div>
                );
              }
              
              // Skip rendering the 8th item separately since it's included in the wrapper above
              if (totalItems === 8 && index === 7) {
                return null;
              }
              
              return (
                <div 
                  key={index} 
                  data-animate-child
                  className={`opacity-0 flex items-start gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-blue-200 shadow-md hover:shadow-xl group ${colStart}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="w-3 h-3 rounded-full bg-blue-600 mt-2 shrink-0 transition-all duration-300 group-hover:scale-150 group-hover:bg-blue-700" />
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed group-hover:text-blue-700 transition-colors duration-300">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Table Section - Blue Background */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#002244' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[3] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center transition-all duration-500 hover:scale-105">
            {data.pricing.title.split(' ').map((word, index, arr) => {
              if (word.toLowerCase() === 'cost' || word.toLowerCase() === 'by') {
                return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
              }
              return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
            })}
          </h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-2xl min-w-[500px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-left text-base sm:text-lg lg:text-xl font-bold transition-all duration-300 hover:bg-blue-700">Policy Duration</th>
                  <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-left text-base sm:text-lg lg:text-xl font-bold transition-all duration-300 hover:bg-blue-700">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                {data.pricing.table.map((row, index) => (
                  <tr
                    key={index}
                    data-animate-child
                    className={`opacity-0 border-b border-gray-200 transition-all duration-300 hover:bg-blue-50 hover:scale-105 hover:shadow-lg ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-gray-900 font-semibold text-sm sm:text-base lg:text-lg transition-colors duration-300 hover:text-blue-600">{row.duration}</td>
                    <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-blue-600 font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-110">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Image Section - White Background */}
      {data.imagePath && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
          <div className="max-w-7xl mx-auto">
            <div
              ref={(el) => {
                sectionsRef.current[4] = el as HTMLElement | null;
              }}
              className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-blue-100 ring-1 ring-blue-50 group"
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

      {/* Eligibility Section - Blue Background */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#002244' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[5] = el as HTMLElement | null;
          }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white text-center transition-all duration-500 hover:scale-105 px-2">
            {data.eligibility.title.split(' ').map((word, index, arr) => {
              if (word.toLowerCase() === 'eligible' || word.toLowerCase() === 'eligibility') {
                return <span key={index} className="shiny-text">{word}{index < arr.length - 1 ? ' ' : ''}</span>;
              }
              return <span key={index}>{word}{index < arr.length - 1 ? ' ' : ''}</span>;
            })}
          </h2>
          <div data-animate-child className="opacity-0 text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 mb-6 sm:mb-8 text-center max-w-4xl mx-auto transition-all duration-300 hover:text-white px-2">
            {data.eligibility.content}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div data-animate-child className="opacity-0 bg-blue-50 p-6 rounded-xl border border-blue-200 transition-all duration-300 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:scale-110 hover:-translate-y-2 cursor-pointer group">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Vehicles:</h3>
              <ul className="space-y-3">
                {data.eligibility.vehicles.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300 hover:scale-105">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 group-hover:scale-150 group-hover:bg-blue-700 transition-all duration-300" />
                    <span className="text-gray-700 text-base group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-animate-child className="opacity-0 bg-blue-50 p-6 rounded-xl border border-blue-200 transition-all duration-300 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:scale-110 hover:-translate-y-2 cursor-pointer group" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Drivers:</h3>
              <ul className="space-y-3">
                {data.eligibility.drivers.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group-hover:translate-x-2 transition-all duration-300 hover:scale-105">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0 group-hover:scale-150 group-hover:bg-blue-700 transition-all duration-300" />
                    <span className="text-gray-700 text-base group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-animate-child className="opacity-0 bg-blue-50 p-6 rounded-xl border border-blue-200 transition-all duration-300 hover:bg-white hover:border-blue-400 hover:shadow-xl hover:scale-110 hover:-translate-y-2 cursor-pointer group" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Additional Info:</h3>
              <p className="text-gray-700 text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                All our Short-Term Insurance policies are submitted to the Motor Insurance Database (MID) four times a day, every day. We recommend always having a copy of your Insurance Certificate with you during the period of cover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section - White Background */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6" style={{ backgroundColor: '#f5faff' }}>
        <div 
          ref={(el) => {
            sectionsRef.current[6] = el as HTMLElement | null;
          }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-gray-900 text-center transition-all duration-500 hover:scale-105 px-2">
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
          <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
            <p className="text-gray-700 text-lg">
              Not found the answer you're looking for? Either{' '}
              <a href="/contact-us" className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer">get in touch</a>
              {' '}or checkout our{' '}
              <a href="/faqs" className="text-blue-600 hover:text-blue-700 font-semibold underline cursor-pointer">other FAQs</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

