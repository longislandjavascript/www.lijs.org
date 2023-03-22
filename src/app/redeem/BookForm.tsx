"use client";

import { ExternalLink } from "components/ExternalLink";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { Textarea } from "components/Textarea";
import { baseUrl } from "constants/baseUrl";
import { useForm } from "hooks/useForm";

type Props = {
  code: string;
  code_record_id: string;
  onReset: () => void;
};

export const BookForm = (props: Props) => {
  const { code, code_record_id, onReset } = props;
  async function handleSubmit(event) {
    const data = {
      Name: event.target.name.value,
      Email: event.target.email.value,
      Address: event.target.address.value,
      Title: event.target.title.value,
      ISBN: event.target.isbn.value,
      Code: code,
      code_record_id,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = baseUrl + "/api/redeem/book";

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
    <div>
      <p className="text-2xl text-primary my-4 font-display font-bold">
        Congratulations on winning an O&apos;Reilly book!
      </p>

      <div className="mb-8 border-2 border-color border-dashed rounded-lg p-4 max-w-md">
        <p className="font-medium mb-4">How to claim your book:</p>

        <ol className="list-decimal ml-8">
          <>
            <li>
              <p>Find the book you want and note the title and ISBN number.</p>
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
                confirmation email from O&apos;Reilly once your book is mailed.
              </p>
            </li>
          </>
        </ol>
      </div>
      <Form onSubmit={onSubmit} status={status} onReset={onReset}>
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
      </Form>
    </div>
  );
};
