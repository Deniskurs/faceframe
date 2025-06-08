import React from "react";
import { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import { FAQPageClient } from "@/components/faq/FAQPageClient";
import faqService from "@/services/faqService";
import { FAQ } from "@/types";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FaceFrame Beauty",
  description:
    "Find answers to common questions about our semi-permanent makeup, lash extensions, facials, and booking procedures. Expert advice from London's premier beauty studio.",
  keywords:
    "FAQ, beauty questions, semi-permanent makeup, lash extensions, facials, booking, London beauty salon",
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
    <Layout>
      <FAQPageClient
        orderedCategories={orderedCategories}
        faqsByCategory={faqsByCategory}
      />
    </Layout>
  );
}
