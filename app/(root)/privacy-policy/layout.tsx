import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://www.pseudoengineer.dev')
      : new URL('http://localhost:3000'),

  title: 'Privacy Policy | pseudoEngineer',
  description:
    'Learn how pseudoEngineer protects your personal information and manages your data.',
  keywords: [
    'pseudoengineer',
    'privacy policy',
    'data protection',
    'user privacy',
  ],

  openGraph: {
    title: 'Privacy Policy | pseudoEngineer',
    description:
      'Learn how pseudoEngineer protects your personal information and manages your data.',
    url: 'https://www.pseudoengineer.dev/privacy-policy',
    images: [
      {
        url: 'https://assets.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'Privacy Policy pseudoEngineer',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | pseudoEngineer',
    description:
      'Learn how pseudoEngineer protects your personal information and manages your data.',
    images: ['https://assets.pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
