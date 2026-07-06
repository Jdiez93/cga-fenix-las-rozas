import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/preinscripcion")({
  head: () => ({
    meta: [
      { title: "Preinscripción · CGA Fénix Las Rozas" },
      { name: "description", content: "Formulario de preinscripción del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Preinscripción" />,
});
