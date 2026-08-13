import type { Metadata, Viewport } from 'next';
import { outfit, inter } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#080A0D',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://naveedgames.com'),
  title: {
    default: 'Naveed Games — Premier Gaming Hardware Store | Peshawar, Pakistan',
    template: '%s | Naveed Games',
  },
  description:
    'Naveed Games is the leading gaming hardware store in Peshawar & Pakistan. Shop PS5 Pro, Xbox Series X, Nintendo Switch, Custom RTX Gaming PCs, VR, Racing Simulators & Accessories. Cash on Delivery nationwide.',
  keywords: [
    'Naveed Games',
    'gaming store Peshawar',
    'PS5 Pro Pakistan',
    'Xbox Series X Peshawar',
    'gaming PC Pakistan',
    'RTX 4090 PC Peshawar',
    'Nintendo Switch OLED',
    'Meta Quest 3 VR',
    'Logitech G923 racing wheel',
  ],
  authors: [{ name: 'Naveed Games Team' }],
  creator: 'Naveed Games',
  publisher: 'Naveed Games',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Naveed Games — Premier Gaming Hardware Store',
    description:
      'Buy PS5, Xbox, Gaming PCs, VR, Racing Sims and Games in Peshawar & Pakistan. Express delivery, 100% genuine products, and Cash on Delivery.',
    url: 'https://naveedgames.com',
    siteName: 'Naveed Games',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/images/products/ps5-pro-1.jpg',
        width: 800,
        height: 600,
        alt: 'Naveed Games Store Peshawar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naveed Games — Premier Gaming Store in Pakistan',
    description:
      'Consoles, Custom Gaming PCs, VR, Accessories & Games in Peshawar with Cash on Delivery.',
    images: ['/images/products/ps5-pro-1.jpg'],
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
