export const metadata = {
    title: 'About pseudoEngineer | Simplifying Complex Programming',
    description: 'Learn about pseudoEngineer, a platform dedicated to simplifying complex programming technologies and making learning accessible for aspiring engineers.',
    keywords: ['pseudoengineer', 'about', 'programming education', 'simplified learning'],
    openGraph: {
      title: 'About pseudoEngineer | Simplifying Complex Programming',
      description: 'Learn about pseudoEngineer, a platform dedicated to simplifying complex programming technologies and making learning accessible for aspiring engineers.',
      url: 'https://www.pseudoengineer.dev/about',
      images: [
        {
          url: 'https://www.pseudoengineer.dev/pseudoengineer.png',
          width: 800,
          height: 600,
          alt: 'About pseudoEngineer',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About pseudoEngineer | Simplifying Complex Programming',
      description: 'Learn about pseudoEngineer, a platform dedicated to simplifying complex programming technologies and making learning accessible for aspiring engineers.',
      images: ['https://www.pseudoengineer.dev/pseudoengineer.png'],
    },
  };
  
  export default function Layout({ children }) {
    return <>{children}</>
  }