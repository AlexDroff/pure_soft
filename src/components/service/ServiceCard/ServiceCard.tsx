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
  onOpen?: (service: Service) => void;
  onAddToOrder?: (service: Service) => void;
  className?: string;
  imagePriority?: boolean;
};

export default function ServiceCard({
  service,
  onOpen,
  onAddToOrder,
  className,
  imagePriority = false,
}: ServiceCardProps) {
  const isInteractive = Boolean(onOpen);
  const ctaLabel = `DESDE ${String(service.price)} \u20AC`;

  const handleCardClick = () => {
    onOpen?.(service);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen?.(service);
    }
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
      onClick={isInteractive ? handleCardClick : undefined}
      onKeyDown={isInteractive ? handleCardKeyDown : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Abrir detalles de ${service.title}` : undefined}
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
