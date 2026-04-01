import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.hero}>
          <Image
            src="/images/hero/hero.webp"
            alt="Limpieza profesional de muebles y tapiceria"
            fill
            sizes="100vw"
            priority
            className={styles.image}
          />

          <div className={styles.overlay} />

          <div className={styles.content}>
            <div className={styles.textBlock}>
              <SectionTitle className={styles.title}>
                Tus muebles como nuevos, sin esfuerzo
              </SectionTitle>

              <SectionText className={styles.text}>
                Eliminamos suciedad, manchas y olores con resultados visibles
                desde la primera limpieza.
              </SectionText>

              <Link href={ROUTES.SERVICES} className={styles.link}>
                <Button size="md">
                  PRESUPUESTO GRATIS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
