import UnapprovedJobList from "@/components/UnapprovedJobList";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin dashboard",
};

const Page = () => {
  return (
    <main className="mx-auto max-w-5xl space-y-5 px-2">
      <div className="w-full space-y-3 p-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Unapproved Jobs
        </h2>
        <p className="text-sm text-muted-foreground">
          Dashboard to swiftly approve or delete job postings, ensuring
          high-quality listings for job seekers
        </p>
      </div>

      <UnapprovedJobList />
    </main>
  );
};

export default Page;
