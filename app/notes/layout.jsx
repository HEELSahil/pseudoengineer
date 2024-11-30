export const metadata = {
  title: 'Download Course Notes | pseudoEngineer',
  description: 'Access and download free, high-quality course notes for programming and development topics. Perfect for students and engineers!',
  keywords: ['pseudoengineer', 'course notes', 'free notes', 'engineering notes', 'programming notes', 'programming cheatsheets', 'coding cheatsheets'],
  openGraph: {
    title: 'Download Course Notes | pseudoEngineer',
    description: 'Access and download free, high-quality course notes for programming and development topics. Perfect for students and engineers!',
    url: 'https://www.pseudoengineer.dev/notes',
    images: [
      {
        url: 'https://www.pseudoengineer.dev/pseudoengineer.png',
        width: 800,
        height: 600,
        alt: 'Preview of course notes',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Course Notes | pseudoEngineer',
    description: 'Access and download free, high-quality course notes for programming and development topics. Perfect for students and engineers!',
    images: ['https://www.pseudoengineer.dev/pseudoengineer.png'],
  },
};

export default function Layout({ children }) {
  return (
    <section className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
    </section>
  );
}