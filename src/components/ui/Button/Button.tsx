"use client";

import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {children}
    </button>
  );
}
