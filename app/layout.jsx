import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Toaster richColors position="top-center" />
        {children}
      </body>
    </html>
  );
}
