import { Container } from "@/components/layout";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <SectionTitle className={styles.title}>
              Професійна хімчистка меблів і текстилю
            </SectionTitle>

            <SectionText className={styles.text}>
              Очищення диванів, крісел, стільців, килимів та інших текстильних
              виробів із виїздом до клієнта.
            </SectionText>

            <Link href={ROUTES.SERVICES} className={styles.link}>
              <Button>Переглянути послуги</Button>
            </Link>
          </div>

          <div className={styles.imagePlaceholder}>HERO IMAGE</div>
        </div>
      </Container>
    </section>
  );
}
