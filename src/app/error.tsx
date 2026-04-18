// Route-level error boundary file. Renders fallback UI when route rendering fails.
"use client";

import { useEffect } from "react";
import {
  Button,
  SectionText,
  SectionTitle,
  SystemState,
} from "@/components/ui";
import { useI18n } from "@/providers/locale-provider";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <SystemState>
      <SectionTitle>{t("systemStates.error.title")}</SectionTitle>

      <SectionText>{t("systemStates.error.description")}</SectionText>

      <Button onClick={reset}>{t("systemStates.error.cta")}</Button>
    </SystemState>
  );
}
