import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://www.pseudoengineer.dev')
      : new URL('http://localhost:3000'),

  title: 'Terms and Conditions | pseudoEngineer',
  description:
    'Terms and conditions for using pseudoEngineer resources, tutorials, and downloadable content.',
  keywords: [
    'pseudoengineer',
    'terms and conditions',
    'user agreement',
    'intellectual property',
    'downloadable resources',
  ],

  openGraph: {
    title: 'Terms and Conditions | pseudoEngineer',
    description:
      'Terms and conditions for using pseudoEngineer resources, tutorials, and downloadable content.',
    url: 'https://www.pseudoengineer.dev/terms-and-conditions',
    images: [
      {
        url: 'https://assets.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'Terms and Conditions pseudoEngineer',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Terms and Conditions | pseudoEngineer',
    description:
      'Terms and conditions for using pseudoEngineer resources, tutorials, and downloadable content.',
    images: ['https://assets.pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
