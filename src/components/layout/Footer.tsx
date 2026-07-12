import React from "react";
import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SOCIAL, BRAND, CONTACT, HOURS, STUDIO } from "@/config/business";

// Shared link treatment — CSS uppercase keeps the header's all-caps
// discipline without hard-coding cased literals; py-2 keeps tap targets.
const footerLinkClass =
  "font-alta text-sm tracking-[0.15em] uppercase text-elegant-mocha hover:text-deep-bronze transition-colors duration-700 inline-block py-2";

// Mirrors the header nav order, with the client login and booking entries
// appended in the same sequence the header presents them.
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Login" },
  { href: "/booking", label: "Booking" },
] as const;

const SERVICE_LINKS = [
  { href: "/services#semi-permanent-makeup", label: "Semi-Permanent Makeup" },
  { href: "/services#lashes-brows", label: "Lashes & Brows" },
  { href: "/services#facials", label: "Facials" },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-cream">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-soft-blush/40 to-transparent" />

      <div className="luxury-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Navigation */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-4">
              Navigation
            </h3>
            <nav>
              <ul className="space-y-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={footerLinkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-4">
              Services
            </h3>
            <ul className="space-y-1">
              {SERVICE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-4">
              Contact
            </h3>
            <ul className="space-y-1 font-alta text-sm tracking-[0.1em] text-elegant-mocha">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-deep-bronze transition-colors duration-700 inline-block py-2 break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="py-2">{HOURS.display}</li>
              <li>
                <a
                  href={STUDIO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-deep-bronze transition-colors duration-700 inline-block py-2 leading-relaxed"
                >
                  {STUDIO.streetAddress}
                  <br />
                  {STUDIO.area}, {STUDIO.postcode}
                </a>
              </li>
            </ul>
          </div>

          <Separator
            orientation="horizontal"
            className="sm:hidden bg-soft-blush/30"
          />

          {/* Social */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-4">
              Follow Us
            </h3>
            <div className="flex md:flex-col gap-3">
              <a
                href={SOCIAL.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40"
                aria-label={`${BRAND.name} on Instagram (${SOCIAL.instagram.handle})`}
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={SOCIAL.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-bronze/40"
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
              className="font-alta text-xs tracking-[0.2em] uppercase text-muted-sand hover:text-elegant-mocha transition-colors duration-700 inline-block py-2"
            >
              Privacy Policy
            </Link>
            <span className="text-muted-sand/50">•</span>
            <Link
              href="/terms-of-service"
              className="font-alta text-xs tracking-[0.2em] uppercase text-muted-sand hover:text-elegant-mocha transition-colors duration-700 inline-block py-2"
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
