"use client";

import { useState } from "react";
import { services } from "@/data/services";
import type { Service } from "@/types/service";
import { Container } from "@/components/layout";
import { ServiceGrid, ServiceModal } from "@/components/service";
import { OrderSidebar, CheckoutModal } from "@/components/order";
import { useOrderStore } from "@/features/order";
import { getActiveServices } from "@/utils/getActiveServices";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
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

  const activeServices = getActiveServices(services);

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
    handleCloseModal();
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
        <section className={styles.promoBanner} aria-label="Promocion destacada">
          <span className={styles.promoLabel}>PROMO</span>
          <span className={styles.promoValue}>3x2</span>
          <span className={styles.promoText}>HAGA CLIC Y CONOZCA MAS</span>
        </section>

        <ServiceGrid services={activeServices} onOpen={handleOpenModal} />
      </Container>

      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onCloseAction={handleCloseModal}
        onAddToOrder={handleAddToOrder}
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
