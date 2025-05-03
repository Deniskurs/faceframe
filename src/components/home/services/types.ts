// Service data interface
export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  featured: string;
  exclusivity: string;
  result: string;
}

// Animation constants
export const LUXURY_EASING = [0.19, 1, 0.22, 1] as const;

// Featured services data
export const FEATURED_CATEGORIES: ServiceCategory[] = [
  {
    id: "semi-permanent-makeup",
    title: "Artistry",
    subtitle: "Semi-Permanent Makeup",
    description:
      "Precision techniques that enhance your natural beauty with lasting elegance",
    imageUrl: "/images/gallery/image1.webp",
    featured: "Signature Brows",
    exclusivity: "Custom-developed technique",
    result: "Natural, elegant definition",
  },
  {
    id: "lashes-brows",
    title: "Frame",
    subtitle: "Lashes & Brows",
    description:
      "Expert enhancements that define your features with subtle sophistication",
    imageUrl: "/images/gallery/image4.webp",
    featured: "Volume Lashes",
    exclusivity: "Premium application method",
    result: "Striking yet natural effect",
  },
  {
    id: "facials",
    title: "Renewal",
    subtitle: "Luxury Facials",
    description:
      "Transformative treatments that reveal your skin's natural radiance",
    imageUrl: "/images/gallery/image16.webp",
    featured: "Million Dollar Facial",
    exclusivity: "Curated premium experience",
    result: "Radiant transformation",
  },
];
