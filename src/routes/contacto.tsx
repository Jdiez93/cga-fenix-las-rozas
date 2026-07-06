import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacta · CGA Fénix Las Rozas" },
      { name: "description", content: "Contacta con el club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Contacta" />,
});
