import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cn } from '../lib/utils';
import './globals.css';

import { LightDarkToggle } from '../components/ui/light-dark-toggle';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/context/AuthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Jobify',
  description: 'Get Ready to get jobs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={cn(poppins.className, 'bg-background')}>
          <Navbar />
          {children}

          <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
