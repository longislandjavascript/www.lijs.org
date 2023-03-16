import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { AirtableEmbedForm } from "components/AirtableEmbedForm";

export default function ContactPage() {
  return (
    <Layout pageTitle="Contact Us">
      <SEO
        title="Contact Long Island JavaScript"
        description="Have a question or suggestion? Interested in sponsoring our group? Just want to say hi? What ever it is, we'd love to hear from you!"
      />
      <p className="my-4">
        Please fill out the form below or email me at{" "}
        <a href="mailto:justin@lijs.org?subject=Hello LIJS!" className="anchor">
          justin@lijs.org
        </a>
        .
      </p>

      <AirtableEmbedForm
        src="https://airtable.com/embed/shrCsfeB7ZzSHjkhW?backgroundColor=purple"
        height="819"
      />
    </Layout>
  );
}
