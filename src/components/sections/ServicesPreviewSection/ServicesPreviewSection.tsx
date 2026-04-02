// React component 'ServicesPreviewSection'. Handles a dedicated UI element and its behavior.
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./ServicesPreviewSection.module.css";

const previewCards = [
  {
    title: "LIMPIEZA DE ALFOMBRAS",
    description: "Limpieza profesional de alfombras",
    price: "DESDE 50 EUR",
    image: "/images/services/carpet.webp",
  },
  {
    title: "LIMPIEZA DE SOFAS",
    description: "Limpieza profunda de sofas y tapiceria",
    price: "DESDE 50 EUR",
    image: "/images/services/sofa.webp",
  },
  {
    title: "LIMPIEZA DE SILLAS",
    description: "Limpieza profesional de sillas y asientos",
    price: "DESDE 7 EUR",
    image: "/images/services/chair.webp",
  },
  {
    title: "LIMPIEZA DE COLCHONES",
    description: "Limpieza y desinfeccion de colchones",
    price: "DESDE 60 EUR",
    image: "/images/services/mattress.webp",
  },
  {
    title: "LIMPIEZA DE SILLONES",
    description: "Limpieza profunda de sillones",
    price: "DESDE 30 EUR",
    image: "/images/services/armchair.webp",
  },
];

const previewImageSizes =
  "(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw";

export default function ServicesPreviewSection() {
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
                alt="Promocion 3x2"
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
