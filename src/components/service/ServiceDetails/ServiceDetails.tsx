import Image from "next/image";
import type { Service } from "@/types/service";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import styles from "./ServiceDetails.module.css";

type ServiceDetailsProps = {
  service: Service;
  onAddToOrder: (service: Service) => void;
};

export default function ServiceDetails({
  service,
  onAddToOrder,
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
        <SectionTitle>{service.title}</SectionTitle>

        <SectionText>{service.fullDescription}</SectionText>

        <p className={styles.price}>
          {`Precio: desde ${service.price} \u20AC / ${service.unit}`}
        </p>

        <Button
          className={styles.cta}
          onClick={() => onAddToOrder(service)}
          size="details"
        >
          Anadir al carrito
        </Button>
      </div>
    </div>
  );
}
