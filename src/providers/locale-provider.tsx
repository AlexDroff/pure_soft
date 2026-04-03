"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type Values = Record<string, string | number>;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Values) => string;
  messages: Messages;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
};

function interpolate(template: string, values?: Values): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    values[key] !== undefined ? String(values[key]) : `{${key}}`,
  );
}

function getValueByPath(messages: Messages, path: string): string {
  const value = path
    .split(".")
    .reduce<unknown>(
      (current, segment) =>
        current && typeof current === "object"
          ? (current as Record<string, unknown>)[segment]
          : undefined,
      messages,
    );

  if (typeof value !== "string") {
    return path;
  }

  return value;
}

export function LocaleProvider({
  children,
  locale,
  messages,
}: LocaleProviderProps) {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: currentLocale,
      setLocale: (nextLocale: Locale) => {
        if (!isLocale(nextLocale) || nextLocale === currentLocale) return;

        setCurrentLocale(nextLocale);
        document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
        router.refresh();
      },
      t: (key: string, values?: Values) =>
        interpolate(getValueByPath(messages, key), values),
      messages,
    }),
    [currentLocale, messages, router],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider");
  }

  return context;
}

export function useLocaleValue() {
  const { locale } = useI18n();
  return locale || DEFAULT_LOCALE;
}
