import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/galeria/fotos")({
  head: () => ({
    meta: [
      { title: "Fotos · CGA Fénix Las Rozas" },
      { name: "description", content: "Galería de fotos del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Galería de fotos" />,
});
