import { FAQ } from "../types";
import faqData from "../data/faqs.json";

/**
 * Service for fetching and filtering FAQ data
 */
export class FAQService {
  private faqs: FAQ[];

  constructor() {
    // Type assertion to handle JSON import
    this.faqs = faqData as FAQ[];
  }

  /**
   * Get all FAQs
   */
  async getAllFAQs(): Promise<FAQ[]> {
    return this.faqs;
  }

  /**
   * Get a FAQ by ID
   */
  async getFAQById(id: string): Promise<FAQ | null> {
    const faq = this.faqs.find((f) => f.id === id);
    return faq || null;
  }

  /**
   * Get FAQs by category
   */
  async getFAQsByCategory(category: string): Promise<FAQ[]> {
    return this.faqs.filter(
      (f) => f.category?.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get featured FAQs for homepage
   */
  async getFeaturedFAQs(): Promise<FAQ[]> {
    return this.faqs.filter((f) => f.featured);
  }

  /**
   * Get FAQs grouped by category
   */
  async getFAQsByCategories(): Promise<Record<string, FAQ[]>> {
    const result: Record<string, FAQ[]> = {};

    // Group FAQs by category
    this.faqs.forEach((faq) => {
      const category = faq.category || "general";
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(faq);
    });

    return result;
  }

  /**
   * Search FAQs by keyword
   */
  async searchFAQs(query: string): Promise<FAQ[]> {
    const searchTerms = query.toLowerCase().split(" ");

    return this.faqs.filter((faq) => {
      const questionLower = faq.question.toLowerCase();
      const answerLower = faq.answer.toLowerCase();

      // Check if any search term is included in question or answer
      return searchTerms.some(
        (term) => questionLower.includes(term) || answerLower.includes(term)
      );
    });
  }
}

// Create a singleton instance
const faqService = new FAQService();
export default faqService;
