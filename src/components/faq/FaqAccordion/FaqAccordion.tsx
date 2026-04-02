// React component 'FaqAccordion'. Handles a dedicated UI element and its behavior.
"use client";

import { useState } from "react";
import type { FaqItem as FaqItemType } from "@/types/common";
import FaqItem from "../FaqItem/FaqItem";
import styles from "./FaqAccordion.module.css";

type FaqAccordionProps = {
  items: FaqItemType[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <FaqItem
          key={item.id}
          item={item}
          isOpen={openItemId === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
