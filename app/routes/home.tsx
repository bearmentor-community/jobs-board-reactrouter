import { prisma } from "~/lib/prisma";
import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Jobs Board" },
    { name: "description", content: "Find and apply jobs" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const jobs = await prisma.job.findMany();
  return jobs;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const jobs = loaderData;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Jobs Board</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            to={`/jobs/${job.id}`}
            key={job.id}
            className="block bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-100">
              {job.title}
            </h2>
            <p className="text-gray-300 line-clamp-3">{job.description}</p>
            <div className="mt-4 text-blue-400 hover:text-blue-300">
              View Details →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
