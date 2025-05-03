import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceCategory, LUXURY_EASING } from "../types";

export interface ServiceCardProps {
  category: ServiceCategory;
  index: number;
  isActive?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  index,
  isActive = false,
}) => {
  return (
    <div
      data-index={index}
      className="w-full transition-all duration-500 ease-out"
    >
      {/* Mobile Service Card */}
      <div
        className={`relative bg-white overflow-hidden transition-all duration-500 ${
          isActive
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
            : "shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Image Container */}
        <motion.div
          className={`relative w-full overflow-hidden transition-all duration-500 ${
            isActive ? "h-[320px] sm:h-[360px]" : "h-[300px] sm:h-[340px]"
          }`}
          initial={{ scale: 1.05 }}
          animate={{
            scale: 1,
            y: isActive ? 0 : 10,
          }}
          transition={{ duration: 1, ease: LUXURY_EASING }}
        >
          <Image
            src={category.imageUrl}
            alt={category.subtitle}
            fill
            sizes="80vw"
            className="object-cover object-center"
            quality={85}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-black/5"></div>
          {/* Subtle vignette edges */}
          <div className="absolute inset-0 box-border border-[1px] border-white/10"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-2.5">
              <span className="font-alta uppercase tracking-[0.35em] text-white/90 text-xs">
                {category.subtitle}
              </span>
            </div>
            <h3 className="font-alice text-white text-2xl sm:text-3xl tracking-[0.12em]">
              {category.title}
            </h3>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 pb-6 sm:pb-7">
          {/* Subtle top border */}
          <div className="absolute top-0 left-5 right-5 h-[0.25px] bg-elegant-mocha/5"></div>
          <p className="font-alta text-elegant-mocha/70 text-sm tracking-wide leading-[1.6] mb-5 sm:mb-6">
            {category.description}
          </p>

          <div className="mb-5 sm:mb-6">
            <h4 className="font-alice text-elegant-mocha text-lg mb-3 sm:mb-4 tracking-wider">
              {category.featured}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-[0.25px] bg-deep-bronze/60 mr-3.5"></div>
                <p className="font-alta text-elegant-mocha/85 text-xs tracking-[0.05em]">
                  {category.exclusivity}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-[0.25px] bg-deep-bronze/60 mr-3.5"></div>
                <p className="font-alta text-elegant-mocha/85 text-xs tracking-[0.05em]">
                  {category.result}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/services/${category.id}`}
            className="group block text-center relative border border-elegant-mocha/30 py-3.5 sm:py-4 px-5 sm:px-6 active:bg-elegant-mocha/5 transition-all duration-700"
          >
            <span className="font-alta uppercase tracking-[0.35em] text-elegant-mocha text-xs group-hover:text-deep-bronze transition-colors duration-700">
              Discover Collection
            </span>

            {/* Elegant corner accents */}
            <div className="absolute -top-[1px] -left-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
              <div className="absolute top-0 left-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
              <div className="absolute top-0 left-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
            </div>
            <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
              <div className="absolute bottom-0 right-0 w-0 h-[0.25px] bg-deep-bronze group-hover:w-2 transition-all duration-700 delay-100"></div>
              <div className="absolute bottom-0 right-0 h-0 w-[0.25px] bg-deep-bronze group-hover:h-2 transition-all duration-700 delay-100"></div>
            </div>

            <div className="absolute bottom-0 left-0 h-[0.25px] w-0 bg-deep-bronze/50 group-hover:w-full transition-all duration-700 ease-out"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

ServiceCard.displayName = "ServiceCard";
