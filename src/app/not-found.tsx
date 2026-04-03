// Next.js 404 route file. Displays UI when the requested route is missing.
"use client";

import Link from "next/link";
import {
  Button,
  SectionText,
  SectionTitle,
  SystemState,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";
import { useI18n } from "@/providers/locale-provider";

export default function NotFoundPage() {
  const { t } = useI18n();

  return (
    <SystemState>
      <SectionTitle>{t("systemStates.notFound.title")}</SectionTitle>

      <SectionText>{t("systemStates.notFound.description")}</SectionText>

      <Link href={ROUTES.HOME}>
        <Button>{t("systemStates.notFound.cta")}</Button>
      </Link>
    </SystemState>
  );
}
