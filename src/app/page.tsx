// Next.js route page file. Composes sections and renders route content.
import {
  AboutSection,
  FaqSection,
  GallerySection,
  HeroSection,
  ServicesPreviewSection,
} from "@/components/sections";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import ProfessionalServiceJsonLd from "@/components/seo/ProfessionalServiceJsonLd";
import StickyWhatsAppCta from "@/components/ui/StickyWhatsAppCta/StickyWhatsAppCta";
import { services } from "@/data/services";
import { localizeService } from "@/i18n/services";
import { getMessages } from "@/i18n/messages";
import { getServerLocale } from "@/i18n/server";
import { getActiveServices } from "@/utils/getActiveServices";

export default async function HomePage() {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const localizedServices = getActiveServices(services).map((service) =>
    localizeService(service, messages),
  );

  const faqItems = [
    "faq-1",
    "faq-2",
    "faq-3",
    "faq-4",
    "faq-5",
    "faq-6",
    "faq-7",
  ].map((id) => ({
    question: messages.faq.items[id as keyof typeof messages.faq.items].question,
    answer: messages.faq.items[id as keyof typeof messages.faq.items].answer,
  }));

  return (
    <main>
      <ProfessionalServiceJsonLd
        description={messages.meta.description}
        services={localizedServices}
      />
      <FaqJsonLd items={faqItems} />
      <HeroSection />
      <AboutSection />
      <ServicesPreviewSection />
      <FaqSection />
      <GallerySection />
      <StickyWhatsAppCta />
    </main>
  );
}
