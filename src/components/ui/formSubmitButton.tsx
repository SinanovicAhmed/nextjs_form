"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import React from "react";
import { Loader2 } from "lucide-react";

const FormSubmitButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} type="submit" disabled={pending}>
      <span className="flex gap-2 items-center justify-center">
        {pending && <Loader2 className="animate-spin" />}
        {props.children}
      </span>
    </Button>
  );
};

export default FormSubmitButton;
