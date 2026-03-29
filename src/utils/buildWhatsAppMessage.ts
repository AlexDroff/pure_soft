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
      return `${index + 1}. ${item.title} — ${item.quantity} ${item.unit} × ${item.price} zł`;
    })
    .join("\n");

  return `Доброго дня! Хочу оформити замовлення.

Ім’я: ${customer.name}
Телефон: ${customer.phone}

Послуги:
${itemsText}

Загальна сума: ${total} zł`;
}
