import { Metadata } from "next";
import GalleryHero from "@/components/gallery/GalleryHero";
import InstagramGallery from "@/components/gallery/InstagramGallery";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";
import { BRAND, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Gallery | ${BRAND.name}`,
  description: `A curated look at recent transformations from ${BRAND.name} — microblading, lash extensions, brow styling, and luxury facials.`,
  alternates: { canonical: `${SITE.url}/gallery` },
  openGraph: {
    title: `Transformations Gallery | ${BRAND.name}`,
    description:
      "Recent client transformations: microblading, lashes, brows, facials. Crafted by Iggy.",
    type: "website",
    url: `${SITE.url}/gallery`,
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-elegant-mocha/5 via-light-cream/20 to-soft-blush/15">
      <GalleryHero />
      <InstagramGallery />
      <FAQsPreview />
      <BookingCTA />
    </main>
  );
}
