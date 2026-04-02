// Next.js loading state for the route. Shows temporary UI while content is loading.
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
