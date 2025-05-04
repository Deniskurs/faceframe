"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgressIndicator from "../shared/ScrollProgressIndicator";
import CursorEffect from "../shared/CursorEffect";
import useSmoothScroll from "@/utils/animations/useSmoothScroll";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Initialize smooth scrolling
  useSmoothScroll({ offset: 80 });

  // Add page transition effect
  useEffect(() => {
    // Add a class to the body when the page loads for page-level animations
    document.body.classList.add("page-loaded");

    return () => {
      document.body.classList.remove("page-loaded");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Premium custom cursor */}
      <CursorEffect
        color="#7F5539"
        backgroundColor="rgba(127, 85, 57, 0.05)"
        size={26}
      />

      {/* Scroll progress indicator */}
      <ScrollProgressIndicator color="#7F5539" height={3} position="top" />

      <Header />

      <main className="flex-grow pt-20">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
