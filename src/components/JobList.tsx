import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import React from "react";
import JobListCard from "./JobListCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import PaginationBar from "./PaginationBar";

interface JobListProps {
  filterValues: JobFilterValues;
  page?: number;
}

const JobList = async ({ filterValues, page = 1 }: JobListProps) => {
  const { q, location, type, arrangement } = filterValues;
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = {
    OR: [
      { title: { search: searchString } },
      { location: { search: searchString } },
      { locationType: { search: searchString } },
      { companyName: { search: searchString } },
      { type: { search: searchString } },
    ],
  };

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      arrangement ? { locationType: arrangement } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

  return (
    <div className="flex grow flex-col gap-4">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Link href={`/jobs/${job.slug}`} key={job.id}>
            <JobListCard job={job} />
          </Link>
        ))
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          No job results. You can try with different filters.
        </p>
      )}
      <div className="py-6">
        {jobs.length > 0 && (
          <PaginationBar
            currentPage={page}
            totalPages={Math.ceil(totalResults / jobsPerPage)}
            filterValues={filterValues}
          />
        )}
      </div>
    </div>
  );
};

export default JobList;
