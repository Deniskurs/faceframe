"use client";

import { useEffect } from "react";

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
  selector?: string;
}

/**
 * A custom hook for smooth scrolling
 *
 * @param options - Configuration options for smooth scrolling
 */
export default function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const {
    offset = 80, // Default offset for header height
    behavior = "smooth",
    selector = 'a[href^="#"]', // Default to all internal anchor links
  } = options;

  useEffect(() => {
    // Function to handle smooth scrolling when clicking on links
    const handleLinkClick = (e: MouseEvent) => {
      // Check if the clicked element is an anchor link
      const target = (e.target as HTMLElement).closest(selector);

      if (!target) return;

      // Cast target to HTMLAnchorElement for type safety
      const anchor = target as HTMLAnchorElement;

      // Check if the link is an internal anchor link
      if (
        anchor.pathname === window.location.pathname &&
        anchor.hash.length > 1
      ) {
        e.preventDefault();

        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior,
          });
        }
      }
    };

    // Add event listener to document
    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [offset, behavior, selector]);

  // Function to programmatically scroll to an element
  const scrollTo = (elementId: string) => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  };

  return { scrollTo, scrollToTop };
}
