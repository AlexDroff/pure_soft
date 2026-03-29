"use client";

import { useState } from "react";
import { services } from "@/data/services";
import type { Service } from "@/types/service";
import { Container } from "@/components/layout";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import { ServiceGrid, ServiceModal } from "@/components/service";
import { OrderSidebar, CheckoutModal } from "@/components/order";
import { useOrderStore } from "@/features/order";
import { getActiveServices } from "@/utils/getActiveServices";
import styles from "./ServicesPage.module.css";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearOrder,
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
    setIsCartOpen(true);
    handleCloseModal();
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    clearOrder();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.header}>
          <div className={styles.textBlock}>
            <SectionTitle>Наші послуги</SectionTitle>

            <SectionText>
              Оберіть потрібну послугу, перегляньте деталі та додайте замовлення
              до кошика.
            </SectionText>
          </div>

          <Button onClick={() => setIsCartOpen(true)}>
            Кошик ({getTotalItems()})
          </Button>
        </div>

        <ServiceGrid services={activeServices} onOpen={handleOpenModal} />
      </Container>

      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onCloseAction={handleCloseModal}
        onAddToOrder={handleAddToOrder}
      />

      <OrderSidebar
        isOpen={isCartOpen}
        items={items}
        totalItems={getTotalItems()}
        totalPrice={getTotalPrice()}
        onClose={() => setIsCartOpen(false)}
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
