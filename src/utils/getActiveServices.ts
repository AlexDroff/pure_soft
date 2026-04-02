// Utility file 'getActiveServices'. Provides a reusable helper function for the application.
import type { Service } from "@/types/service";

export function getActiveServices(services: Service[]): Service[] {
  return services.filter((service) => service.isActive);
}
