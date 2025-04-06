import { redirect } from "react-router";
import { prisma } from "~/lib/prisma";
import type { Route } from "./+types/job-delete";

export async function action({ params }: Route.ActionArgs) {
  const jobId = params.id;

  if (!jobId) {
    throw new Response("Job ID is required", { status: 400 });
  }

  try {
    await prisma.job.delete({
      where: { id: jobId },
    });

    return redirect("/");
  } catch (error) {
    throw new Response("Failed to delete job", { status: 500 });
  }
}
