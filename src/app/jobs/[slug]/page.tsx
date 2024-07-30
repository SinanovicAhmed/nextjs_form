import JobDetails from "@/components/JobDetails";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React, { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

export const generateMetadata = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
};

const page = async ({ params: { slug } }: PageProps) => {
  const job = await getJob(slug);

  const applicationLink = job.applicationEmail
    ? `mailTo:${job.applicationEmail}`
    : job.applicationUrl;

  if (!applicationLink) {
    notFound();
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-2 py-5">
      <JobDetails job={job} />
      <Button asChild>
        <a href={applicationLink}>Apply here</a>
      </Button>
    </main>
  );
};

export default page;
