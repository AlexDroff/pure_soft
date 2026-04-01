import type { Metadata } from "next";
import "modern-normalize";
import "@/styles/globals.css";
import { Footer, Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "PURE SOFT",
  description: "Професійна хімчистка меблів і текстилю",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
