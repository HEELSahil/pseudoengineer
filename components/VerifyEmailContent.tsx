'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';

export default function VerifyEmailContent() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
      }
      @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
      }
      .animate-pulse {
        animation: pulse 1.5s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [status, setStatus] = useState('Verifying your email address');
  const [tokenValid, setTokenValid] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailResent, setEmailResent] = useState(false);
  const hasVerified = useRef(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');
  const router = useRouter();

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [emailParam]);

  useEffect(() => {
    if (!token || hasVerified.current || tokenValid === true) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/verify-email', {
          method: 'POST',
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus('Email verified successfully!');
          setTokenValid(true);
          setTimeout(() => {
            router.push('/sign-in');
          }, 1500);
        } else {
          setStatus('Invalid or expired verification link');
          setTokenValid(false);
        }
      } catch {
        setStatus('Unexpected error occurred');
        setTokenValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [token, router]);

  const handleResend = async () => {
    if (!email) {
      setStatus('Email not available for resending.');
      return;
    }

    try {
      const wasLoading = isLoading;
      if (!wasLoading) {
        setStatus('Sending verification email');
      }
      setIsLoading(true);

      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('Verification email resent!');
        setEmailResent(true);
      } else {
        setStatus(data.message || 'Failed to resend verification email');
      }
    } catch (err) {
      setStatus('Something went wrong while resending');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-xl p-8 mx-auto bg-black/10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/40">
        <div className="flex flex-col items-center space-y-8">
          {/* Status Indicator */}
          <div className="w-full flex flex-col items-center justify-center space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-16 w-16 text-indigo-300 animate-spin" />
                <p className="text-lg text-indigo-200 animate-pulse">
                  {status}...
                </p>
              </div>
            ) : tokenValid === true ? (
              <div className="flex flex-col items-center space-y-5 animate-fadeIn">
                <div className="p-3 bg-green-900/30 rounded-full ring-2 ring-green-500/30">
                  <CheckCircle className="h-16 w-16 text-green-400" />
                </div>
                <p className="text-2xl font-medium text-green-300">{status}</p>
                <p className="text-gray-300 text-lg">
                  Redirecting to Sign In page...
                </p>
              </div>
            ) : emailResent ? (
              <div className="flex flex-col items-center space-y-5 animate-fadeIn">
                <div className="p-3 bg-green-900/30 rounded-full ring-2 ring-green-500/30">
                  <CheckCircle className="h-16 w-16 text-green-400" />
                </div>
                <p className="text-2xl font-medium text-green-300">{status}</p>
                <p className="text-gray-300 text-base text-center">
                  Please check your inbox and spam folder for the new
                  verification link.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-5 animate-fadeIn">
                <div className="p-3 bg-red-900/30 rounded-full ring-2 ring-red-500/30">
                  <XCircle className="h-16 w-16 text-red-400" />
                </div>
                <p className="text-2xl font-medium text-red-300">{status}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {tokenValid === false && !emailResent && (
            <div className="w-full space-y-6 animate-fadeIn">
              <p className="text-red-300 text-base text-center">
                Your verification link is invalid or has expired.
              </p>

              <button
                onClick={handleResend}
                disabled={isLoading}
                className="w-full py-4 bg-sky-500/10 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition transform hover:scale-105 disabled:cursor-not-allowed shadow-lg"
              >
                <Mail className="h-5 w-5" />
                <span>
                  {isLoading ? 'Sending...' : 'Resend Verification Email'}
                </span>
              </button>

              <div className="flex items-center justify-center space-x-3">
                <p className="text-gray-400">OR</p>
                <a
                  href="/sign-up"
                  className="text-sky-500 hover:text-indigo-200 font-medium flex items-center group"
                >
                  Go back to sign up
                  <ArrowRight className="ml-1 h-4 w-4 transform transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          )}

          {emailResent && (
            <div className="w-full space-y-6 animate-fadeIn">
              <a
                href="/sign-in"
                className="w-full py-4 bg-sky-500/10 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition transform hover:scale-105 shadow-lg"
              >
                Go to Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
