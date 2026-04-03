// Next.js loading state for the route. Shows temporary UI while content is loading.
"use client";

import { Loader } from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";

export default function LoadingPage() {
  const { t } = useI18n();
  return <Loader subtext={t("loader.pageLoadingSubtext")} />;
}
