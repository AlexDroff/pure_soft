import type { Metadata } from "next";
import ServicesJsonLd from "@/components/seo/ServicesJsonLd";
import { SITE_URL } from "@/config/site";
import { services } from "@/data/services";
import { getMessages } from "@/i18n/messages";
import { getServerLocale } from "@/i18n/server";
import { localizeService } from "@/i18n/services";
import { getActiveServices } from "@/utils/getActiveServices";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getMessages(locale);

  return {
    title: messages.servicesPage.meta.title,
    description: messages.servicesPage.meta.description,
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title: messages.servicesPage.meta.title,
      description: messages.servicesPage.meta.description,
      url: `${SITE_URL}/services`,
      type: "website",
    },
    twitter: {
      title: messages.servicesPage.meta.title,
      description: messages.servicesPage.meta.description,
    },
  };
}

export default async function ServicesPage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const localizedServices = getActiveServices(services).map((service) =>
    localizeService(service, messages),
  );

  return (
    <>
      <ServicesJsonLd
        services={localizedServices}
        description={messages.servicesPage.meta.description}
      />
      <ServicesPageClient />
    </>
  );
}
