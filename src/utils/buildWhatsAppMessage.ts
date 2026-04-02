// Utility file 'buildWhatsAppMessage'. Provides a reusable helper function for the application.
import type { CheckoutFormValues, OrderItem } from "@/types/order";
import { calculateOrderTotal } from "./calculateOrderTotal";

type BuildWhatsAppMessageParams = {
  customer: CheckoutFormValues;
  items: OrderItem[];
};

export function buildWhatsAppMessage({
  customer,
  items,
}: BuildWhatsAppMessageParams): string {
  const total = calculateOrderTotal(items);

  const itemsText = items
    .map((item, index) => {
      return `${index + 1}. ${item.title} - ${item.quantity} ${item.unit} x ${item.price} €`;
    })
    .join("\n");

  return `Hola, quiero hacer un pedido.

Nombre: ${customer.name}
Teléfono: ${customer.phone}

Servicios:
${itemsText}

Total: ${total} €`;
}
