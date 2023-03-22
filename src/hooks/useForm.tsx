import { FormEventHandler, useState } from "react";
import { Form } from "components/Form";

export type Form_Event = FormEventHandler<HTMLFormElement>;

export type Status = "idle" | "pending" | "success" | "error";

export function useForm(handleSubmit: (e) => Promise<Response>) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event) {
    console.log(event);
    try {
      event.preventDefault();
      setStatus("pending");
      const response = await handleSubmit(event);
      const result = await response.json();
      console.log({ result });

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
