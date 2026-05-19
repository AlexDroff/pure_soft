// React component 'ServiceGrid'. Handles a dedicated UI element and its behavior.
"use client";

import { StaggerGroup } from "@/components/animation";
import type { Service } from "@/types/service";
import ServiceCard from "../ServiceCard/ServiceCard";
import styles from "./ServiceGrid.module.css";

type ServiceGridProps = {
  services: Service[];
  onOpenAction?: (service: Service) => void;
  onAddToOrderAction?: (service: Service) => void;
};

export default function ServiceGrid({
  services,
  onOpenAction,
  onAddToOrderAction,
}: ServiceGridProps) {
  return (
    <StaggerGroup className={styles.grid} staggerChildren={0.08}>
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          service={service}
          onOpenAction={onOpenAction}
          onAddToOrderAction={onAddToOrderAction}
          imagePriority={index === 0}
        />
      ))}
    </StaggerGroup>
  );
}
