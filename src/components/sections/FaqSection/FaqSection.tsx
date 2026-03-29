import { faq } from "@/data/faq";
import { Container } from "@/components/layout";
import { SectionText, SectionTitle } from "@/components/ui";
import { FaqAccordion } from "@/components/faq";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionTitle>Поширені запитання</SectionTitle>

          <SectionText>
            Зібрали відповіді на найчастіші запитання, щоб вам було легше
            прийняти рішення перед замовленням.
          </SectionText>
        </div>

        <FaqAccordion items={faq} />
      </Container>
    </section>
  );
}
