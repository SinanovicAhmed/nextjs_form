import { z } from "zod";
import { jobTypes, locationType } from "./job-types";

export const filterJobSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  arrangement: z.string().optional(),
});

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional(),
    applicationUrl: z.string().max(100).url().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.applicationEmail && !data.applicationUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Application email or URL is required",
        path: ["applicationEmail"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Application email or URL is required",
        path: ["applicationUrl"],
      });
    }
  });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, "Required")
      .refine((value) => locationType.includes(value), "Invalid location type"),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) => data.locationType.toLowerCase() === "remote" || data.location,
    {
      message: "Location is required for on-site positions",
      path: ["location"],
    },
  );

export const jobPostSchema = z
  .object({
    title: z.string().min(5, "Field required, min 5 characters").max(100),
    type: z
      .string()
      .min(1, "Required")
      .refine((value) => jobTypes.includes(value), "Invalid job type"),

    description: z.string().max(2000).optional(),
    salary: z.string().min(1, "Required").regex(/^\d+$/, "Must be a number"),
    companyName: z.string().min(1, "Required").max(30),
    companyLogo: z
      .custom<File | undefined>()
      .refine(
        (file) =>
          !file || (file instanceof File && file.type.startsWith("image/")),
        "Logo must be an image file",
      )
      .refine(
        (file) => !file || file.size < 1024 * 1024 * 1,
        "File must be less than 1MB",
      ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type JobFilterValues = z.infer<typeof filterJobSchema>;
export type JobPostValues = z.infer<typeof jobPostSchema>;
