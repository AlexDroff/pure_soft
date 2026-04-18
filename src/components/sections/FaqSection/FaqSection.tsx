// React component 'FaqSection'. Handles a dedicated UI element and its behavior.
"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout";
import { SectionTitle } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  const { t } = useI18n();
  const faqItems = [
    {
      id: "faq-1",
      question: t("faq.items.faq-1.question"),
      answer: t("faq.items.faq-1.answer"),
    },
    {
      id: "faq-2",
      question: t("faq.items.faq-2.question"),
      answer: t("faq.items.faq-2.answer"),
    },
    {
      id: "faq-3",
      question: t("faq.items.faq-3.question"),
      answer: t("faq.items.faq-3.answer"),
    },
    {
      id: "faq-4",
      question: t("faq.items.faq-4.question"),
      answer: t("faq.items.faq-4.answer"),
    },
    {
      id: "faq-5",
      question: t("faq.items.faq-5.question"),
      answer: t("faq.items.faq-5.answer"),
    },
    {
      id: "faq-6",
      question: t("faq.items.faq-6.question"),
      answer: t("faq.items.faq-6.answer"),
    },
    {
      id: "faq-7",
      question: t("faq.items.faq-7.question"),
      answer: t("faq.items.faq-7.answer"),
    },
  ];

  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  const handleToggle = (id: string) => {
    setOpenId((currentId) => (currentId === id ? "" : id));
  };

  return (
    <section id="faq" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionTitle className={styles.title}>{t("faq.title")}</SectionTitle>
        </div>

        <div className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = item.id === openId;
            const contentId = `${item.id}-content`;

            return (
              <div key={item.id} className={styles.item}>
                {isOpen ? (
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => handleToggle(item.id)}
                    aria-expanded="true"
                    aria-controls={contentId}
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
                    aria-controls={contentId}
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

                {isOpen && (
                  <p id={contentId} className={styles.answer}>
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
