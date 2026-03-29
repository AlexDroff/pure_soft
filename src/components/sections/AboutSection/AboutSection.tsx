import { Container } from "@/components/layout";
import { SectionText, SectionTitle } from "@/components/ui";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imagePlaceholder}>ABOUT IMAGE</div>

          <div className={styles.textBlock}>
            <SectionTitle>Чому обирають PURE SOFT</SectionTitle>

            <SectionText>
              Ми спеціалізуємось на професійній хімчистці меблів і текстилю,
              допомагаючи повернути чистоту, свіжість і охайний вигляд вашому
              інтер’єру.
            </SectionText>

            <SectionText>
              Працюємо акуратно, використовуємо безпечні засоби та підбираємо
              оптимальний підхід до різних типів тканин і забруднень.
            </SectionText>
          </div>
        </div>
      </Container>
    </section>
  );
}
