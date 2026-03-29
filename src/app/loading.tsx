import {
  Loader,
  SectionText,
  SectionTitle,
  SystemState,
} from "@/components/ui";

export default function LoadingPage() {
  return (
    <SystemState>
      <Loader />
      <SectionTitle>Завантаження...</SectionTitle>
      <SectionText>Будь ласка, зачекайте кілька секунд.</SectionText>
    </SystemState>
  );
}
