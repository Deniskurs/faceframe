import type { Metadata } from "next";
import { Alice, Raleway } from "next/font/google";
import "./globals.css";

const alice = Alice({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alice",
});

// Temporary fallback for Alta font until we get the actual font files
const alta = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      <body className={`${alice.variable} ${alta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
