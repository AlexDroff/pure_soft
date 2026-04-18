// React component 'AboutSection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import { Container } from "@/components/layout";
import { SectionText, SectionTitle } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import styles from "./AboutSection.module.css";

export default function AboutSection() {
  const { t } = useI18n();
  const steps = [
    {
      number: t("about.steps.step1.number"),
      title: t("about.steps.step1.title"),
      description: t("about.steps.step1.description"),
    },
    {
      number: t("about.steps.step2.number"),
      title: t("about.steps.step2.title"),
      description: t("about.steps.step2.description"),
    },
    {
      number: t("about.steps.step3.number"),
      title: t("about.steps.step3.title"),
      description: t("about.steps.step3.description"),
    },
  ];

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <article key={step.number} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <SectionText className={styles.stepText}>
                  {step.description}
                </SectionText>
              </article>
            ))}
          </div>

          <div className={styles.bottomBlock}>
            <div className={styles.infoBlock}>
              <SectionTitle className={styles.title}>
                {t("about.environment.title")}
              </SectionTitle>

              <SectionText className={styles.description}>
                {t("about.environment.description")}
              </SectionText>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="/images/about/about.webp"
                alt={t("about.environment.imageAlt")}
                fill
                sizes="(min-width: 1280px) 52vw, (min-width: 768px) 50vw, 100vw"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
