import {
  AboutSection,
  FaqSection,
  GallerySection,
  HeroSection,
  ServicesPreviewSection,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesPreviewSection />
      <FaqSection />
      <GallerySection />
    </main>
  );
}
