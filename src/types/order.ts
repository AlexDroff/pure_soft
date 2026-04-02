// Type definition file 'order'. Declares TypeScript contracts for data and module interaction.
import type { Id } from "./common";

export type OrderItem = {
  serviceId: Id;
  title: string;
  price: number;
  quantity: number;
  unit: string;
};

export type CheckoutFormValues = {
  name: string;
  phone: string;
};
