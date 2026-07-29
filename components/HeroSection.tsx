'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import QuoteRegForm from './QuoteRegForm';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        setVideoReady(true);
      } catch {
        // Autoplay blocked — poster image remains visible
        setVideoReady(false);
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

  return (
    <section className="hero-section relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 lg:py-24 pt-28 sm:pt-32 lg:pt-36 overflow-hidden">
      {/* Full-bleed video background */}
      <div className="absolute inset-0 z-0">
        {/* Poster / fallback image */}
        <Image
          src="/images/tempsure-min.jpg"
          alt="Modern car on the road — TempSure Insurance"
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
          quality={92}
          sizes="100vw"
        />

        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/tempsure-min.jpg"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-[#f5faff]/80 via-[#f5faff]/50 to-[#f5faff]/88" />
        <div className="absolute inset-0 bg-linear-to-tr from-blue-600/15 via-transparent to-[#002244]/20" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(245,250,255,0.4) 100%)',
          }}
        />
        <div className="hero-orb hero-orb-left" aria-hidden />
        <div className="hero-orb hero-orb-right" aria-hidden />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-2 sm:px-4">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up">
          <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} aria-hidden />
          </div>
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900">
            Temp<span className="text-blue-600">Sure</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-extrabold mb-4 sm:mb-5 lg:mb-6 animate-fade-in-up animation-delay-200 leading-[1.08] tracking-tight">
          <span className="text-gray-900">Get Your Car</span>
          <br />
          <span className="shiny-text">Insurance Quote</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 lg:mb-12 animate-fade-in-up animation-delay-400 font-medium max-w-2xl mx-auto leading-relaxed px-2">
          Enter your registration number and get an instant quote in just 2 minutes
        </p>

        <QuoteRegForm className="animate-fade-in-up animation-delay-600" />

        <p className="mt-8 sm:mt-10 text-gray-800 text-sm sm:text-base lg:text-lg animate-fade-in-up animation-delay-600 font-semibold px-2">
          Fast, reliable, and affordable car insurance quotes
        </p>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 sm:h-32 z-[1]"
        style={{
          background: 'linear-gradient(to top, #f5faff 0%, transparent 100%)',
        }}
        aria-hidden
      />
    </section>
  );
}
