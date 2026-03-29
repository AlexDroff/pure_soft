"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Service } from "@/types/service";
import { Button, SectionText } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./ServiceCard.module.css";

type ServiceCardProps = {
  service: Service;
  onOpen?: (service: Service) => void;
  className?: string;
};

export default function ServiceCard({
  service,
  onOpen,
  className,
}: ServiceCardProps) {
  const isInteractive = Boolean(onOpen);

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.imageWrapper}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{service.title}</h3>

        <SectionText className={styles.description}>
          {service.shortDescription}
        </SectionText>

        <p className={styles.price}>
          desde {service.price} zl / {service.unit}
        </p>

        {isInteractive ? (
          <Button className={styles.button} onClick={() => onOpen?.(service)} fullWidth>
            Detalles
          </Button>
        ) : (
          <Link href={ROUTES.SERVICES} className={styles.link}>
            <Button className={styles.button} fullWidth>
              Ver
            </Button>
          </Link>
        )}
      </div>
    </article>
  );
}
