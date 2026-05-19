import { SITE_AREA_SERVED, SITE_NAME, SITE_URL } from "@/config/site";
import type { Service } from "@/types/service";
import JsonLd from "./JsonLd";

type ServicesJsonLdProps = {
  services: Service[];
  description: string;
};

export default function ServicesJsonLd({
  services,
  description,
}: ServicesJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/services#service-list`,
    url: `${SITE_URL}/services`,
    name: "Cleaning services",
    description,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.fullDescription,
        areaServed: SITE_AREA_SERVED,
        provider: {
          "@type": "ProfessionalService",
          "@id": `${SITE_URL}/#professional-service`,
          name: SITE_NAME,
        },
      },
    })),
  };

  return <JsonLd data={data} />;
}
