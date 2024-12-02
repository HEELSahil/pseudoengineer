import ClientLayout from './ClientLayout';

export const metadata = {
  metadataBase: process.env.NODE_ENV === 'production'
    ? new URL('https://www.pseudoengineer.dev')
    : new URL('http://localhost:3000'),

  title: 'pseudoEngineer',
  description: 'Achieve genuine tech mastery with practical courses that simplify complex technologies. Your journey to becoming a job-ready engineer starts here.',
  keywords: ['pseudoengineer', 'programming courses', 'tech mastery', 'coding tutorials', 'software engineering', 'web development'],

  openGraph: {
    title: 'pseudoEngineer',
    description: 'Achieve genuine tech mastery with practical courses that simplify complex technologies. Your journey to becoming a job-ready engineer starts here.',
    url: 'https://www.pseudoengineer.dev',
    images: [
      {
        url: 'https://www.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'pseudoEngineer Homepage',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'pseudoEngineer',
    description: 'Achieve genuine tech mastery with practical courses that simplify complex technologies. Your journey to becoming a job-ready engineer starts here.',
    images: ['https://www.pseudoengineer.dev/pseudoengineer.png'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}