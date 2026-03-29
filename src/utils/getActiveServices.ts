import type { Service } from "@/types/service";

export function getActiveServices(services: Service[]): Service[] {
  return services.filter((service) => service.isActive);
}
