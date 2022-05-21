import { Layout } from "components/Layout";
import { SEO } from "components/SEO";
import { SectionTitle } from "components/PageTitle";

export default function CodeOfConductPage() {
  const questionClassNames = "text-2xl font-medium text-primary py-2";
  const answerClassNames = "";
  return (
    <Layout>
      <SEO title="Contact LIJS" />
      <SectionTitle>Contact Us</SectionTitle>
    </Layout>
  );
}
