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
          {/* Hover bridge */}
          <div className="absolute top-full left-0 right-0 h-3 hidden lg:block" aria-hidden />

          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[60] w-[min(92vw,36rem)] rounded-2xl border border-gray-200 bg-white shadow-xl shadow-blue-900/10 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
            role="menu"
          >
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-[#f5faff] px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{dropdown.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{dropdown.description}</p>
              </div>
              <Link
                href="/"
                onClick={onClose}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
              >
                {dropdown.ctaText || 'Get A Quote'}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 max-h-[min(70vh,28rem)] overflow-y-auto">
              <div className="p-3 sm:p-4 sm:border-r border-gray-100">
                <h4 className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Duration Options
                </h4>
                <ul className="space-y-0.5">
                  {dropdown.items
                    .filter(
                      (item) =>
                        item.includes('Hourly') ||
                        item.includes('Daily') ||
                        item.includes('Weekly') ||
                        item.includes('Monthly')
                    )
                    .map((item) => {
                      const url = getItemUrl(item, moduleType);
                      return (
                        <li key={item}>
                          {url ? (
                            <Link
                              href={url}
                              onClick={onClose}
                              className="block rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {item}
                            </Link>
                          ) : (
                            <span className="block rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700">
                              {item}
                            </span>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div className="p-3 sm:p-4 border-t sm:border-t-0 border-gray-100 bg-gray-50/50">
                <h4 className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  More Options
                </h4>
                <ul className="space-y-0.5">
                  {dropdown.items
                    .filter(
                      (item) =>
                        !item.includes('Hourly') &&
                        !item.includes('Daily') &&
                        !item.includes('Weekly') &&
                        !item.includes('Monthly')
                    )
                    .map((item) => {
                      const url = getItemUrl(item, moduleType);
                      return (
                        <li key={item}>
                          {url ? (
                            <Link
                              href={url}
                              onClick={onClose}
                              className="block rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:text-blue-600 transition-colors"
                            >
                              {item}
                            </Link>
                          ) : (
                            <span className="block rounded-lg px-2.5 py-2 text-sm font-medium text-gray-700">
                              {item}
                            </span>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

