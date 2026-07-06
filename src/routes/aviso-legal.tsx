import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · CGA Fénix Las Rozas" },
      { name: "description", content: "Aviso legal del club CGA Fénix Las Rozas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Aviso legal" />,
});
