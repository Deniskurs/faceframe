"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactCompareSlider } from "react-compare-slider";
import { useInView } from "react-intersection-observer";
import { LUXURY_EASING } from "../home/services/core/types";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  /** Initial divider position 0–100 (default 50). */
  initialPosition?: number;
  /** Container aspect ratio (e.g. "1616 / 640"). Takes precedence over `height`. */
  aspectRatio?: "1:1" | "4:3" | "16:9" | "auto" | (string & {});
  /** Optional override applied below the `md` breakpoint (768 px). Use a taller
   *  ratio here when the native ratio is panoramic and squashes on phones. */
  mobileAspectRatio?: string;
  /** Fallback container height in px when no `aspectRatio` is provided. */
  height?: number;
  className?: string;
  /** Editorial chip rendered top-left (e.g. "BROWS"). */
  categoryLabel?: string;
  /** Bottom-right "Real Client Result" badge. */
  showClientResult?: boolean;
  clientResultText?: string;
  /** Eagerly load images. Use for the first/above-the-fold slider only. */
  priority?: boolean;
  /** Show the "Drag to Compare" hint shortly after the slider enters the viewport. */
  showInteractionHint?: boolean;
}

const CUBIC_BEZIER = `cubic-bezier(${LUXURY_EASING.join(",")})`;
const HINT_DELAY_MS = 1400;
const HINT_VISIBLE_MS = 3000;

function resolveAspectRatio(value: BeforeAfterSliderProps["aspectRatio"]) {
  switch (value) {
    case undefined:
    case "auto":
      return null;
    case "1:1":
      return "1 / 1";
    case "4:3":
      return "4 / 3";
    case "16:9":
      return "16 / 9";
    default:
      return value.replace(":", " / ");
  }
}

// Parse an aspect ratio string into numeric width/height (used as the Image
// component's intrinsic dimensions for srcset generation — the actual on-screen
// size is driven by CSS `width: 100%; height: 100%`).
function parseDimensions(
  value: BeforeAfterSliderProps["aspectRatio"]
): { width: number; height: number } {
  if (!value || value === "auto") return { width: 1600, height: 1200 };
  if (value === "1:1") return { width: 1200, height: 1200 };
  if (value === "4:3") return { width: 1600, height: 1200 };
  if (value === "16:9") return { width: 1600, height: 900 };
  const parts = value.split(/\s*[/:]\s*/).map(Number);
  if (parts.length === 2 && parts.every((n) => Number.isFinite(n) && n > 0)) {
    return { width: parts[0], height: parts[1] };
  }
  return { width: 1600, height: 1200 };
}

function NextImageSlot({
  src,
  alt,
  width,
  height,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1100px"
      draggable={false}
      priority={priority}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        objectFit: "cover",
        objectPosition: "center center",
        userSelect: "none",
      }}
    />
  );
}

