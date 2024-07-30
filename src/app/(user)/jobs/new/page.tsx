import PostJobForm from "@/components/PostJobForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Post a new job",
};

const page = () => {
  return (
    <main className="m-auto max-w-3xl space-y-8 px-2 py-5">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Post your developer job here
        </h2>
        <p className="text-sm text-muted-foreground">
          Post your job here to find the perfect fit for your open position.
        </p>
      </div>
      <PostJobForm />
    </main>
  );
};

export default page;
