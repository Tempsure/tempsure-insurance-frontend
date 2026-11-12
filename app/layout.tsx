import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";
import { absoluteUrl, organizationJsonLd, SITE_NAME } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | Temporary Car, Van & Learner Insurance UK`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Get temporary car, van and learner driver insurance in the UK from 1 hour to 28 days. Instant online quotes and certificates.",
  applicationName: SITE_NAME,
  keywords: [
    "temporary car insurance",
    "short term car insurance",
    "temporary van insurance",
    "learner driver insurance",
    "hourly car insurance",
    "daily car insurance UK",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "insurance",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: {
    google: "CG4wWHQBJO4FzfObFyGfa2npzjnn01X2ZmgR0dnp0rw",
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Temporary Car, Van & Learner Insurance UK`,
    description:
      "Temporary UK motor insurance from 1 hour to 28 days. Instant quotes and certificates for cars, vans and learner drivers.",
    images: [
      {
        url: absoluteUrl("/images/tempsure-min.jpg"),
        width: 1200,
        height: 630,
        alt: "TempSure temporary motor insurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Temporary Car, Van & Learner Insurance UK`,
    description:
      "Temporary UK motor insurance from 1 hour to 28 days. Instant quotes and certificates.",
    images: [absoluteUrl("/images/tempsure-min.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={organizationJsonLd()} />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow pt-16 lg:pt-0">
            {children}
          </main>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
