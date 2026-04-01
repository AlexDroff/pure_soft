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
  onAddToOrder?: (service: Service) => void;
  className?: string;
};

export default function ServiceCard({
  service,
  onOpen,
  onAddToOrder,
  className,
}: ServiceCardProps) {
  const isInteractive = Boolean(onOpen);
  const ctaLabel = `DESDE ${String(service.price)} \u20AC`;

  const handleCardClick = () => {
    onOpen?.(service);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToOrder?.(service);
  };

  const cardButton = (
    <div onClick={handleButtonClick} className={styles.buttonWrapper}>
      <Button size="sm">
        {ctaLabel}
      </Button>
    </div>
  );

  return (
    <article
      className={clsx(styles.card, isInteractive && styles.interactive, className)}
      onClick={handleCardClick}
    >
      <div className={styles.imageWrap}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 44vw, 100vw"
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
              <Button size="sm">
                {ctaLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
