import { gallery } from "@/data/gallery";
import { Container } from "@/components/layout";
import { SectionText, SectionTitle } from "@/components/ui";
import { GallerySlider } from "@/components/gallery";
import styles from "./GallerySection.module.css";

export default function GallerySection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionTitle>Галерея робіт</SectionTitle>

          <SectionText>
            Подивіться приклади очищених меблів і текстильних виробів після
            професійної хімчистки.
          </SectionText>
        </div>

        <GallerySlider items={gallery} />
      </Container>
    </section>
  );
}
