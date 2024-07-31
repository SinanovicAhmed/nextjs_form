import React from "react";
import JobListCard from "./JobListCard";
import Link from "next/link";
import prisma from "@/lib/prisma";

const UnapprovedJobList = async () => {
  const unapprovedJobs = await prisma.job.findMany({
    where: { approved: false },
  });

  return (
    <section className="flex flex-col gap-4">
      {unapprovedJobs.map((job) => (
        <Link href={`/admin/jobs/${job.slug}`} key={job.id}>
          <JobListCard job={job} />
        </Link>
      ))}

      {unapprovedJobs.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          There is no unapproved jobs. Please check back later for updates.
        </p>
      )}
    </section>
  );
};

export default UnapprovedJobList;
