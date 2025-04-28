"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-95 shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="luxury-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <div className="flex items-center">
            <div className="mr-3 h-10 w-10 md:h-12 md:w-12 relative flex items-center justify-center overflow-hidden">
              {/* Actual logo image */}
              <img
                src="/images/logo/IMG_0559.jpg"
                alt="FaceFrame Beauty Logo"
                width="48"
                height="48"
                className="h-full w-full object-cover"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            <span
              className={`font-alice text-xl md:text-2xl transition-colors duration-300 ${
                isScrolled ? "text-[#7F5539]" : "text-white"
              }`}
            >
              FaceFrame Beauty
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="font-alta transition-colors duration-300"
            style={{ color: isScrolled ? "#B08968" : "white" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = isScrolled ? "#B08968" : "white";
            }}
          >
            Home
          </Link>
          <Link
            href="/services"
            className="font-alta transition-colors duration-300"
            style={{ color: isScrolled ? "#B08968" : "white" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = isScrolled ? "#B08968" : "white";
            }}
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="font-alta transition-colors duration-300"
            style={{ color: isScrolled ? "#B08968" : "white" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = isScrolled ? "#B08968" : "white";
            }}
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="font-alta transition-colors duration-300"
            style={{ color: isScrolled ? "#B08968" : "white" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = isScrolled ? "#B08968" : "white";
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-alta transition-colors duration-300"
            style={{ color: isScrolled ? "#B08968" : "white" }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = isScrolled ? "#B08968" : "white";
            }}
          >
            Contact
          </Link>
          <Link
            href="/booking"
            className="font-alta px-5 py-2 rounded-md transition-colors duration-300"
            style={{
              backgroundColor: "#7F5539",
              color: "white",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#9C6644";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#7F5539";
            }}
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none transition-colors duration-300 p-2 ${
            isScrolled ? "text-[#7F5539]" : "text-white"
          }`}
          aria-label="Toggle mobile menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
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
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="py-4 px-6 space-y-4">
          <Link
            href="/"
            className="block font-alta transition-colors duration-300 py-2"
            style={{ color: "#B08968" }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#B08968";
            }}
          >
            Home
          </Link>
          <Link
            href="/services"
            className="block font-alta transition-colors duration-300 py-2"
            style={{ color: "#B08968" }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#B08968";
            }}
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="block font-alta transition-colors duration-300 py-2"
            style={{ color: "#B08968" }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#B08968";
            }}
          >
            Gallery
          </Link>
          <Link
            href="/about"
            className="block font-alta transition-colors duration-300 py-2"
            style={{ color: "#B08968" }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#B08968";
            }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block font-alta transition-colors duration-300 py-2"
            style={{ color: "#B08968" }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#7F5539";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#B08968";
            }}
          >
            Contact
          </Link>
          <Link
            href="/booking"
            className="block font-alta px-5 py-2 rounded-md transition-colors duration-300 text-center mt-4"
            style={{
              backgroundColor: "#7F5539",
              color: "white",
            }}
            onClick={() => setIsMobileMenuOpen(false)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#9C6644";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#7F5539";
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
