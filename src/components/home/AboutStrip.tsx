"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const AboutStrip = () => {
  const imageRef = useRef(null);

  return (
    <section className="py-16 md:py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
          {/* Founder Image - Left Column */}
          <div className="md:col-span-5 relative">
            <motion.div
              className="relative rounded-lg overflow-hidden shadow-xl"
              ref={imageRef}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Founder image from gallery */}
              <div className="w-full h-[600px] overflow-hidden">
                <img
                  src="/images/gallery/image17.webp"
                  alt="Iggy - FaceFrame Beauty Founder"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Elegant Corner Accents */}
              <div
                className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 opacity-70"
                style={{ borderColor: "#EDE0D4" }}
              ></div>
              <div
                className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 opacity-70"
                style={{ borderColor: "#EDE0D4" }}
              ></div>
            </motion.div>
          </div>

          {/* Founder Story - Right Column */}
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="font-alice text-3xl md:text-4xl text-[#7F5539] mb-6">
                Our Founder&apos;s Vision
              </h2>

              {/* Brand Philosophy Quote */}
              <motion.div
                className="mb-8 relative"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <blockquote className="font-alice text-2xl md:text-3xl text-[#B08968] italic pl-6 border-l-2 border-[#DDB892]">
                  &ldquo;Beauty is not about perfection. It&apos;s about
                  enhancing your natural features with precision and
                  care.&rdquo;
                </blockquote>
              </motion.div>

              {/* Founder Story */}
              <div className="font-alta text-[#B08968] space-y-4">
                <p>
                  After training with elite artists across Europe and perfecting
                  her craft for over a decade, Iggy established FaceFrame Beauty
                  with a singular vision: to create a sanctuary where precision
                  meets luxury.
                </p>
                <p>
                  Each treatment at FaceFrame Beauty is approached with
                  meticulous attention to detail, ensuring that every client
                  leaves with results that enhance their natural beauty rather
                  than masking it.
                </p>
              </div>

              {/* Signature */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <svg
                  width="180"
                  height="60"
                  viewBox="0 0 180 60"
                  style={{ color: "#7F5539" }}
                >
                  {/* SVG path for a handwritten signature */}
                  <path
                    d="M10,40 C20,20 40,10 60,30 C80,50 100,20 120,30 C140,40 160,20 170,30"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                  />
                </svg>
                <p className="font-alice mt-2" style={{ color: "#7F5539" }}>
                  Iggy, Founder
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
