import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/about/AboutHero";
import JourneySection from "@/components/about/JourneySection";
import ExpertiseCredentials from "@/components/about/ExpertiseCredentials";
import FaceFrameExperience from "@/components/about/FaceFrameExperience";
import CoreValues from "@/components/about/CoreValues";
import LuxuryClientVoices from "@/components/home/client-voices/LuxuryClientVoices";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Intimate Hero introducing Iggy and FaceFrame Beauty */}
        <AboutHero />

        {/* The Journey - Origin, Training, Philosophy using Tabs */}
        <JourneySection />

        {/* Expertise & Credentials with Hover Cards */}
        <ExpertiseCredentials />

        {/* The FaceFrame Experience with Studio Carousel */}
        <FaceFrameExperience />

        {/* Core Values using Accordion */}
        <CoreValues />

        {/* Client Voices - Reusing luxury component from home */}
        <LuxuryClientVoices hideTitle={false} />

        {/* Final CTA - Book Consultation */}
        <AboutCTA />
      </div>
    </Layout>
  );
}