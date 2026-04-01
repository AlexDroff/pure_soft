import { Loader } from "@/components/ui";

export default function LoadingPage() {
  return (
    <Loader
      fullScreen
      text="Cargando..."
      subtext="Por favor, espera unos segundos."
    />
  );
}
