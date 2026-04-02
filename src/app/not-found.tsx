// Next.js 404 route file. Displays UI when the requested route is missing.
import Link from "next/link";
import {
  Button,
  SectionText,
  SectionTitle,
  SystemState,
} from "@/components/ui";
import { ROUTES } from "@/lib/constants/routes";

export default function NotFoundPage() {
  return (
    <SystemState>
      <SectionTitle>Pagina no encontrada</SectionTitle>

      <SectionText>
        Es posible que el enlace este desactualizado o que la pagina se haya
        movido.
      </SectionText>

      <Link href={ROUTES.HOME}>
        <Button>Volver al inicio</Button>
      </Link>
    </SystemState>
  );
}
