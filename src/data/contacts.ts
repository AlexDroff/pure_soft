// Data file 'contacts'. Stores static content and structures used for UI rendering.
import type { ContactItem } from "@/types/common";

export const contacts: ContactItem = {
  phone: "+34637943520",
  whatsapp: "+34637943520",
  instagram: "https://www.instagram.com/iam_puresoft/",
  facebook: "https://www.facebook.com/profile.php?id=61586741181944",
  youtube: "https://www.youtube.com/channel/UCDaMP5s-0Q1JEBChabiVjSg",
};

export const WHATSAPP_QUOTE_MESSAGE =
  "Hola, quiero un presupuesto para limpieza de sofá / colchón / alfombra. Te envío una foto. Mi zona es:";

const formatContactPhone = (phone: string) => phone.replace(/\D/g, "");

export const CONTACT_PHONE_TEL = `tel:${contacts.phone}`;

export const WHATSAPP_QUOTE_URL = `https://wa.me/${formatContactPhone(
  contacts.whatsapp,
)}?text=${encodeURIComponent(WHATSAPP_QUOTE_MESSAGE)}`;
