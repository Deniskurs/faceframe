import { GalleryItem } from "../types";
import galleryData from "../data/gallery.json";

/**
 * Service for fetching and filtering gallery data
 */
export class GalleryService {
  private galleryItems: GalleryItem[];

  constructor() {
    // Type assertion to handle JSON import
    this.galleryItems = galleryData as GalleryItem[];
  }

  /**
   * Get all gallery items
   */
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return this.galleryItems;
  }

  /**
   * Get a gallery item by ID
   */
  async getGalleryItemById(id: string): Promise<GalleryItem | null> {
    const item = this.galleryItems.find((g) => g.id === id);
    return item || null;
  }

  /**
   * Get gallery items by category
   */
  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return this.galleryItems.filter(
      (g) => g.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get featured gallery items for homepage
   */
  async getFeaturedGalleryItems(): Promise<GalleryItem[]> {
    return this.galleryItems.filter((g) => g.featured);
  }

  /**
   * Get gallery items related to a specific service
   */
  async getGalleryItemsByServiceId(serviceId: string): Promise<GalleryItem[]> {
    return this.galleryItems.filter((g) => g.serviceId === serviceId);
  }

  /**
   * Get all gallery categories with counts
   */
  async getCategories(): Promise<{ name: string; count: number }[]> {
    const categories: { name: string; count: number }[] = [];
    const categoryCounts = new Map<string, number>();

    // Count gallery items in each category
    this.galleryItems.forEach((item) => {
      const count = categoryCounts.get(item.category) || 0;
      categoryCounts.set(item.category, count + 1);
    });

    // Create category objects
    for (const [categoryName, count] of categoryCounts.entries()) {
      categories.push({
        name: categoryName,
        count,
      });
    }

    return categories;
  }

  /**
   * Get a subset of gallery items with pagination
   */
  async getPaginatedGalleryItems(
    page: number = 1,
    pageSize: number = 9
  ): Promise<{
    items: GalleryItem[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = this.galleryItems.slice(startIndex, endIndex);
    const total = this.galleryItems.length;
    const totalPages = Math.ceil(total / pageSize);

    return {
      items,
      total,
      totalPages,
      currentPage: page,
    };
  }
}

// Create a singleton instance
const galleryService = new GalleryService();
export default galleryService;
