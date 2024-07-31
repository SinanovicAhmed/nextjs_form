import FormSubmitButton from "@/components/ui/formSubmitButton";
import { Job } from "@prisma/client";
import { approveJob, deleteJob } from "./actions";

interface AdminActionsProp {
  job: Job;
}

interface AdminButtonsProps {
  jobId: number;
}

const AdminActions = ({ job }: AdminActionsProp) => {
  return (
    <div className="flex gap-4">
      {job.approved === true ? (
        <p className="text-center text-sm text-green-700 underline">
          This job has been approved
        </p>
      ) : (
        <>
          <ApproveButton jobId={job.id} />
          <DeleteButton jobId={job.id} />
        </>
      )}
    </div>
  );
};

const ApproveButton = ({ jobId }: AdminButtonsProps) => {
  return (
    <form action={approveJob}>
      <input className="hidden" name="jobId" defaultValue={jobId} />
      <FormSubmitButton>Approve job</FormSubmitButton>
    </form>
  );
};

const DeleteButton = ({ jobId }: AdminButtonsProps) => {
  return (
    <form action={deleteJob}>
      <input className="hidden" name="jobId" defaultValue={jobId} />
      <FormSubmitButton>Delete job</FormSubmitButton>
    </form>
  );
};

export default AdminActions;
