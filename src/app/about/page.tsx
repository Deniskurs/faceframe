import Layout from "@/components/layout/Layout";
import HeroPortrait from "@/components/about/HeroPortrait";
import FounderStory from "@/components/about/FounderStory";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import PersonalInvitation from "@/components/about/PersonalInvitation";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Powerful single-image hero with minimal text */}
        <HeroPortrait />

        {/* Founder's story - 3 paragraphs, 1 image */}
        <FounderStory />

        {/* Client testimonials - reuse from home */}
        <LuxuryClientVoices hideTitle={false} />

        {/* Simple, personal CTA */}
        <PersonalInvitation />
      </div>
    </Layout>
  );
}
