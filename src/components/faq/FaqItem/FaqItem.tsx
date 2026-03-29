"use client";

import clsx from "clsx";
import type { FaqItem as FaqItemType } from "@/types/common";
import { IoChevronDown } from "react-icons/io5";
import styles from "./FaqItem.module.css";

type FaqItemProps = {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

export default function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => onToggle(item.id)}
      >
        <span className={styles.question}>{item.question}</span>

        <IoChevronDown
          size={20}
          className={clsx(styles.icon, isOpen && styles.iconOpen)}
        />
      </button>

      {isOpen && <p className={styles.answer}>{item.answer}</p>}
    </div>
  );
}
