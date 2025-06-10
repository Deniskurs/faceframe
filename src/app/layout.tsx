import type { Metadata } from "next";
import { Alice } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";

const alice = Alice({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alice",
});

// Use the Alta font from local files
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
});

export const metadata: Metadata = {
  title: "FaceFrame Beauty | Luxury Semi-Permanent Makeup in London",
  description:
    "London's premier destination for semi-permanent makeup, lashes, brows and luxury facial treatments. Book your transformation today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${alice.variable} ${alta.variable} antialiased`}
        style={{ overscrollBehaviorX: "auto" }}
        suppressHydrationWarning={true}
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
