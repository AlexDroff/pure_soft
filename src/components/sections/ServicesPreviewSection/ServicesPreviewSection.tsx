import Link from "next/link";
import { services } from "@/data/services";
import { Container } from "@/components/layout";
import { Button, SectionText, SectionTitle } from "@/components/ui";
import { ServiceGrid } from "@/components/service";
import { getActiveServices } from "@/utils/getActiveServices";
import { ROUTES } from "@/lib/constants/routes";
import styles from "./ServicesPreviewSection.module.css";

export default function ServicesPreviewSection() {
  const previewServices = getActiveServices(services).slice(0, 3);

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div className={styles.textBlock}>
            <SectionTitle>Наші послуги</SectionTitle>

            <SectionText>
              Оберіть потрібний тип хімчистки та перегляньте доступні варіанти
              очищення меблів і текстилю.
            </SectionText>
          </div>

          <Link href={ROUTES.SERVICES} className={styles.link}>
            <Button variant="secondary">Усі послуги</Button>
          </Link>
        </div>

        <ServiceGrid services={previewServices} />
      </Container>
    </section>
  );
}
