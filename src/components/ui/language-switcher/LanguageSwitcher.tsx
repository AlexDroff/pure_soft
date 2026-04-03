"use client";

import clsx from "clsx";
import { LOCALES } from "@/i18n/config";
import { useI18n } from "@/providers/locale-provider";
import styles from "./LanguageSwitcher.module.css";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={clsx(styles.switcher, className)}
      role="group"
      aria-label={locale === "en" ? "Language switcher" : "Selector de idioma"}
    >
      {LOCALES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={clsx(styles.button, locale === item && styles.active)}
          aria-pressed={locale === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
