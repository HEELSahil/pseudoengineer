export const metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://www.pseudoengineer.dev')
      : new URL('http://localhost:3000'),

  title: 'Programming Courses | pseudoEngineer',
  description:
    'Explore our featured and recent programming courses. Learn coding, web development, and more with pseudoEngineer.',
  keywords: [
    'pseudoengineer',
    'programming courses',
    'coding tutorials',
    'web development',
    'software engineering',
  ],

  openGraph: {
    title: 'Programming Courses | pseudoEngineer',
    description:
      'Explore our featured and recent programming courses. Learn coding, web development, and more with pseudoEngineer.',
    url: 'https://www.pseudoengineer.dev/courses',
    images: [
      {
        url: 'https://assets.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'pseudoEngineer Courses',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Programming Courses | pseudoEngineer',
    description:
      'Explore our featured and recent programming courses. Learn coding, web development, and more with pseudoEngineer.',
    images: ['https://assets.pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }) {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </section>
  );
}
