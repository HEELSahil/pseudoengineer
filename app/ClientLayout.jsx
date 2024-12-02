'use client';

import { ThemeProvider } from 'next-themes';
import "@styles/globals.css";
import LayoutWrapper from '@components/LayoutWrapper';
import siteMetadata from '@data/siteMetadata';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </ThemeProvider>
  );
}