// Sticky WhatsApp CTA shown between hero and footer visibility boundaries.
"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { WHATSAPP_QUOTE_URL } from "@/data/contacts";
import ButtonLink from "../Button/ButtonLink";
import styles from "./StickyWhatsAppCta.module.css";

const CTA_LABEL = "Presupuesto gratis";
const CTA_ARIA_LABEL = "Pedir presupuesto gratis por WhatsApp";

type StickyWhatsAppActionProps = {
  isVisible: boolean;
};

function StickyWhatsAppAction({ isVisible }: StickyWhatsAppActionProps) {
  return (
    <ButtonLink
      href={WHATSAPP_QUOTE_URL}
      variant="primary"
      size="md"
      radius="soft"
      target="_blank"
      rel="noopener noreferrer"
      ariaLabel={CTA_ARIA_LABEL}
      className={clsx(styles.action, isVisible ? styles.visible : styles.hidden)}
    >
      <span className={styles.iconWrap} aria-hidden="true" />

      <span className={styles.label}>{CTA_LABEL}</span>
    </ButtonLink>
  );
}

export default function StickyWhatsAppCta() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const heroElement = document.querySelector<HTMLElement>("[data-sticky-hero]");
    const footerElement =
      document.querySelector<HTMLElement>("[data-sticky-footer]") ??
      document.querySelector<HTMLElement>("footer");

    if (!heroElement) {
      return;
    }

    const heroObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );

    heroObserver.observe(heroElement);

    let footerObserver: IntersectionObserver | null = null;
    if (footerElement) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.05 },
      );

      footerObserver.observe(footerElement);
    }

    return () => {
      heroObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  const shouldShow = !isHeroVisible && !isFooterVisible;

  return <StickyWhatsAppAction isVisible={shouldShow} />;
}
