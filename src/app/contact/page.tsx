import { Metadata } from "next";
import {
  ContactHero,
  ContactMethodsGrid,
  ContactForm,
  StudioTabs,
  ProcessTimeline,
  ContactFAQ,
  SocialConnect,
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
 * Contact Page - "The Invitation"
 * Editorial magazine-style contact experience with asymmetric layouts,
 * interactive elements, and luxury Chanel-esque design
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Editorial Split Hero - 60/40 Asymmetric Layout */}
      <ContactHero />

      {/* Four Paths Contact Methods - 2x2 Grid */}
      <ContactMethodsGrid />

      {/* Main Consultation Request Form - Glass Morphic */}
      <ContactForm />

      {/* What Happens Next Timeline - 4 Steps */}
      <ProcessTimeline />

      {/* Two Worlds Studio Tabs - Interactive Tabs */}
      <StudioTabs />

      {/* Questions FAQ - Accordion */}
      <ContactFAQ />

      {/* Follow the Journey - Social Connect CTA */}
      <SocialConnect />
    </main>
  );
}
