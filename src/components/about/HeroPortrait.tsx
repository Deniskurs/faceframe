"use client";

import React from "react";
import { PageHero } from "@/components/shared/PageHero";
import { CredentialCard } from "./CredentialCard";
import { Award, GraduationCap, MapPin } from "lucide-react";

/**
 * About Page Hero - Light & Welcoming
 * Showcases expertise through credentials cards
 * Matches unified hero system (light backgrounds, consistent styling)
 */
const HeroPortrait = () => {
  return (
    <PageHero
      title="Ten Years of European Mastery"
      description="One unwavering commitment to your natural beauty"
      label="About FaceFrame"
      height="showcase"
    >
      {/* Expertise Credentials Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 max-w-3xl mx-auto px-4">
        <CredentialCard
          icon={Award}
          title="10+ Years"
          subtitle="Experience"
          delay={0.8}
        />
        <CredentialCard
          icon={GraduationCap}
          title="European"
          subtitle="Training"
          delay={0.9}
        />
        <CredentialCard
          icon={MapPin}
          title="East London"
          subtitle="E1 3AS"
          delay={1.0}
        />
      </div>

      {/* Founder Attribution */}
      <p className="font-alta text-elegant-mocha/75 text-sm italic mt-8 tracking-wide">
        — Iggy, Founder
      </p>
    </PageHero>
  );
};

export default HeroPortrait;
