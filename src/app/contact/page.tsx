import { PageTitle } from "components/PageTitle";
import { baseUrl } from "constants/baseUrl";
import { createMetadata } from "utils/createMetadata";

import { ContactForm } from "./contact-form";

export const metadata = createMetadata({
  title: "Contact Long Island JavaScript",
  description:
    "Have a question or suggestion? Interested in sponsoring our group? Just want to say hi? What ever it is, we'd love to hear from you!",
});

export default function ContactPage() {
  return (
    <div>
      <PageTitle>Contact Us</PageTitle>

      <p className="my-4">
        Please fill out the form below or email me at{" "}
        <a href="mailto:justin@lijs.org?subject=Hello LIJS!" className="anchor">
          justin@lijs.org
        </a>
        .
      </p>

      <ContactForm />
    </div>
  );
}
