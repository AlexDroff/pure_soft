// React component 'ServiceModal'. Handles a dedicated UI element and its behavior.
"use client";

import type { Service } from "@/types/service";
import { Modal } from "@/components/ui";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

type ServiceModalProps = {
  service: Service | null;
  isOpen: boolean;
  onCloseAction: () => void;
  onAddToOrderAction: (service: Service) => void;
};

export default function ServiceModal({
  service,
  isOpen,
  onCloseAction,
  onAddToOrderAction,
}: ServiceModalProps) {
  if (!service) return null;

  return (
    <Modal
      isOpen={isOpen}
      onCloseAction={onCloseAction}
      ariaLabel={`Detalles del servicio ${service.title}`}
    >
      <ServiceDetails
        service={service}
        onAddToOrderAction={onAddToOrderAction}
        onClose={onCloseAction}
      />
    </Modal>
  );
}
