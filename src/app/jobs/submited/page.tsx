import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

import React from "react";

export const metadata: Metadata = {
  title: "Form confirmation",
};

const page = () => {
  return (
    <main className="m-auto flex max-w-5xl flex-col items-center space-y-8 px-2 py-5">
      <div className="w-full space-y-3 p-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Thank you for submiting your job
        </h2>
        <p className="text-sm text-muted-foreground">
          Your job posting is being reviewed. As soon as it&#39;s approved, your
          job posting will be visible to all of our users
        </p>
      </div>
      <Button asChild>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </main>
  );
};

export default page;
