'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';

const AuthButton = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  if (isLoading) return null;

  return session?.user ? (
    <Button
      onClick={() => signOut()}
      className="bg-sky-500 text-white text-xs sm:text-base px-4 py-2 mx-4 rounded-full"
    >
      Log Out
    </Button>
  ) : (
    <Link href="/sign-in">
      <Button className="bg-sky-500 text-white text-xs sm:text-base px-4 py-2 lg:mx-4 rounded-full">
        Sign In
      </Button>
    </Link>
  );
};

export default AuthButton;
