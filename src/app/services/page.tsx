// Next.js route page file. Composes sections and renders route content.
"use client";

import { useState } from "react";
import { services } from "@/data/services";
import type { Service } from "@/types/service";
import { Container } from "@/components/layout";
import { ServiceGrid, ServiceModal } from "@/components/service";
import { OrderSidebar, CheckoutModal } from "@/components/order";
import { useOrderStore } from "@/features/order";
import { localizeService } from "@/i18n/services";
import { useI18n } from "@/providers/locale-provider";
import { getActiveServices } from "@/utils/getActiveServices";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
  const { t, messages } = useI18n();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const {
    items,
    isSidebarOpen,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearOrder,
    openSidebar,
    closeSidebar,
    getTotalItems,
    getTotalPrice,
  } = useOrderStore();

  const activeServices = getActiveServices(services).map((service) =>
    localizeService(service, messages),
  );

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setIsServiceModalOpen(false);
  };

  const handleAddToOrder = (service: Service) => {
    addItem(service);
    openSidebar();
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    clearOrder();
    setIsCheckoutOpen(false);
    closeSidebar();
  };

  return (
    <main className={styles.page}>
      <Container>
        <section
          className={styles.promoBanner}
          aria-label={t("servicesPage.promoBanner.ariaLabel")}
        >
          <span className={styles.promoLabel}>
            {t("servicesPage.promoBanner.label")}
          </span>
          <span className={styles.promoValue}>
            {t("servicesPage.promoBanner.value")}
          </span>
          <span className={styles.promoText}>
            {t("servicesPage.promoBanner.text")}
          </span>
        </section>

        <ServiceGrid
          services={activeServices}
          onOpenAction={handleOpenModal}
          onAddToOrderAction={handleAddToOrder}
        />
      </Container>

      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onCloseAction={handleCloseModal}
        onAddToOrderAction={handleAddToOrder}
      />

      <OrderSidebar
        isOpen={isSidebarOpen}
        items={items}
        totalItems={getTotalItems()}
        totalPrice={getTotalPrice()}
        onClose={closeSidebar}
        onCheckout={handleCheckout}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={items}
        onCloseAction={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
      />
    </main>
  );
}
