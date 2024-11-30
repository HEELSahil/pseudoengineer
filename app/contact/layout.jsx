export const metadata = {
    title: 'Contact | pseudoEngineer',
    description: 'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',
    openGraph: {
      title: 'Contact | pseudoEngineer',
      description: 'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',
      url: 'https://www.pseudoengineer.dev/contact',
      images: [
        {
          url: 'https://www.pseudoengineer.dev/pseudoengineer.png',
          width: 800,
          height: 600,
          alt: 'Contact pseudoEngineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact | pseudoEngineer',
      description: 'Connect with pseudoEngineer for collaborations, inquiries, or opportunities.',
      images: ['https://www.pseudoengineer.dev/pseudoengineer.png'],
    },
  };
  
  export default function Layout({ children }) {
    return <>{children}</> 
  }