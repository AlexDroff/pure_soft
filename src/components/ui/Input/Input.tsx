// React component 'Input'. Handles a dedicated UI element and its behavior.
import clsx from "clsx";
import styles from "./Input.module.css";

type InputProps = {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
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
  const errorId = hasError ? `${name}-error` : undefined;

  return (
    <label htmlFor={name} className={clsx(styles.wrapper, className)}>
      <span className={styles.label}>{label}</span>

      <input
        id={name}
        className={clsx(styles.input, hasError && styles.error)}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={hasError}
        aria-describedby={errorId}
      />

      {hasError && (
        <span id={errorId} className={styles.message}>
          {error}
        </span>
      )}
    </label>
  );
}
