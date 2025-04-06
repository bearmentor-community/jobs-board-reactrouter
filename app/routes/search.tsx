import { prisma } from "~/lib/prisma";
import { JobCard } from "~/components/JobCard";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  const jobs = await prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return { jobs, query };
}

export default function Search({
  loaderData,
}: {
  loaderData: Awaited<ReturnType<typeof loader>>;
}) {
  const { jobs, query } = loaderData;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>

      {query && (
        <p className="text-gray-400 mb-8">Showing results for "{query}"</p>
      )}

      {jobs.length <= 0 && (
        <p className="text-gray-400">No jobs found matching your search.</p>
      )}

      {jobs.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
