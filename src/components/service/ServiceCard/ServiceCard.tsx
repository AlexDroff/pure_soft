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

        <SectionText>{service.shortDescription}</SectionText>

        <p className={styles.price}>
          від {service.price} zł / {service.unit}
        </p>

        {isInteractive ? (
          <Button onClick={() => onOpen?.(service)} fullWidth>
            Детальніше
          </Button>
        ) : (
          <Link href={ROUTES.SERVICES} className={styles.link}>
            <Button fullWidth>Переглянути</Button>
          </Link>
        )}
      </div>
    </article>
  );
}
