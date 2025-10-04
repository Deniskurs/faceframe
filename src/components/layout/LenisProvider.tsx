"use client";

import { useEffect } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    let resizeTimeout: NodeJS.Timeout | null = null;

    // Handle window resize - stop Lenis during resize to prevent jumping
    const handleResize = () => {
      lenis.stop();

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      // Resume Lenis after resize has settled (300ms debounce)
      resizeTimeout = setTimeout(() => {
        lenis.start();
      }, 300);
    };

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      lenis.destroy();
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  return <>{children}</>;
}
