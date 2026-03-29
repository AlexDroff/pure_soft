import clsx from "clsx";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  className?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  error,
  touched = false,
  onChange,
  onBlur,
  className,
}: InputProps) {
  const hasError = touched && Boolean(error);

  return (
    <label className={clsx(styles.wrapper, className)}>
      <span className={styles.label}>{label}</span>

      <input
        className={clsx(styles.input, hasError && styles.error)}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {hasError && <span className={styles.message}>{error}</span>}
    </label>
  );
}
