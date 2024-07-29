import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import Markdown from "./Markdown";

const JobDetails = ({ job }: { job: Job }) => {
  return (
    <section>
      <div className="mb-6 flex justify-between border-b-2 py-2">
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">
              {job.title}
            </h2>
            <p className="text-sm font-bold text-green-500">
              {job.companyName}
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0" />
              {job.locationType}
            </p>
            <p className="flex items-center gap-2">
              <Briefcase size={15} className="shrink-0" />

              {job.type}
            </p>
            <p className="flex items-center gap-2">
              <Globe2 size={15} className="shrink-0" />
              {job.location || "Worldwide"}
            </p>
            <p className="flex items-center gap-2">
              <Banknote size={15} className="shrink-0" />
              {formatMoney(job.salary)}
            </p>
          </div>
        </div>
        {job.companyLogoUrl && (
          <Image
            src={job.companyLogoUrl}
            alt={`${job.companyName} company logo`}
            width={120}
            height={120}
            className="self-center"
          />
        )}
      </div>
      {job.description && <Markdown>{job.description}</Markdown>}
    </section>
  );
};

export default JobDetails;
