// React component 'ServiceDetails'. Handles a dedicated UI element and its behavior.
import Image from "next/image";
import type { Service } from "@/types/service";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import styles from "./ServiceDetails.module.css";

type ServiceDetailsProps = {
  service: Service;
  onAddToOrderAction: (service: Service) => void;
  onClose: () => void;
};

export default function ServiceDetails({
  service,
  onAddToOrderAction,
  onClose,
}: ServiceDetailsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1440px) 520px, (min-width: 768px) 420px, 320px"
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
            onAddToOrderAction(service);
            onClose();
          }}
          size="md"
        >
          Desde {service.price} EUR
        </Button>
      </div>
    </div>
  );
}
