import { SITE_AREA_SERVED, SITE_BUSINESS_TYPE, SITE_NAME, SITE_OG_IMAGE_URL, SITE_PHONE, SITE_SOCIAL_LINKS, SITE_URL } from "@/config/site";
import type { Service } from "@/types/service";
import JsonLd from "./JsonLd";

type ProfessionalServiceJsonLdProps = {
  description: string;
  services: Service[];
};

export default function ProfessionalServiceJsonLd({
  description,
  services,
}: ProfessionalServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": SITE_BUSINESS_TYPE,
    "@id": `${SITE_URL}/#professional-service`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    telephone: SITE_PHONE,
    image: SITE_OG_IMAGE_URL,
    areaServed: SITE_AREA_SERVED,
    sameAs: SITE_SOCIAL_LINKS,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
        },
        price: service.price,
        priceCurrency: "EUR",
      })),
    },
  };

  return <JsonLd data={data} />;
}
