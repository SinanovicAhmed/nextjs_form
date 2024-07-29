import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import React from "react";
import JobListCard from "./JobListCard";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface JobListProps {
  filterValues: JobFilterValues;
}

const JobList = async ({
  filterValues: { q, location, type, arrangement },
}: JobListProps) => {
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
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="grow space-y-4">
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
    </div>
  );
};

export default JobList;
