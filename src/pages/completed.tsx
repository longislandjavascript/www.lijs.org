import { Layout } from "components/Layout";
import { SEO } from "components/SEO";

export default function CodeOfConductPage() {
  return (
    <Layout pageTitle="Thanks for the donation!">
      <SEO title="Thanks for the donation!" />

      <p className="text-xl font-medium text-primary my-8">
        Thank you for supporting Long Island JavaScript and we hope to see you
        at one of our upcoming events! Make sure and get a free sticker while
        you are there.
      </p>
    </Layout>
  );
}
