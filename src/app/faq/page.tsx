import React from "react";
import { Metadata } from "next";
import { FAQPageClient } from "@/components/faq/FAQPageClient";
import { FaqJsonLd } from "@/components/shared/JsonLd";
import faqService from "@/services/faqService";
import { FAQ } from "@/types";

import { BRAND, SITE } from "@/config/business";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${BRAND.name}`,
  description:
    "Answers about our semi-permanent makeup, lash extensions, facials, aftercare, and booking.",
  keywords:
    "FAQ, beauty questions, semi-permanent makeup, lash extensions, facials, booking, London beauty salon",
  alternates: { canonical: `${SITE.url}/faq` },
  openGraph: {
    title: `FAQs | ${BRAND.name}`,
    description:
      "Common questions answered — from microblading aftercare to booking and pricing.",
    type: "website",
    url: `${SITE.url}/faq`,
  },
};

export default async function FAQPage() {
  const allFAQs = await faqService.getAllFAQs();

  // Define category order as specified
  const categoryOrder = [
    "general",
    "semi-permanent-makeup",
    "booking",
    "lashes-brows",
    "facials",
  ];

  // Group FAQs by category
  const faqsByCategory = allFAQs.reduce(
    (acc: Record<string, FAQ[]>, faq: FAQ) => {
      const category = faq.category || "general";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    },
    {} as Record<string, FAQ[]>
  );

  // Sort categories according to specified order
  const orderedCategories = categoryOrder.filter(
    (category) =>
      faqsByCategory[category] && faqsByCategory[category].length > 0
  );

  return (
    <>
      <FaqJsonLd faqs={allFAQs} />
      <FAQPageClient
        orderedCategories={orderedCategories}
        faqsByCategory={faqsByCategory}
      />
    </>
  );
}
