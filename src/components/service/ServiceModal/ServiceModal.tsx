"use client";

import type { Service } from "@/types/service";
import { Modal } from "@/components/ui";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

type ServiceModalProps = {
  service: Service | null;
  isOpen: boolean;
  onCloseAction: () => void;
  onAddToOrder: (service: Service) => void;
};

export default function ServiceModal({
  service,
  isOpen,
  onCloseAction,
  onAddToOrder,
}: ServiceModalProps) {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onCloseAction={onCloseAction}>
      <ServiceDetails
        service={service}
        onAddToOrder={onAddToOrder}
        onClose={onCloseAction}
      />
    </Modal>
  );
}
