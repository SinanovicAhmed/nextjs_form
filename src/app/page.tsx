import JobListCard from "@/components/JobListCard";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <section className="max-w-3xl mx-auto space-y-3">
        <div className="w-full text-center p-10 space-y-4">
          <h2 className="text-3xl font-bold">Developer jobs</h2>
          <p className="text-muted-foreground text-sm">
            Find Your Dream Job Today
          </p>
        </div>
        {jobs.map((job) => (
          <JobListCard key={job.id} job={job} />
        ))}
      </section>
    </main>
  );
}
