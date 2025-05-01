export const metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://www.pseudoengineer.dev')
      : new URL('http://localhost:3000'),

  title: 'YouTube Series | pseudoEngineer',
  description:
    'Explore our featured and recent programming tutorials. Learn coding, web development, and more with pseudoEngineer.',
  keywords: [
    'pseudoengineer',
    'programming courses',
    'coding tutorials',
    'web development',
    'software engineering',
    'data structures',
    'algorithms',
    'dsa',
    'data structures and algorithms',
  ],

  openGraph: {
    title: 'YouTube Series | pseudoEngineer',
    description:
      'Explore our featured and recent programming tutorials. Learn coding, web development, and more with pseudoEngineer.',
    url: 'https://www.pseudoengineer.dev',
    images: [
      {
        url: 'https://assets.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'pseudoEngineer YouTube Series',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Series | pseudoEngineer',
    description:
      'Explore our featured and recent programming tutorials. Learn coding, web development, and more with pseudoEngineer.',
    images: ['https://assets.pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
