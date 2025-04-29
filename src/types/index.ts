// Type definitions for FaceFrame Beauty website

// Service related types
export type ServiceCategory =
  | "semi-permanent-makeup"
  | "lashes-brows"
  | "facials"
  | "waxing";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: ServiceCategory;
  categoryName: string; // Human-readable category name
  featured: boolean;
  imageUrl: string;
  duration?: string; // Optional duration field
  bookingUrl?: string; // Optional direct booking URL
}

// Testimonial related types
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  date: string;
  service_type: string;
  featured: boolean;
  rating?: number; // Optional star rating (1-5)
}

// FAQ related types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string; // Optional category for sorting/filtering
  featured: boolean; // Whether to show on homepage
}

// Gallery item types
export interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  alt: string;
  category: string;
  featured: boolean;
  serviceId?: string; // Optional link to corresponding service
}

// Contact form data
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  serviceInterest?: string;
  gdprConsent: boolean;
  marketingConsent?: boolean;
}

// SEO metadata
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}
