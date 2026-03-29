import { create } from "zustand";
import type { OrderItem } from "@/types/order";
import type { Service } from "@/types/service";
import { calculateOrderTotal } from "@/utils/calculateOrderTotal";

type OrderStore = {
  items: OrderItem[];
  isSidebarOpen: boolean;
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  increaseQuantity: (serviceId: string) => void;
  decreaseQuantity: (serviceId: string) => void;
  clearOrder: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  items: [],
  isSidebarOpen: false,

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

  openSidebar: () => {
    set({ isSidebarOpen: true });
  },

  closeSidebar: () => {
    set({ isSidebarOpen: false });
  },

  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return calculateOrderTotal(get().items);
  },
}));
