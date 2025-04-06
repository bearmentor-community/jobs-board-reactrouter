import { Link } from "react-router";
import { prisma } from "~/lib/prisma";
import type { Route } from "./+types/job-details";

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data.title} - Jobs Board` },
    { name: "description", content: data.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  if (!job) {
    throw new Response("Job not found", { status: 404 });
  }

  return job;
}

export default function JobDetails({ loaderData }: Route.ComponentProps) {
  const job = loaderData;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-400 hover:text-blue-300"
      >
        ← Back to Jobs
      </Link>

      <article className="bg-gray-800 rounded-lg shadow-lg p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">{job.title}</h1>
          <div className="flex gap-4 text-gray-300">
            {job.company && (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {job.company}
              </span>
            )}
            {job.location && (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {job.location}
              </span>
            )}
            {(job.salaryMin || job.salaryMax) && (
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {job.salaryMin && job.salaryMax
                  ? `Rp ${job.salaryMin.toLocaleString(
                      "id-ID"
                    )} - ${job.salaryMax.toLocaleString("id-ID")}`
                  : job.salaryMin
                  ? `From Rp ${job.salaryMin.toLocaleString("id-ID")}`
                  : job.salaryMax
                  ? `Up to Rp ${job.salaryMax.toLocaleString("id-ID")}`
                  : null}
              </span>
            )}
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            Job Description
          </h2>
          <div className="text-gray-300 whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">
            How to Apply
          </h2>
          <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
            Apply for this position
          </button>
        </div>
      </article>
    </div>
  );
}
