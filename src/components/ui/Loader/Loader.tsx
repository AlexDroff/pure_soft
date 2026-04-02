// React component 'Loader'. Handles a dedicated UI element and its behavior.
import styles from "./Loader.module.css";

type LoaderProps = {
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
};

export default function Loader({
  text = "Cargando...",
  subtext = "Por favor, espera un momento",
  fullScreen = false,
}: LoaderProps) {
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
        <p className={styles.title}>{text}</p>
        <p className={styles.subtitle}>{subtext}</p>
      </div>
    </div>
  );
}
