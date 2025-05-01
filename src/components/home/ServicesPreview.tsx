"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";
import { Service } from "../../types";
import serviceService from "../../services/serviceService";
import galleryService from "../../services/galleryService";

// CHANEL-inspired luxury easing curve
const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

// Individual Service Card Component
const ServiceCard = ({ service }: { service: Service }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    "/images/gallery/Lookbook.webp"
  );
  const [imageHovered, setImageHovered] = useState(false);

  // Fetch the appropriate image when component mounts
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const galleryItems = await galleryService.getGalleryItemsByServiceId(
          service.id
        );
        if (galleryItems.length > 0) {
          setImageUrl(galleryItems[0].afterImage);
        } else {
          setImageUrl(service.imageUrl || "/images/gallery/Lookbook.webp");
        }
      } catch (error) {
        console.error("Error fetching service image:", error);
      }
    };

    fetchImage();
  }, [service.id, service.imageUrl]);

  return (
    <div className="h-full border border-soft-blush/20 bg-white overflow-hidden transition-all duration-700 hover-lift">
      {/* Service Image with CHANEL-inspired refinements */}
      <div
        className="relative w-full h-64 overflow-hidden"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <div className="w-full h-full overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover transition-transform duration-1000 ${
              imageHovered ? "scale-105" : "scale-100"
            }`}
          />

          {/* Overlay with subtle gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0"
            animate={{ opacity: imageHovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: LUXURY_EASING }}
          />
        </div>

        {/* Category Label with refined styling */}
        <div className="absolute top-4 left-4 px-4 py-1 bg-white/90">
          <span className="font-alta text-xs tracking-[0.12em] uppercase text-elegant-mocha">
            {service.categoryName}
          </span>
        </div>
      </div>

      {/* Content with elegant spacing and typography */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="font-alice text-xl tracking-wider uppercase text-elegant-mocha mb-4">
          {service.name}
        </h3>

        {/* Subtle divider */}
        <div className="h-[1px] w-10 bg-soft-blush mb-6"></div>

        <p className="font-alta text-sm tracking-wide leading-relaxed text-muted-sand mb-8 flex-grow">
          {service.description}
        </p>

        {/* Price and Booking with refined styling */}
        <div className="flex justify-between items-center pt-4 border-t border-soft-blush/10">
          <div className="flex items-center">
            <span className="text-xs uppercase tracking-wider text-muted-sand mr-2">
              Price
            </span>
            <span className="font-alice text-lg text-elegant-mocha">
              {service.price}
            </span>
          </div>

          <Link
            href={`/booking?service=${service.id}`}
            className="font-alta text-sm tracking-[0.15em] uppercase text-elegant-mocha hover:text-deep-bronze transition-all duration-700"
          >
            BOOK
          </Link>
        </div>
      </div>
    </div>
  );
};

interface ServicesPreviewProps {
  hideTitle?: boolean;
}

const ServicesPreview = ({ hideTitle = false }: ServicesPreviewProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch featured services when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const featuredServices = await serviceService.getFeaturedServices();
        setServices(featuredServices);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <FadeInSection intensity="moderate">
      <section className="py-24 md:py-32 px-6 bg-light-cream relative">
        {/* Background Pattern - More subtle, elegant pattern */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern
              id="luxury-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0L0 30L30 60L60 30Z"
                fill="#7F5539"
                fillOpacity="0.03"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#luxury-pattern)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {!hideTitle && (
            <div className="text-center mb-24">
              <motion.h2
                className="section-title inline-block relative font-alice text-2xl md:text-3xl tracking-[0.15em] text-elegant-mocha uppercase"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                PREMIUM SERVICES
                <span className="block h-[1px] w-10 mx-auto bg-elegant-mocha mt-4"></span>
              </motion.h2>

              <motion.p
                className="font-alta text-muted-sand max-w-xl mx-auto mt-8 tracking-wide leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                Discover our signature treatments, meticulously crafted to
                enhance your natural beauty with precision and artistry.
              </motion.p>
            </div>
          )}

          {/* Refined Loading and Error States */}
          {loading && (
            <div className="text-center py-20">
              <div className="relative w-12 h-12 mx-auto">
                <div className="absolute inset-0 border border-elegant-mocha/30 border-t-elegant-mocha animate-spin"></div>
              </div>
              <p className="mt-6 font-alta text-xs tracking-wider uppercase text-elegant-mocha/70">
                Loading services
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="font-alta text-sm tracking-wide text-deep-bronze">
                {error}
              </p>
            </div>
          )}

          {/* Services Grid with refined spacing */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {services.map((service, index) => (
                <FadeInSection
                  key={service.id}
                  delay={0.2 + index * 0.1}
                  direction="up"
                  intensity="subtle"
                >
                  <ServiceCard service={service} />
                </FadeInSection>
              ))}
            </div>
          )}

          {/* CHANEL-inspired minimal button */}
          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            <Link
              href="/services"
              className="font-alta tracking-[0.2em] text-sm uppercase text-elegant-mocha hover:text-deep-bronze border-b border-elegant-mocha/30 hover:border-deep-bronze pb-1 transition-all duration-700"
            >
              VIEW ALL SERVICES
            </Link>
          </motion.div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default ServicesPreview;
