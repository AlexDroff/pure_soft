// Utility file 'calculateOrderTotal'. Provides a reusable helper function for the application.
import type { OrderItem } from "@/types/order";

export function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}
