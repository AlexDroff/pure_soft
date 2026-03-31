"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { Service } from "@/types/service";
import { Button } from "@/components/ui";
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
  const ctaLabel = `DESDE ${service.price} \u20AC`;
  const cardButton = (
    <Button className={styles.cta} onClick={() => onOpen?.(service)} size="md">
      {ctaLabel}
    </Button>
  );

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.imageWrap}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.titleBar}>
          <h3 className={styles.title}>{service.title}</h3>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.description}>{service.shortDescription}</p>
          {isInteractive ? (
            cardButton
          ) : (
            <Link href={ROUTES.SERVICES} className={styles.link}>
              <Button className={styles.cta} size="md">
                {ctaLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
