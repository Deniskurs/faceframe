"use client";

import React from "react";
import Link from "next/link";
import { Mail, Clock, MapPin, Instagram } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CONTACT, HOURS, SOCIAL, STUDIO } from "@/config/business";

type InfoItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

/**
 * QuickInfo — a single horizontal info strip that replaces three separate
 * "contact info" UIs the page used to have. Cards are hover-elevated, but
 * never animate on scroll — this section needs to feel like a calm reference
 * panel, not a splashy hero.
 */
export function QuickInfo() {
  const items: InfoItem[] = [
    {
      icon: Mail,
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: HOURS.display,
    },
    {
      icon: MapPin,
      label: "Studio",
      value: `${STUDIO.area} · ${STUDIO.postcode}`,
      href: "#studios",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: SOCIAL.instagram.handle,
      href: SOCIAL.instagram.url,
      external: true,
    },
  ];

  return (
    <section className="bg-light-cream/40 border-y border-elegant-mocha/10">
      <div className="container mx-auto px-6 sm:px-8 max-w-6xl py-8 sm:py-10">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item) => {
            const Icon = item.icon;
            const inner = (
              <Card className="border-elegant-mocha/10 bg-white/80 hover:bg-white hover:border-elegant-mocha/25 hover:-translate-y-0.5 transition-all duration-500 ease-luxury rounded-sm shadow-none p-4 sm:p-5 h-full">
                <div className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-deep-bronze mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-alta text-xs tracking-luxury uppercase text-elegant-mocha/80 mb-1">
                      {item.label}
                    </p>
                    <p className="font-alice text-sm text-elegant-mocha leading-snug truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Card>
            );

            if (!item.href) {
              return <li key={item.label}>{inner}</li>;
            }

            return (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40 rounded-sm"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40 rounded-sm"
                  >
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
