// App Router sitemap file. Lists primary public routes for search engine discovery.
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { ROUTES } from "@/lib/constants/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}${ROUTES.HOME}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${ROUTES.SERVICES}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
