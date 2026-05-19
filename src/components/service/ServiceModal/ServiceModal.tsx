// React component 'ServiceModal'. Handles a dedicated UI element and its behavior.
"use client";

import type { Service } from "@/types/service";
import { Modal } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import ServiceDetails from "../ServiceDetails/ServiceDetails";
import styles from "./ServiceModal.module.css";

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
  const { t } = useI18n();

  if (!service) return null;

  return (
    <Modal
      isOpen={isOpen}
      onCloseAction={onCloseAction}
      className={styles.serviceModal}
      ariaLabel={t("servicesCatalog.modal.ariaLabelTemplate", {
        serviceTitle: service.title,
      })}
    >
      <ServiceDetails
        service={service}
        onAddToOrderAction={onAddToOrderAction}
        onClose={onCloseAction}
      />
    </Modal>
  );
}
