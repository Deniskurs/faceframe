import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import { ServicesPreview } from "@/components/home/services";
import LuxuryTransformationsGallery from "@/components/home/transformations/LuxuryTransformationsGallery";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  // Founder section content
  const founderQuote =
    "The goal isn’t perfection. It’s waking up and recognising yourself — just better.";
  const founderParagraphs = [
    "After a decade training with master artists across Europe, Iggy opened her London studio in 2017 with a single mission: to prove that semi-permanent makeup can enhance rather than alter.",
    "Every treatment is one-to-one, meticulous, and bespoke — so clients leave looking unmistakably like themselves, only more rested, more defined, more confident.",
  ];

  return (
    <>
      {/* Hero section */}
      <Hero />

      {/* About Section */}
      <AboutStrip
        founderName="Iggy"
        founderImage="/images/gallery/image25.webp"
        quote={founderQuote}
        paragraphs={founderParagraphs}
      />

      {/* Direct transition to services section */}

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
        title="Reserve Your Appointment"
      />
    </>
  );
}
