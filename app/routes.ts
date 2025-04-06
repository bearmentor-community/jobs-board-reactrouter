import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/new", "routes/new.tsx"),
  route("/jobs/:id", "routes/job-details.tsx"),
  route("/jobs/:id/delete", "routes/job-delete.tsx"),
  route("/search", "routes/search.tsx"),
  route("/demo", "routes/demo.tsx"),
] satisfies RouteConfig;
