import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobList from "@/components/JobList";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    location?: string;
    type?: string;
    arrangement?: string;
  };
}

export default async function Home({
  searchParams: { q, location, type, arrangement },
}: PageProps) {
  const filterValues: JobFilterValues = { q, location, type, arrangement };

  return (
    <main className="max-w-5xl mx-auto space-y-5">
      <div className="w-full text-center p-5 space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Developer jobs
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
