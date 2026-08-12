import type { Metadata } from 'next';
import { outfit, inter } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Naveed Games — Gaming Heaven | Peshawar',
  description:
    'Premium gaming hardware store in Peshawar. PS5, Xbox, Gaming PCs, VR, Racing Simulators, Monitors, Games and more. Cash on Delivery across Pakistan.',
  keywords: [
    'gaming store',
    'PS5',
    'Xbox',
    'gaming PC',
    'Peshawar',
    'Pakistan',
    'gaming',
    'consoles',
    'VR',
    'racing simulator',
  ],
  openGraph: {
    title: 'Naveed Games — Gaming Heaven',
    description:
      'Premium gaming hardware store in Peshawar, Pakistan. Consoles, PCs, VR, Racing, Games and more.',
    siteName: 'Naveed Games',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileNav />
        <CartDrawer />
      </body>
    </html>
  );
}
