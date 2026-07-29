'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  title: string;
  description: string;
  items: string[];
  ctaText?: string;
}

interface ModuleDropdownProps {
  title: string;
  dropdown: DropdownItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  moduleType?: 'car' | 'van' | 'learner';
}

// Helper function to get URL for dropdown items
function getItemUrl(item: string, moduleType?: 'car' | 'van' | 'learner'): string | null {
  if (!moduleType) return null;
  
  const basePaths = {
    car: '/temporary-car-insurance',
    van: '/temporary-van-insurance',
    learner: '/learner-driver-insurance',
  };
  
  const basePath = basePaths[moduleType];
  const durationMap: { [key: string]: string } = {
    'Hourly': 'hourly',
    'Daily': 'daily',
    'Weekly': 'weekly',
    'Monthly': 'monthly',
  };
  
  // Check if item contains a duration keyword
  for (const [key, value] of Object.entries(durationMap)) {
    if (item.includes(key)) {
      return `${basePath}/${value}`;
    }
  }
  
  // Map additional pages
  const additionalPagesMap: { [key: string]: string } = {
    // Car Insurance
    'Car Impound Release Insurance': 'car-impound-release',
    'Pay As You Go Car Insurance': 'pay-as-you-go',
    'Courtesy Car Insurance': 'courtesy-car',
    'Temporary European Car Insurance': 'temporary-european',
    'Temporary Car Insurance For Non-UK Residents': 'non-uk-residents',
    'Temporary Business Car Insurance': 'temporary-business',
    'Temp Under 21 Car Insurance': 'under-21',
    'Temp Student Car Insurance': 'student',
    // Van Insurance
    'Van Impound Release Insurance': 'van-impound-release',
    'Temporary Business Van Insurance': 'temporary-business-van',
    'Pay As You Go Van Insurance': 'pay-as-you-go-van',
    'Temporary Food Delivery Van Insurance': 'temporary-food-delivery-van',
    'Temporary Courier Van Insurance': 'temporary-courier-van',
    'Temporary Carriage Of Own Goods Van Insurance': 'temporary-carriage-of-own-goods-van',
    'Pay As You Go (PAYG) Hire And Reward Van Insurance': 'pay-as-you-go-hire-and-reward-van',
    // Learner Driver Insurance
    'Driving Test Insurance': 'driving-test',
    'Insurance For Learner Drivers On Their Parent\'s Car': 'learner-drivers-on-parents-car',
    'Pay As You Go Learner Driver Insurance': 'pay-as-you-go-learner',
    'Learner Driver Practice Insurance': 'learner-driver-practice',
  };
  
  // Check for additional pages
  if (additionalPagesMap[item]) {
    return `${basePath}/${additionalPagesMap[item]}`;
  }
  
  return null;
}

export default function ModuleDropdown({
  title,
  dropdown,
  isOpen,
  onToggle,
  onClose,
  onMouseEnter,
  onMouseLeave,
  moduleType,
}: ModuleDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Open dropdown immediately
    if (onMouseEnter) {
      onMouseEnter();
    }
  };

  const handleMouseLeave = () => {
    // Add delay before closing to allow user to move to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      if (onMouseLeave) {
        onMouseLeave();
      }
    }, 200); // 200ms delay
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on a link or inside the dropdown
      if (target instanceof HTMLElement) {
        const isLink = target.closest('a');
        if (isLink) {
          return; // Let the link navigation happen
        }
      }
      
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      // Use click event instead of mousedown for better compatibility
      // This allows link clicks to complete before checking if we should close
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        // Cleanup timeout on unmount
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      };
    }

    return () => {
      // Cleanup timeout on unmount
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter ? handleMouseEnter : undefined}
      onMouseLeave={onMouseLeave ? handleMouseLeave : undefined}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        className={`flex items-center justify-center font-bold gap-1.5 px-3 xl:px-4 py-2 text-sm xl:text-base rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
          isOpen
            ? 'text-blue-600 bg-blue-50'
            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Invisible bridge to connect button and dropdown - prevents gap */}
          <div className="absolute top-full left-0 right-0 h-3 -translate-y-3 hidden lg:block" />
          <div 
            className="absolute lg:left-1/2 lg:-translate-x-1/2 left-0 right-0 lg:w-[1100px] lg:max-w-[calc(100vw-8rem)] top-full lg:top-full mt-2 lg:mt-0 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200"
          >
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Section - Title, Description, and Get A Quote Button */}
            <div className="p-6 lg:p-10 bg-linear-to-br from-blue-50 via-blue-100 to-blue-50 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full blur-2xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {dropdown.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {dropdown.description}
                </p>
              </div>
              <div className="relative z-10 mt-auto">
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="flex w-full px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl items-center justify-center gap-3 cursor-pointer"
                >
                  {dropdown.ctaText || 'Get A Quote'}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Middle Section - Duration Items Only (Hourly, Daily, Weekly, Monthly) */}
            <div className="p-6 lg:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Duration Options</h4>
              <ul className="space-y-4">
                {dropdown.items
                  .filter(item => 
                    item.includes('Hourly') || 
                    item.includes('Daily') || 
                    item.includes('Weekly') || 
                    item.includes('Monthly')
                  )
                  .map((item, index) => {
                    const url = getItemUrl(item, moduleType);
                    const content = (
                      <>
                        <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-125" />
                        <span className="text-base font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {item}
                        </span>
                      </>
                    );
                    return (
                      <li
                        key={index}
                        className="text-gray-700 hover:text-blue-600 cursor-pointer transition-all duration-200 flex items-center gap-3 group py-1"
                      >
                        {url ? (
                          <Link 
                            href={url} 
                            onClick={(e) => {
                              // Don't prevent default - let Next.js handle navigation
                              // Close dropdown after a short delay to allow navigation
                              setTimeout(() => {
                                onClose();
                              }, 50);
                            }} 
                            className="flex items-center gap-3 w-full"
                          >
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* Right Section - Remaining Items in 3-Column Grid */}
            <div className="p-6 lg:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-gray-100 bg-linear-to-br from-gray-50 to-white">
              <h4 className="text-xl font-bold text-gray-900 mb-6">More Options</h4>
              <div className="grid grid-cols-1 gap-4">
                {dropdown.items
                  .filter(item => 
                    !item.includes('Hourly') && 
                    !item.includes('Daily') && 
                    !item.includes('Weekly') && 
                    !item.includes('Monthly')
                  )
                  .map((item, index) => {
                    const url = getItemUrl(item, moduleType);
                    const content = (
                      <>
                        <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-125 shrink-0" />
                        <span className="text-base font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {item}
                        </span>
                      </>
                    );
                    return (
                      <div
                        key={index}
                        className="text-gray-700 hover:text-blue-600 cursor-pointer transition-all duration-200 flex items-center gap-3 group py-1"
                      >
                        {url ? (
                          <Link 
                            href={url} 
                            onClick={(e) => {
                              // Don't prevent default - let Next.js handle navigation
                              // Close dropdown after a short delay to allow navigation
                              setTimeout(() => {
                                onClose();
                              }, 50);
                            }} 
                            className="flex items-center gap-3 w-full"
                          >
                            {content}
                          </Link>
                        ) : (
                          content
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

