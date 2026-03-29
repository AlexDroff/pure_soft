"use client";

import clsx from "clsx";
import type { OrderItem } from "@/types/order";
import { SectionTitle, SectionText, IconButton } from "@/components/ui";
import { IoClose } from "react-icons/io5";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import OrderSummary from "../OrderSummary/OrderSummary";
import styles from "./OrderSidebar.module.css";

type OrderSidebarProps = {
  isOpen: boolean;
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onCheckout: () => void;
  onIncrease: (serviceId: string) => void;
  onDecrease: (serviceId: string) => void;
  onRemove: (serviceId: string) => void;
};

export default function OrderSidebar({
  isOpen,
  items,
  totalItems,
  totalPrice,
  onClose,
  onCheckout,
  onIncrease,
  onDecrease,
  onRemove,
}: OrderSidebarProps) {
  return (
    <aside className={clsx(styles.sidebar, isOpen && styles.open)}>
      <div className={styles.header}>
        <SectionTitle>Кошик</SectionTitle>

        <IconButton
          icon={<IoClose size={22} />}
          label="Close cart"
          onClickAction={onClose}
        />
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>
          <SectionText>Ваш кошик поки порожній.</SectionText>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {items.map((item) => (
              <OrderItemCard
                key={item.serviceId}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>

          <OrderSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={onCheckout}
          />
        </>
      )}
    </aside>
  );
}
