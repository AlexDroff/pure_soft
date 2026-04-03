// React component 'Loader'. Handles a dedicated UI element and its behavior.
"use client";

import { useI18n } from "@/providers/locale-provider";
import styles from "./Loader.module.css";

type LoaderProps = {
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
};

export default function Loader({
  text,
  subtext,
  fullScreen = false,
}: LoaderProps) {
  const { t } = useI18n();

  return (
    <div
      className={`${styles.loader} ${fullScreen ? styles.fullScreen : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinnerShell}>
        <span className={styles.spinner} aria-hidden="true" />
      </div>

      <div className={styles.textBlock}>
        <p className={styles.title}>{text ?? t("loader.defaultText")}</p>
        <p className={styles.subtitle}>
          {subtext ?? t("loader.defaultSubtext")}
        </p>
      </div>
    </div>
  );
}
