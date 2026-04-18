// Utility file 'buildWhatsAppMessage'. Provides a reusable helper function for the application.
import type { CheckoutFormValues, OrderItem } from "@/types/order";
import { calculateOrderTotal } from "./calculateOrderTotal";

type BuildWhatsAppMessageParams = {
  customer: CheckoutFormValues;
  items: OrderItem[];
  messages: {
    template: string;
    itemTemplate: string;
  };
};

export function buildWhatsAppMessage({
  customer,
  items,
  messages,
}: BuildWhatsAppMessageParams): string {
  const total = calculateOrderTotal(items);

  const itemsText = items
    .map((item, index) =>
      messages.itemTemplate
        .replace("{index}", String(index + 1))
        .replace("{title}", item.title)
        .replace("{quantity}", String(item.quantity))
        .replace("{unit}", item.unit)
        .replace("{price}", String(item.price)),
    )
    .join("\n");

  return messages.template
    .replace("{name}", customer.name)
    .replace("{phone}", customer.phone)
    .replace("{items}", itemsText)
    .replace("{total}", String(total));
}
