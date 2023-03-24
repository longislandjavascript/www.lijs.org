"use client";
import { Input } from "components/Input";
import { useForm } from "hooks/useForm";

import { BaseForm } from "./BaseForm";
import { redemptionFormHandler } from "./redemptionFormHandler";

type Props = {
  code: string;
  code_record_id: string;
  onReset: () => void;
};

export const PassForm = (props: Props) => {
  const { code, code_record_id, onReset } = props;

  function handleSubmit(event) {
    return redemptionFormHandler({
      data: {
        Name: event.target.name.value,
        Email: event.target.email.value,
        Code: code,
        code_record_id,
      },
      endpoint: "/api/redeem/prize",
    });
  }
  const { status, onSubmit } = useForm(handleSubmit);

  return (
    <BaseForm
      message="Congratulations on winning a 30-day pass to O'Reilly Online
        Learning! (valued at $49)"
      onSubmit={onSubmit}
      status={status}
      onCancel={onReset}
      instructions={
        <>
          <p className="font-medium mb-4">How to claim your pass:</p>
          <p className="mt-4">
            Complete and submit the form below. You will immediately be provided
            a URL that you can follow to claim your free pass.
          </p>
        </>
      }
    >
      <Input label="Your Name" type="text" name="name" required={true} />
      <Input label="Your Email" type="email" name="email" required={true} />
    </BaseForm>
  );
};
