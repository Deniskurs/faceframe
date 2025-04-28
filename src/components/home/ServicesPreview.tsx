"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassMorphicCard from "../shared/GlassMorphicCard";
import FadeInSection from "../shared/FadeInSection";

// Helper function to map service IDs to gallery images
const getServiceImage = (serviceId: string): string => {
  const imageMap: Record<string, string> = {
    "brow-microblading": "/images/gallery/image1.webp",
    "volume-lashes-full": "/images/gallery/image4.webp",
    "million-dollar-facial": "/images/gallery/image16.webp",
  };

  return imageMap[serviceId] || "/images/gallery/Lookbook.webp"; // Fallback image
};

// Define service type
interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  categoryId: string;
}

// Sample featured services - in real implementation, this would come from the JSON data
const featuredServices = [
  {
    id: "brow-microblading",
    name: "Signature Brows",
    description:
      "Precision-crafted semi-permanent brows tailored to your face structure.",
    price: "£285",
    image: "/images/services/brows.webp",
    category: "Semi-Permanent Makeup",
    categoryId: "semi-permanent-makeup",
  },
  {
    id: "volume-lashes-full",
    name: "Volume Lashes",
    description:
      "Luxurious, lightweight lash extensions for the perfect subtle glamour.",
    price: "£65",
    image: "/images/services/lashes.webp",
    category: "Lashes & Brows",
    categoryId: "lashes-brows",
  },
  {
    id: "million-dollar-facial",
    name: "Million Dollar Facial",
    description:
      "Comprehensive luxury treatment combining multiple techniques for radiant skin.",
    price: "£100",
    image: "/images/services/facial.webp",
    category: "Facials",
    categoryId: "facials",
  },
];

// Individual Service Card Component
const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <GlassMorphicCard intensity="light" className="h-full" hoverEffect={true}>
      {/* Service Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={getServiceImage(service.id)}
          alt={service.name}
          className="w-full h-full object-cover"
        />

        {/* Category Label */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-full">
          <span className="font-alta text-sm" style={{ color: "#7F5539" }}>
            {service.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-alice text-2xl mb-2" style={{ color: "#7F5539" }}>
          {service.name}
        </h3>
        <p className="font-alta mb-4 flex-grow" style={{ color: "#B08968" }}>
          {service.description}
        </p>

        {/* Price and Booking */}
        <div className="flex justify-between items-center mt-4">
          <div
            className="px-4 py-2 rounded-full"
            style={{ backgroundColor: "#E6CCB2" }}
          >
            <span className="font-alice" style={{ color: "#7F5539" }}>
              {service.price}
            </span>
          </div>

          <Link
            href={`/booking?service=${service.id}`}
            className="group relative"
          >
            <span className="font-alta text-lg" style={{ color: "#7F5539" }}>
              Book Now
            </span>

            {/* Animated underline */}
            <span
              className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full"
              style={{
                width: 0,
                backgroundColor: "#9C6644",
              }}
            ></span>
          </Link>
        </div>
      </div>
    </GlassMorphicCard>
  );
};

const ServicesPreview = () => {
  return (
    <FadeInSection>
      <section
        className="py-12 md:py-20 px-4 relative"
        style={{ backgroundColor: "#EDE0D4" }}
      >
        {/* Background Pattern - Subtle luxury pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="luxury-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M20 0L0 20L20 40L40 20Z" fill="#7F5539" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#luxury-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="font-alice text-3xl md:text-4xl mb-4"
              style={{ color: "#7F5539" }}
            >
              Signature Services
            </h2>
            <p
              className="font-alta max-w-2xl mx-auto"
              style={{ color: "#B08968" }}
            >
              Discover our most sought-after treatments, each delivered with
              meticulous attention to detail.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {featuredServices.map((service, index) => (
              <FadeInSection key={service.id} delay={index * 0.1} distance={15}>
                <ServiceCard service={service} />
              </FadeInSection>
            ))}
          </div>

          {/* View All Services Link */}
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-block">
              <motion.span
                className="font-alta text-lg pb-1 transition-colors duration-300"
                style={{
                  color: "#7F5539",
                  borderBottom: "2px solid #7F5539",
                }}
                whileHover={{
                  x: 5,
                  style: {
                    color: "#7F5539",
                    borderBottom: "2px solid #9C6644",
                  },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Explore All Services
                <svg
                  className="w-4 h-4 inline-block ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.span>
            </Link>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ServicesPreview;
