import Layout from "@/components/layout/Layout";
import ContactHero from "@/components/contact/ContactHero";
import ModernContactInfo from "@/components/contact/ModernContactInfo";
import FloatingContactForm from "@/components/contact/FloatingContactForm";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata = {
  title: "Connect with Iggy — FaceFrame Beauty Studios",
  description:
    "Ready to begin your beauty journey? Visit our Studio Salon (London E2) or Home Studio (London E3) for bespoke consultations and luxury treatments. Contact FaceFrame Beauty for personalized semi-permanent makeup, lashes, brows, and luxury facials.",
};

export default function ContactPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <ContactHero />

      {/* Contact Information with Dual Locations */}
      <ModernContactInfo />

      {/* Contact Form */}
      <FloatingContactForm />

      {/* Client Testimonials */}
      <LuxuryClientVoices />

      {/* Final Booking CTA */}
      <BookingCTA
        backgroundImage="/images/gallery/image21.webp"
        title="Ready to Begin Your Beauty Journey?"
        subtitle="Choose between our Studio Salon in E2 or intimate Home Studio in E3. Join London's discerning clientele who trust Iggy with their beauty transformations."
        buttonText="BOOK YOUR TRANSFORMATION"
        buttonLink="/services"
      />
    </Layout>
  );
}