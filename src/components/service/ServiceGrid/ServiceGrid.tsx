"use client";

import type { Service } from "@/types/service";
import ServiceCard from "../ServiceCard/ServiceCard";
import styles from "./ServiceGrid.module.css";

type ServiceGridProps = {
  services: Service[];
  onOpen?: (service: Service) => void;
  onAddToOrder?: (service: Service) => void;
};

export default function ServiceGrid({
  services,
  onOpen,
  onAddToOrder,
}: ServiceGridProps) {
  return (
    <div className={styles.grid}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          onOpen={onOpen}
          onAddToOrder={onAddToOrder}
          imagePriority={index === 0}
        />
      ))}
    </div>
  );
}
