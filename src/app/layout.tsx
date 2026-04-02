// Root Next.js layout file. Connects global styles and shared page structure.
import type { Metadata } from "next";
import "modern-normalize";
import "@/styles/globals.css";
import { Footer, Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "PURE SOFT",
  description:
    "Servicio profesional de limpieza de tapicería, muebles y textiles para eliminar manchas, olores y suciedad profunda.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
