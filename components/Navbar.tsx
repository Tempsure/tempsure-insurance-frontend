'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ModuleDropdown from './ModuleDropdown';
import { apiFetch } from '@/lib/api-config';
import {
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  Car,
  Truck,
  GraduationCap,
} from 'lucide-react';

type ModuleKey = 'car' | 'van' | 'learner';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<ModuleKey | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    apiFetch('/api/auth/me/').then(res => setIsLoggedIn(res.ok)).catch(() => setIsLoggedIn(false));
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileAccordion(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavAuth = async () => {
    if (isLoggedIn) {
      await apiFetch('/api/auth/logout/', { method: 'POST' });
      setIsLoggedIn(false);
      router.push('/');
    } else {
      router.push('/login');
    }
  };

  const modules = {
    car: {
      title: 'Temporary Car Insurance',
      description:
        'Temporary car insurance from 1 hour to 28 days, to get you where you need to be.',
      items: [
        'Hourly Car Insurance',
        'Daily Car Insurance',
        'Weekly Car Insurance',
        'Monthly Car Insurance',
        'Car Impound Release Insurance',
        'Pay As You Go Car Insurance',
        'Courtesy Car Insurance',
        'Temporary European Car Insurance',
        'Temporary Car Insurance For Non-UK Residents',
        'Temporary Business Car Insurance',
        'Temp Under 21 Car Insurance',
        'Temp Student Car Insurance',
      ],
      ctaText: 'Get A Quote',
      icon: Car,
      basePath: '/temporary-car-insurance',
    },
    van: {
      title: 'Temp Van Insurance',
      description:
        'Insure a van from an hour to 4 weeks, with business use fully included.',
      items: [
        'Hourly Van Insurance',
        'Daily Van Insurance',
        'Weekly Van Insurance',
        'Monthly Van Insurance',
        'Van Impound Release Insurance',
        'Temporary Business Van Insurance',
        'Pay As You Go Van Insurance',
        'Temporary Food Delivery Van Insurance',
        'Temporary Courier Van Insurance',
        'Temporary Carriage Of Own Goods Van Insurance',
        'Pay As You Go (PAYG) Hire And Reward Van Insurance',
      ],
      ctaText: 'Get A Quote',
      icon: Truck,
      basePath: '/temporary-van-insurance',
    },
    learner: {
      title: 'Temp Learner Insurance',
      description:
        'Get learner driver practice insurance from an hour to 24 weeks.',
      items: [
        'Hourly Learner Insurance',
        'Daily Learner Insurance',
        'Weekly Learner Insurance',
        'Monthly Learner Insurance',
        'Driving Test Insurance',
        "Insurance For Learner Drivers On Their Parent's Car",
        'Pay As You Go Learner Driver Insurance',
        'Learner Driver Practice Insurance',
      ],
      ctaText: 'Get A Quote',
      icon: GraduationCap,
      basePath: '/learner-driver-insurance',
    },
  } as const;

  const getMobileItemUrl = (item: string, moduleType: ModuleKey): string | null => {
    const basePath = modules[moduleType].basePath;
    const durationMap: Record<string, string> = {
      Hourly: 'hourly',
      Daily: 'daily',
      Weekly: 'weekly',
      Monthly: 'monthly',
    };
    for (const [key, value] of Object.entries(durationMap)) {
      if (item.includes(key)) return `${basePath}/${value}`;
    }

    const additionalPagesMap: Record<string, string> = {
      'Car Impound Release Insurance': 'car-impound-release',
      'Pay As You Go Car Insurance': 'pay-as-you-go',
      'Courtesy Car Insurance': 'courtesy-car',
      'Temporary European Car Insurance': 'temporary-european',
      'Temporary Car Insurance For Non-UK Residents': 'non-uk-residents',
      'Temporary Business Car Insurance': 'temporary-business',
      'Temp Under 21 Car Insurance': 'under-21',
      'Temp Student Car Insurance': 'student',
      'Van Impound Release Insurance': 'van-impound-release',
      'Temporary Business Van Insurance': 'temporary-business-van',
      'Pay As You Go Van Insurance': 'pay-as-you-go-van',
      'Temporary Food Delivery Van Insurance': 'temporary-food-delivery-van',
      'Temporary Courier Van Insurance': 'temporary-courier-van',
      'Temporary Carriage Of Own Goods Van Insurance': 'temporary-carriage-of-own-goods-van',
      'Pay As You Go (PAYG) Hire And Reward Van Insurance': 'pay-as-you-go-hire-and-reward-van',
      'Driving Test Insurance': 'driving-test',
      "Insurance For Learner Drivers On Their Parent's Car": 'learner-drivers-on-parents-car',
      'Pay As You Go Learner Driver Insurance': 'pay-as-you-go-learner',
      'Learner Driver Practice Insurance': 'learner-driver-practice',
    };
    if (additionalPagesMap[item]) return `${basePath}/${additionalPagesMap[item]}`;
    return null;
  };

  const handleToggle = (module: string) => {
    setOpenDropdown(openDropdown === module ? null : module);
  };

  const handleClose = () => setOpenDropdown(null);

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] lg:left-6 lg:right-6 xl:left-12 xl:right-12 lg:rounded-b-[20px] ${
          scrolled || mobileMenuOpen ? 'shadow-lg' : 'shadow-md'
        }`}
        style={{
          backgroundColor: mobileMenuOpen ? '#ffffff' : 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="flex items-center gap-3 xl:gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/"
            onClick={handleMobileMenuClose}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/25 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] group-hover:scale-105 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} aria-hidden />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
              Temp<span className="text-blue-600">Sure</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 min-w-0">
            <ModuleDropdown
              title="Car Insurance"
              dropdown={{
                title: modules.car.title,
                description: modules.car.description,
                items: [...modules.car.items],
                ctaText: modules.car.ctaText,
              }}
              isOpen={openDropdown === 'car'}
              onToggle={() => handleToggle('car')}
              onClose={handleClose}
              onMouseEnter={() => setOpenDropdown('car')}
              onMouseLeave={handleClose}
              moduleType="car"
            />
            <ModuleDropdown
              title="Van Insurance"
              dropdown={{
                title: modules.van.title,
                description: modules.van.description,
                items: [...modules.van.items],
                ctaText: modules.van.ctaText,
              }}
              isOpen={openDropdown === 'van'}
              onToggle={() => handleToggle('van')}
              onClose={handleClose}
              onMouseEnter={() => setOpenDropdown('van')}
              onMouseLeave={handleClose}
              moduleType="van"
            />
            <ModuleDropdown
              title="Learner Insurance"
              dropdown={{
                title: modules.learner.title,
                description: modules.learner.description,
                items: [...modules.learner.items],
                ctaText: modules.learner.ctaText,
              }}
              isOpen={openDropdown === 'learner'}
              onToggle={() => handleToggle('learner')}
              onClose={handleClose}
              onMouseEnter={() => setOpenDropdown('learner')}
              onMouseLeave={handleClose}
              moduleType="learner"
            />
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {isLoggedIn && (
              <Link href="/dashboard" className="px-3 xl:px-4 py-2 text-blue-600 font-semibold hover:underline text-sm whitespace-nowrap">
                My Account
              </Link>
            )}
            <button
              onClick={handleNavAuth}
              className="flex px-5 xl:px-7 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] shadow-md hover:shadow-lg cursor-pointer items-center gap-2 text-sm whitespace-nowrap"
            >
              <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
              {isLoggedIn ? <LogOut className="w-4 h-4" aria-hidden /> : <LogIn className="w-4 h-4" aria-hidden />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden ml-auto inline-flex items-center justify-center w-11 h-11 rounded-xl text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2.25} /> : <Menu className="w-6 h-6" strokeWidth={2.25} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay + drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#002244]/45 backdrop-blur-[2px] cursor-pointer"
          onClick={handleMobileMenuClose}
          aria-label="Close menu overlay"
        />

        <div
          id="mobile-nav-menu"
          className={`absolute top-[64px] sm:top-[72px] left-0 right-0 bottom-0 bg-white shadow-2xl flex flex-col transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-8 space-y-3">
            {(Object.keys(modules) as ModuleKey[]).map(key => {
              const mod = modules[key];
              const Icon = mod.icon;
              const open = mobileAccordion === key;
              const durationItems = mod.items.filter(
                item =>
                  item.includes('Hourly') ||
                  item.includes('Daily') ||
                  item.includes('Weekly') ||
                  item.includes('Monthly')
              );
              const moreItems = mod.items.filter(
                item =>
                  !item.includes('Hourly') &&
                  !item.includes('Daily') &&
                  !item.includes('Weekly') &&
                  !item.includes('Monthly')
              );

              return (
                <div key={key} className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setMobileAccordion(open ? null : key)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer transition-colors ${
                      open ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                    aria-expanded={open}
                  >
                    <span className="icon-box icon-box-blue !w-10 !h-10 shrink-0">
                      <Icon className="w-5 h-5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="flex-1 font-bold text-[15px] leading-snug">{mod.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] ${
                        open ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-[var(--duration-smooth)] ease-[var(--ease-smooth)] ${
                      open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 pb-3 pt-1 space-y-3 border-t border-gray-100 bg-[#f5faff]/60">
                        <div>
                          <p className="px-2 pt-3 pb-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                            Duration Options
                          </p>
                          <ul className="space-y-1">
                            {durationItems.map(item => {
                              const url = getMobileItemUrl(item, key);
                              return (
                                <li key={item}>
                                  {url ? (
                                    <Link
                                      href={url}
                                      onClick={handleMobileMenuClose}
                                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-white hover:text-blue-600 active:bg-blue-50"
                                    >
                                      {item}
                                    </Link>
                                  ) : (
                                    <span className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800">
                                      {item}
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {moreItems.length > 0 && (
                          <div>
                            <p className="px-2 pt-1 pb-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
                              More Options
                            </p>
                            <ul className="space-y-1">
                              {moreItems.map(item => {
                                const url = getMobileItemUrl(item, key);
                                return (
                                  <li key={item}>
                                    {url ? (
                                      <Link
                                        href={url}
                                        onClick={handleMobileMenuClose}
                                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 hover:bg-white hover:text-blue-600 active:bg-blue-50"
                                      >
                                        {item}
                                      </Link>
                                    ) : (
                                      <span className="block rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800">
                                        {item}
                                      </span>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        <Link
                          href="/"
                          onClick={handleMobileMenuClose}
                          className="mx-1 mb-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25"
                        >
                          {mod.ctaText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky auth footer */}
          <div className="shrink-0 border-t border-gray-200 bg-white px-4 py-4 space-y-2.5 safe-area-pb">
            {isLoggedIn && (
              <Link
                href="/dashboard"
                onClick={handleMobileMenuClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-4 py-3 font-semibold text-blue-600 hover:bg-blue-50"
              >
                <User className="w-4 h-4" aria-hidden />
                My Account
              </Link>
            )}
            <button
              type="button"
              onClick={() => {
                handleMobileMenuClose();
                handleNavAuth();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 font-bold text-white shadow-md shadow-blue-600/30 cursor-pointer"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4" aria-hidden />
                  Sign Out
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" aria-hidden />
                  Sign In
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
