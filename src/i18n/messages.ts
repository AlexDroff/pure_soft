import es from "@/messages/es.json";
import en from "@/messages/en.json";
import { DEFAULT_LOCALE, type Locale } from "./config";

export const messagesByLocale = {
  es,
  en,
} as const;

export type Messages = typeof es;

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale] ?? messagesByLocale[DEFAULT_LOCALE];
}
