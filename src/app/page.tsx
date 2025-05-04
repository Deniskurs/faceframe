import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import { ServicesPreview } from "@/components/home/services";
import ChanelTransformationsGallery from "@/components/home/transformations/ChanelTransformationsGallery";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";
import BrandedDivider from "@/components/shared/BrandedDivider";
import MinimalistSectionBreak from "@/components/shared/MinimalistSectionBreak";
import SignatureTransition from "@/components/shared/SignatureTransition";

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

      {/* Signature floating element transition - Chanel-inspired */}
      <SignatureTransition />

      {/* Extraordinary Chanel-inspired Transformations Gallery */}
      <ChanelTransformationsGallery hideTitle={false} />

      {/* Decorative divider before testimonials - refined spacing */}
      <div className="py-12 md:py-20">
        <BrandedDivider style="simple" />
      </div>

      {/* Testimonials section */}
      <TestimonialCarousel />

      {/* Decorative divider before FAQs - refined spacing */}
      <div className="py-12 md:py-20">
        <BrandedDivider style="gradient" height="sm" text="COMMON QUESTIONS" />
      </div>

      {/* FAQs preview section */}
      <FAQsPreview hideTitle={true} />

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
