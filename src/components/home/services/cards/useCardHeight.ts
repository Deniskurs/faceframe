"use client";

/**
 * @file Card Height Equalization Hook
 * Provides functionality to ensure consistent card heights
 */

import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Interface for card height hook parameters
 */
interface UseCardHeightProps {
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>;
  enabled?: boolean;
  minHeight?: number;
  equalizeOnMount?: boolean;
  equalizeOnResize?: boolean;
}

/**
 * Hook to handle card height equalization across multiple cards
 * Uses ResizeObserver to dynamically adjust heights when content changes
 */
export function useCardHeight({
  containerRef,
  enabled = true,
  minHeight = 450,
  equalizeOnMount = true,
  equalizeOnResize = true,
}: UseCardHeightProps) {
  const [cardHeight, setCardHeight] = useState<number>(minHeight);
  const cardRefs = useRef<Set<HTMLElement>>(new Set());
  const isProcessingRef = useRef<boolean>(false);

  // Function to register a card element for height equalization
  const registerCard = (element: HTMLElement | null) => {
    if (!element || !enabled) return;

    cardRefs.current.add(element);
    equalizeHeights();

    return () => {
      cardRefs.current.delete(element);
      equalizeHeights();
    };
  };

  // Calculate and apply the maximum height across all cards
  const equalizeHeights = () => {
    if (!enabled || isProcessingRef.current || cardRefs.current.size === 0)
      return;

    isProcessingRef.current = true;

    // Use requestAnimationFrame to ensure DOM measurements are accurate
    requestAnimationFrame(() => {
      try {
        let maxHeight = minHeight;

        // Reset all heights to auto first to get true content height
        cardRefs.current.forEach((card) => {
          card.style.height = "auto";
        });

        // Calculate max natural height
        cardRefs.current.forEach((card) => {
          const naturalHeight = card.scrollHeight;
          maxHeight = Math.max(maxHeight, naturalHeight);
        });

        // Apply the max height to all cards
        cardRefs.current.forEach((card) => {
          card.style.height = `${maxHeight}px`;
        });

        setCardHeight(maxHeight);
      } finally {
        isProcessingRef.current = false;
      }
    });
  };

  // Observe container resize events
  const [containerSize] = useResizeObserver(containerRef);

  // Equalize heights on mount, resize, or when cards change
  useEffect(() => {
    if (!enabled) return;

    if (equalizeOnMount) {
      equalizeHeights();
    }
  }, [enabled, equalizeOnMount]);

  // Equalize heights when container size changes
  useEffect(() => {
    if (!enabled || !equalizeOnResize) return;

    equalizeHeights();
  }, [containerSize, enabled, equalizeOnResize]);

  return {
    cardHeight,
    registerCard,
    equalizeHeights,
  };
}

/**
 * Simple implementation of a resize observer hook
 * Can be moved to a shared location if needed
 */
function useResizeObserver(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let resizeObserver: ResizeObserver;

    try {
      resizeObserver = new ResizeObserver((entries) => {
        if (!entries.length) return;

        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });

      resizeObserver.observe(element);
    } catch (error) {
      console.error("ResizeObserver error:", error);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [ref]);

  return [size, setSize] as const;
}
