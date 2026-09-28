import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/conocenos/logros")({
  component: () => <Outlet />,
});
