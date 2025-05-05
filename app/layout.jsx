import { SessionWrapper } from '@/components/SessionWrapper';
import { Toaster } from 'sonner';
import '@/styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionWrapper>
          <Toaster richColors position="top-center" />
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
