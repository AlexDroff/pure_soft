// React component 'OrderSidebar'. Handles a dedicated UI element and its behavior.
"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import clsx from "clsx";
import type { OrderItem } from "@/types/order";
import { SectionTitle, SectionText, IconButton } from "@/components/ui";
import { IoClose } from "react-icons/io5";
import { useI18n } from "@/providers/locale-provider";
import OrderItemCard from "../OrderItemCard/OrderItemCard";
import OrderSummary from "../OrderSummary/OrderSummary";
import styles from "./OrderSidebar.module.css";

type OrderSidebarProps = {
  isOpen: boolean;
  items: OrderItem[];
  totalPrice: number;
  onCloseAction: () => void;
  onCheckoutAction: () => void;
  onIncreaseAction: (serviceId: string) => void;
  onDecreaseAction: (serviceId: string) => void;
  onRemoveAction: (serviceId: string) => void;
};

export default function OrderSidebar({
  isOpen,
  items,
  totalPrice,
  onCloseAction,
  onCheckoutAction,
  onIncreaseAction,
  onDecreaseAction,
  onRemoveAction,
}: OrderSidebarProps) {
  const { t } = useI18n();
  const sidebarRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusableElements = sidebarRef.current
      ? Array.from(
          sidebarRef.current.querySelectorAll<HTMLElement>(focusableSelector),
        )
      : [];

    (focusableElements[0] || sidebarRef.current)?.focus();

    const handleEscapeAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseAction();
        return;
      }

      if (event.key !== "Tab" || !sidebarRef.current) return;

      const activeFocusable = Array.from(
        sidebarRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (activeFocusable.length === 0) {
        event.preventDefault();
        sidebarRef.current.focus();
        return;
      }

      const firstElement = activeFocusable[0];
      const lastElement = activeFocusable[activeFocusable.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleEscapeAndTrap);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleEscapeAndTrap);
      if (previouslyFocusedRef.current?.isConnected) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onCloseAction]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseAction();
    }
  };

  return (
    <>
      <div
        className={clsx(styles.backdrop, isOpen && styles.backdropVisible)}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <aside
        ref={sidebarRef}
        className={clsx(styles.sidebar, isOpen && styles.open)}
        role="dialog"
        aria-modal="true"
        aria-label={t("order.sidebar.title")}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <SectionTitle className={styles.title}>
            {t("order.sidebar.title")}
          </SectionTitle>

          <IconButton
            icon={<IoClose size={22} />}
            label={t("order.sidebar.closeCartAriaLabel")}
            onClickAction={onCloseAction}
            variant="borderless"
          />
        </div>
        <div className={styles.divider} />

        {items.length === 0 ? (
          <div className={styles.empty}>
            <SectionText>{t("order.sidebar.empty")}</SectionText>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map((item) => (
                <OrderItemCard
                  key={item.serviceId}
                  item={item}
                  onIncrease={onIncreaseAction}
                  onDecrease={onDecreaseAction}
                  onRemove={onRemoveAction}
                />
              ))}
            </div>

            <OrderSummary
              totalPrice={totalPrice}
              onCheckout={onCheckoutAction}
              onClose={onCloseAction}
            />
          </>
        )}
      </aside>
    </>
  );
}
