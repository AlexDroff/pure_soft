// React component 'HeroSection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Button, ButtonLink, SectionText, SectionTitle } from "@/components/ui";
import { WHATSAPP_QUOTE_URL } from "@/data/contacts";
import { ROUTES } from "@/lib/constants/routes";
import { useI18n } from "@/providers/locale-provider";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <section className={styles.section} data-sticky-hero>
      <Container>
        <div className={styles.hero}>
          <Image
            src="/images/hero/hero.webp"
            alt={t("hero.imageAlt")}
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            className={styles.image}
          />

          <div className={styles.overlay} />

          <div className={styles.content}>
            <div className={styles.textBlock}>
              <SectionTitle className={styles.title}>
                {t("hero.title")}
              </SectionTitle>

              <SectionText className={styles.text}>
                {t("hero.subtitle")}
              </SectionText>

              <div className={styles.ctaGroup}>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button
                    variant="primary"
                    size="md"
                    radius="soft"
                    className={styles.ctaAction}
                  >
                    {t("hero.ctaServices")}
                  </Button>
                </Link>

                <ButtonLink
                  href={WHATSAPP_QUOTE_URL}
                  variant="primary"
                  size="md"
                  radius="soft"
                  target="_blank"
                  rel="noopener noreferrer"
                  ariaLabel="Pedir presupuesto gratis por WhatsApp"
                  className={styles.ctaAction}
                >
                  {t("hero.ctaQuote")}
                  <span className={styles.whatsappIcon} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
