// Route-level error boundary file. Renders fallback UI when route rendering fails.
"use client";

import { useEffect } from "react";
import {
  Button,
  SectionText,
  SectionTitle,
  SystemState,
} from "@/components/ui";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SystemState>
      <SectionTitle>Щось пішло не так</SectionTitle>

      <SectionText>Виникла неочікувана помилка. Спробуйте ще раз.</SectionText>

      <Button onClick={reset}>Спробувати знову</Button>
    </SystemState>
  );
}
