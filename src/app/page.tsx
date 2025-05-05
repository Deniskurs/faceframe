import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import { ServicesPreview } from "@/components/home/services";
import LuxuryTransformationsGallery from "@/components/home/transformations/LuxuryTransformationsGallery";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";
import MinimalistSectionBreak from "@/components/shared/MinimalistSectionBreak";

export default function Home() {
  // Founder section content
  const founderQuote =
    "Beauty is not about perfection. It's about enhancing your natural features with precision and care.";
  const founderParagraphs = [
    "After training with elite artists across Europe and perfecting her craft for over a decade, Iggy established FaceFrame Beauty with a singular vision: to create a sanctuary where precision meets luxury.",
    "Each treatment at FaceFrame Beauty is approached with meticulous attention to detail, ensuring that every client leaves with results that enhance their natural beauty rather than masking it.",
  ];

  return (
    <Layout>
      {/* Hero section */}
      <Hero />

      {/* About Section */}
      <AboutStrip
        founderName="Iggy"
        founderImage="/images/gallery/image25.webp"
        quote={founderQuote}
        paragraphs={founderParagraphs}
      />

      {/* Chanel/Dior-inspired luxury section transition */}
      <MinimalistSectionBreak
        variant="enhanced"
        hasDecorativeElement={true}
        hasSideElements={true}
        hasGradientEdge={true}
      />

      {/* Services preview section with premium luxury aesthetic */}
      <ServicesPreview hideTitle={false} />

      {/* Extraordinary Chanel-inspired Transformations Gallery */}
      <LuxuryTransformationsGallery hideTitle={false} />

      {/* Extraordinary Chanel-inspired Client Voices */}
      <LuxuryClientVoices hideTitle={false} />

      {/* FAQs preview section */}
      <FAQsPreview hideTitle={false} />

      {/* Final booking CTA */}
      <BookingCTA
        backgroundImage="/images/brand/IMG_5461.webp"
        title="Reserve Your Beauty Experience"
        subtitle="Limited appointments available each week. Join London's elite clientele in experiencing the art of precise beauty enhancement."
        buttonText="SECURE YOUR APPOINTMENT"
      />
    </Layout>
  );
}
