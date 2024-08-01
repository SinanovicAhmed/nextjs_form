"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jobPostSchema, JobPostValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import SelectCustom from "./ui/myselect";
import { jobTypes, locationType } from "@/lib/job-types";
import FormSubmitButton from "./ui/formSubmitButton";
import { Label } from "@radix-ui/react-label";
import TextEditor from "./TextEditor";
import { draftToMarkdown } from "markdown-draft-js";
import createJobPost from "@/app/(user)/jobs/new/action";
import { redirect } from "next/navigation";

const PostJobForm = () => {
  const form = useForm<JobPostValues>({
    resolver: zodResolver(jobPostSchema),
  });

  const onSubmit = async (values: JobPostValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createJobPost(formData);
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <div className="rounded-md border p-4 shadow-md">
      <Form {...form}>
        <form
          className="space-y-4"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g Fullstack Developer" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job type</FormLabel>
                <FormControl>
                  <SelectCustom {...field} defaultValue="">
                    <option value="" hidden>
                      Select an option
                    </option>
                    {jobTypes.map((jobType) => (
                      <option key={jobType} value={jobType}>
                        {jobType}
                      </option>
                    ))}
                  </SelectCustom>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyLogo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Company logo</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work model</FormLabel>
                <FormControl>
                  <SelectCustom {...field} defaultValue="">
                    <option value="" hidden>
                      Select work model
                    </option>
                    {locationType.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </SelectCustom>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Office location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <div>
            <h2 className="text-sm font-medium">Application links</h2>
            <div className="mt-2 flex items-center gap-4">
              <FormField
                control={form.control}
                name="applicationUrl"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input {...field} placeholder="Application URL" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <p className="text-sm text-muted-foreground">or</p>

              <FormField
                control={form.control}
                name="applicationEmail"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input {...field} placeholder="Application Email" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label
                  className="text-sm font-medium"
                  onClick={() => form.setFocus("description")}
                >
                  Description
                </Label>
                <FormControl>
                  <TextEditor
                    onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormSubmitButton loading={form.formState.isSubmitting}>
            Submit
          </FormSubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default PostJobForm;
