import { Service, ServiceCategory } from "../types";
import servicesData from "../data/services.json";

/**
 * Service for fetching and filtering services data
 */
export class ServiceService {
  private services: Service[];

  constructor() {
    // Type assertion to handle JSON import
    this.services = servicesData as Service[];
  }

  /**
   * Get all services
   */
  async getServices(): Promise<Service[]> {
    return this.services;
  }

  /**
   * Get a service by ID
   */
  async getServiceById(id: string): Promise<Service | null> {
    const service = this.services.find((s) => s.id === id);
    return service || null;
  }

  /**
   * Get services by category
   */
  async getServicesByCategory(category: ServiceCategory): Promise<Service[]> {
    return this.services.filter((s) => s.category === category);
  }

  /**
   * Get featured services
   */
  async getFeaturedServices(): Promise<Service[]> {
    return this.services.filter((s) => s.featured);
  }

  /**
   * Get services grouped by category
   */
  async getServicesByCategories(): Promise<Record<ServiceCategory, Service[]>> {
    const result: Partial<Record<ServiceCategory, Service[]>> = {};

    // Group services by category
    this.services.forEach((service) => {
      if (!result[service.category]) {
        result[service.category] = [];
      }
      result[service.category]?.push(service);
    });

    return result as Record<ServiceCategory, Service[]>;
  }

  /**
   * Get all service categories with counts
   */
  async getCategories(): Promise<
    { id: ServiceCategory; name: string; count: number }[]
  > {
    const categories: { id: ServiceCategory; name: string; count: number }[] =
      [];
    const categoryCounts = new Map<ServiceCategory, number>();

    // Count services in each category
    this.services.forEach((service) => {
      const count = categoryCounts.get(service.category) || 0;
      categoryCounts.set(service.category, count + 1);
    });

    // Create category objects
    for (const [categoryId, count] of categoryCounts.entries()) {
      // Find the first service with this category to get the category name
      const service = this.services.find((s) => s.category === categoryId);
      if (service) {
        categories.push({
          id: categoryId,
          name: service.categoryName,
          count,
        });
      }
    }

    return categories;
  }
}

// Create a singleton instance
const serviceService = new ServiceService();
export default serviceService;
