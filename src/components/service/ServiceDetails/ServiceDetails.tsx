import Image from "next/image";
import type { Service } from "@/types/service";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import styles from "./ServiceDetails.module.css";

type ServiceDetailsProps = {
  service: Service;
  onAddToOrder: (service: Service) => void;
  onClose: () => void;
};

export default function ServiceDetails({
  service,
  onAddToOrder,
  onClose,
}: ServiceDetailsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <SectionTitle className={styles.title}>{service.title}</SectionTitle>
          <p className={styles.subtitle}>{service.shortDescription}</p>
        </div>

        <SectionText className={styles.description}>
          {service.fullDescription}
        </SectionText>

        <Button
          className={styles.cta}
          onClick={() => {
            onAddToOrder(service);
            onClose();
          }}
          size="md"
        >
          Desde {service.price} €
        </Button>
      </div>
    </div>
  );
}
