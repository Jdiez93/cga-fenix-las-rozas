import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/conocenos/logros")({
  head: () => ({
    meta: [
      { title: "Nuestros logros · CGA Fénix Las Rozas" },
      { name: "description", content: "Los logros deportivos del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Nuestros logros" />,
});
