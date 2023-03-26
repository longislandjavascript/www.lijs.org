"use client";

import { Alert } from "components/Alert";
import { Button } from "components/Button";
import { ExternalLink } from "components/ExternalLink";
import { Input } from "components/Input";
import { Textarea } from "components/Textarea";
import { useForm } from "hooks/useForm";

import { BaseForm } from "./BaseForm";
import { redemptionFormHandler } from "./redemptionFormHandler";

type Props = {
  code: string;
  code_record_id: string;
  onReset: () => void;
};

export const BookForm = (props: Props) => {
  const { code, code_record_id, onReset } = props;

  function handleSubmit(event) {
    return redemptionFormHandler({
      data: {
        Name: event.target.name.value,
        Email: event.target.email.value,
        Address: event.target.address.value,
        Title: event.target.title.value,
        ISBN: event.target.isbn.value,
        Code: code,
        code_record_id,
      },
      endpoint: "/api/redeem/book",
    });
  }
  const { status, onSubmit } = useForm(handleSubmit);

  if (["success", "error"].includes(status)) {
    return (
      <div>
        <Alert
          status={status}
          successMessage="Got it! You will receive an email from O'Reilly once your book is
        shipped to the address your provided. Please allow 7-14 days."
        />
        <Button variant="ghost" className="mt-4" onClick={onReset}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <BaseForm
      message="Congratulations on winning an O'Reilly book!"
      onSubmit={onSubmit}
      status={status}
      onCancel={onReset}
      instructions={
        <>
          {" "}
          <p className="font-medium mb-4">How to claim your book:</p>
          <ol className="list-decimal ml-8">
            <>
              <li>
                <p>
                  Find the book you want and note the title and ISBN number.
                </p>
                <p>
                  <ExternalLink
                    className="link mt-2"
                    href="https://www.oreilly.com/search/?q=*&type=book"
                  >
                    Search the O&apos;Reilly Catalog
                  </ExternalLink>
                </p>
              </li>
              <li>
                <p className="mt-4">
                  Complete and submit the form below. You will receive a
                  confirmation email from O&apos;Reilly once your book is
                  mailed.
                </p>
              </li>
            </>
          </ol>
        </>
      }
    >
      <Input label="Your Name" type="text" name="name" required={true} />
      <Input label="Your Email" type="email" name="email" required={true} />
      <Textarea
        rows={2}
        label="Your Mailing Address"
        name="address"
        required={true}
      />
      <Input label="Book Title" type="text" name="title" required={true} />
      <Input label="Book ISBN" type="text" name="isbn" required={true} />
    </BaseForm>
  );
};
