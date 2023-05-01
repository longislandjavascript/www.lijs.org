"use client";
import { format } from "date-fns";

import { Alert } from "components/Alert";
import { Button } from "components/Button";
import { ExternalLink } from "components/ExternalLink";
import { Input } from "components/Input";
import { useForm } from "hooks/useForm";

import { BaseForm } from "./BaseForm";
import { redemptionFormHandler } from "./redemptionFormHandler";

type Props = {
  code: string;
  code_record_id: string;
  onReset: () => void;
  link: string;
  link_expiration_date: string;
};

export const PassForm = (props: Props) => {
  const { code, code_record_id, onReset, link, link_expiration_date } = props;

  function handleSubmit(event) {
    return redemptionFormHandler({
      data: {
        Name: event.target.name.value,
        Email: event.target.email.value,
        Code: code,
        code_record_id,
      },
      endpoint: "/api/redeem/pass",
    });
  }
  const { status, onSubmit } = useForm(handleSubmit);

  if (["success", "error"].includes(status)) {
    return (
      <div className="max-w-md">
        <Alert
          status={status}
          successMessage=" Please follow the link below to claim your free 30-day pass to
          O'Reilly Online Learning.."
        />

        <div className="border-2 border-dashed border-color-1 my-4 rounded-xl p-2">
          <ExternalLink className="anchor text-xl mb-4" href={link}>
            {link}
          </ExternalLink>
          <p className="text-base">
            This link will expire on{" "}
            <span className="font-medium">
              {format(new Date(link_expiration_date), "MMMM dd, yyyy")}.
            </span>
          </p>
        </div>

        <Button variant="ghost" onClick={onReset}>
          Done
        </Button>
      </div>
    );
  }

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
