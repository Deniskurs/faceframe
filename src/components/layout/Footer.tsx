import React from "react";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SOCIAL, BRAND } from "@/config/business";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-cream">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-soft-blush/40 to-transparent" />

      <div className="luxury-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16">
          {/* Navigation */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-6">
              Navigation
            </h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                  >
                    Booking
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#semi-permanent-makeup"
                  className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                >
                  Semi-Permanent Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/services#lashes-brows"
                  className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                >
                  Lashes & Brows
                </Link>
              </li>
              <li>
                <Link
                  href="/services#facials"
                  className="font-alta text-sm tracking-[0.15em] text-elegant-mocha hover:text-deep-bronze transition-colors duration-700"
                >
                  Facials
                </Link>
              </li>
            </ul>
          </div>

          <Separator
            orientation="horizontal"
            className="md:hidden bg-soft-blush/30"
          />

          {/* Social */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-6">
              Follow Us
            </h3>
            <div className="flex md:flex-col gap-3">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40"
                aria-label={`${BRAND.name} on Instagram (${SOCIAL.instagram.handle})`}
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40"
                aria-label={`${BRAND.name} on Facebook (${SOCIAL.facebook.handle})`}
              >
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 md:my-12 bg-soft-blush/30" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
            <Link
              href="/privacy-policy"
              className="font-alta text-xs tracking-[0.2em] text-muted-sand hover:text-elegant-mocha transition-colors duration-700"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-sand/50">•</span>
            <Link
              href="/terms-of-service"
              className="font-alta text-xs tracking-[0.2em] text-muted-sand hover:text-elegant-mocha transition-colors duration-700"
            >
              Terms of Service
            </Link>
          </div>
          <p className="font-alta text-xs tracking-[0.2em] text-muted-sand text-center md:text-right">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
