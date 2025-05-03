'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const SessionExpiryHandler = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      if (timerRef.current) clearInterval(timerRef.current);

      const expiryTime = new Date(session.expires);

      if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed(
          '%c Session Debug',
          'color:#38bdf8;font-weight:bold;'
        );
        console.log('Session expires at:', expiryTime.toISOString());
        console.log('User session data:', session.user);
        console.groupEnd();
      }

      timerRef.current = setInterval(() => {
        const now = new Date();
        const timeUntilExpiry = expiryTime.getTime() - now.getTime();

        if (process.env.NODE_ENV === 'development') {
          console.log(
            `Time until session expiry: ${Math.floor(timeUntilExpiry / 1000)}s`
          );
        }

        if (timeUntilExpiry <= 0 && !isExpiring) {
          setIsExpiring(true);

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          toast.info('Your session has expired. Please sign in again.');

          setTimeout(async () => {
            await signOut({ redirect: false });
            router.push('/');
          }, 1000);
        }
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [session, status, router, isExpiring]);

  return null;
};

export default SessionExpiryHandler;
