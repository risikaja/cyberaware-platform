import { createFileRoute } from "@tanstack/react-router";
import { Route as AdminRoute } from "./admin";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — CyberAware" }] }),
  component: AdminRoute.options.component!,
});
