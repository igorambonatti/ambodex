import '@/styles/globals.scss';

import cx from 'classnames';
import type { Metadata } from 'next';

import { GlobalLoader, Header } from '@/components';
import BackgroundImage from '@/components/BackgroundImage';
import FloatingIcons from '@/components/FloatingIcons';
import { StyledToastContainer } from '@/components/Toast';
import AppProvider from '@/context';

import { inter } from '../fonts';

export const metadata: Metadata = {
  title: 'Ambodex',
  description: 'Swap with no fees',
  icons: [
    {
      rel: 'ambodex-touch-icon',
      url: '/ambodex-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cx(inter.variable)} suppressHydrationWarning>
        <FloatingIcons />
        <BackgroundImage />
        <div className="z-10 flex max-h-full flex-col">
          <AppProvider>
            <Header />
            <GlobalLoader />
            <StyledToastContainer />
            <div className="h-screen-content-height">{children}</div>
          </AppProvider>
        </div>
      </body>
    </html>
  );
}
