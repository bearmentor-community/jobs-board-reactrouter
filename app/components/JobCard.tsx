import { Link } from "react-router";
import type { Job } from "@prisma/client";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-200"
    >
      <h2 className="text-xl font-semibold mb-3 text-gray-100">{job.title}</h2>
      <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-400">
        {job.company && (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
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
              className="w-4 h-4 mr-1"
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
              className="w-4 h-4 mr-1"
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
      <p className="text-gray-300 line-clamp-3">{job.description}</p>
      <div className="mt-4 text-blue-400 hover:text-blue-300">
        View Details →
      </div>
    </Link>
  );
}
