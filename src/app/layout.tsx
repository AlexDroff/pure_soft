// Root Next.js layout file. Connects global styles and shared page structure.
import type { Metadata } from "next";
import "modern-normalize";
import "@/styles/globals.css";
import { Footer, Header } from "@/components/layout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const metadataBase = new URL(siteUrl);
const ogImagePath = "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "PURE SOFT | Limpieza de sofas, colchones y tapiceria en Alicante",
    template: "%s | PURE SOFT",
  },
  description:
    "Servicio profesional de limpieza de sofas, colchones, alfombras y tapiceria a domicilio en Alicante. Resultados visibles, atencion cercana y presupuesto gratuito.",
  keywords: [
    "limpieza de sofas Alicante",
    "limpieza de colchones Alicante",
    "limpieza de alfombras Alicante",
    "limpieza de tapiceria Alicante",
    "limpieza a domicilio Alicante",
    "PURE SOFT",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "PURE SOFT",
    title: "PURE SOFT | Limpieza de sofas, colchones y tapiceria en Alicante",
    description:
      "Limpieza profesional de sofas, colchones, alfombras y tapiceria en Alicante. Servicio a domicilio con presupuesto gratuito.",
    images: [
      {
        url: ogImagePath,
        alt: "PURE SOFT - limpieza profesional de tapiceria en Alicante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PURE SOFT | Limpieza de tapiceria en Alicante",
    description:
      "Servicio profesional de limpieza de sofas, colchones y alfombras en Alicante.",
    images: [ogImagePath],
  },
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
