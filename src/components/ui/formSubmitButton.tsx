"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import React from "react";
import { Loader2 } from "lucide-react";

const FormSubmitButton = ({
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button {...props} type="submit" disabled={pending || loading}>
      <span className="flex items-center justify-center gap-2">
        {(pending || loading) && <Loader2 className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
