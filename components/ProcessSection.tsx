'use client';

import * as React from 'react';
import { motion, useScroll } from 'framer-motion';
import Image from 'next/image'; // Import Image from next/image

type Step = {
  title: string;
  blurb: string;
  bullets?: string[];
  imageSrc: string; // Add imageSrc to Step type
};

const BRAND = '#2563eb';
const STEPS: Step[] = [
  {
    title: 'Get Your Quote',
    blurb:
      'Start by entering your car registration number. Our system instantly retrieves your vehicle details and calculates a personalized insurance quote tailored to your needs.',
    bullets: [
      'Enter Registration Number',
      'Instant Vehicle Lookup',
      'Personalized Quote Generation',
      'Compare Coverage Options',
    ],
    imageSrc: '/images/process1.jpg', // Add image path
  },
  {
    title: 'Customize Your Coverage',
    blurb:
      'Review and customize your insurance plan. Choose the level of coverage that fits your lifestyle and budget, with flexible options for comprehensive protection.',
    bullets: [
      'Select Coverage Level',
      'Add Optional Benefits',
      'Choose Payment Plan',
      'Review Policy Details',
    ],
    imageSrc: '/images/process2.jpg', // Add image path
  },
  {
    title: 'Get Protected',
    blurb:
      'Complete your purchase and receive instant coverage. Your policy documents are sent immediately, and you can access your insurance details anytime through our portal.',
    bullets: [
      'Secure Payment Processing',
      'Instant Policy Activation',
      'Digital Policy Documents',
      '24/7 Customer Support',
    ],
    imageSrc: '/images/process3.jpg', // Add image path
  },
];

export default function ProcessSection() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 30%', 'end 80%'],
  });

  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_0%,rgba(37,99,235,0.15),transparent_60%),radial-gradient(900px_500px_at_80%_10%,rgba(37,99,235,0.12),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            How It <span className="shiny-text">Works</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            Getting car insurance has never been easier. Follow our simple three-step process
            to get comprehensive coverage in minutes.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative mt-12 sm:mt-16">
          {/* Base spine (behind everything) - Hidden on mobile */}
          <div
            className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-0"
            style={{
              background:
                'linear-gradient(180deg, transparent, rgba(37,99,235,0.3), transparent)',
            }}
          />

          {/* Progress spine (animated) - Hidden on mobile */}
          <motion.div
            className="hidden md:block pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[3px] origin-top rounded-full z-0"
            style={{
              height: '100%',
              scaleY: scrollYProgress,
              background:
                'linear-gradient(180deg, rgba(37,99,235,0) 0%, rgba(37,99,235,0.7) 40%, rgba(37,99,235,0.7) 100%)',
              boxShadow: '0 0 18px rgba(37,99,235,0.4)',
            }}
          />

          <div className="space-y-14 sm:space-y-20 md:space-y-24">
            {STEPS.map((step, i) => {
              const imageOnLeft = i % 2 === 0;

              // Side paddings to create visible gap from spine on both sides
              const imgSidePad = imageOnLeft ? 'md:pr-12' : 'md:pl-12';
              const textSidePad = imageOnLeft ? 'md:pl-12' : 'md:pr-12';

              return (
                <div key={i} className="relative">
                    {/* Erase the spine behind the node + give the node solid color - Mobile: left aligned, Desktop: centered */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-2 sm:-top-3 z-10">
                    {/* Big eraser disc so no line shows through - Hidden on mobile */}
                    <div
                      className="hidden md:block absolute -inset-3 rounded-full"
                      style={{ backgroundColor: '#002244' }}
                      aria-hidden
                    />
                    {/* Solid brand node with white number */}
                    <div
                      className="relative grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full text-sm sm:text-base font-bold text-white ring-2 ring-blue-200 shadow-[0_6px_28px_rgba(37,99,235,0.4)]"
                      style={{ background: BRAND }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center pl-12 md:pl-0">
                    {/* Icon/Image Block */}
                    <div
                      className={`${
                        imageOnLeft
                          ? 'order-1 md:order-1'
                          : 'order-1 md:order-2'
                      } ${imgSidePad}`}
                    >
                      <IconBlock imageSrc={step.imageSrc} /> {/* Pass imageSrc */}
                    </div>

                    {/* Text */}
                    <div
                      className={`${
                        imageOnLeft
                          ? 'order-2 md:order-2'
                          : 'order-2 md:order-1'
                      } ${textSidePad}`}
                    >
                      <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-gray-300 leading-relaxed">
                        {step.blurb}
                      </p>

                      {step.bullets?.length ? (
                        <ul className="mt-4 space-y-2">
                          {step.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span
                                className="mt-2 h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: BRAND }}
                              />
                              <span className="text-gray-200">{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function IconBlock({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-blue-500/40 bg-linear-to-br from-blue-900/20 to-blue-800/10 shadow-xl shadow-blue-900/20 transition-all duration-500 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="relative w-full h-48 sm:h-64 lg:h-80 overflow-hidden">
        <Image
          src={imageSrc}
          alt="Step Image"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-[#002244]/40 via-transparent to-blue-500/5 pointer-events-none" />
    </div>
  );
}