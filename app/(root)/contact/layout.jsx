export const metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://www.pseudoengineer.dev')
      : new URL('http://localhost:3000'),

  title: 'Contact | pseudoEngineer',
  description:
    'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',

  openGraph: {
    title: 'Contact | pseudoEngineer',
    description:
      'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',
    url: 'https://www.pseudoengineer.dev/contact',
    images: [
      {
        url: 'https://assets.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'Contact pseudoEngineer',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Contact | pseudoEngineer',
    description:
      'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',
    images: ['https://pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
