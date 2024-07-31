import JobDetails from "@/components/JobDetails";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import AdminActions from "./AdminActions";

interface PageProps {
  params: { slug: string };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-2 py-5">
      <JobDetails job={job} />
      <AdminActions job={job} />
    </main>
  );
};

export default Page;
