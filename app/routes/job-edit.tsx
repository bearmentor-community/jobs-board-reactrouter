import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/job-edit";
import { prisma } from "~/lib/prisma";

export async function loader({ params }: Route.LoaderArgs) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
  });

  if (!job) {
    throw new Response("Job not found", { status: 404 });
  }

  return job;
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const company = String(formData.get("company"));
  const location = String(formData.get("location"));
  const salaryMin = formData.get("salaryMin")
    ? Number(formData.get("salaryMin"))
    : null;
  const salaryMax = formData.get("salaryMax")
    ? Number(formData.get("salaryMax"))
    : null;

  const jobData = {
    title,
    description,
    company,
    location,
    salaryMin,
    salaryMax,
  };

  const updatedJob = await prisma.job.update({
    where: { id: params.id },
    data: jobData,
  });

  return redirect(`/jobs/${updatedJob.id}`);
}

export default function EditJob({ loaderData }: Route.ComponentProps) {
  const job = loaderData;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Edit Job</h1>

      <Form method="PATCH" className="max-w-2xl">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={job.title}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={job.description}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="company" className="block mb-2 font-medium">
              Company:
            </label>
            <input
              type="text"
              name="company"
              id="company"
              defaultValue={job.company || ""}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block mb-2 font-medium">
              Location:
            </label>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={job.location || ""}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="salaryMin" className="block mb-2 font-medium">
              Minimum Salary:
            </label>
            <input
              type="number"
              name="salaryMin"
              id="salaryMin"
              defaultValue={job.salaryMin || ""}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="salaryMax" className="block mb-2 font-medium">
              Maximum Salary:
            </label>
            <input
              type="number"
              name="salaryMax"
              id="salaryMax"
              defaultValue={job.salaryMax || ""}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Update Job
          </button>
          <Link
            to={`/jobs/${job.id}`}
            className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
