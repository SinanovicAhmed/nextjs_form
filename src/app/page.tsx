import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobList from "@/components/JobList";
import { generatePageHeader } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: JobFilterValues;
}

export const generateMetadata = ({
  searchParams: { q, location, type, arrangement },
}: PageProps): Metadata => {
  return {
    title: `${generatePageHeader({ q, location, type, arrangement })} | NextJob`,
  };
};

export default async function Home({
  searchParams: { q, location, type, arrangement },
}: PageProps) {
  const filterValues: JobFilterValues = { q, location, type, arrangement };

  return (
    <main className="max-w-5xl mx-auto space-y-5">
      <div className="w-full text-center p-5 space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {generatePageHeader(filterValues)}
        </h2>
        <p className="text-muted-foreground text-sm">
          Find Your Dream Job Today
        </p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar />
        <JobList filterValues={filterValues} />
      </section>
    </main>
  );
}
