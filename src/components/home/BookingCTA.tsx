"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeInSection from "../shared/FadeInSection";

const BookingCTA = () => {
  return (
    <FadeInSection>
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/gallery/image14.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(127,85,57,0.95), rgba(127,85,57,0.7))",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          {/* Heading with Custom Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 inline-block"
          >
            <h2 className="font-alice text-3xl md:text-4xl lg:text-5xl text-white">
              Reserve Your Beauty Experience
              <motion.span
                className="block h-1 mt-2"
                style={{ backgroundColor: "#EDE0D4" }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="font-alta text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "#E6CCB2" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Limited appointments available each week. Join London&apos;s elite
            clientele in experiencing the art of precise beauty enhancement.
          </motion.p>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/booking"
              className="inline-block px-8 py-4 font-alta font-medium text-lg rounded shadow-xl transition-colors duration-300"
              style={{
                backgroundColor: "#EDE0D4",
                color: "#7F5539",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#E6CCB2";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#EDE0D4";
              }}
            >
              SECURE YOUR APPOINTMENT
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-3">
                <svg
                  className="w-8 h-8"
                  style={{ color: "#E6CCB2" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="font-alta text-white">GDPR Compliant</span>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-3">
                <svg
                  className="w-8 h-8"
                  style={{ color: "#E6CCB2" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <span className="font-alta text-white">
                Premium Products Only
              </span>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mr-3">
                <svg
                  className="w-8 h-8"
                  style={{ color: "#E6CCB2" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span className="font-alta text-white">5-Star Experience</span>
            </motion.div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default BookingCTA;
