import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/quienes-somos/equipo-tecnico")({
  head: () => ({
    meta: [
      { title: "Equipo técnico · CGA Fénix Las Rozas" },
      { name: "description", content: "Conoce al equipo técnico del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Equipo técnico" />,
});
