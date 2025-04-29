import { Testimonial } from "../types";
import testimonialData from "../data/testimonials.json";

/**
 * Service for fetching and filtering testimonial data
 */
export class TestimonialService {
  private testimonials: Testimonial[];

  constructor() {
    // Type assertion to handle JSON import
    this.testimonials = testimonialData as Testimonial[];
  }

  /**
   * Get all testimonials
   */
  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  /**
   * Get a testimonial by ID
   */
  async getTestimonialById(id: string): Promise<Testimonial | null> {
    const testimonial = this.testimonials.find((t) => t.id === id);
    return testimonial || null;
  }

  /**
   * Get testimonials by service type
   */
  async getTestimonialsByServiceType(
    serviceType: string
  ): Promise<Testimonial[]> {
    return this.testimonials.filter(
      (t) => t.service_type.toLowerCase() === serviceType.toLowerCase()
    );
  }

  /**
   * Get featured testimonials
   */
  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return this.testimonials.filter((t) => t.featured);
  }

  /**
   * Get random testimonials
   * @param count Number of random testimonials to return
   */
  async getRandomTestimonials(count: number): Promise<Testimonial[]> {
    // Create a copy of the testimonials array to avoid modifying the original
    const shuffled = [...this.testimonials];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'count' testimonials
    return shuffled.slice(0, count);
  }

  /**
   * Get testimonials by rating
   * @param rating Minimum rating to filter by (1-5)
   */
  async getTestimonialsByMinRating(rating: number): Promise<Testimonial[]> {
    return this.testimonials.filter((t) => (t.rating || 0) >= rating);
  }
}

// Create a singleton instance
const testimonialService = new TestimonialService();
export default testimonialService;
