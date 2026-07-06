import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/equipos")({
  head: () => ({
    meta: [
      { title: "Los equipos · CGA Fénix Las Rozas" },
      { name: "description", content: "Los equipos del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Los equipos" />,
});
