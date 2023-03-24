import { FormEvent, useState } from "react";

export type Form_Event = FormEvent<HTMLFormElement>;

export type Status = "idle" | "pending" | "success" | "error";

export type UseFormProps = {
  status: Status;
  onSubmit: (e: Form_Event) => Promise<void>;
};

export function useForm(handleSubmit: (e) => Promise<Response>): UseFormProps {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event) {
    try {
      event.preventDefault();
      setStatus("pending");
      const response = await handleSubmit(event);
      const result = await response.json();

      if (result.status === "error") {
        setStatus("error");
      } else if (result.status === "success") {
        setStatus("success");
        // Reset all of the form elements on success
        Array(event.target).forEach((target) => {
          target.reset();
        });
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return { status, onSubmit };
}
