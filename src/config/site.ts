import { contacts } from "@/data/contacts";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puresoft.es";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "PureSoft";
export const SITE_DEFAULT_LOCALE = DEFAULT_LOCALE;
export const SITE_SUPPORTED_LOCALES = LOCALES;
export const SITE_OG_IMAGE_PATH = "/og-image.jpg";
export const SITE_OG_IMAGE_URL = `${SITE_URL}${SITE_OG_IMAGE_PATH}`;
export const SITE_BUSINESS_TYPE = "ProfessionalService";
export const SITE_BUSINESS_DESCRIPTION =
  "Cleaning service for sofas, mattresses, carpets, and upholstery in Alicante.";
export const SITE_AREA_SERVED = "Alicante";
export const SITE_PHONE = contacts.phone;
export const SITE_WHATSAPP = contacts.whatsapp;
export const SITE_SOCIAL_LINKS = [
  contacts.instagram,
  contacts.facebook,
  contacts.youtube,
].filter((link): link is string => typeof link === "string" && link.length > 0);
