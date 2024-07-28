import { Job } from "@prisma/client";
import Image from "next/image";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { calculateDateGap, formatMoney } from "@/lib/utils";

interface JobListCardProp {
  job: Job;
}

const JobListCard = ({ job }: JobListCardProp) => {
  return (
    <article className="flex gap-5 border p-5 hover:bg-muted rounded-sm">
      <Image
        className="rounded-lg self-center"
        src={job.companyLogoUrl || "/images/job_logo_default.png"}
        alt={`${job.companyName} logo`}
        width={90}
        height={90}
      />

      <div className="flex-grow space-y-3">
        <div>
          <h2 className="font-medium">{job.title}</h2>
          <p className="text-sm text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0" />
            {job.locationType}
          </p>
          <p className="flex items-center gap-2 sm:hidden">
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

          <p className="flex items-center gap-2 sm:hidden">
            <Clock size={15} className="shrink-0" />
            {calculateDateGap(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col justify-between items-end text-muted-foreground text-xs">
        <p className="bg-slate-200 px-2 rounded">{job.type}</p>
        <p className="flex items-center gap-2">
          <Clock size={15} className="shrink-0" />
          {calculateDateGap(job.createdAt)}
        </p>
      </div>
    </article>
  );
};

export default JobListCard;
