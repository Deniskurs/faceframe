import { Metadata } from "next";
import {
  ContactHero,
  ContactFormWithProcess,
  StudioComparison,
  ContactFAQ,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact | FaceFrame Beauty",
  description:
    "Begin your beauty journey with FaceFrame. Book a consultation at our Professional Studio (E2) or Private Studio (E3) in East London. Semi-permanent makeup, microblading, lash extensions, and luxury facials.",
  keywords: [
    "contact FaceFrame",
    "beauty consultation London",
    "book appointment",
    "East London beauty studio",
    "semi-permanent makeup booking",
    "microblading consultation",
    "private beauty studio",
  ],
  openGraph: {
    title: "Contact FaceFrame Beauty | Book Your Consultation",
    description:
      "Begin your beauty journey. Two intimate studios in East London. Response within 24 hours.",
    type: "website",
  },
};

/**
 * Contact Page - Professional & Minimalistic
 * Streamlined 4-section layout focused on conversion and clarity
 * Clean design with smooth scrolling for optimal user experience
 * Mobile-first with proper header spacing
 */
export default function ContactPage() {
  return (
    <>
      {/* Simplified Hero - Responsive heights with clear CTA */}
      <ContactHero />

      {/* Combined Form + Process Timeline - 2-column layout */}
      <ContactFormWithProcess />

      {/* Studio Locations - Side-by-side comparison */}
      <StudioComparison />

      {/* FAQ + Social Links + CTAs - Integrated footer section */}
      <ContactFAQ />
    </>
  );
}
