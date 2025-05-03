'use client';

import Link from 'next/link';

import headerNavLinks from '@data/headerNavLinks';
import siteMetadata from '@data/siteMetadata';

import AuthButton from './AuthButton';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  return (
    <header className="fixed top-0 md:top-8 left-0 right-0 z-50 flex justify-center w-full">
      <div className="w-full sm:w-[90%] md:w-11/12 max-w-7xl mx-auto md:bg-white/80 md:dark:bg-gray-900/90 backdrop-blur-md md:backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 shadow-sm px-4 md:px-6 lg:px-12 sm:rounded-full">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" aria-label={siteMetadata.initial ?? 'Home'}>
              <div className="mr-3 bg-image-one dark:bg-image-two h-16 w-64 bg-cover" />
            </Link>
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
              <AuthButton />
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
