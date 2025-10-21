import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-cream">
      {/* Top Gradient Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-soft-blush/40 to-transparent" />

      <div className="luxury-container py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-16">
          {/* Navigation Section */}
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

          {/* Vertical Divider - Desktop Only */}
          <Separator
            orientation="vertical"
            className="hidden md:block absolute left-[calc(66.66%)] top-0 bottom-0 bg-soft-blush/30"
            style={{ height: "100%", marginLeft: "-0.5px" }}
          />

          {/* Services Section */}
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

          {/* Horizontal Divider - Mobile Only (after Services) */}
          <Separator
            orientation="horizontal"
            className="md:hidden bg-soft-blush/30"
          />

          {/* Social Section */}
          <div>
            <h3 className="font-alice text-sm uppercase tracking-[0.25em] text-elegant-mocha mb-6">
              Follow Us
            </h3>
            <div className="flex md:flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.232.585 1.777 1.13.546.546.88 1.11 1.13 1.777.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.9 4.9 0 01-1.13 1.777c-.546.546-1.11.88-1.777 1.13-.636.247-1.363.416-2.427.465-1.06.048-1.37.06-4.123.06a73.29 73.29 0 01-1.977-.04 4.9 4.9 0 01-2.427-.465 4.9 4.9 0 01-1.777-1.13c-.546-.546-.88-1.11-1.13-1.777-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.9 4.9 0 011.13-1.777c.546-.546 1.11-.88 1.777-1.13.636-.247 1.363-.416 2.427-.465C9.576 2.013 9.82 2 12.315 2zm.135 2.5h-.27c-2.14 0-2.484.01-3.354.055-1.015.047-1.479.173-1.75.251-.41.118-.717.271-.954.507-.238.237-.391.545-.509.954-.078.272-.204.735-.251 1.75-.045.87-.056 1.215-.056 3.354s.01 2.484.056 3.354c.047 1.015.173 1.479.251 1.75.118.41.271.717.507.954.237.238.545.391.954.509.272.078.735.204 1.75.251.87.045 1.215.056 3.354.056s2.484-.01 3.354-.056c1.015-.047 1.479-.173 1.75-.251.41-.118.717-.271.954-.507.238-.237.391-.545.509-.954.078-.272.204-.735.251-1.75.045-.87.056-1.215.056-3.354s-.01-2.484-.056-3.354c-.047-1.015-.173-1.479-.251-1.75a1.995 1.995 0 00-.509-.954c-.237-.238-.545-.391-.954-.509-.272-.078-.735-.204-1.75-.251-.82-.042-1.17-.054-2.73-.055h-.944a40.9 40.9 0 00-.584 0zm-.135 4.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 2.5a1 1 0 100 2 1 1 0 000-2zm4.5-3a1 1 0 10-2 0 1 1 0 002 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-elegant-mocha/30 flex items-center justify-center text-elegant-mocha transition-all duration-700 hover:bg-deep-bronze/10 hover:border-deep-bronze"
                aria-label="Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <Separator className="my-10 md:my-12 bg-soft-blush/30" />

        {/* Legal Footer */}
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
            © {currentYear} FaceFrame Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
