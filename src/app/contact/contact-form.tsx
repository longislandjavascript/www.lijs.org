"use client";

import { Form } from "components/Form";
import { Input } from "components/Input";
import { Textarea } from "components/Textarea";
import { baseUrl } from "constants/baseUrl";
import { useForm } from "hooks/useForm";

export const ContactForm = () => {
  async function handleSubmit(event) {
    const data = {
      Name: event.target.name.value,
      Email: event.target.email.value,
      Message: event.target.message.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = baseUrl + "/api/contact-form-submission";

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
    <Form
      onSubmit={onSubmit}
      status={status}
      successMessage="Thanks for reaching out and one of us will get back to you as soon as possible."
    >
      <Input label="Your Name" type="text" name="name" required={true} />
      <Input label="Your Email" type="email" name="email" required={true} />
      <Textarea label="Message" name="message" required={true} />
    </Form>
  );
};
