"use client";

import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";
import { SectionTitle } from "@/components/shared/SectionTitle";

const ModernContactInfo = () => {

  const contactMethods = [
    {
      id: "email",
      title: "Email",
      value: "faceframe.byvil@gmail.com",
      description: "Response within 24 hours",
      action: "mailto:faceframe.byvil@gmail.com"
    },
    {
      id: "phone",
      title: "Phone", 
      value: "+44 20 7XXX XXXX",
      description: "Mon-Sat 9:00-18:00",
      action: "tel:+442070000000"
    }
  ];

  const businessHours = [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "9:00 - 18:00" },
    { day: "Wednesday", hours: "9:00 - 18:00" },
    { day: "Thursday", hours: "9:00 - 18:00" },
    { day: "Friday", hours: "9:00 - 18:00" },
    { day: "Saturday", hours: "9:00 - 18:00" },
    { day: "Sunday", hours: "Closed" }
  ];

  // Get current day for highlighting
  const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();

  return (
    <section className="py-32 md:py-40 bg-light-cream/30 relative overflow-hidden">
      {/* Enhanced texture overlay with gradient */}
      <div className="absolute inset-0 bg-[url('/images/brand/IMG_5460.webp')] opacity-[0.015] mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-light-cream/40"></div>
      
      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-20 left-10 w-[0.5px] h-32 bg-elegant-mocha/10"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, ease: LUXURY_EASING }}
        viewport={{ once: true }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[0.5px] h-32 bg-elegant-mocha/10"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: LUXURY_EASING }}
        viewport={{ once: true }}
      />
      
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
        {/* Simplified Section Title */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: LUXURY_EASING }}
          viewport={{ once: true }}
        >
          <SectionTitle
            title="STUDIO LOCATIONS"
            subtitle="Where Beauty Meets"
            align="center"
            variant="dark"
          />
        </motion.div>

        {/* Studio Locations - Clean & Direct */}
        <div className="mb-32">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >

            {/* Location Options */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start gap-16 max-w-3xl mx-auto">
              {[
                { 
                  area: "East London, E2", 
                  type: "Professional Studio",
                  detail: "Full-service beauty studio"
                },
                { 
                  area: "East London, E3", 
                  type: "Private Studio",
                  detail: "Intimate, personalized setting"
                }
              ].map((location, index) => (
                <motion.div
                  key={index}
                  className="flex-1 text-center flex flex-col items-center hover:scale-105 transition-transform duration-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1.1 + index * 0.2, 
                    duration: 1, 
                    ease: LUXURY_EASING 
                  }}
                  viewport={{ once: true }}
                >
                  {/* Location Frame - with numbers */}
                  <div className="w-16 h-16 border border-elegant-mocha/20 hover:border-elegant-mocha/40 mb-8 flex items-center justify-center hover:shadow-lg transition-all duration-700 shrink-0">
                    <motion.span
                      className="font-alta text-elegant-mocha/70 text-sm tracking-luxury hover:text-elegant-mocha transition-colors duration-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 1.3 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      0{index + 1}
                    </motion.span>
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-col items-center text-center w-full max-w-xs">
                    {/* Location Type with enhanced styling */}
                    <div className="mb-6 relative w-full">
                      <p className="font-alta text-xs uppercase tracking-luxury text-elegant-mocha/70 mb-4 w-full text-center hover:text-elegant-mocha transition-colors duration-500">
                        {location.type}
                      </p>
                      <motion.div 
                        className="h-[0.5px] bg-elegant-mocha/20 mx-auto hover:bg-elegant-mocha/50 transition-all duration-700 max-w-16"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ 
                          delay: 1.5 + index * 0.2, 
                          duration: 1, 
                          ease: LUXURY_EASING 
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                    
                    {/* Area with refined typography */}
                    <motion.h4
                      className="font-alice text-elegant-mocha font-medium mb-4 text-base sm:text-lg hover:text-elegant-mocha/90 transition-all duration-500 w-full text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ 
                        delay: 1.7 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      {location.area}
                    </motion.h4>
                    
                    {/* Detail */}
                    <motion.p
                      className="font-alta text-elegant-mocha/60 text-sm tracking-refined w-full text-center hover:text-elegant-mocha/80 transition-colors duration-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ 
                        delay: 1.9 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      {location.detail}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact Methods & Hours with refined layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Methods */}
          <div className="lg:col-span-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: LUXURY_EASING }}
                viewport={{ once: true }}
              >
                <h3 className="font-alice text-2xl text-elegant-mocha uppercase tracking-luxury mb-8">
                  Get In Touch
                </h3>
                <motion.div
                  className="h-[0.5px] bg-elegant-mocha/30 mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start gap-16 max-w-3xl mx-auto">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.id}
                  href={method.action}
                  className="flex-1 group block text-center relative flex flex-col items-center hover:scale-105 transition-transform duration-700"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.6 + index * 0.2, 
                    duration: 1, 
                    ease: LUXURY_EASING 
                  }}
                  viewport={{ once: true }}
                >
                  {/* Elegant floating frame */}
                  <div className="w-16 h-16 border border-elegant-mocha/20 group-hover:border-elegant-mocha/40 mb-8 flex items-center justify-center group-hover:shadow-lg transition-all duration-700 shrink-0">
                    <motion.div
                      className="w-2 h-2 bg-elegant-mocha/60 rounded-full group-hover:bg-elegant-mocha transition-colors duration-500"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.8 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="flex flex-col items-center text-center w-full max-w-xs">
                    {/* Method Type with enhanced styling */}
                    <div className="mb-6 relative w-full">
                      <p className="font-alta text-xs uppercase tracking-luxury text-elegant-mocha/70 mb-4 w-full text-center group-hover:text-elegant-mocha transition-colors duration-500">
                        {method.title}
                      </p>
                      <motion.div 
                        className="h-[0.5px] bg-elegant-mocha/20 mx-auto group-hover:bg-elegant-mocha/50 transition-all duration-700 max-w-16"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ 
                          delay: 1 + index * 0.2, 
                          duration: 1, 
                          ease: LUXURY_EASING 
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                    
                    {/* Contact Value with refined typography */}
                    <motion.p
                      className="font-alice text-elegant-mocha font-medium mb-4 text-base sm:text-lg group-hover:text-elegant-mocha/90 transition-all duration-500 w-full text-center break-words"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ 
                        delay: 1.2 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      {method.value}
                    </motion.p>
                    
                    {/* Description */}
                    <motion.p
                      className="font-alta text-elegant-mocha/60 text-sm tracking-refined w-full text-center group-hover:text-elegant-mocha/80 transition-colors duration-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ 
                        delay: 1.4 + index * 0.2, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      {method.description}
                    </motion.p>
                    
                    {/* Subtle hover indicator */}
                    <motion.div
                      className="mt-6 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <span className="font-alta text-xs text-elegant-mocha/70 tracking-luxury">
                        {method.title === 'Email' ? 'Click to send email' : 'Click to call'}
                      </span>
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Business Hours with enhanced presentation */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: LUXURY_EASING }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-16">
                <motion.h3
                  className="font-alice text-2xl text-elegant-mocha uppercase tracking-luxury mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                >
                  Studio Hours
                </motion.h3>
                <motion.div
                  className="h-[0.5px] bg-elegant-mocha/30 mx-auto"
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: LUXURY_EASING }}
                  viewport={{ once: true }}
                />
              </div>
              
              <div className="space-y-5 max-w-xs mx-auto">
                {businessHours.map((schedule, index) => {
                  const isToday = schedule.day === currentDay;
                  return (
                    <motion.div
                      key={schedule.day}
                      className={`flex justify-between items-center py-3 border-b border-elegant-mocha/8 last:border-b-0 group transition-all duration-500 ${
                        isToday 
                          ? 'bg-elegant-mocha/5 px-4 rounded-sm border-elegant-mocha/15' 
                          : ''
                      }`}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.6 + index * 0.08, 
                        duration: 0.8, 
                        ease: LUXURY_EASING 
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className={`font-alta text-sm tracking-refined transition-colors duration-500 ${
                          isToday 
                            ? 'text-elegant-mocha font-medium' 
                            : 'text-elegant-mocha/70'
                        }`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ 
                          delay: 0.8 + index * 0.08, 
                          duration: 0.6, 
                          ease: LUXURY_EASING 
                        }}
                        viewport={{ once: true }}
                      >
                        {schedule.day}
                        {isToday && (
                          <motion.span 
                            className="ml-2 text-xs opacity-70"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                          >
                            • Today
                          </motion.span>
                        )}
                      </motion.span>
                      <motion.span
                        className={`font-alta text-sm font-medium transition-colors duration-500 ${
                          isToday 
                            ? 'text-elegant-mocha' 
                            : 'text-elegant-mocha'
                        }`}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ 
                          delay: 1 + index * 0.08, 
                          duration: 0.6, 
                          ease: LUXURY_EASING 
                        }}
                        viewport={{ once: true }}
                      >
                        {schedule.hours}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Media - Redesigned for clarity and better UX */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: LUXURY_EASING }}
          viewport={{ once: true }}
        >
          <div className="mb-16">
            <h3 className="font-alice text-2xl text-elegant-mocha uppercase tracking-luxury mb-8">
              Follow Our Journey
            </h3>
            <motion.div
              className="h-[0.5px] bg-elegant-mocha/30 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, ease: LUXURY_EASING }}
              viewport={{ once: true }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center max-w-2xl mx-auto">
            {[
              { 
                platform: 'Instagram', 
                handle: '@faceframe_beauty',
                url: 'https://www.instagram.com/faceframe_beauty',
                cta: 'Follow on Instagram'
              },
              { 
                platform: 'Facebook', 
                handle: 'FaceFrameBeauty',
                url: 'https://www.facebook.com/FaceFrameBeauty',
                cta: 'Follow on Facebook'
              }
            ].map((social, index) => (
              <motion.div
                key={social.platform}
                className="flex-1 w-full max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6, 
                  ease: LUXURY_EASING 
                }}
                viewport={{ once: true }}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full"
                >
                  {/* Main clickable area */}
                  <div className="bg-elegant-mocha text-white p-8 transition-all duration-500 group-hover:bg-elegant-mocha/90 relative overflow-hidden cursor-pointer">
                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-white/5"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5, ease: LUXURY_EASING }}
                    />
                    
                    <div className="relative z-10 text-center">
                      {/* Platform name */}
                      <p className="font-alta text-sm uppercase tracking-luxury mb-2 opacity-90">
                        {social.platform}
                      </p>
                      
                      {/* Handle */}
                      <p className="font-alice text-lg mb-4 tracking-refined">
                        {social.handle}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                        <span className="font-alta text-xs uppercase tracking-luxury opacity-80">
                          {social.cta}
                        </span>
                        <motion.span
                          className="text-xs opacity-60"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom accent */}
                  <motion.div
                    className="h-1 bg-elegant-mocha/20 group-hover:bg-elegant-mocha/40 transition-all duration-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ 
                      delay: 0.3 + index * 0.1, 
                      duration: 0.8, 
                      ease: LUXURY_EASING 
                    }}
                    viewport={{ once: true }}
                  />
                </a>
              </motion.div>
            ))}
          </div>
          
          {/* Additional context */}
          <motion.p
            className="font-alta text-elegant-mocha/60 text-sm mt-12 max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: LUXURY_EASING }}
            viewport={{ once: true }}
          >
            Stay connected for the latest transformations, beauty tips, and behind-the-scenes content.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernContactInfo;