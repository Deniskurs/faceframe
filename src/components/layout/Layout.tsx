"use client";

import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import useSmoothScroll from "@/utils/animations/useSmoothScroll";
import { Toaster } from "@/components/ui/toaster";

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
      <Header />

      <main className="flex-grow pt-[70px] md:pt-[80px]">{children}</main>

      <Footer />

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Layout;
