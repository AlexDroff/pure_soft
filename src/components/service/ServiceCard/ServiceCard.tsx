// React component 'ServiceCard'. Handles a dedicated UI element and its behavior.
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
  onOpenAction?: (service: Service) => void;
  onAddToOrderAction?: (service: Service) => void;
  className?: string;
  imagePriority?: boolean;
};

export default function ServiceCard({
  service,
  onOpenAction,
  onAddToOrderAction,
  className,
  imagePriority = false,
}: ServiceCardProps) {
  const isInteractive = Boolean(onOpenAction);
  const ctaLabel = `DESDE ${String(service.price)} EUR`;

  const handleCardClick = () => {
    onOpenAction?.(service);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpenAction?.(service);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToOrderAction?.(service);
  };

  const cardButton = (
    <div onClick={handleButtonClick} className={styles.buttonWrapper}>
      <Button size="sm">
        {ctaLabel}
      </Button>
    </div>
  );

  if (isInteractive) {
    return (
      <article
        className={clsx(styles.card, styles.interactive, className)}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Abrir detalles de ${service.title}`}
      >
        <div className={styles.imageWrap}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1280px) 44vw, 100vw"
            priority={imagePriority}
            className={styles.image}
          />
        </div>
        <div className={styles.cardContent}>
          <div className={styles.titleBar}>
            <h3 className={styles.title}>{service.title}</h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.description}>{service.shortDescription}</p>
            {cardButton}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={clsx(styles.card, className)}>
      <div className={styles.imageWrap}>
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1280px) 44vw, 100vw"
          priority={imagePriority}
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.titleBar}>
          <h3 className={styles.title}>{service.title}</h3>
        </div>
        <div className={styles.cardBody}>
          <p className={styles.description}>{service.shortDescription}</p>
          <Link href={ROUTES.SERVICES} className={styles.link}>
            <Button size="sm">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
