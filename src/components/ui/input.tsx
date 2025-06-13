"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disableHoverEffect?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disableHoverEffect = false, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    // If hover effect is disabled, render just the input with minimal wrapper
    if (disableHoverEffect) {
      return (
        <input
          type={type}
          className={cn(
            // Minimal default styles, let parent control everything
            `w-full border-none bg-transparent outline-none transition-all duration-400 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      );
    }

    // Check if this input is being used in a transparent/custom-styled context
    const isTransparentStyle =
      className?.includes("bg-transparent") || className?.includes("border-b");

    if (isTransparentStyle) {
      // For transparent inputs (like contact form), just add a subtle hover border effect
      return (
        <motion.div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          {/* Animated border overlay - only shows on hover */}
          <motion.div
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${
                    visible ? radius + "px" : "0px"
                  } circle at ${mouseX}px ${mouseY}px,
                  #7F5539,
                  transparent 80%
                )
              `,
            }}
            className="absolute inset-0 rounded-lg opacity-20 pointer-events-none transition-opacity duration-300"
          />

          <input
            type={type}
            className={cn(
              // Minimal styles for transparent inputs
              `relative z-10 w-full border-none bg-transparent outline-none transition-all duration-400 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            ref={ref}
            {...props}
          />
        </motion.div>
      );
    }

    // Original border-only hover effect for regular styled inputs
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + "px" : "0px"
              } circle at ${mouseX}px ${mouseY}px,
              #7F5539,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            // Solid background to create border-only effect
            `shadow-input flex h-10 w-full rounded-[calc(0.5rem-2px)] border-none bg-white px-3 py-2 text-sm text-elegant-mocha transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-sand/60 focus-visible:ring-[2px] focus-visible:ring-elegant-mocha focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            // Dark mode styles
            `dark:bg-zinc-800 dark:text-white dark:placeholder:text-neutral-600 dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-warm-beige`,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
