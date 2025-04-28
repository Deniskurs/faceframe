import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import BookingCTA from "@/components/home/BookingCTA";
import BrandedDivider from "@/components/shared/BrandedDivider";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <AboutStrip />
      <BrandedDivider className="my-8" />
      <ServicesPreview />
      <BrandedDivider className="my-8" />
      <TestimonialCarousel />
      <BookingCTA />
    </Layout>
  );
}
