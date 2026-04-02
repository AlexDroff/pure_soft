// React component 'AboutSection'. Handles a dedicated UI element and its behavior.
import Image from "next/image";
import { Container } from "@/components/layout";
import { SectionText, SectionTitle } from "@/components/ui";
import styles from "./AboutSection.module.css";

const steps = [
  {
    number: "01.",
    title: "Contacto",
    description:
      "Te contacta uno de nuestros asesores para responder a tu solicitud y orientarte desde el primer momento.",
  },
  {
    number: "02.",
    title: "Detalles y coordinacion",
    description:
      "Aclaramos todas tus dudas, revisamos los detalles del servicio y acordamos el dia y la hora que mejor te convenga.",
  },
  {
    number: "03.",
    title: "Servicio en tu hogar",
    description:
      "Vamos a tu hogar y realizamos una limpieza de maxima calidad con resultados impecables.",
  },
];

export default function AboutSection() {
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
                CUIDAMOS DEL MEDIO AMBIENTE
              </SectionTitle>

              <SectionText className={styles.description}>
                Somos un servicio profesional de limpieza de sofas, alfombras,
                sillas y colchones. Utilizamos productos y metodos seguros que
                no danan ni tu hogar ni al medio ambiente.
              </SectionText>
            </div>

            <div className={styles.imageWrapper}>
              <Image
                src="/images/about/about.webp"
                alt="Limpieza profesional segura para el hogar y el medio ambiente"
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
