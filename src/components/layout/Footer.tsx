import React from "react";
import Link from "next/link";
import { LuxuryButton } from "@/components/shared/LuxuryButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-elegant-mocha text-white pt-16 pb-8">
      <div className="luxury-container">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo & About */}
          <div className="md:col-span-4">
            <h3 className="font-alice text-2xl mb-4">FaceFrame Beauty</h3>
            <p className="font-alta text-soft-blush mb-6">
              London&apos;s premier destination for bespoke beauty
              transformations. Specializing in luxury semi-permanent makeup,
              lashes, brows and facial treatments.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-soft-blush flex items-center justify-center transition-colors hover:bg-deep-bronze"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
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
                className="w-10 h-10 rounded-full border border-soft-blush flex items-center justify-center transition-colors hover:bg-deep-bronze"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
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
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-soft-blush flex items-center justify-center transition-colors hover:bg-deep-bronze"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-alice text-lg mb-5 text-soft-blush">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-alice text-lg mb-5 text-soft-blush">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services#semi-permanent-makeup"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Semi-Permanent Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="/services#lashes-brows"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Lashes & Brows
                </Link>
              </li>
              <li>
                <Link
                  href="/services#facials"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Facials
                </Link>
              </li>
              <li>
                <Link
                  href="/services#waxing"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  Waxing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-alice text-lg mb-5 text-soft-blush">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mt-1 mr-3 text-soft-blush"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-alta">123 Elegance Street, London</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mt-1 mr-3 text-soft-blush"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@faceframebeauty.com"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  info@faceframebeauty.com
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 mt-1 mr-3 text-soft-blush"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+442012345678"
                  className="font-alta transition-colors hover:text-soft-blush"
                >
                  +44 20 1234 5678
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-deep-bronze opacity-30 mb-8" />

        {/* Booking CTA */}
        <div className="text-center mb-12">
          <h4 className="font-alice text-xl mb-6 text-soft-blush">
            Ready to Experience Luxury Beauty?
          </h4>
          <LuxuryButton
            href="/booking"
            text="BOOK YOUR APPOINTMENT"
            variant="primary"
            size="large"
          />
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="font-alta text-sm text-soft-blush mb-4 md:mb-0">
            &copy; {currentYear} FaceFrame Beauty. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy-policy"
              className="font-alta text-sm text-soft-blush hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="font-alta text-sm text-soft-blush hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
