"use client";

import clsx from "clsx";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useI18n } from "@/providers/locale-provider";
import { useTheme } from "@/providers/theme-provider";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  className?: string;
  iconSize?: number;
};

export default function ThemeToggle({
  className,
  iconSize = 20,
}: ThemeToggleProps) {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      className={clsx(styles.toggle, className)}
      onClick={handleToggle}
      aria-label={
        isDark
          ? t("themeToggle.toLightAriaLabel")
          : t("themeToggle.toDarkAriaLabel")
      }
      data-theme={isDark ? "dark" : "light"}
    >
      {isDark ? <IoMoonOutline size={iconSize} /> : <IoSunnyOutline size={iconSize} />}
    </button>
  );
}
