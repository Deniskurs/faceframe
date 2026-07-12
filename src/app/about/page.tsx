import { Metadata } from "next";
import HeroPortrait from "@/components/about/HeroPortrait";
import FounderStory from "@/components/about/FounderStory";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import PersonalInvitation from "@/components/about/PersonalInvitation";
import { PersonJsonLd } from "@/components/shared/JsonLd";
import { BRAND, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `About Iggy | ${BRAND.name}`,
  description: `Meet Iggy — founder of ${BRAND.name}. A decade of European-trained artistry in semi-permanent makeup, lashes and facials, working from an intimate studio in East London.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `Meet Iggy | ${BRAND.name}`,
    description:
      "European-trained semi-permanent makeup artist. Founder of FaceFrame Beauty, East London.",
    type: "profile",
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PersonJsonLd />
      <HeroPortrait />
      <FounderStory />
      <LuxuryClientVoices hideTitle={false} />
      <PersonalInvitation />
    </main>
  );
}
