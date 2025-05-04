import React from "react";
import { motion } from "framer-motion";
import { LUXURY_EASING } from "../core/types";

type DotButtonProps = {
  onClick: () => void;
  isSelected: boolean;
  variant?: "standard" | "luxury" | "minimal";
};

/**
 * Premium Carousel Dot Button Component
 * Inspired by Chanel and Dior's minimalist carousel indicators
 */
export const EmblaDotsButton: React.FC<DotButtonProps> = ({
  onClick,
  isSelected,
  variant = "luxury",
}) => {
  // Define variants with precise, luxury styling
  const variants = {
    standard: {
      active: {
        width: "40px",
        height: "1.5px", 
        opacity: 1,
        backgroundColor: "rgba(127, 85, 57, 0.6)"
      },
      inactive: {
        width: "20px",
        height: "1.5px", 
        opacity: 0.3,
        backgroundColor: "rgba(127, 85, 57, 0.3)"
      },
      hover: {
        width: "28px",
        opacity: 0.5,
        backgroundColor: "rgba(127, 85, 57, 0.4)"
      }
    },
    luxury: {
      active: {
        width: "28px", 
        height: "1.25px",
        opacity: 1,
        backgroundColor: "rgba(127, 85, 57, 0.5)"
      },
      inactive: {
        width: "12px", 
        height: "1.25px",
        opacity: 0.4,
        backgroundColor: "rgba(127, 85, 57, 0.2)"
      },
      hover: {
        width: "18px",
        opacity: 0.6,
        backgroundColor: "rgba(127, 85, 57, 0.3)"
      }
    },
    minimal: {
      active: {
        width: "24px", 
        height: "1px",
        opacity: 0.9,
        backgroundColor: "rgba(127, 85, 57, 0.4)"
      },
      inactive: {
        width: "10px", 
        height: "1px",
        opacity: 0.3,
        backgroundColor: "rgba(127, 85, 57, 0.15)"
      },
      hover: {
        width: "16px",
        opacity: 0.5,
        backgroundColor: "rgba(127, 85, 57, 0.25)"
      }
    }
  };

  // Select the appropriate styling based on variant
  const currentStyle = variants[variant];

  return (
    <button
      className="group p-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-elegant-mocha/20"
      onClick={onClick}
      type="button"
      aria-label={isSelected ? "Selected slide" : "Go to slide"}
    >
      <motion.div
        initial={isSelected ? currentStyle.active : currentStyle.inactive}
        animate={isSelected ? currentStyle.active : currentStyle.inactive}
        whileHover={isSelected ? currentStyle.active : currentStyle.hover}
        transition={{ 
          duration: 0.8, 
          ease: LUXURY_EASING 
        }}
        style={{
          transformOrigin: "center",
        }}
      />
    </button>
  );
};
