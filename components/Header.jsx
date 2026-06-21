'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import headerNavLinks from '@data/headerNavLinks';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';
import UserProfileMenu from './UserProfileMenu';

const Header = () => {
  // Morph the navbar from a wide/transparent bar at the top of the page into a
  // compact, floating glass pill once the user scrolls past a small threshold.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // sync on mount in case the page loads already scrolled
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 flex w-full justify-center transition-all duration-300 ease-out ${
        scrolled ? 'top-3 md:top-6' : 'top-0'
      }`}
    >
      <div
        className={`mx-auto w-full border transition-all duration-300 ease-out sm:rounded-full ${
          scrolled
            ? 'max-w-6xl border-zinc-200 bg-white/80 px-4 shadow-lg backdrop-blur-md dark:border-zinc-800 dark:bg-black/80 md:px-6'
            : 'max-w-7xl border-transparent bg-transparent px-4 shadow-none backdrop-blur-0 md:px-8 lg:px-12'
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}
        >
          <div>
            <Logo />
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex items-center gap-5 lg:gap-12 text-zinc-900 dark:text-zinc-100 mr-5">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm lg:text-base font-medium text-gray-900 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="hidden sm:block">
              <UserProfileMenu />
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
