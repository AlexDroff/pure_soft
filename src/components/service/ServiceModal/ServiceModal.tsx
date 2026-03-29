"use client";

import type { Service } from "@/types/service";
import { Modal } from "@/components/ui";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

type ServiceModalProps = {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToOrder: (service: Service) => void;
};

export default function ServiceModal({
  service,
  isOpen,
  onClose,
  onAddToOrder,
}: ServiceModalProps) {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ServiceDetails service={service} onAddToOrder={onAddToOrder} />
    </Modal>
  );
}
