'use client';

import Image from 'next/image';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label={siteMetadata.initial ?? 'Home'}
      className="inline-flex h-16 w-64 items-center justify-center leading-none
                 [&>span]:block [&>span]:leading-none"
    >
      <Image
        src="https://assets.pseudoengineer.dev/logo-b.svg"
        alt=""
        aria-hidden="true"
        width={256}
        height={64}
        priority
        fetchPriority="high"
        className="block dark:hidden translate-y-[3px]"
        sizes="256px"
      />

      <Image
        src="https://assets.pseudoengineer.dev/logo-wh.svg"
        alt=""
        aria-hidden="true"
        width={256}
        height={64}
        priority
        fetchPriority="high"
        className="hidden dark:block translate-y-[3px]"
        sizes="256px"
      />

      <span className="sr-only">
        {siteMetadata.initial ?? 'pseudoEngineer — Home'}
      </span>
    </Link>
  );
};

export default Logo;
