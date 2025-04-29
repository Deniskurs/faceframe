import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import ServicesPreview from "@/components/home/ServicesPreview";
import GalleryTeaser from "@/components/home/GalleryTeaser";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";
import BrandedDivider from "@/components/shared/BrandedDivider";

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
        founderImage="/images/gallery/image17.webp"
        quote={founderQuote}
        paragraphs={founderParagraphs}
      />

      {/* Decorative divider before services */}
      <BrandedDivider
        style="gradient"
        height="sm"
        text="PREMIUM SERVICES"
        className="my-6 md:my-8"
      />

      {/* Services preview section */}
      <ServicesPreview />

      {/* Decorative divider before gallery */}
      <BrandedDivider
        style="image"
        height="md"
        overlay={true}
        overlayOpacity={0.3}
        text="TRANSFORMATIONS"
        className="my-6 md:my-8"
        image="/images/gallery/image13.webp"
        parallax={true}
      />

      {/* Gallery teaser section */}
      <GalleryTeaser />

      {/* Decorative divider before testimonials */}
      <BrandedDivider style="simple" className="my-6 md:my-12" />

      {/* Testimonials section */}
      <TestimonialCarousel />

      {/* Decorative divider before FAQs */}
      <BrandedDivider
        style="gradient"
        height="sm"
        text="COMMON QUESTIONS"
        className="my-6 md:my-8"
      />

      {/* FAQs preview section */}
      <FAQsPreview />

      {/* Final booking CTA */}
      <BookingCTA
        backgroundImage="/images/gallery/image14.webp"
        title="Reserve Your Beauty Experience"
        subtitle="Limited appointments available each week. Join London's elite clientele in experiencing the art of precise beauty enhancement."
        buttonText="SECURE YOUR APPOINTMENT"
      />
    </Layout>
  );
}
