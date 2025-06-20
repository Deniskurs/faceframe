"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryShadcnButton } from "@/components/ui/luxury-shadcn-button";

// CHANEL-inspired luxury easing curves (same as hero for consistency)
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isScrolled: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

// CHANEL-inspired navigation link with enhanced typography
const NavLink = ({
  href,
  children,
  isScrolled,
  isMobile = false,
  onClick = () => {},
}: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`font-alta text-sm relative group ${
        isMobile ? "" : "mx-3 md:mx-5"
      }`}
      onClick={onClick}
    >
      {/* Refined readable link text with luxury tracking */}
      <span
        className={`inline-block tracking-[0.12em] transition-all duration-700 font-normal navbar-link ${
          isScrolled
            ? "text-luxury-primary group-hover:text-deep-bronze"
            : "text-luxury-primary group-hover:text-deep-bronze"
        }`}
        style={{
          textShadow: isScrolled
            ? "none"
            : "none",
          fontWeight: 400,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </span>

      {/* CHANEL-inspired underline with luxury timing */}
      <motion.span
        className={`absolute left-0 bottom-[-3px] h-[1px] ${
          isScrolled ? "bg-elegant-mocha/80" : "bg-elegant-mocha/80"
        }`}
        initial={{ width: "0%", left: "50%", opacity: 0 }}
        whileHover={{ width: "100%", left: "0%", opacity: 0.8 }}
        transition={{ duration: 0.7, ease: LUXURY_EASING }}
      />
    </Link>
  );
};

