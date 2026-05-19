"use client";

import { useState } from "react";
import { services } from "@/data/services";
import type { Service } from "@/types/service";
import { Container } from "@/components/layout";
import { ServiceGrid, ServiceModal } from "@/components/service";
import { OrderSidebar, CheckoutModal } from "@/components/order";
import StickyWhatsAppCta from "@/components/ui/StickyWhatsAppCta/StickyWhatsAppCta";
import { useOrderStore } from "@/features/order";
import { localizeService } from "@/i18n/services";
import { useI18n } from "@/providers/locale-provider";
import { getActiveServices } from "@/utils/getActiveServices";
import styles from "./ServicesPage.module.css";

export default function ServicesPageClient() {
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
          data-sticky-hero
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

      <StickyWhatsAppCta />

      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onCloseAction={handleCloseModal}
        onAddToOrderAction={handleAddToOrder}
      />

      <OrderSidebar
        isOpen={isSidebarOpen}
        items={items}
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
