"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const validateUser = async () => {
  const user = await currentUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  if (!user || !isAdmin) {
    throw new Error("Not authorized");
  }
};

export const approveJob = async (formData: FormData) => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    await validateUser();

    await prisma.job.update({
      where: { id: jobId },
      data: { approved: true },
    });

    revalidatePath("/");
  } catch (error) {}
};

export const deleteJob = async (formData: FormData) => {
  try {
    const jobId = parseInt(formData.get("jobId") as string);
    await validateUser();

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });
  } catch (error) {
    return { error: "Something went wrong, please try again." };
  }
  redirect("/admin");
};
