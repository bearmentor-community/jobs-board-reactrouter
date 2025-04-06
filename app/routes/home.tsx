import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jobs Board" },
    { name: "description", content: "Find and apply jobs" },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Jobs Board</h1>
    </div>
  );
}
