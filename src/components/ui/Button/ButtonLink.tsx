// React component 'ButtonLink'. Link-based variant of Button for navigation/CTA.
"use client";

import clsx from "clsx";
import buttonStyles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outlinePrimary";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "pill" | "soft";

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  ariaLabel?: string;
};

export default function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "md",
  radius = "soft",
  className,
  target,
  rel,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={clsx(
        buttonStyles.button,
        buttonStyles[variant],
        buttonStyles[`size-${size}`],
        buttonStyles[radius],
        buttonStyles.linkButton,
        className,
      )}
    >
      {children}
    </a>
  );
}
