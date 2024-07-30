"use server";

import { createSlug } from "@/lib/utils";
import { jobPostSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const createJobPost = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const newJob = jobPostSchema.parse(values);

  const slug = createSlug(newJob.title);

  let companyLogoUrl: string | undefined = undefined;

  if (newJob.companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(newJob.companyLogo.name)}`,
      newJob.companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      title: newJob.title.trim(),
      type: newJob.type,
      companyName: newJob.companyName.trim(),
      companyLogoUrl,
      locationType: newJob.locationType,
      location: newJob.location,
      applicationEmail: newJob.applicationEmail?.trim(),
      applicationUrl: newJob.applicationUrl?.trim(),
      description: newJob.description?.trim(),
      salary: parseInt(newJob.salary),
    },
  });

  redirect("/jobs/submited");
};

export default createJobPost;
