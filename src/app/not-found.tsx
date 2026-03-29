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
      <SectionTitle>Сторінку не знайдено</SectionTitle>

      <SectionText>
        Можливо, посилання застаріло або сторінка була переміщена.
      </SectionText>

      <Link href={ROUTES.HOME}>
        <Button>Повернутися на головну</Button>
      </Link>
    </SystemState>
  );
}
