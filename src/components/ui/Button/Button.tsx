// React component 'Button'. Handles a dedicated UI element and its behavior.
"use client";

import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "pill" | "soft";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  radius = "soft",
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
        styles[`size-${size}`],
        styles[radius],
        className,
      )}
    >
      {children}
    </button>
  );
}
