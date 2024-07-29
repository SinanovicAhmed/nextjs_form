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
    <main className="mx-auto max-w-5xl space-y-5 px-2">
      <div className="w-full space-y-3 p-5 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          {generatePageHeader(filterValues)}
        </h2>
        <p className="text-sm text-muted-foreground">
          Find Your Dream Job Today
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar />
        <JobList filterValues={filterValues} />
      </section>
    </main>
  );
}
