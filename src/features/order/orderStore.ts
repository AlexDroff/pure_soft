import { create } from "zustand";
import type { OrderItem } from "@/types/order";
import type { Service } from "@/types/service";
import { calculateOrderTotal } from "@/utils/calculateOrderTotal";

type OrderStore = {
  items: OrderItem[];
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  increaseQuantity: (serviceId: string) => void;
  decreaseQuantity: (serviceId: string) => void;
  clearOrder: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  items: [],

  addItem: (service) => {
    const existingItem = get().items.find(
      (item) => item.serviceId === service.id,
    );

    if (existingItem) {
      set((state) => ({
        items: state.items.map((item) =>
          item.serviceId === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }));
      return;
    }

    set((state) => ({
      items: [
        ...state.items,
        {
          serviceId: service.id,
          title: service.title,
          price: service.price,
          quantity: 1,
          unit: service.unit,
        },
      ],
    }));
  },

  removeItem: (serviceId) => {
    set((state) => ({
      items: state.items.filter((item) => item.serviceId !== serviceId),
    }));
  },

  increaseQuantity: (serviceId) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.serviceId === serviceId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    }));
  },

  decreaseQuantity: (serviceId) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.serviceId === serviceId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  clearOrder: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return calculateOrderTotal(get().items);
  },
}));
