import type { Metadata } from "next";
import { cookies } from "next/headers";
import "modern-normalize";
import "@/styles/globals.css";
import { Footer, Header } from "@/components/layout";
import { ThemeProvider, type Theme } from "@/providers/theme-provider";
import { LocaleProvider } from "@/providers/locale-provider";
import { getMessages } from "@/i18n/messages";
import { getServerLocale } from "@/i18n/server";
import { SITE_OG_IMAGE_URL, SITE_URL } from "@/config/site";
const metadataBase = new URL(SITE_URL);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getMessages(locale);

  return {
    metadataBase,
    alternates: {
      canonical: "/",
    },
    title: {
      default: messages.meta.defaultTitle,
      template: messages.meta.titleTemplate,
    },
    description: messages.meta.description,
    keywords: messages.meta.keywords,
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
      locale: locale === "en" ? "en_US" : "es_ES",
      url: SITE_URL,
      siteName: messages.meta.openGraph.siteName,
      title: messages.meta.openGraph.title,
      description: messages.meta.openGraph.description,
      images: [
        {
          url: SITE_OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: messages.meta.openGraph.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.meta.twitter.title,
      description: messages.meta.twitter.description,
      images: [SITE_OG_IMAGE_URL],
    },
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getServerLocale();
  const messages = getMessages(locale);
  const cookieStore = await cookies();
  const storedTheme = cookieStore.get("theme")?.value;
  const initialTheme: Theme = storedTheme === "dark" ? "dark" : "light";

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <LocaleProvider locale={locale} messages={messages}>
          <ThemeProvider initialTheme={initialTheme}>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