// Mobile menu link with enhanced luxury spacing and styling
const MobileNavLink = ({
  href,
  children,
  onClick = () => {},
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: LUXURY_EASING }}
      className="overflow-hidden"
    >
      <Link
        href={href}
        className="font-alta text-base tracking-[0.15em] uppercase font-normal text-luxury-primary block py-5 transition-colors duration-700 hover:text-deep-bronze"
        onClick={onClick}
      >
        {children}
      </Link>
      <motion.div
        className="h-[1px] w-full bg-soft-blush/40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: LUXURY_EASING }}
      />
    </motion.div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enhanced scroll effect with transition logic
  useEffect(() => {
    const handleScroll = () => {
      // Use the same scroll threshold but trigger when scrolling past 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial load state to enhance readability before transitioning
  useEffect(() => {
    // Start with a darker overlay for better text readability
    const initialDarkerOverlay = setTimeout(() => {
      // After 500ms, gradually transition to normal state
      setIsScrolled(false);
    }, 500);

    return () => clearTimeout(initialDarkerOverlay);
  }, []);

  // Disable scroll when mobile menu is open for full-screen overlay
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Refined header animation
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 30,
      },
    },
  };

  // CHANEL-inspired mobile menu animation
  const overlayVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.6,
        ease: [0.32, 0.72, 0, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: "0%",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navLinkVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? "h-[60px] md:h-[64px]" : "h-[70px] md:h-[80px]"
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {/* CHANEL-inspired premium backdrop with enhanced blur and refined gradient */}
      <div
        className={`absolute inset-0 transition-all duration-700 backdrop-blur-[6px] ${
          isScrolled
            ? "bg-white/95 shadow-md border-b border-elegant-mocha/10"
            : "bg-white/95 shadow-md border-b border-elegant-mocha/10"
        }`}
      />

      {/* Refined horizontal separator line with increased thickness */}
      <motion.div
        className={`absolute bottom-0 left-0 w-full h-[1px] ${
          isScrolled ? "bg-elegant-mocha/15" : "bg-elegant-mocha/15"
        }`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASING }}
      />

      {/* Corner accents removed as requested */}

      {/* Golden ratio-inspired layout with proper mobile-friendly alignment */}
      <div className="max-w-[1400px] h-full mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* CHANEL-inspired centered two-part logo structure */}
        <motion.div
          className="relative z-10 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASING }}
        >
          <Link href="/" className="group flex items-center">
            {/* Logo Image with scaled transitions - optimized for transparent logo */}
            <div
              className={`transition-all duration-700 ${
                isScrolled ? "w-10 h-10" : "w-12 h-12"
              }`}
            >
              <Image
                src="/images/logo/tl-brown.webp"
                alt="FaceFrame Beauty Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Logo Text with CHANEL-inspired elegant typography and enhanced contrast */}
            <div
              className={`ml-3 transition-all duration-700 ${
                isScrolled ? "ml-2.5" : "ml-3.5"
              }`}
            >
              <span
                className={`font-alice block tracking-[0.12em] transition-all duration-700 font-normal navbar-logo-text ${
                  isScrolled
                    ? "text-luxury-primary text-base md:text-lg"
                    : "text-luxury-primary text-lg md:text-xl"
                }`}
                style={{
                  textShadow: isScrolled
                    ? "0 0.5px 0.5px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.02)"
                    : "0 0.5px 0.5px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.02)",
                  fontWeight: 400,
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                FACEFRAME
              </span>
              <span
                className={`font-alice tracking-[0.08em] transition-all duration-700 navbar-logo-text ${
                  isScrolled
                    ? "text-luxury-secondary text-[10px]"
                    : "text-luxury-secondary text-xs"
                }`}
                style={{
                  textShadow: isScrolled
                    ? "0 0.5px 0.5px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.02)"
                    : "0 0.5px 0.5px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.02)",
                  fontWeight: 400,
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                BEAUTY
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Architectural Desktop Navigation with CHANEL-inspired refined spacing */}
        <motion.nav
          className="hidden md:flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: LUXURY_EASING }}
        >
          {/* Golden ratio-inspired spacing between nav items */}
          <div className="flex items-center space-x-2 mr-8">
            <NavLink href="/" isScrolled={isScrolled}>
              HOME
            </NavLink>
            <NavLink href="/services" isScrolled={isScrolled}>
              SERVICES
            </NavLink>
            <NavLink href="/gallery" isScrolled={isScrolled}>
              GALLERY
            </NavLink>
            <NavLink href="/about" isScrolled={isScrolled}>
              ABOUT
            </NavLink>
            <NavLink href="/faq" isScrolled={isScrolled}>
              FAQ
            </NavLink>
            <NavLink href="/contact" isScrolled={isScrolled}>
              CONTACT
            </NavLink>
          </div>

          {/* Ultra-refined CHANEL-inspired Book Now button */}
          <LuxuryShadcnButton
            href="/booking"
            text="BOOK"
            luxuryVariant="outline"
            luxuryTheme={isScrolled ? "light" : "light"}
            luxurySize="small"
          />
        </motion.nav>

        {/* CHANEL-inspired luxury hamburger button with enhanced accessibility */}
        <button
          className={`md:hidden relative z-[60] flex items-center justify-center w-14 h-14 focus:outline-none focus:ring-1 focus:ring-elegant-mocha/40 rounded-sm ${
            isScrolled ? "text-luxury-primary" : "text-luxury-primary"
          }`}
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="relative w-6 h-6 flex flex-col justify-center items-center transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
            {/* Enhanced hamburger lines with luxury transitions */}
            <span
              className={`absolute h-[1px] w-6 transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-0 bg-elegant-mocha/90 w-5"
                  : "translate-y-[-5px] bg-current shadow-sm"
              }`}
            ></span>
            <span
              className={`absolute h-[1px] w-4 transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isMobileMenuOpen
                  ? "opacity-0 translate-x-3 bg-elegant-mocha/90"
                  : "opacity-100 bg-current shadow-sm"
              }`}
            ></span>
            <span
              className={`absolute h-[1px] w-6 transform transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                isMobileMenuOpen
                  ? "-rotate-45 translate-y-0 bg-elegant-mocha/90 w-5"
                  : "translate-y-[5px] bg-current shadow-sm"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* CHANEL-inspired refined Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-light-cream flex md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
          >
            {/* Corner accents for mobile menu */}
            <div className="absolute top-6 left-6 w-4 h-[0.5px] bg-elegant-mocha/20"></div>
            <div className="absolute top-6 left-6 w-[0.5px] h-4 bg-elegant-mocha/20"></div>
            <div className="absolute bottom-6 right-6 w-4 h-[0.5px] bg-elegant-mocha/20"></div>
            <div className="absolute bottom-6 right-6 w-[0.5px] h-4 bg-elegant-mocha/20"></div>

            <div className="w-full h-full flex flex-col">
              {/* Menu Container with CHANEL-inspired elegant spacing */}
              <div className="flex-1 flex flex-col justify-center px-10 py-20 overflow-hidden">
                <motion.div className="mb-16" variants={navLinkVariants}>
                  <h2 className="font-alice text-elegant-mocha text-2xl mb-3 tracking-[0.15em]">
                    FaceFrame Beauty
                  </h2>
                  <div className="w-12 h-[0.5px] bg-elegant-mocha/30 mb-3"></div>
                  <p className="font-alta text-muted-sand text-xs tracking-[0.3em] uppercase">
                    Luxury Beauty Experience
                  </p>
                </motion.div>

                {/* Elegant Mobile Menu Links with refined spacing */}
                <nav className="space-y-0 mt-8">
                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/" onClick={closeMobileMenu}>
                      HOME
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/services" onClick={closeMobileMenu}>
                      SERVICES
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/gallery" onClick={closeMobileMenu}>
                      GALLERY
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/about" onClick={closeMobileMenu}>
                      ABOUT
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/faq" onClick={closeMobileMenu}>
                      FAQ
                    </MobileNavLink>
                  </motion.div>

                  <motion.div variants={navLinkVariants}>
                    <MobileNavLink href="/contact" onClick={closeMobileMenu}>
                      CONTACT
                    </MobileNavLink>
                  </motion.div>
                </nav>

                {/* CHANEL-inspired booking button with elegant animation */}
                <motion.div
                  className="mt-16 flex justify-center"
                  variants={navLinkVariants}
                >
                  <LuxuryShadcnButton
                    href="/booking"
                    text="BOOK AN APPOINTMENT"
                    luxuryVariant="outline"
                    luxuryTheme="light"
                    luxurySize="large"
                    className="min-w-[250px]"
                    onClick={closeMobileMenu}
                  />
                </motion.div>

                {/* Contact details with refined typography */}
                <motion.div
                  className="mt-auto text-center pt-16"
                  variants={navLinkVariants}
                >
                  <p className="font-alta text-muted-sand text-xs tracking-[0.2em] uppercase">
                    London, UK
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
