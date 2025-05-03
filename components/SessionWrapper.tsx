'use client';

import { SessionProvider } from 'next-auth/react';
import SessionExpiryHandler from './SessionExpiryHandler';

export function SessionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
      <SessionExpiryHandler />
      {children}
    </SessionProvider>
  );
}
