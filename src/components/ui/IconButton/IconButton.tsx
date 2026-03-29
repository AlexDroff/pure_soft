"use client";

import clsx from "clsx";
import styles from "./IconButton.module.css";

type IconButtonProps = {
  icon: React.ReactNode;
  label: string;
  type?: "button" | "submit" | "reset";
  onClickAction?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function IconButton({
  icon,
  label,
  type = "button",
  onClickAction,
  disabled = false,
  className,
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      disabled={disabled}
      onClick={onClickAction}
      className={clsx(styles.button, className)}
    >
      {icon}
    </button>
  );
}
