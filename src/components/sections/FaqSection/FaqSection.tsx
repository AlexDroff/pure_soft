"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout";
import { SectionTitle } from "@/components/ui";
import styles from "./FaqSection.module.css";

const faqItems = [
  {
    id: "faq-1",
    question: "¿Cuándo pueden venir?",
    answer:
      "Intentamos ofrecer cita lo antes posible, normalmente dentro de las proximas 24 a 48 horas, segun disponibilidad y ubicacion. Tambien ofrecemos turnos urgentes en algunos casos.",
  },
  {
    id: "faq-2",
    question: "¿Cómo se puede pagar?",
    answer:
      "Puedes pagar de forma comoda por Bizum, transferencia bancaria o en efectivo.",
  },
  {
    id: "faq-3",
    question: "¿Cómo es la técnica/tecnología?",
    answer:
      "Trabajamos con tecnologia de inyeccion y extraccion, entre otros metodos profesionales. Este sistema permite limpiar, desinfectar y extraer la suciedad en un solo proceso.",
  },
  {
    id: "faq-4",
    question: "¿Queda húmedo luego?",
    answer:
      "Si, la tapiceria puede quedar ligeramente humeda despues del servicio. El tiempo de secado depende del nivel de suciedad y del tipo de tejido, aunque normalmente suele secarse en unas 2 o 3 horas.",
  },
  {
    id: "faq-5",
    question: "¿Cada cuánto recomendáis limpiar la tapicería?",
    answer:
      "En condiciones normales de uso, solemos recomendar una limpieza profesional 2 o 3 veces al ano. Si en casa hay ninos o mascotas, puede ser recomendable hacerlo con algo mas de frecuencia.",
  },
  {
    id: "faq-6",
    question: "¿En cuánto tiempo se hacen los trabajos?",
    answer:
      "La duracion depende del tipo de trabajo que se vaya a realizar. En nuestra pagina puedes consultar el tiempo estimado para cada servicio.",
  },
  {
    id: "faq-7",
    question: "¿Sacan manchas?",
    answer:
      "Realizamos una limpieza profunda y desinfeccion profesional. Muchas manchas pueden eliminarse por completo, aunque el resultado final depende de factores como el tipo de mancha, el tiempo que lleve y el material del tejido.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  const handleToggle = (id: string) => {
    setOpenId((currentId) => (currentId === id ? "" : id));
  };

  return (
    <section id="faq" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionTitle className={styles.title}>FAQ</SectionTitle>
        </div>

        <div className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = item.id === openId;

            return (
              <div key={item.id} className={styles.item}>
                {isOpen ? (
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => handleToggle(item.id)}
                    aria-expanded="true"
                  >
                    <span className={styles.leading}>
                      <span className={styles.icon} aria-hidden="true">
                        <Image
                          src="/icons/rectangle-up.svg"
                          alt=""
                          width={12}
                          height={12}
                          className={styles.iconImage}
                        />
                      </span>

                      <span className={styles.question}>{item.question}</span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => handleToggle(item.id)}
                    aria-expanded="false"
                  >
                    <span className={styles.leading}>
                      <span className={styles.icon} aria-hidden="true">
                        <Image
                          src="/icons/rectangle-right.svg"
                          alt=""
                          width={12}
                          height={12}
                          className={styles.iconImage}
                        />
                      </span>

                      <span className={styles.question}>{item.question}</span>
                    </span>
                  </button>
                )}

                {isOpen && <p className={styles.answer}>{item.answer}</p>}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
