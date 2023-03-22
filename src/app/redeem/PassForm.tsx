"use client";

import { Form } from "components/Form";
import { Input } from "components/Input";
import { baseUrl } from "constants/baseUrl";
import { useForm } from "hooks/useForm";

type Props = {
  code: string;
  code_record_id: string;
  onReset: () => void;
};

export const PassForm = (props: Props) => {
  const { code, code_record_id, onReset } = props;
  async function handleSubmit(event) {
    const data = {
      Name: event.target.name.value,
      Email: event.target.email.value,
      Code: code,
      code_record_id,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = baseUrl + "/api/redeem/prize";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    return fetch(endpoint, options);
  }
  const { status, onSubmit } = useForm(handleSubmit);

  return (
    <div className="max-w-sm">
      <p className="text-2xl text-primary my-4 font-display font-bold">
        Congratulations on winning a 30-day pass to O&apos;Reilly Online
        Learning! <span>(valued at $49)</span>
      </p>

      <div className="mb-8 border-2 border-color border-dashed rounded-lg p-4 max-w-md">
        <p className="font-medium mb-4">How to claim your pass:</p>
        <p className="mt-4">
          Complete and submit the form below. You will immediately be provided a
          URL that you can follow to claim your free pass.
        </p>
      </div>
      <Form onSubmit={onSubmit} status={status} onReset={onReset}>
        <Input label="Your Name" type="text" name="name" required={true} />
        <Input label="Your Email" type="email" name="email" required={true} />
      </Form>
    </div>
  );
};
