import { cookies } from "next/headers";
import { DEFAULT_LOCALE, isLocale, type Locale, LOCALE_COOKIE } from "./config";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  return fromCookie && isLocale(fromCookie) ? fromCookie : DEFAULT_LOCALE;
}
