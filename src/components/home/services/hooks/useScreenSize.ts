import { useState, useEffect } from "react";

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("lg");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return {
    screenSize,
    isCarouselView: screenSize === "sm" || screenSize === "md",
  };
}
