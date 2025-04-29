"use client";

import React, { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  isScrolled: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

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
      className={`font-alta text-lg relative group ${
        isMobile ? "block py-3" : ""
      }`}
      onClick={onClick}
    >
      <span
        className={`transition-colors duration-300 ${
          isScrolled
            ? "text-muted-sand group-hover:text-elegant-mocha"
            : "text-white group-hover:text-soft-blush"
        }`}
      >
        {children}
      </span>
      <span
        className={`absolute left-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
          isScrolled ? "bg-elegant-mocha" : "bg-soft-blush"
        }`}
      />
    </Link>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-95 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="luxury-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md">
            <Image
              src="/images/logo/IMG_0559.jpg"
              alt="FaceFrame Beauty Logo"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-alice text-xl md:text-2xl ml-3 transition-all duration-300 ${
              isScrolled ? "text-elegant-mocha" : "text-white text-shadow-sm"
            }`}
          >
            FaceFrame Beauty
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" isScrolled={isScrolled}>
            Home
          </NavLink>
          <NavLink href="/services" isScrolled={isScrolled}>
            Services
          </NavLink>
          <NavLink href="/gallery" isScrolled={isScrolled}>
            Gallery
          </NavLink>
          <NavLink href="/about" isScrolled={isScrolled}>
            About
          </NavLink>
          <NavLink href="/contact" isScrolled={isScrolled}>
            Contact
          </NavLink>

          <Link
            href="/booking"
            className={`btn ${
              isScrolled
                ? "btn-primary hover:shadow"
                : "bg-white bg-opacity-20 hover:bg-opacity-30 text-white hover:shadow"
            } px-5 py-2 rounded-md transition-all duration-300`}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none p-2 rounded-md transition-colors duration-300 ${
            isScrolled
              ? "text-elegant-mocha hover:bg-soft-blush hover:bg-opacity-20"
              : "text-white hover:bg-white hover:bg-opacity-10"
          }`}
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full glass-effect shadow-lg overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="py-4 px-6 space-y-1">
              <NavLink
                href="/"
                isScrolled={true}
                isMobile={true}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              <NavLink
                href="/services"
                isScrolled={true}
                isMobile={true}
                onClick={closeMobileMenu}
              >
                Services
              </NavLink>
              <NavLink
                href="/gallery"
                isScrolled={true}
                isMobile={true}
                onClick={closeMobileMenu}
              >
                Gallery
              </NavLink>
              <NavLink
                href="/about"
                isScrolled={true}
                isMobile={true}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <NavLink
                href="/contact"
                isScrolled={true}
                isMobile={true}
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>

              <div className="pt-3 pb-2">
                <Link
                  href="/booking"
                  className="btn btn-primary w-full justify-center mt-2"
                  onClick={closeMobileMenu}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
