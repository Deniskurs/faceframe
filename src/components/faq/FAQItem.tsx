"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_EASING } from "@/utils/animations/luxuryAnimations";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isInitiallyOpen?: boolean;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  id,
  question,
  answer,
  isInitiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleOpen();
    }
  };

  return (
    <motion.div
      className="border-b border-elegant-mocha/10 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: LUXURY_EASING }}
    >
      <button
        className="w-full py-6 text-left focus:outline-none focus:ring-2 focus:ring-elegant-mocha/20 focus:ring-offset-2 group"
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        type="button"
      >
        <div className="flex justify-between items-start">
          <h3 className="font-alice text-lg sm:text-xl text-elegant-mocha pr-6 group-hover:text-deep-bronze transition-colors duration-300">
            {question}
          </h3>
          <motion.div
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: LUXURY_EASING }}
          >
            <div className="relative w-4 h-4">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-elegant-mocha/60 transform -translate-y-1/2" />
              {/* Vertical line */}
              <motion.div
                className="absolute left-1/2 top-0 w-[1px] h-full bg-elegant-mocha/60 transform -translate-x-1/2"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: LUXURY_EASING }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12">
              <p className="font-alta text-elegant-mocha/80 leading-relaxed text-sm sm:text-base">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
