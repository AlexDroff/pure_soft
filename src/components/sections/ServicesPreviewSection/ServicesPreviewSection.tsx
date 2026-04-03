// React component 'ServicesPreviewSection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import { useI18n } from "@/providers/locale-provider";
import styles from "./ServicesPreviewSection.module.css";

const previewImageSizes =
  "(min-width: 768px) 356px, (min-width: 390px) 356px, 100vw";

export default function ServicesPreviewSection() {
  const { t } = useI18n();
  const previewCards = [
    {
      title: t("servicesPreview.items.carpet.title"),
      description: t("servicesPreview.items.carpet.description"),
      price: t("servicesPreview.items.carpet.price"),
      image: "/images/services/carpet.webp",
    },
    {
      title: t("servicesPreview.items.sofa.title"),
      description: t("servicesPreview.items.sofa.description"),
      price: t("servicesPreview.items.sofa.price"),
      image: "/images/services/sofa.webp",
    },
    {
      title: t("servicesPreview.items.chair.title"),
      description: t("servicesPreview.items.chair.description"),
      price: t("servicesPreview.items.chair.price"),
      image: "/images/services/chair.webp",
    },
    {
      title: t("servicesPreview.items.mattress.title"),
      description: t("servicesPreview.items.mattress.description"),
      price: t("servicesPreview.items.mattress.price"),
      image: "/images/services/mattress.webp",
    },
    {
      title: t("servicesPreview.items.armchair.title"),
      description: t("servicesPreview.items.armchair.description"),
      price: t("servicesPreview.items.armchair.price"),
      image: "/images/services/armchair.webp",
    },
  ];

  return (
    <section id="limpieza" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={previewCards[0].image}
                alt={previewCards[0].title}
                fill
                sizes={previewImageSizes}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{previewCards[0].title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{previewCards[0].description}</p>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button size="sm">{previewCards[0].price}</Button>
                </Link>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={previewCards[1].image}
                alt={previewCards[1].title}
                fill
                sizes={previewImageSizes}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{previewCards[1].title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{previewCards[1].description}</p>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button size="sm">{previewCards[1].price}</Button>
                </Link>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={previewCards[2].image}
                alt={previewCards[2].title}
                fill
                sizes={previewImageSizes}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{previewCards[2].title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{previewCards[2].description}</p>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button size="sm">{previewCards[2].price}</Button>
                </Link>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={previewCards[3].image}
                alt={previewCards[3].title}
                fill
                sizes={previewImageSizes}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{previewCards[3].title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{previewCards[3].description}</p>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button size="sm">{previewCards[3].price}</Button>
                </Link>
              </div>
            </div>
          </article>

          <Link href={ROUTES.SERVICES} className={styles.promoCard}>
            <div className={styles.promoMedia}>
              <Image
                src="/icons/promo.svg"
                alt={t("servicesPreview.promo.imageAlt")}
                width={280}
                height={280}
                className={styles.promoImage}
              />
            </div>
          </Link>

          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={previewCards[4].image}
                alt={previewCards[4].title}
                fill
                sizes={previewImageSizes}
                className={styles.image}
              />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHead}>
                <h3 className={styles.cardTitle}>{previewCards[4].title}</h3>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{previewCards[4].description}</p>
                <Link href={ROUTES.SERVICES} className={styles.link}>
                  <Button size="sm">{previewCards[4].price}</Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
