import Layout from "@/components/layout/Layout";
import IGGYHero from "@/components/about/IGGYHero";
import EssenceReveal from "@/components/about/EssenceReveal";
import TransformationManifesto from "@/components/about/TransformationManifesto";
import SacredPromise from "@/components/about/SacredPromise";
import EmotionalCTA from "@/components/about/EmotionalCTA";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen">
        <IGGYHero />
        <EssenceReveal />
        <TransformationManifesto />
        <SacredPromise />
        <EmotionalCTA />
      </div>
    </Layout>
  );
}