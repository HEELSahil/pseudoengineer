'use client';

import { ThemeProvider } from 'next-themes';
import '../styles/globals.css'
import LayoutWrapper from './layoutwrapper';
import siteMetadata from '../data/siteMetadata'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
