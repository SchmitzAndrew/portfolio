import type { Metadata } from "next";
import { Inter, Space_Grotesk, Racing_Sans_One } from "next/font/google";

import { GoogleAnalytics } from "@next/third-parties/google"

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: 'swap',
});

const racingSansOne = Racing_Sans_One({
  weight: '400',
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `andrew schmitz`,
  description: `andrew schmitz's portfolio. software engineer building minutes at SLAM.`,
  metadataBase: new URL('https://bigschmitz.com'),
  openGraph: {
    title: 'andrew schmitz',
    description: `ᵕ̈`,
    url: 'https://bigschmitz.com',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'andrew schmitz',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'andrew schmitz',
    description: `ᵕ̈`,
    images: ['/images/og.png'],
    creator: '@big_schmitz',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="[color-scheme:dark_light] cursor-crosshair">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/favicon.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className={spaceGrotesk.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
        </div>
      </body>
      <GoogleAnalytics gaId="G-GEJRNRSJXG"/>
    </html>
  );
}
