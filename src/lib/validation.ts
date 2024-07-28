import { z } from "zod";

export const filterJobSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  arrangement: z.string().optional(),
});

export type JobFilterValues = z.infer<typeof filterJobSchema>;
