import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/medios")({
  head: () => ({
    meta: [
      { title: "En los medios · CGA Fénix Las Rozas" },
      { name: "description", content: "El club CGA Fénix Las Rozas en los medios de comunicación." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="En los medios" />,
});
