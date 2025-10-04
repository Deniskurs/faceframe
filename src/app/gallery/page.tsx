"use client";

import Layout from "@/components/layout/Layout";
import GalleryHero from "@/components/gallery/GalleryHero";
import InstagramGallery from "@/components/gallery/InstagramGallery";
import FAQsPreview from "@/components/home/FAQsPreview";
import BookingCTA from "@/components/home/BookingCTA";

export default function GalleryPage() {
  return (
    <Layout>
      <main className="min-h-screen bg-gradient-to-b from-elegant-mocha/5 via-light-cream/20 to-soft-blush/15">
        <GalleryHero />
        <InstagramGallery />
        <FAQsPreview />
        <BookingCTA />
      </main>
    </Layout>
  );
}
