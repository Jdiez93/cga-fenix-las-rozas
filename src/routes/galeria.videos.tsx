import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/galeria/videos")({
  head: () => ({
    meta: [
      { title: "Vídeos · CGA Fénix Las Rozas" },
      { name: "description", content: "Galería de vídeos del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Galería de vídeos" />,
});
