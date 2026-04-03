import type { Messages } from "@/i18n/messages";
import type { Service } from "@/types/service";

export function localizeService(service: Service, messages: Messages): Service {
  const localized =
    messages.servicesCatalog.items[
      service.id as keyof typeof messages.servicesCatalog.items
    ];

  if (!localized) {
    return {
      ...service,
      unit: messages.servicesCatalog.unit,
    };
  }

  return {
    ...service,
    title: localized.title,
    shortDescription: localized.shortDescription,
    fullDescription: localized.fullDescription,
    unit: messages.servicesCatalog.unit,
  };
}
