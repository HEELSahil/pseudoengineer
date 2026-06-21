import { Fredoka } from 'next/font/google';
import { SessionWrapper } from '@/components/SessionWrapper';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

// Variable font — loads the full 300–700 weight axis.
const fredoka = Fredoka({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fredoka',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fredoka.variable} suppressHydrationWarning>
      <body>
        <SessionWrapper>
          <Toaster richColors position="top-center" />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
