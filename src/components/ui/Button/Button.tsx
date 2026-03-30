"use client";

import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm" | "xs";
type ButtonContext =
  | "hero"
  | "preview"
  | "service"
  | "details"
  | "cart"
  | "whatsapp";
type LegacyButtonSize = ButtonSize | ButtonContext;
type ButtonRadius = "pill" | "soft";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: LegacyButtonSize;
  context?: ButtonContext;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const legacyContexts: ButtonContext[] = [
  "hero",
  "preview",
  "service",
  "details",
  "cart",
  "whatsapp",
];

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "sm",
  context,
  radius = "soft",
  fullWidth = false,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  const resolvedContext = context ?? (
    legacyContexts.includes(size as ButtonContext)
      ? (size as ButtonContext)
      : undefined
  );
  const resolvedSize =
    resolvedContext === undefined ? (size as ButtonSize) : "sm";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[variant],
        styles[resolvedSize],
        resolvedContext && styles[resolvedContext],
        styles[radius],
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {children}
    </button>
  );
}
