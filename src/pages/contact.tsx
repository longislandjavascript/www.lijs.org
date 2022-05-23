import { Layout } from "components/Layout";
import { SEO } from "components/SEO";

export default function ContactPage() {
  return (
    <Layout pageTitle="Contact Us">
      <SEO
        title="Contact Long Island JavaScript"
        description="Have a question or suggestion? Interested in sponsoring our group? Just want to say hi? What ever it is, we'd love to hear from you!"
      />
      <p className="mx-8 my-4">
        Hey! Please fill out the form below or email me at{" "}
        <a href="mailto:justin@lijs.org?subject=Hello LIJS!" className="anchor">
          justin@lijs.org
        </a>
        .
      </p>

      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdeJpTdrpel5qHag3VDAJFPbszU3wDx5w3CWIGPtGgNePrpCQ/viewform?embedded=true"
        width="680"
        height="750"
        frameBorder="0"
      >
        Loading…
      </iframe>
    </Layout>
  );
}