function SliderHandle() {
  // The library renders this inside its handle-root, which has `pointer-events: none`.
  // We must restore `pointer-events: auto` on the line + circle so they are the
  // interactive targets on touch devices (where `onlyHandleDraggable` defaults to `true`).
  return (
    <div className="relative h-full w-[44px] md:w-[56px] flex items-center justify-center">
      {/* Full-height divider line — also part of the touch target */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] md:w-[2px] bg-white shadow-[0_0_6px_rgba(0,0,0,0.25)]"
        style={{ pointerEvents: "auto", touchAction: "none" }}
      />
      {/* Grab handle circle — smaller on mobile so it stays proportional */}
      <div
        className="relative w-9 h-9 md:w-11 md:h-11 rounded-full bg-white flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.22)]"
        style={{ pointerEvents: "auto", touchAction: "none" }}
      >
        <div className="flex flex-col gap-[2.5px] md:gap-[3px] w-[10px] md:w-3">
          <div className="h-[1.5px] w-full bg-elegant-mocha/80 rounded-full" />
          <div className="h-[1.5px] w-full bg-elegant-mocha/80 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function CategoryLabel({ label }: { label: string }) {
  return (
    <motion.div
      className="absolute top-[20px] left-[20px] md:top-[36px] md:left-[36px] z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-0 -m-1 bg-gradient-to-r from-black/50 to-transparent blur-[3px] rounded-sm" />
        <p className="relative font-alta text-[11px] tracking-[0.25em] uppercase text-white/95 px-2 py-1">
          {label}
        </p>
        <motion.div
          className="absolute bottom-[-4px] left-0 h-[0.5px] bg-white/40"
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
      </div>
    </motion.div>
  );
}

function ClientResultBadge({ label }: { label: string }) {
  return (
    <motion.div
      className="absolute bottom-[20px] right-[20px] md:bottom-[36px] md:right-[36px] z-30 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="relative px-2 py-1">
        <div className="absolute inset-0 -m-1 bg-gradient-to-l from-black/50 to-transparent blur-[3px] rounded-sm" />
        <div className="relative flex items-baseline">
          <div className="w-[10px] h-[0.5px] bg-white/60 self-center mr-2" />
          <span
            className="font-alta text-[10px] tracking-[0.2em] uppercase text-white/90 inline-block leading-[0.95]"
            style={{ transform: "translateY(-0.5px)" }}
          >
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function DragHint({ position }: { position: number }) {
  return (
    <motion.div
      className="absolute top-1/2 pointer-events-none z-20"
      style={{ left: `${position}%`, transform: "translate(-50%, -130%)" }}
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.5, ease: LUXURY_EASING }}
    >
      <div className="relative px-4 py-2 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-md">
        <div className="absolute inset-0 border border-elegant-mocha/10 rounded-sm" />
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-1 mr-2">
            <div className="w-[3px] h-[3px] bg-elegant-mocha/40 rounded-full" />
            <div className="w-[6px] h-[1px] bg-elegant-mocha/60" />
            <div className="w-[3px] h-[3px] bg-elegant-mocha/40 rounded-full" />
          </div>
          <span className="font-alta text-[10px] tracking-[0.15em] uppercase text-elegant-mocha/80 leading-none whitespace-nowrap">
            Drag to Compare
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  initialPosition = 50,
  aspectRatio,
  mobileAspectRatio,
  height = 400,
  className = "",
  categoryLabel,
  showClientResult = false,
  clientResultText = "Real Client Result",
  priority = false,
  showInteractionHint = true,
}: BeforeAfterSliderProps) {
  const [hintVisible, setHintVisible] = useState(false);
  const hasInteractedRef = useRef(false);
  const reactId = useId();
  const scopeId = `bas-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.35,
    triggerOnce: true,
  });

  // Show "Drag to Compare" hint shortly after scrolling into view; auto-hide after a few seconds
  useEffect(() => {
    if (!showInteractionHint || !inView || hasInteractedRef.current) return;

    const showTimer = setTimeout(() => {
      if (!hasInteractedRef.current) setHintVisible(true);
    }, HINT_DELAY_MS);
    const hideTimer = setTimeout(() => {
      setHintVisible(false);
    }, HINT_DELAY_MS + HINT_VISIBLE_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [inView, showInteractionHint]);

  const handlePositionChange = () => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      setHintVisible(false);
    }
  };

  const resolvedRatio = resolveAspectRatio(aspectRatio);
  const containerStyle: React.CSSProperties = resolvedRatio
    ? { aspectRatio: resolvedRatio }
    : { height: `${height}px` };
  const imageDims = parseDimensions(aspectRatio);

  const mobileRatio = mobileAspectRatio?.replace(":", " / ");

  return (
    <motion.div
      ref={inViewRef}
      data-bas={scopeId}
      className={`relative select-none overflow-hidden shadow-lg ${className}`}
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: LUXURY_EASING }}
    >
      {mobileRatio && (
        <style>{`@media (max-width: 767px){[data-bas="${scopeId}"]{aspect-ratio:${mobileRatio};height:auto;}}`}</style>
      )}
      <ReactCompareSlider
        defaultPosition={initialPosition}
        onPositionChange={handlePositionChange}
        transition={`0.25s ${CUBIC_BEZIER}`}
        keyboardIncrement="5%"
        handle={<SliderHandle />}
        itemOne={
          <NextImageSlot
            src={beforeImage}
            alt={`Before: ${alt}`}
            width={imageDims.width}
            height={imageDims.height}
            priority={priority}
          />
        }
        itemTwo={
          <NextImageSlot
            src={afterImage}
            alt={`After: ${alt}`}
            width={imageDims.width}
            height={imageDims.height}
            priority={priority}
          />
        }
        style={{ width: "100%", height: "100%" }}
      />

      {categoryLabel && <CategoryLabel label={categoryLabel} />}
      {showClientResult && <ClientResultBadge label={clientResultText} />}

      <AnimatePresence>
        {hintVisible && <DragHint position={initialPosition} />}
      </AnimatePresence>
    </motion.div>
  );
}
