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
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <SystemState>
      <SectionTitle>Algo salio mal</SectionTitle>

      <SectionText>
        Ocurrio un error inesperado. Intenta nuevamente en unos segundos.
      </SectionText>

      <Button onClick={reset}>Intentar de nuevo</Button>
    </SystemState>
  );
}
