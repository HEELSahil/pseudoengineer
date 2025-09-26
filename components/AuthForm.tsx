'use client';

import { signIn } from 'next-auth/react';
import { registerUser } from '@/lib/actions/register';
import { checkEmailVerification, checkUserExists } from '@/lib/auth-helpers';
import { passwordSchema } from '@/lib/validators';

import { z } from 'zod';
import Link from 'next/link';
import { toast } from 'sonner';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FormField from './FormField';
import { FormType } from '@/types';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(2) : z.string().optional(),
    email: z.string().email(),
    password:
      type === 'sign-up'
        ? passwordSchema
        : z.string().min(8, 'Invalid credentials'),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === 'sign-in';
  const formSchema = authFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (type === 'sign-up') {
        const response = await registerUser(
          data.name!,
          data.email,
          data.password,
        );
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        toast.success(response.message, {
          duration: Infinity,
          dismissible: true,
        });
        router.push('/sign-in');
      } else {
        const userExists = await checkUserExists(data.email);

        if (!userExists) {
          toast.error('Account not found. Please create a new account.');
          return;
        }

        const isVerified = await checkEmailVerification(data.email);
        if (!isVerified) {
          toast.error('Please verify your email before signing in.');
          return;
        }

        const res = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (res?.error) {
          console.log('Sign-in error:', res.error);
          toast.error('Invalid credentials. Please check your password.');
        } else {
          toast.success('Signed in successfully.');
          router.push('/');
        }
      }
    } catch (error) {
      toast.error(`There was an error: ${error}`);
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of outcome
    }
  };

  return (
    <div className="w-full max-w-[540px] space-y-6 p-8 md:p-10 rounded-xl bg-dark-200 shadow-xl backdrop-blur">
      <Link href="/" aria-label="pseudoEngineer logo">
        <div className="flex items-center justify-center">
          <div
            aria-hidden="true"
            className="mr-3 bg-image-two dark:bg-image-two h-16 w-64 bg-cover"
          />
        </div>
      </Link>

      <h2 className="pb-4 text-3xl font-extrabold text-center text-white">
        {isSignIn ? 'Log in to your account' : 'Create a new account'}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Full name"
              placeholder="Your full name"
              type="text"
            />
          )}

          <FormField
            control={form.control}
            name="email"
            label="Email address"
            placeholder="Your email address"
            type="email"
          />

          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <Button
            className="w-full bg-sky-500 text-dark-100 font-semibold py-5 rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-dark-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isSignIn ? 'Signing In...' : 'Creating account...'}
              </span>
            ) : isSignIn ? (
              'Sign In'
            ) : (
              'Create an account'
            )}
          </Button>
        </form>
      </Form>

      <div className="flex items-center w-full gap-4 text-sm text-gray-400">
        <div className="flex-1 h-px bg-[#191e3a]" />
        <span className="bg-dark-200 px-4 text-light-500 text-lg">or</span>
        <div className="flex-1 h-px bg-[#191e3a]" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button
          className="w-full flex items-center justify-center gap-2 py-6 text-white bg-[#11142B]"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="google.tsx"
            data-sentry-component="Google"
          >
            <g
              clipPath="url(#clip0_4112_2876)"
              data-sentry-element="g"
              data-sentry-source-file="google.tsx"
            >
              <path
                d="M8.16016 6.54541V9.6436H12.4656C12.2765 10.64 11.7092 11.4837 10.8583 12.0509L13.4546 14.0655C14.9673 12.6692 15.8401 10.6182 15.8401 8.18186C15.8401 7.61459 15.7892 7.06909 15.6946 6.5455L8.16016 6.54541Z"
                fill="#4285F4"
                data-sentry-element="path"
                data-sentry-source-file="google.tsx"
              ></path>
              <path
                d="M3.67688 9.52271L3.09131 9.97095L1.01855 11.5855C2.33491 14.1963 5.0329 16 8.16014 16C10.3201 16 12.131 15.2873 13.4547 14.0655L10.8583 12.0509C10.1456 12.5309 9.23646 12.8219 8.16014 12.8219C6.08015 12.8219 4.31293 11.4182 3.68015 9.52732L3.67688 9.52271Z"
                fill="#34A853"
                data-sentry-element="path"
                data-sentry-source-file="google.tsx"
              ></path>
              <path
                d="M1.01827 4.41455C0.472851 5.49087 0.160156 6.70543 0.160156 7.99995C0.160156 9.29447 0.472851 10.509 1.01827 11.5854C1.01827 11.5926 3.68014 9.51991 3.68014 9.51991C3.52014 9.03991 3.42556 8.53085 3.42556 7.99987C3.42556 7.46889 3.52014 6.95983 3.68014 6.47983L1.01827 4.41455Z"
                fill="#FBBC05"
                data-sentry-element="path"
                data-sentry-source-file="google.tsx"
              ></path>
              <path
                d="M8.1603 3.18545C9.3385 3.18545 10.3858 3.59271 11.2221 4.37818L13.513 2.0873C12.1239 0.792777 10.3204 0 8.1603 0C5.03305 0 2.33491 1.79636 1.01855 4.41455L3.68033 6.48001C4.31302 4.58908 6.08031 3.18545 8.1603 3.18545Z"
                fill="#EA4335"
                data-sentry-element="path"
                data-sentry-source-file="google.tsx"
              ></path>
            </g>
            <defs
              data-sentry-element="defs"
              data-sentry-source-file="google.tsx"
            >
              <clipPath
                id="clip0_4112_2876"
                data-sentry-element="clipPath"
                data-sentry-source-file="google.tsx"
              >
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  data-sentry-element="rect"
                  data-sentry-source-file="google.tsx"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          Log In with Google
        </Button>
        <Button
          className="w-full flex items-center justify-center gap-2 py-6 text-white bg-[#11142B]"
          onClick={() => signIn('github', { callbackUrl: '/' })}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-sentry-element="svg"
            data-sentry-source-file="github.tsx"
            data-sentry-component="Github"
            style={{ color: 'rgb(255, 255, 255)' }}
          >
            <g
              clipPath="url(#clip0_4112_2878)"
              data-sentry-element="g"
              data-sentry-source-file="github.tsx"
            >
              <mask
                id="mask0_4112_2878"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="16"
                data-sentry-element="mask"
                data-sentry-source-file="github.tsx"
                style={{ maskType: 'luminance' }}
              >
                <path
                  d="M16 0H0V16H16V0Z"
                  fill="white"
                  data-sentry-element="path"
                  data-sentry-source-file="github.tsx"
                ></path>
              </mask>
              <g
                mask="url(#mask0_4112_2878)"
                data-sentry-element="g"
                data-sentry-source-file="github.tsx"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                  fill="currentColor"
                  data-sentry-element="path"
                  data-sentry-source-file="github.tsx"
                ></path>
              </g>
            </g>
            <defs
              data-sentry-element="defs"
              data-sentry-source-file="github.tsx"
            >
              <clipPath
                id="clip0_4112_2878"
                data-sentry-element="clipPath"
                data-sentry-source-file="github.tsx"
              >
                <rect
                  width="16"
                  height="16"
                  fill="white"
                  data-sentry-element="rect"
                  data-sentry-source-file="github.tsx"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          Log In with GitHub
        </Button>
      </div>

      <p className="text-center text-base text-white">
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}
        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="ml-1 font-semibold text-sky-500 hover:underline"
        >
          {isSignIn ? 'Sign Up' : 'Log In'}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
