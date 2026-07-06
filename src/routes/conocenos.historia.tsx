import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/conocenos/historia")({
  head: () => ({
    meta: [
      { title: "Nuestra historia · CGA Fénix Las Rozas" },
      { name: "description", content: "Descubre la historia del club CGA Fénix Las Rozas de gimnasia artística." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <ComingSoon title="Nuestra historia" />,
});
