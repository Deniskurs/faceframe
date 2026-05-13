import type { Metadata } from "next";
import { Alice } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Layout from "@/components/layout/Layout";
import { BRAND, SITE } from "@/config/business";
import { LocalBusinessJsonLd } from "@/components/shared/JsonLd";

const alice = Alice({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alice",
});

// Use the Alta font from local files.
// preload + adjustFontFallback together: Next emits a <link rel="preload">
// for the Regular weight and synthesises a metrics-matched fallback to
// minimise the CLS pop when the real font swaps in.
const alta = localFont({
  src: [
    {
      path: "../../public/fonts/Alta-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Alta-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Alta-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-alta",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${BRAND.name} | Luxury Semi-Permanent Makeup in London`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "London's destination for semi-permanent makeup, lashes, brows, and luxury facials. Intimate East London studio. Book with Iggy.",
  applicationName: BRAND.name,
  keywords: [
    "semi-permanent makeup London",
    "microblading London",
    "lash extensions East London",
    "luxury facial",
    "brow lamination",
    "FaceFrame Beauty",
    "Iggy",
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} | Luxury Semi-Permanent Makeup in London`,
    description:
      "Microblading, lashes, brows, and luxury facials. An intimate studio in East London.",
    url: SITE.url,
    locale: "en_GB",
    images: [
      {
        url: "/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — luxury beauty studio in East London`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Semi-Permanent Makeup, London`,
    description:
      "Microblading, lashes, brows, and luxury facials by Iggy. An intimate East London studio.",
    images: ["/og/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover", // For safe area on iOS notch devices
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${alice.variable} ${alta.variable} antialiased`}
        style={{ overscrollBehaviorX: "auto" }}
        suppressHydrationWarning={true}
      >
        <LocalBusinessJsonLd />
        <LenisProvider>
          <Layout>{children}</Layout>
        </LenisProvider>
      </body>
    </html>
  );
}
