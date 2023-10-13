"use client";

import { Slot } from "@radix-ui/react-slot";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ButtonProps } from "./button";

export function FormButton({ children }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    // @ts-ignore-next-line
    <Slot aria-disabled={pending} disabled={pending}>
      {children}
    </Slot>
  );
}
