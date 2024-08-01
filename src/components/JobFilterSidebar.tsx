import prisma from "@/lib/prisma";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { jobTypes, locationType } from "@/lib/job-types";
import SelectCustom from "./ui/myselect";
import { filterJobSchema } from "../lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./ui/formSubmitButton";

const filterJobs = async (formData: FormData) => {
  "use server";
  const values = Object.fromEntries(formData.entries());

  const { q, location, type, arrangement } = filterJobSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(location && { location: location.trim() }),
    ...(type && { type: type.trim() }),
    ...(arrangement && { arrangement: arrangement.trim() }),
  });

  redirect(`/?${searchParams.toString()}`);
};

const JobFilterSidebar = async () => {
  const distinctLocations = await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then(
      (locations) =>
        locations.map(({ location }) => location).filter(Boolean) as string[],
    );

  return (
    <aside className="top-10 h-fit w-full rounded-md border p-5 shadow-md md:sticky md:w-[260px] md:p-2">
      <form action={filterJobs}>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="q">Search</Label>
            <Input id="q" name="q" placeholder="Title, company, etc." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Job type</Label>
            <SelectCustom id="type" name="type" defaultValue="">
              <option value="" className="hidden">
                All job types
              </option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectCustom>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <SelectCustom id="location" name="location" defaultValue="">
              <option value="" className="hidden">
                All locations
              </option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </SelectCustom>
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrangement">Work arrangement</Label>
            <SelectCustom id="arrangement" name="arrangement" defaultValue="">
              <option value="" className="hidden">
                All work arrangement
              </option>
              {locationType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </SelectCustom>
          </div>
          <div className="flex gap-2 pt-6">
            <FormSubmitButton className="grow">Filter jobs</FormSubmitButton>
            <Button type="reset" variant="outline">
              Reset
            </Button>
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobFilterSidebar;
